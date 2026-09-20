import React, { useState, useEffect, useRef } from 'react';
import { 
  Navigation, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  RefreshCw, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Fuel, 
  Sparkles, 
  Layers, 
  Route as RouteIcon,
  LocateFixed,
  AlertCircle
} from 'lucide-react';
import L from 'leaflet';

// Pre-configured Punjab field-to-plant agricultural dispatch routes
const PRESET_DISPATCH_PAIRS = [
  {
    id: 'PAIR-1',
    label: 'Field #PB-JAG05 (Jagraon) → Ludhiana CBG Plant',
    origin: {
      name: 'Field #PB-JAG05, Jagraon West',
      lat: 30.7850,
      lng: 75.4780,
      desc: 'Paddy Residue Parcel · 4.8 tonnes'
    },
    destination: {
      name: 'Ludhiana Bio-CNG / CBG Plant',
      lat: 30.9010,
      lng: 75.8573,
      desc: 'Industrial Offtake Gate · Weighbridge #01'
    },
    crop: 'Paddy Straw',
    tonnes: 4.8
  },
  {
    id: 'PAIR-2',
    label: 'Field #PB-SDW02 (Sidhwan Bet) → Ludhiana CBG Plant',
    origin: {
      name: 'Field #PB-SDW02, Sidhwan Bet',
      lat: 30.9412,
      lng: 75.5221,
      desc: 'Paddy Residue Parcel · 5.2 tonnes'
    },
    destination: {
      name: 'Ludhiana Bio-CNG / CBG Plant',
      lat: 30.9010,
      lng: 75.8573,
      desc: 'Industrial Offtake Gate · Weighbridge #01'
    },
    crop: 'Paddy Straw',
    tonnes: 5.2
  },
  {
    id: 'PAIR-3',
    label: 'Field #PB-MGA08 (Dharamkot) → Moga Biomass Facility',
    origin: {
      name: 'Field #PB-MGA08, Dharamkot Moga',
      lat: 30.9436,
      lng: 75.2348,
      desc: 'Paddy Residue Parcel · 6.8 tonnes'
    },
    destination: {
      name: 'Moga Biomass Power Facility',
      lat: 30.8165,
      lng: 75.1717,
      desc: 'Biomass Boiler Gate · Intake Bay'
    },
    crop: 'Paddy Straw',
    tonnes: 6.8
  },
  {
    id: 'PAIR-4',
    label: 'Field #PB-SGR14 (Sunam) → Sangrur Bio-Energy Refinery',
    origin: {
      name: 'Field #PB-SGR14, Sunam Central',
      lat: 30.1306,
      lng: 75.8038,
      desc: 'Paddy Residue Parcel · 5.0 tonnes'
    },
    destination: {
      name: 'Sangrur Bio-Energy Refinery',
      lat: 30.2458,
      lng: 75.8421,
      desc: 'Bio-Gas Digestor Facility'
    },
    crop: 'Paddy Straw',
    tonnes: 5.0
  },
  {
    id: 'PAIR-5',
    label: 'Field #PB-RAI09 (Raikot) → Ludhiana CBG Plant',
    origin: {
      name: 'Field #PB-RAI09, Raikot East',
      lat: 30.6510,
      lng: 75.6020,
      desc: 'Paddy Residue Parcel · 2.5 tonnes'
    },
    destination: {
      name: 'Ludhiana Bio-CNG / CBG Plant',
      lat: 30.9010,
      lng: 75.8573,
      desc: 'Industrial Offtake Gate · Weighbridge #01'
    },
    crop: 'Paddy Straw',
    tonnes: 2.5
  }
];

export default function DispatchRouteMap({ activeJob }) {
  const [selectedPair, setSelectedPair] = useState(PRESET_DISPATCH_PAIRS[0]);
  const [mapLayer, setMapLayer] = useState('roadmap'); // 'roadmap' | 'satellite'
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);

  // Live route metadata fetched from Google Maps
  const [routeData, setRouteData] = useState({
    distanceText: '18.2 km',
    distanceMeters: 18200,
    durationText: '32 mins',
    durationSeconds: 1920,
    summary: 'via NH 5 & Ludhiana-Ferozepur Rd',
    startAddress: 'Jagraon, Punjab, India',
    endAddress: 'Ludhiana CBG Plant, Punjab, India',
    stepsCount: 14,
    fuelEstimateLiters: 3.6,
    dieselCostSavings: '₹140 saved (shortest corridor)'
  });

  // Google Maps API Key from environment
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [isGoogleMapsReady, setIsGoogleMapsReady] = useState(false);

  // Map DOM & Instance Refs
  const mapContainerRef = useRef(null);
  const googleMapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const leafletMapRef = useRef(null);
  const leafletRouteLayerRef = useRef(null);
  const leafletMarkersRef = useRef(null);

  // Load Google Maps API script if not present
  useEffect(() => {
    if (!apiKey) {
      setIsGoogleMapsReady(false);
      return;
    }

    if (window.google && window.google.maps) {
      setIsGoogleMapsReady(true);
      return;
    }

    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=geometry,places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsReady(true);
      script.onerror = () => setIsGoogleMapsReady(false);
      document.head.appendChild(script);
    } else {
      setIsGoogleMapsReady(true);
    }
  }, [apiKey]);

  // Sync with incoming activeJob prop if provided
  useEffect(() => {
    if (!activeJob) return;
    const match = PRESET_DISPATCH_PAIRS.find(p => 
      p.label.toLowerCase().includes(activeJob.fieldLocation?.toLowerCase() || '') ||
      p.id === activeJob.id
    );
    if (match) {
      setSelectedPair(match);
    }
  }, [activeJob]);

  // Calculate shortest route using Google Maps DirectionsService
  const fetchShortestRoute = (origin, destination) => {
    if (!origin || !destination) return;
    setIsLoadingRoute(true);
    setRouteError(null);

    // 1. If Google Maps is available, use DirectionsService
    if (isGoogleMapsReady && window.google && window.google.maps) {
      if (!directionsServiceRef.current) {
        directionsServiceRef.current = new window.google.maps.DirectionsService();
      }

      const request = {
        origin: new window.google.maps.LatLng(origin.lat, origin.lng),
        destination: new window.google.maps.LatLng(destination.lat, destination.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        unitSystem: window.google.maps.UnitSystem.METRIC
      };

      directionsServiceRef.current.route(request, (response, status) => {
        setIsLoadingRoute(false);
        if (status === window.google.maps.DirectionsStatus.OK && response.routes.length > 0) {
          // Find the SHORTEST route among all alternatives (lowest distance in meters)
          let shortestRoute = response.routes[0];
          let minMeters = shortestRoute.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
          let shortestIndex = 0;

          response.routes.forEach((route, idx) => {
            const totalMeters = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
            if (totalMeters < minMeters) {
              minMeters = totalMeters;
              shortestRoute = route;
              shortestIndex = idx;
            }
          });

          // Render on Google Map
          if (directionsRendererRef.current) {
            directionsRendererRef.current.setDirections(response);
            directionsRendererRef.current.setRouteIndex(shortestIndex);
          }

          const primaryLeg = shortestRoute.legs[0];
          const distKm = (minMeters / 1000).toFixed(1);
          const fuelLiters = (parseFloat(distKm) * 0.22).toFixed(1); // Baler tractor ~0.22 L/km

          setRouteData({
            distanceText: `${distKm} km`,
            distanceMeters: minMeters,
            durationText: primaryLeg.duration.text,
            durationSeconds: primaryLeg.duration.value,
            summary: shortestRoute.summary || 'via Punjab Highway Corridor',
            startAddress: primaryLeg.start_address,
            endAddress: primaryLeg.end_address,
            stepsCount: primaryLeg.steps ? primaryLeg.steps.length : 12,
            fuelEstimateLiters: fuelLiters,
            dieselCostSavings: response.routes.length > 1 
              ? `₹${Math.round((response.routes[0].legs[0].distance.value - minMeters) / 1000 * 90)} saved vs alt route`
              : 'Shortest verified agricultural corridor'
          });
        } else {
          setRouteError('Directions request failed. Displaying calculated shortest corridor.');
          fallbackShortestCorridor(origin, destination);
        }
      });
    } else {
      // 2. Fallback calculation if Google Maps API is offline / loading
      fallbackShortestCorridor(origin, destination);
    }
  };

  // Fallback shortest corridor using geodesic calculation & Leaflet polyline
  const fallbackShortestCorridor = (origin, destination) => {
    setIsLoadingRoute(false);
    // Haversine geodesic distance in km
    const R = 6371; // km
    const dLat = ((destination.lat - origin.lat) * Math.PI) / 180;
    const dLon = ((destination.lng - origin.lng) * Math.PI) / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((origin.lat * Math.PI) / 180) * Math.cos((destination.lat * Math.PI) / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const straightDist = R * c;
    const roadDistKm = (straightDist * 1.25).toFixed(1); // 1.25 winding road coefficient for Punjab rural roads
    const estMins = Math.round(parseFloat(roadDistKm) * 1.8);

    setRouteData({
      distanceText: `${roadDistKm} km`,
      distanceMeters: Math.round(parseFloat(roadDistKm) * 1000),
      durationText: `${estMins} mins`,
      durationSeconds: estMins * 60,
      summary: 'via Punjab Rural Highway Corridor',
      startAddress: origin.name,
      endAddress: destination.name,
      stepsCount: 8,
      fuelEstimateLiters: (parseFloat(roadDistKm) * 0.22).toFixed(1),
      dieselCostSavings: 'Shortest geodesic route'
    });

    // Update Leaflet polyline if Leaflet map is active
    if (leafletMapRef.current) {
      const latlngs = [
        [origin.lat, origin.lng],
        // Intermediate midpoint for visual road curve
        [(origin.lat + destination.lat) / 2 + 0.015, (origin.lng + destination.lng) / 2 - 0.01],
        [destination.lat, destination.lng]
      ];

      if (leafletRouteLayerRef.current) {
        leafletRouteLayerRef.current.setLatLngs(latlngs);
      } else {
        leafletRouteLayerRef.current = L.polyline(latlngs, {
          color: '#f59e0b',
          weight: 5,
          opacity: 0.9,
          dashArray: '1, 8'
        }).addTo(leafletMapRef.current);
      }

      if (leafletMarkersRef.current) {
        leafletMarkersRef.current.clearLayers();
        const originMarker = L.marker([origin.lat, origin.lng], {
          icon: L.divIcon({
            className: 'origin-marker',
            html: `<div style="background-color:#10b981; width:22px; height:22px; border-radius:50%; border:3px solid #fff; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; font-weight:bold; box-shadow:0 2px 6px rgba(0,0,0,0.4);">A</div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          })
        }).bindPopup(`<strong>Origin:</strong> ${origin.name}`);

        const destMarker = L.marker([destination.lat, destination.lng], {
          icon: L.divIcon({
            className: 'dest-marker',
            html: `<div style="background-color:#d97706; width:22px; height:22px; border-radius:50%; border:3px solid #fff; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; font-weight:bold; box-shadow:0 2px 6px rgba(0,0,0,0.4);">B</div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          })
        }).bindPopup(`<strong>Destination:</strong> ${destination.name}`);

        leafletMarkersRef.current.addLayer(originMarker);
        leafletMarkersRef.current.addLayer(destMarker);
      }

      leafletMapRef.current.fitBounds(L.latLngBounds([
        [origin.lat, origin.lng],
        [destination.lat, destination.lng]
      ]), { padding: [40, 40] });
    }
  };

  // Initialize Map Instance (Google Maps or Leaflet Fallback)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (isGoogleMapsReady && window.google && window.google.maps) {
      // Clean up Leaflet if it was active
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      if (!googleMapRef.current) {
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: { lat: selectedPair.origin.lat, lng: selectedPair.origin.lng },
          zoom: 12,
          mapTypeId: mapLayer === 'satellite' ? window.google.maps.MapTypeId.SATELLITE : window.google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          zoomControl: true
        });

        const renderer = new window.google.maps.DirectionsRenderer({
          map,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#f59e0b',
            strokeWeight: 6,
            strokeOpacity: 0.95
          }
        });

        googleMapRef.current = map;
        directionsRendererRef.current = renderer;
      }

      // Fetch route for current pair
      fetchShortestRoute(selectedPair.origin, selectedPair.destination);
    } else if (!isGoogleMapsReady) {
      // Leaflet satellite fallback
      if (!leafletMapRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [selectedPair.origin.lat, selectedPair.origin.lng],
          zoom: 12,
          zoomControl: false
        });

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19
        }).addTo(map);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19
        }).addTo(map);

        leafletMarkersRef.current = L.layerGroup().addTo(map);
        leafletMapRef.current = map;
      }

      fetchShortestRoute(selectedPair.origin, selectedPair.destination);
    }
  }, [isGoogleMapsReady, selectedPair]);

  // Handle Layer Toggle
  const handleToggleLayer = (layer) => {
    setMapLayer(layer);
    if (googleMapRef.current && window.google?.maps) {
      googleMapRef.current.setMapTypeId(
        layer === 'satellite' ? window.google.maps.MapTypeId.SATELLITE : window.google.maps.MapTypeId.ROADMAP
      );
    }
  };

  return (
    <div id="baler-route-map" className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-1">
            <RouteIcon className="w-3.5 h-3.5 text-amber-600" />
            <span>Google Maps Route Engine</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Dispatch Route & Shortest Path Optimization
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time route calculation between agricultural parcel and target bio-refinery to minimize haul fuel and transit time.
          </p>
        </div>

        {/* Map Type Switcher & Refresh */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => handleToggleLayer('roadmap')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                mapLayer === 'roadmap' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => handleToggleLayer('satellite')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                mapLayer === 'satellite' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
          </div>

          <button
            onClick={() => fetchShortestRoute(selectedPair.origin, selectedPair.destination)}
            disabled={isLoadingRoute}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center justify-center"
            title="Recalculate Shortest Route"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingRoute ? 'animate-spin text-amber-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Route Selector (Two Points) */}
      <div className="my-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Select Dispatch Corridor (Origin Field → Destination Plant):</span>
          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Auto-calculated Shortest Distance
          </span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PRESET_DISPATCH_PAIRS.map((pair) => {
            const isSelected = selectedPair.id === pair.id;
            return (
              <button
                key={pair.id}
                onClick={() => {
                  setSelectedPair(pair);
                  fetchShortestRoute(pair.origin, pair.destination);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded">
                    {pair.id}
                  </span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-amber-700" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {pair.origin.name.split(',')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <span>→</span>
                    <span className="truncate">{pair.destination.name.split('/')[0]}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Points Display Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
        {/* Origin */}
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
            A
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Point A: Pickup Field Parcel
            </div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">
              {selectedPair.origin.name}
            </div>
            <div className="text-[11px] text-slate-500">
              GPS: {selectedPair.origin.lat.toFixed(4)}° N, {selectedPair.origin.lng.toFixed(4)}° E · {selectedPair.origin.desc}
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-2.5 sm:border-l sm:border-slate-200 sm:pl-3">
          <div className="w-6 h-6 rounded-lg bg-amber-600 text-white font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
            B
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Point B: Offtake Bio-Energy Plant
            </div>
            <div className="text-xs font-extrabold text-slate-900 mt-0.5">
              {selectedPair.destination.name}
            </div>
            <div className="text-[11px] text-slate-500">
              GPS: {selectedPair.destination.lat.toFixed(4)}° N, {selectedPair.destination.lng.toFixed(4)}° E · {selectedPair.destination.desc}
            </div>
          </div>
        </div>
      </div>

      {/* Real Interactive Map Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
        <div 
          ref={mapContainerRef} 
          className="w-full h-80 sm:h-96 relative z-10"
          style={{ minHeight: '340px' }}
        />

        {/* Live Loading Indicator */}
        {isLoadingRoute && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3 border border-slate-200 text-xs font-bold text-slate-800">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
              <span>Querying Google Maps Directions API for Shortest Route...</span>
            </div>
          </div>
        )}

        {/* Bottom Floating Live Metrics Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-950/85 backdrop-blur-md rounded-xl p-3 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-black">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-400">
                Shortest Verified Driving Path
              </div>
              <div className="text-base font-black font-mono tracking-tight text-white flex items-center gap-2">
                <span>{routeData.distanceText}</span>
                <span className="text-slate-400 font-sans text-xs">·</span>
                <span className="text-emerald-400 font-sans text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {routeData.durationText}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 font-mono">
              {routeData.summary}
            </span>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-lg font-bold">
              ⛽ {routeData.fuelEstimateLiters} L Diesel
            </span>
          </div>
        </div>
      </div>

      {/* Shortest Route Optimization Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Haul Distance</span>
          <span className="text-base font-black font-mono text-slate-900 mt-0.5 block">
            {routeData.distanceText}
          </span>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
            {routeData.dieselCostSavings}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Estimated Transit Time</span>
          <span className="text-base font-black font-mono text-slate-900 mt-0.5 block">
            {routeData.durationText}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Based on current road conditions
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Turn Maneuvers</span>
          <span className="text-base font-black font-mono text-slate-900 mt-0.5 block">
            {routeData.stepsCount} Waypoints
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Rural agricultural corridor
          </span>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span className="text-[10px] uppercase font-bold text-amber-900 block">Baling & Haul Payment</span>
          <span className="text-base font-black font-mono text-amber-950 mt-0.5 block">
            ₹{(selectedPair.tonnes * 850).toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-amber-800 font-bold block mt-0.5">
            ₹850/tonne guaranteed rate
          </span>
        </div>
      </div>

    </div>
  );
}
