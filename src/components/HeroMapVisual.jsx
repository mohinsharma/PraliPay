import React, { useState } from 'react';
import { 
  Factory, 
  Tractor, 
  CheckCircle2, 
  Cpu, 
  FileText, 
  Navigation,
  ArrowRight,
  Flame,
  Wheat,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function HeroMapVisual() {
  const [activeDistrict, setActiveDistrict] = useState('Ludhiana');

  // Sample Punjab Locations across Central, Malwa, and Majha belts (Demo only)
  const punjabLocations = [
    {
      id: 'Ludhiana',
      district: 'Ludhiana',
      label: 'Field #PB-LDH',
      crop: 'Paddy Straw',
      area: '4.2 acres',
      residue: '5.2 tonnes',
      payout: '₹18,940',
      distance: '7.2 km',
      coords: { x: 52, y: 46 }, // Center Punjab
      status: 'Ready for Baler',
      plantTarget: 'Ludhiana CBG Plant'
    },
    {
      id: 'Sangrur',
      district: 'Sangrur',
      label: 'Field #PB-SGR',
      crop: 'Paddy Straw',
      area: '5.1 acres',
      residue: '6.4 tonnes',
      payout: '₹23,100',
      distance: '11.4 km',
      coords: { x: 58, y: 72 }, // Malwa south
      status: 'Verified Contract',
      plantTarget: 'Sangrur Bio-Energy'
    },
    {
      id: 'Patiala',
      district: 'Patiala',
      label: 'Field #PB-PTA',
      crop: 'Paddy Straw',
      area: '3.8 acres',
      residue: '4.7 tonnes',
      payout: '₹16,920',
      distance: '9.8 km',
      coords: { x: 74, y: 64 }, // South East Punjab
      status: 'Ready for Baler',
      plantTarget: 'Patiala Bio-Mass'
    },
    {
      id: 'Moga',
      district: 'Moga',
      label: 'Field #PB-MGA',
      crop: 'Paddy Straw',
      area: '4.5 acres',
      residue: '5.6 tonnes',
      payout: '₹20,160',
      distance: '8.1 km',
      coords: { x: 38, y: 48 }, // West Central
      status: 'Baler En Route',
      plantTarget: 'Ludhiana CBG Plant'
    },
    {
      id: 'Bathinda',
      district: 'Bathinda',
      label: 'Field #PB-BTI',
      crop: 'Paddy Straw',
      area: '6.0 acres',
      residue: '7.5 tonnes',
      payout: '₹27,000',
      distance: '14.2 km',
      coords: { x: 30, y: 78 }, // South West
      status: 'AI Yield Logged',
      plantTarget: 'Bathinda Bio-Power'
    },
    {
      id: 'Amritsar',
      district: 'Amritsar',
      label: 'Field #PB-ASR',
      crop: 'Basmati Straw',
      area: '3.5 acres',
      residue: '4.2 tonnes',
      payout: '₹15,120',
      distance: '10.5 km',
      coords: { x: 28, y: 22 }, // North West Majha
      status: 'Verified Contract',
      plantTarget: 'Majha Bio-Refinery'
    }
  ];

  const current = punjabLocations.find(l => l.id === activeDistrict) || punjabLocations[0];

  return (
    <div className="relative w-full max-w-2xl mx-auto select-none">
      {/* Background ambient lighting */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 via-emerald-400/5 to-amber-500/10 rounded-3xl blur-2xl -z-10" />

      {/* Main Map Container */}
      <div className="relative bg-white/95 rounded-3xl border border-emerald-900/10 shadow-2xl shadow-emerald-950/10 overflow-hidden backdrop-blur-xl">
        
        {/* Top Header / Status Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-agri-darkest via-agri-forest to-agri-primary text-white flex items-center justify-between border-b border-emerald-800/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold tracking-wide text-emerald-100 uppercase text-[10px] sm:text-xs flex items-center gap-1.5">
              <span>📍 Punjab Autonomous Grid</span>
              <span className="text-emerald-400 font-normal">· Ludhiana & Malwa Belt (Demo)</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[11px] bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-700/30">
            <Cpu className="w-3 h-3 text-emerald-400" />
            <span>AI Dispatch: Active</span>
          </div>
        </div>

        {/* Five-Stage Visual Pipeline Ribbon */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-[11px] text-slate-600 font-medium overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 text-emerald-800 font-semibold shrink-0">
            <Wheat className="w-3.5 h-3.5 text-amber-600" />
            <span>1. Punjab Field</span>
          </div>
          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
          <div className="flex items-center gap-1 text-emerald-800 font-semibold shrink-0">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>2. AI Estimation</span>
          </div>
          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
          <div className="flex items-center gap-1 text-emerald-800 font-semibold shrink-0">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>3. Contract</span>
          </div>
          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
          <div className="flex items-center gap-1 text-emerald-800 font-semibold shrink-0">
            <Tractor className="w-3.5 h-3.5 text-emerald-700" />
            <span>4. Baler Pickup</span>
          </div>
          <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
          <div className="flex items-center gap-1 text-emerald-800 font-semibold shrink-0">
            <Factory className="w-3.5 h-3.5 text-slate-800" />
            <span>5. Punjab Bio-Plant</span>
          </div>
        </div>

        {/* Map Canvas with Stylized Punjab Outline & Locations */}
        <div className="relative h-[360px] sm:h-[410px] w-full bg-[#f6faf5] overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-65" />

          {/* Stylized Punjab State Outline & Route Network (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Stylized Punjab Geographic Boundary */}
            <polygon 
              points="24,14 42,10 65,18 84,38 88,58 78,78 62,88 38,92 20,84 14,56 18,34" 
              fill="rgba(16, 185, 129, 0.05)" 
              stroke="#10b981" 
              strokeWidth="0.8" 
              strokeDasharray="2,2" 
            />

            {/* River Satluj & Beas schematic flow curves */}
            <path 
              d="M 16,36 Q 44,38 78,56" 
              fill="none" 
              stroke="rgba(59, 130, 246, 0.22)" 
              strokeWidth="1.2" 
              strokeDasharray="4,2" 
            />
            <path 
              d="M 26,14 Q 38,28 50,42" 
              fill="none" 
              stroke="rgba(59, 130, 246, 0.18)" 
              strokeWidth="1.0" 
              strokeDasharray="4,2" 
            />

            {/* Active connecting routes between Punjab districts */}
            {/* Moga to Ludhiana */}
            <path
              d="M 38,48 L 52,46"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="2,2"
              className="animate-flow-dash"
            />
            {/* Ludhiana to Plant */}
            <path
              d="M 52,46 Q 62,42 70,44"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.6"
              strokeDasharray="2,2"
              className="animate-flow-dash"
            />
            {/* Sangrur to Plant */}
            <path
              d="M 58,72 Q 64,58 70,44"
              fill="none"
              stroke="#d97706"
              strokeWidth="1.2"
              strokeDasharray="2,2"
              className="animate-flow-dash"
            />
            {/* Patiala to Plant */}
            <path
              d="M 74,64 L 70,44"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.2"
              strokeDasharray="2,2"
              className="animate-flow-dash"
            />
            {/* Bathinda to Sangrur */}
            <path
              d="M 30,78 Q 44,76 58,72"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeDasharray="1.5,1.5"
            />
            {/* Amritsar to Jalandhar to Ludhiana */}
            <path
              d="M 28,22 Q 40,32 48,34 L 52,46"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeDasharray="1.5,1.5"
            />
          </svg>

          {/* District Marker: Amritsar */}
          <div 
            onClick={() => setActiveDistrict('Amritsar')}
            className="absolute top-[22%] left-[28%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className={`p-1 rounded-lg border text-[9px] font-bold transition-all shadow-xs ${
              activeDistrict === 'Amritsar'
                ? 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-300'
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}>
              🌾 Amritsar
            </div>
          </div>

          {/* District Marker: Jalandhar */}
          <div className="absolute top-[33%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="bg-white/75 text-slate-500 border border-slate-200 text-[8px] font-semibold px-1.5 py-0.5 rounded shadow-2xs">
              Jalandhar
            </div>
          </div>

          {/* District Marker: Moga */}
          <div 
            onClick={() => setActiveDistrict('Moga')}
            className="absolute top-[48%] left-[38%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className={`p-1.5 rounded-xl border text-[9px] font-bold transition-all shadow-xs flex items-center gap-1 ${
              activeDistrict === 'Moga'
                ? 'bg-amber-600 text-white border-amber-700 ring-2 ring-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}>
              <Tractor className="w-3 h-3 text-amber-300" />
              <span>Moga</span>
            </div>
          </div>

          {/* District Marker: Firozpur */}
          <div className="absolute top-[52%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="bg-white/70 text-slate-500 border border-slate-200 text-[8px] font-semibold px-1.5 py-0.5 rounded">
              Firozpur
            </div>
          </div>

          {/* District Marker: Ludhiana (Featured Hub) */}
          <div 
            onClick={() => setActiveDistrict('Ludhiana')}
            className="absolute top-[46%] left-[52%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className={`relative flex items-center justify-center transition-transform ${activeDistrict === 'Ludhiana' ? 'scale-110' : 'hover:scale-105'}`}>
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-40"></span>
              <div className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg transition-all ${
                activeDistrict === 'Ludhiana'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-200' 
                  : 'bg-white text-emerald-800 border border-emerald-300'
              }`}>
                <Wheat className="w-4 h-4" />
                <span className="text-xs font-black">Ludhiana</span>
              </div>
            </div>
          </div>

          {/* District Marker: Barnala */}
          <div className="absolute top-[62%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="bg-white/70 text-slate-500 border border-slate-200 text-[8px] font-semibold px-1.5 py-0.5 rounded">
              Barnala
            </div>
          </div>

          {/* District Marker: Sangrur */}
          <div 
            onClick={() => setActiveDistrict('Sangrur')}
            className="absolute top-[72%] left-[58%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className={`px-2 py-1 rounded-xl border text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 ${
              activeDistrict === 'Sangrur'
                ? 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}>
              <Wheat className="w-3.5 h-3.5 text-amber-500" />
              <span>Sangrur</span>
            </div>
          </div>

          {/* District Marker: Patiala */}
          <div 
            onClick={() => setActiveDistrict('Patiala')}
            className="absolute top-[64%] left-[74%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className={`px-2 py-1 rounded-xl border text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 ${
              activeDistrict === 'Patiala'
                ? 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}>
              <Wheat className="w-3.5 h-3.5 text-emerald-600" />
              <span>Patiala</span>
            </div>
          </div>

          {/* District Marker: Bathinda */}
          <div 
            onClick={() => setActiveDistrict('Bathinda')}
            className="absolute top-[78%] left-[30%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
          >
            <div className={`px-2 py-1 rounded-xl border text-[10px] font-bold transition-all shadow-xs flex items-center gap-1 ${
              activeDistrict === 'Bathinda'
                ? 'bg-emerald-700 text-white border-emerald-800 ring-2 ring-emerald-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}>
              <Wheat className="w-3.5 h-3.5 text-amber-500" />
              <span>Bathinda</span>
            </div>
          </div>

          {/* Central Punjab Bio-CNG / Biomass Plant Marker (Ludhiana East) */}
          <div className="absolute top-[44%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative group cursor-pointer">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-agri-darkest to-agri-forest text-white flex flex-col items-center justify-center shadow-xl border-2 border-emerald-400/60 ring-4 ring-emerald-500/20">
                <Factory className="w-6 h-6 text-emerald-300 mb-0.5" />
                <span className="text-[8px] font-bold tracking-wider text-emerald-200 uppercase">Punjab Bio #02</span>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
              <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white px-2 py-1 rounded-lg text-[10px] font-medium shadow-md border border-slate-700 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Bio-CNG Refinery</span>
              </div>
            </div>
          </div>

          {/* Active Baler / Collection Vehicle en route */}
          <div className="absolute top-[43%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg border-2 border-white ring-2 ring-amber-400/40 animate-bounce">
              <Tractor className="w-4 h-4" />
            </div>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900/90 text-amber-300 text-[9px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap shadow border border-slate-700">
              Baler #04: Moga → Ludhiana
            </div>
          </div>

          {/* FLOATING TELEMETRY CARDS (Cockpit Style) */}
          
          {/* Card 1: Punjab AI Estimated Residue (Top Left) */}
          <div className="absolute top-3 left-3 z-30 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-emerald-900/10 shadow-lg max-w-[180px] sm:max-w-[210px] hover:shadow-xl transition-all">
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {current.district} Paddy
              </span>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-bold">96% Conf.</span>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              {current.residue}
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5 flex items-center justify-between">
              <span>{current.area} · {current.crop}</span>
              <span className="font-mono text-emerald-700 font-medium">13.8% H₂O</span>
            </div>
          </div>

          {/* Card 2: Farmer Payout (Bottom Left) */}
          <div className="absolute bottom-3 left-3 z-30 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-emerald-900/10 shadow-lg max-w-[180px] sm:max-w-[200px] hover:shadow-xl transition-all">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Farmer Payout
              </span>
              <span className="text-[9px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-bold flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Escrow
              </span>
            </div>
            <div className="text-base sm:text-xl font-extrabold text-emerald-700 leading-tight">
              {current.payout}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Direct DBT Bank Deposit
            </div>
          </div>

          {/* Card 3: Collection Distance (Bottom Right) */}
          <div className="absolute bottom-3 right-3 z-30 bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-emerald-900/10 shadow-lg max-w-[180px] sm:max-w-[200px] hover:shadow-xl transition-all">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Navigation className="w-3 h-3 text-blue-600" /> Haul Distance
              </span>
              <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded font-bold">Optimal</span>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
              {current.distance}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 truncate">
              {current.status}
            </div>
          </div>
        </div>

        {/* Bottom Interactive District Selector Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
          <span className="text-slate-500 text-[11px] font-medium">
            Demo Punjab Districts:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 justify-center">
            {punjabLocations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setActiveDistrict(loc.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeDistrict === loc.id
                    ? 'bg-agri-forest text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {loc.district}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Demo disclaimer note */}
      <div className="mt-2 text-center text-[11px] text-slate-400">
        ℹ️ Prototype demonstration based on Punjab central paddy agricultural clusters.
      </div>
    </div>
  );
}
