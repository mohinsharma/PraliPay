import React, { useState } from 'react';
import { 
  Factory, 
  MapPin, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Layers, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight, 
  IndianRupee, 
  BarChart3, 
  Wheat, 
  Tractor,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Filter,
  Plus,
  X,
  Check
} from 'lucide-react';

export default function PlantDashboardView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'demand' | 'fields' | 'contracts' | 'incoming' | 'network' | 'profile'
  
  // PART 14 OVERVIEW METRICS:
  // Today's Requirement: 500 tonnes
  // Contracted: 218 tonnes
  // Available Nearby: 326 tonnes
  // Incoming: 84 tonnes
  const [dailyRequirement, setDailyRequirement] = useState(500);
  const [contractedTonnes, setContractedTonnes] = useState(218);
  const [availableNearbyTonnes, setAvailableNearbyTonnes] = useState(326);
  const [incomingTonnes, setIncomingTonnes] = useState(84);

  // Contract signing modal & notification toast
  const [isSignContractOpen, setIsSignContractOpen] = useState(false);
  const [contractNotification, setContractNotification] = useState(null);
  const [signContractForm, setSignContractForm] = useState({
    clusterId: 'CLUST-LDH',
    tonnes: 50,
    rate: 5000
  });

  // PART 14 & TWO-LEVEL SUPPLY VIEW
  // Level 1: Clusters (Total tonnes, Available tonnes, Contracted tonnes, Distance)
  // Level 2: Field parcels drill-down (Field ID, Acres, Tonnes, Status, Moisture)
  const [selectedClusterForDrilldown, setSelectedClusterForDrilldown] = useState(null);

  const [availableClusters, setAvailableClusters] = useState([
    {
      id: 'CLUST-LDH',
      district: 'Ludhiana',
      clusterName: 'Ludhiana Central & West Cluster',
      totalTonnes: 126,
      availableTonnes: 82,
      contractedTonnes: 44,
      totalFields: 24,
      distance: '8.2 km',
      moistureAvg: '13.5% (Optimal)',
      pricePerTonne: '₹5,000 / t',
      status: 'High Density Supply',
      parcels: [
        { id: 'PB-LDH-01', farmer: 'Gurpreet Singh', village: 'Sidhwan Bet', acres: 4.2, tonnes: 5.2, status: 'Available', moisture: '13.2%', crop: 'Paddy Straw' },
        { id: 'PB-LDH-02', farmer: 'Harinder Gill', village: 'Jagraon', acres: 6.1, tonnes: 7.8, status: 'Contracted', moisture: '14.1%', crop: 'Paddy Straw' },
        { id: 'PB-LDH-03', farmer: 'Balwinder Singh', village: 'Raikot', acres: 5.5, tonnes: 7.0, status: 'Available', moisture: '13.8%', crop: 'Paddy Straw' },
        { id: 'PB-LDH-04', farmer: 'Jagtar Cheema', village: 'Mullanpur', acres: 8.0, tonnes: 10.2, status: 'In Transit', moisture: '14.5%', crop: 'Paddy Straw' },
        { id: 'PB-LDH-05', farmer: 'Kuldeep Sekhon', village: 'Baddowal', acres: 4.8, tonnes: 6.1, status: 'Available', moisture: '13.1%', crop: 'Paddy Straw' },
        { id: 'PB-LDH-06', farmer: 'Amarjit Dhillon', village: 'Samrala Rd', acres: 7.2, tonnes: 9.2, status: 'Available', moisture: '13.6%', crop: 'Paddy Straw' }
      ]
    },
    {
      id: 'CLUST-MGA',
      district: 'Moga',
      clusterName: 'Moga-Baghapurana Agri Belt',
      totalTonnes: 94,
      availableTonnes: 60,
      contractedTonnes: 34,
      totalFields: 18,
      distance: '12.5 km',
      moistureAvg: '14.0% (Grade A)',
      pricePerTonne: '₹4,950 / t',
      status: 'Active Balers',
      parcels: [
        { id: 'PB-MGA-01', farmer: 'Davinder Brar', village: 'Baghapurana', acres: 5.0, tonnes: 6.3, status: 'Available', moisture: '13.9%', crop: 'Paddy Straw' },
        { id: 'PB-MGA-02', farmer: 'Jaswant Sandhu', village: 'Dharamkot', acres: 6.4, tonnes: 8.1, status: 'Contracted', moisture: '14.2%', crop: 'Paddy Straw' },
        { id: 'PB-MGA-03', farmer: 'Hardip Gill', village: 'Nihal Singh Wala', acres: 4.5, tonnes: 5.7, status: 'Available', moisture: '14.0%', crop: 'Paddy Straw' },
        { id: 'PB-MGA-04', farmer: 'Satnam Sidhu', village: 'Kot Ise Khan', acres: 7.0, tonnes: 8.8, status: 'Available', moisture: '13.8%', crop: 'Paddy Straw' }
      ]
    },
    {
      id: 'CLUST-SGR',
      district: 'Sangrur',
      clusterName: 'Sangrur-Sunam High Density Belt',
      totalTonnes: 71,
      availableTonnes: 45,
      contractedTonnes: 26,
      totalFields: 15,
      distance: '18.0 km',
      moistureAvg: '15.2% (Standard)',
      pricePerTonne: '₹4,900 / t',
      status: 'Ready for Baler',
      parcels: [
        { id: 'PB-SGR-01', farmer: 'Mohinder Mann', village: 'Sunam', acres: 5.5, tonnes: 7.3, status: 'Available', moisture: '15.0%', crop: 'Paddy Straw' },
        { id: 'PB-SGR-02', farmer: 'Gurtej Dhindsa', village: 'Bhawanigarh', acres: 4.8, tonnes: 6.3, status: 'Contracted', moisture: '15.4%', crop: 'Paddy Straw' },
        { id: 'PB-SGR-03', farmer: 'Bikramjit Grewal', village: 'Lehra', acres: 6.2, tonnes: 8.2, status: 'Available', moisture: '14.9%', crop: 'Paddy Straw' }
      ]
    },
    {
      id: 'CLUST-PTA',
      district: 'Patiala',
      clusterName: 'Patiala-Nabha Feedstock Cluster',
      totalTonnes: 110,
      availableTonnes: 75,
      contractedTonnes: 35,
      totalFields: 20,
      distance: '22.0 km',
      moistureAvg: '13.8% (Grade A)',
      pricePerTonne: '₹5,050 / t',
      status: 'High Volume',
      parcels: [
        { id: 'PB-PTA-01', farmer: 'Surjit Tiwana', village: 'Nabha', acres: 6.5, tonnes: 8.1, status: 'Available', moisture: '13.5%', crop: 'Paddy Straw' },
        { id: 'PB-PTA-02', farmer: 'Karamjit Randhawa', village: 'Samana', acres: 5.8, tonnes: 7.3, status: 'Contracted', moisture: '14.0%', crop: 'Paddy Straw' },
        { id: 'PB-PTA-03', farmer: 'Tarlochan Sandhu', village: 'Rajpura', acres: 7.5, tonnes: 9.4, status: 'Available', moisture: '13.9%', crop: 'Paddy Straw' }
      ]
    }
  ]);

  // Incoming Collections Queue
  const incomingDeliveries = [
    {
      id: 'TRK-PB-101',
      driver: 'Manjit Singh',
      balerFleet: 'Singh Agri Services',
      origin: 'Jagraon Sector #3',
      tonnes: 14.2,
      eta: '18 mins',
      gateStatus: 'Approaching Gate 2'
    },
    {
      id: 'TRK-PB-104',
      driver: 'Kuldeep Singh',
      balerFleet: 'Majha Baler Network',
      origin: 'Sidhwan Bet Parcel #12',
      tonnes: 16.5,
      eta: '35 mins',
      gateStatus: 'On Highway 5'
    },
    {
      id: 'TRK-PB-108',
      driver: 'Avtar Singh',
      balerFleet: 'Malwa Residue Logistics',
      origin: 'Barnala Road Cluster',
      tonnes: 18.0,
      eta: '1 hour',
      gateStatus: 'Dispatched from Field'
    }
  ];

  // Active Supply Contracts State (Dynamic)
  const [activeContracts, setActiveContracts] = useState([
    {
      id: 'CNT-2026-LDH01',
      supplier: 'Ludhiana Farmer Cooperative #12',
      committedTonnes: 120,
      deliveredTonnes: 78,
      ratePerTonne: '₹5,000',
      escrowLocked: '₹6,00,000',
      status: '65% Fulfilled',
      dateSigned: '2026-09-15',
      district: 'Ludhiana',
      balerFleet: 'Singh Agri Services'
    },
    {
      id: 'CNT-2026-MGA04',
      supplier: 'Moga Progressive Growers Guild',
      committedTonnes: 98,
      deliveredTonnes: 56,
      ratePerTonne: '₹5,000',
      escrowLocked: '₹4,90,000',
      status: '57% Fulfilled',
      dateSigned: '2026-09-17',
      district: 'Moga',
      balerFleet: 'Majha Baler Network'
    }
  ]);

  // Contract Action Handlers
  const handleContractCluster = (cluster) => {
    if (cluster.availableTonnes <= 0) return;
    const tonnesToContract = cluster.availableTonnes;
    const newContractId = `CNT-2026-${cluster.district.slice(0, 3).toUpperCase()}${String(activeContracts.length + 1).padStart(2, '0')}`;
    const numericRate = 5000;
    const escrowAmount = tonnesToContract * numericRate;

    const newContract = {
      id: newContractId,
      supplier: `${cluster.clusterName} (${cluster.district})`,
      committedTonnes: tonnesToContract,
      deliveredTonnes: 0,
      ratePerTonne: `₹${numericRate.toLocaleString('en-IN')}`,
      escrowLocked: `₹${escrowAmount.toLocaleString('en-IN')}`,
      status: '0% Fulfilled (Active SLA)',
      dateSigned: 'Today',
      district: cluster.district,
      balerFleet: 'Singh Agri Services (Assigned)'
    };

    setActiveContracts(prev => [newContract, ...prev]);
    setContractedTonnes(prev => prev + tonnesToContract);
    setAvailableNearbyTonnes(prev => Math.max(0, prev - tonnesToContract));
    setAvailableClusters(prev => prev.map(c => {
      if (c.id === cluster.id) {
        return {
          ...c,
          contractedTonnes: c.totalTonnes,
          availableTonnes: 0,
          status: 'Fully Contracted',
          parcels: c.parcels.map(p => ({ ...p, status: 'Contracted' }))
        };
      }
      return c;
    }));

    setContractNotification(`Contract ${newContractId} signed! ${tonnesToContract} tonnes committed with ${newContract.supplier}.`);
    setTimeout(() => setContractNotification(null), 5000);
  };

  const handleContractParcel = (parcel, cluster) => {
    const newContractId = `CNT-2026-${parcel.id.replace('PB-', '')}`;
    const numericRate = 5000;
    const escrowAmount = Math.round(parcel.tonnes * numericRate);

    const newContract = {
      id: newContractId,
      supplier: `${parcel.farmer} · ${parcel.village} (${cluster.district})`,
      committedTonnes: parcel.tonnes,
      deliveredTonnes: 0,
      ratePerTonne: `₹${numericRate.toLocaleString('en-IN')}`,
      escrowLocked: `₹${escrowAmount.toLocaleString('en-IN')}`,
      status: '0% Fulfilled (Active SLA)',
      dateSigned: 'Today',
      district: cluster.district,
      balerFleet: 'Direct Farmer Contract'
    };

    setActiveContracts(prev => [newContract, ...prev]);
    setContractedTonnes(prev => Math.round((prev + parcel.tonnes) * 10) / 10);
    setAvailableNearbyTonnes(prev => Math.max(0, Math.round((prev - parcel.tonnes) * 10) / 10));
    setAvailableClusters(prevClusters => prevClusters.map(c => {
      if (c.id === cluster.id) {
        const updatedParcels = c.parcels.map(p => 
          p.id === parcel.id ? { ...p, status: 'Contracted' } : p
        );
        const updatedAvailable = Math.max(0, Math.round((c.availableTonnes - parcel.tonnes) * 10) / 10);
        const updatedContracted = Math.round((c.contractedTonnes + parcel.tonnes) * 10) / 10;
        return {
          ...c,
          availableTonnes: updatedAvailable,
          contractedTonnes: updatedContracted,
          parcels: updatedParcels
        };
      }
      return c;
    }));
    setSelectedClusterForDrilldown(prev => ({
      ...prev,
      availableTonnes: Math.max(0, Math.round((prev.availableTonnes - parcel.tonnes) * 10) / 10),
      contractedTonnes: Math.round((prev.contractedTonnes + parcel.tonnes) * 10) / 10,
      parcels: prev.parcels.map(p => 
        p.id === parcel.id ? { ...p, status: 'Contracted' } : p
      )
    }));

    setContractNotification(`Contract ${newContractId} signed with ${parcel.farmer}! Added to active contracts.`);
    setTimeout(() => setContractNotification(null), 5000);
  };

  const handleSignNewContract = (e) => {
    e.preventDefault();
    const cluster = availableClusters.find(c => c.id === signContractForm.clusterId) || availableClusters[0];
    const tonnesNum = parseFloat(signContractForm.tonnes) || 10;
    const rateNum = parseFloat(signContractForm.rate) || 5000;
    const escrowNum = Math.round(tonnesNum * rateNum);
    const newId = `CNT-2026-${cluster.district.slice(0, 3).toUpperCase()}${String(activeContracts.length + 1).padStart(2, '0')}`;

    const newContract = {
      id: newId,
      supplier: `${cluster.clusterName} (${cluster.district})`,
      committedTonnes: tonnesNum,
      deliveredTonnes: 0,
      ratePerTonne: `₹${rateNum.toLocaleString('en-IN')}`,
      escrowLocked: `₹${escrowNum.toLocaleString('en-IN')}`,
      status: '0% Fulfilled (Active SLA)',
      dateSigned: 'Today',
      district: cluster.district,
      balerFleet: 'Singh Agri Services (Assigned)'
    };

    setActiveContracts(prev => [newContract, ...prev]);
    setContractedTonnes(prev => Math.round((prev + tonnesNum) * 10) / 10);
    setAvailableNearbyTonnes(prev => Math.max(0, Math.round((prev - tonnesNum) * 10) / 10));

    setAvailableClusters(prev => prev.map(c => {
      if (c.id === cluster.id) {
        const remaining = Math.max(0, Math.round((c.availableTonnes - tonnesNum) * 10) / 10);
        return {
          ...c,
          availableTonnes: remaining,
          contractedTonnes: Math.round((c.contractedTonnes + tonnesNum) * 10) / 10,
          status: remaining === 0 ? 'Fully Contracted' : c.status
        };
      }
      return c;
    }));

    setIsSignContractOpen(false);
    setContractNotification(`Contract ${newId} successfully signed! ${tonnesNum} tonnes added to active contracts.`);
    setTimeout(() => setContractNotification(null), 5000);

    document.getElementById('plant-contracts')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Progress percentage
  const fulfilledPercent = Math.round((contractedTonnes / dailyRequirement) * 100);

  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col md:flex-row">
      {/* 1. Plant Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 text-white flex-shrink-0 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                🏭
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-white">
                  ਪਰਾਲੀ<span className="text-emerald-400">Pay</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Biomass / Plant Portal
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-sm font-medium">
            <button
              onClick={() => {
                setActiveTab('overview');
                document.getElementById('plant-overview')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('demand');
                document.getElementById('plant-demand')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'demand'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Feedstock Demand</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                {fulfilledPercent}%
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('fields');
                document.getElementById('plant-available-fields')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'fields'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wheat className="w-4 h-4" />
                <span>Available Fields</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                {availableClusters.length} Clusters
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('contracts');
                document.getElementById('plant-contracts')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'contracts'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck className="w-4 h-4" />
                <span>Contracts</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                {activeContracts.length} Active
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('incoming');
                document.getElementById('plant-incoming')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'incoming'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span>Incoming Collections</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                84 t
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('network');
                document.getElementById('plant-baler-network')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Tractor className="w-4 h-4" />
              <span>Baler Network</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('profile');
                document.getElementById('plant-profile')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-emerald-700 text-white font-bold shadow-md shadow-emerald-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Plant Specifications</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <span>Platform Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('farmer')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            🌾 Switch to Farmer Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('baler')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-amber-300 transition-colors cursor-pointer"
          >
            🚜 Switch to Baler Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('procurement')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-teal-300 transition-colors cursor-pointer"
          >
            🏢 Switch to Coordinator HQ
          </button>
        </div>
      </aside>

      {/* 2. Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-md">
              <Factory className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Ludhiana Bio-CNG / CBG Plant
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                  Bio-Refinery
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ludhiana Industrial Cluster, Punjab</span>
                <span>·</span>
                <span className="text-slate-400 font-mono">Plant ID: PB-CBG-01</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Intake Capacity: 500 t/day</span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Switch Role / Exit
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Notification Toast */}
          {contractNotification && (
            <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                <span>{contractNotification}</span>
              </div>
              <button
                onClick={() => setContractNotification(null)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Section Header & Overview */}
          <section id="plant-overview" className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                Biomass Feedstock Procurement & Supply Chain
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Biomass / Biogas Plant Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Autonomous feedstock supply monitoring, cluster procurement contracts, and live weighbridge collection tracking.
              </p>
            </div>

            {/* PART 14 OVERVIEW METRICS:
                Today's Requirement: 500 tonnes
                Contracted: 218 tonnes
                Available Nearby: 326 tonnes
                Incoming: 84 tonnes */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Metric 1: Today's Requirement */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Requirement</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {dailyRequirement} <span className="text-sm font-bold text-slate-500 font-sans">tonnes</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Boiler & Digester Target
                </div>
              </div>

              {/* Metric 2: Contracted */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contracted</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-900 font-mono">
                  {contractedTonnes} <span className="text-sm font-bold text-slate-500 font-sans">tonnes</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  {fulfilledPercent}% of Daily Target
                </div>
              </div>

              {/* Metric 3: Available Nearby */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Nearby</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                    <Wheat className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {availableNearbyTonnes} <span className="text-sm font-bold text-slate-500 font-sans">tonnes</span>
                </div>
                <div className="text-[11px] text-blue-700 font-semibold mt-1">
                  Within 20 km Haul Radius
                </div>
              </div>

              {/* Metric 4: Incoming */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Incoming</span>
                  <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-teal-900 font-mono">
                  {incomingTonnes} <span className="text-sm font-bold text-slate-500 font-sans">tonnes</span>
                </div>
                <div className="text-[11px] text-teal-700 font-semibold mt-1">
                  En Route to Weighbridge
                </div>
              </div>

            </div>
          </section>

          {/* FEEDSTOCK DEMAND PROGRESS BAR */}
          <div id="plant-demand" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Daily Boiler & Bio-CNG Feedstock Fulfillment
                </h3>
                <p className="text-xs text-slate-500">
                  218 tonnes committed out of 500 tonnes target (43.6% fulfilled). 282 tonnes remaining to contract.
                </p>
              </div>

              <span className="text-xs font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded-xl border border-amber-200 w-fit">
                Moisture Threshold: &lt; 15% H₂O Required
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${fulfilledPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono font-semibold">
              <span>0 tonnes</span>
              <span>218 t (Contracted)</span>
              <span>500 tonnes (Daily Capacity)</span>
            </div>
          </div>

          {/* AVAILABLE FIELDS / CLUSTERS (TWO-LEVEL SUPPLY VIEW) */}
          <section id="plant-available-fields" aria-labelledby="available-fields-title" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Layers className="w-3 h-3 text-emerald-600" />
                  Two-Level Feedstock Supply View
                </div>
                <h2 id="available-fields-title" className="text-xl font-extrabold text-slate-900">
                  Regional Supply Clusters & Field Parcels ({availableClusters.length} Clusters)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Level 1: Aggregate cluster biomass totals · Level 2: Individual verified field parcels with satellite NDVI validation.
                </p>
              </div>
              <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pre-cleared Punjab CBG feedstock</span>
              </div>
            </div>

            {/* Level 1: Cluster Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {availableClusters.map((cluster) => (
                <div
                  key={cluster.id}
                  className="bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold bg-slate-900 text-emerald-300 px-2.5 py-1 rounded-lg">
                        {cluster.id}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {cluster.status}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 mb-1">
                      {cluster.clusterName}
                    </h3>
                    <div className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{cluster.distance} haul</span>
                      <span>·</span>
                      <span>{cluster.totalFields} fields</span>
                    </div>

                    {/* Level 1 Summary Metrics */}
                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between p-2 rounded-xl bg-slate-50">
                        <span className="text-slate-500">Total Biomass:</span>
                        <strong className="text-slate-900 font-mono">{cluster.totalTonnes} tonnes</strong>
                      </div>
                      <div className="flex justify-between p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="text-emerald-900 font-semibold">Available for Contract:</span>
                        <strong className="text-emerald-800 font-mono">{cluster.availableTonnes} tonnes</strong>
                      </div>
                      <div className="flex justify-between p-2 rounded-xl bg-slate-50">
                        <span className="text-slate-500">Contracted / In Transit:</span>
                        <strong className="text-slate-700 font-mono">{cluster.contractedTonnes} tonnes</strong>
                      </div>
                      <div className="flex justify-between p-2 rounded-xl bg-slate-50">
                        <span className="text-slate-500">Moisture Profile:</span>
                        <strong className="text-emerald-700 font-mono">{cluster.moistureAvg}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedClusterForDrilldown(cluster)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-slate-600" />
                      <span>View Field Parcels ({cluster.parcels?.length || 0})</span>
                    </button>

                    <button
                      onClick={() => handleContractCluster(cluster)}
                      disabled={cluster.availableTonnes <= 0}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        cluster.availableTonnes > 0
                          ? 'bg-agri-forest hover:bg-agri-darkest text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <FileCheck className="w-4 h-4 text-emerald-300" />
                      <span>
                        {cluster.availableTonnes > 0 
                          ? `Sign Contract (${cluster.availableTonnes} t)` 
                          : 'Fully Contracted'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LEVEL 2: INDIVIDUAL FIELD DRILL-DOWN MODAL */}
          {selectedClusterForDrilldown && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      Level 2: Field Parcel Drill-Down
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {selectedClusterForDrilldown.clusterName} ({selectedClusterForDrilldown.district})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Individual farm fields aggregated under this cluster. Pre-verified biomass estimates with satellite NDVI.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedClusterForDrilldown(null)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>

                {/* Cluster Quick Stats Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-500 block">Total Biomass</span>
                    <strong className="text-base font-extrabold text-slate-900 font-mono">
                      {selectedClusterForDrilldown.totalTonnes} t
                    </strong>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <span className="text-emerald-800 block font-semibold">Available Supply</span>
                    <strong className="text-base font-extrabold text-emerald-900 font-mono">
                      {selectedClusterForDrilldown.availableTonnes} t
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-500 block">Haul Distance</span>
                    <strong className="text-base font-extrabold text-slate-900 font-mono">
                      {selectedClusterForDrilldown.distance}
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <span className="text-slate-500 block">Procurement Rate</span>
                    <strong className="text-base font-extrabold text-emerald-800 font-mono">
                      {selectedClusterForDrilldown.pricePerTonne}
                    </strong>
                  </div>
                </div>

                {/* Individual Field Parcels Table */}
                <div className="flex-1 overflow-y-auto min-h-0 border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="p-3">Field ID</th>
                        <th className="p-3">Farmer / Village</th>
                        <th className="p-3 text-right">Area</th>
                        <th className="p-3 text-right">Residue</th>
                        <th className="p-3">Moisture</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedClusterForDrilldown.parcels?.map((parcel) => (
                        <tr key={parcel.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-900">
                            {parcel.id}
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{parcel.farmer}</div>
                            <div className="text-[11px] text-slate-500">{parcel.village}</div>
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-slate-800">
                            {parcel.acres} acres
                          </td>
                          <td className="p-3 text-right font-mono font-extrabold text-emerald-900">
                            {parcel.tonnes} t
                          </td>
                          <td className="p-3 font-mono text-slate-600">
                            {parcel.moisture}
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              parcel.status === 'Available'
                                ? 'bg-emerald-100 text-emerald-800'
                                : parcel.status === 'Contracted'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {parcel.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {parcel.status === 'Available' ? (
                              <button
                                onClick={() => handleContractParcel(parcel, selectedClusterForDrilldown)}
                                className="px-2.5 py-1 bg-agri-forest hover:bg-agri-darkest text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                              >
                                Sign Contract
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-medium">Locked</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Quality-tested feedstock. Payout escrow guarantees baler dispatch.</span>
                  </div>
                  <button
                    onClick={() => setSelectedClusterForDrilldown(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE CONTRACTS DEDICATED SECTION */}
          <section id="plant-contracts" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <FileCheck className="w-3 h-3 text-emerald-600" />
                  Supply Agreements & Escrow
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Active Supply Contracts ({activeContracts.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Legally binding, escrow-locked feedstock agreements with Punjab farmer cooperatives & residue clusters.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSignContractOpen(true)}
                  className="inline-flex items-center gap-2 bg-agri-forest hover:bg-agri-darkest text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer group"
                >
                  <Plus className="w-4 h-4 text-emerald-300 group-hover:scale-120 transition-transform" />
                  <span>+ Sign New Contract</span>
                </button>
              </div>
            </div>

            {/* Active Contracts Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Contract ID</th>
                    <th className="p-3.5">Supplier / Cooperative</th>
                    <th className="p-3.5 text-right">Committed</th>
                    <th className="p-3.5 text-right">Delivered</th>
                    <th className="p-3.5 text-right">Rate / t</th>
                    <th className="p-3.5 text-right">Escrow Locked</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-center">Signed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeContracts.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {c.id}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{c.supplier}</div>
                        <div className="text-[11px] text-slate-500">Fleet: {c.balerFleet}</div>
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-800">
                        {c.committedTonnes} tonnes
                      </td>
                      <td className="p-3.5 text-right font-mono font-semibold text-slate-600">
                        {c.deliveredTonnes} tonnes
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-800">
                        {c.ratePerTonne}
                      </td>
                      <td className="p-3.5 text-right font-mono font-extrabold text-emerald-950">
                        {c.escrowLocked}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-center text-slate-500 font-medium">
                        {c.dateSigned || 'Active'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All contracts backed by automated Punjab Agricultural Escrow with instant weighbridge release.</span>
              </div>
              <span className="font-mono font-bold text-emerald-900 shrink-0">
                Total Escrow Locked: ₹{activeContracts.reduce((sum, c) => {
                  const num = parseInt(c.escrowLocked.replace(/[^\d]/g, ''), 10) || 0;
                  return sum + num;
                }, 0).toLocaleString('en-IN')}
              </span>
            </div>
          </section>

          {/* INCOMING COLLECTIONS SECTION */}
          <section id="plant-incoming" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Truck className="w-3 h-3 text-teal-600" />
                  Weighbridge Telemetry
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Incoming Collections (Live Queue)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trucks and baler haulers approaching plant gate with estimated weighbridge arrival times.
                </p>
              </div>
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-xl font-bold text-xs w-fit">
                {incomingTonnes} tonnes en route
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {incomingDeliveries.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-900 text-sm">{item.id}</strong>
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">{item.eta}</span>
                  </div>
                  <div className="font-black text-slate-900 font-mono text-base">{item.tonnes} tonnes</div>
                  <div className="text-slate-600">{item.origin}</div>
                  <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200">
                    <span>{item.balerFleet}</span>
                    <span className="text-teal-700 font-semibold">{item.gateStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BALER FLEET NETWORK SECTION */}
          <section id="plant-baler-network" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Tractor className="w-3 h-3 text-emerald-600" />
                  Logistics & Collection Fleet
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Regional Baler Fleet Network
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Contracted baler operators supplying paddy straw feedstock directly to plant weighbridge.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-800 flex items-center gap-1.5 w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>3 Verified Fleet Partners</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-sm">Singh Agri Services</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">3 Balers Active</span>
                </div>
                <div className="text-slate-600">Base: Ludhiana West Hub</div>
                <div className="text-slate-600">Lead Driver: Manjit Singh</div>
                <div className="text-slate-500 text-[11px] font-mono">Today's Intake: 32.8 tonnes</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-sm">Majha Baler Network</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">2 Balers Active</span>
                </div>
                <div className="text-slate-600">Base: Moga Corridor Hub</div>
                <div className="text-slate-600">Lead Driver: Kuldeep Singh</div>
                <div className="text-slate-500 text-[11px] font-mono">Today's Intake: 26.5 tonnes</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-sm">Malwa Residue Logistics</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">4 Balers Active</span>
                </div>
                <div className="text-slate-600">Base: Sangrur-Barnala Belt</div>
                <div className="text-slate-600">Lead Driver: Avtar Singh</div>
                <div className="text-slate-500 text-[11px] font-mono">Today's Intake: 24.7 tonnes</div>
              </div>
            </div>
          </section>

          {/* PLANT SPECIFICATIONS SECTION */}
          <section id="plant-profile" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Factory className="w-3 h-3 text-emerald-600" />
                  Facility Technical Profile
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Plant Specifications & Quality Standards
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Technical requirements for incoming paddy residue, boiler specs, and weighbridge automation.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5 w-fit">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Punjab Pollution Control Board (PPCB) Certified</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Daily Intake Capacity</span>
                <strong className="text-base font-extrabold text-slate-900 font-mono block">500 tonnes / day</strong>
                <span className="text-slate-500 text-[11px]">Continuous anaerobic digestion</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Moisture Tolerance</span>
                <strong className="text-base font-extrabold text-emerald-800 font-mono block">&lt; 15% H₂O</strong>
                <span className="text-slate-500 text-[11px]">Optimal for CBG yield</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Weighbridge Gate</span>
                <strong className="text-base font-extrabold text-slate-900 font-mono block">Automated RFID</strong>
                <span className="text-slate-500 text-[11px]">Instant weigh & QR receipt</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Escrow Settlement</span>
                <strong className="text-base font-extrabold text-emerald-900 font-mono block">Same-Day Release</strong>
                <span className="text-slate-500 text-[11px]">Via Punjab Agri Escrow Protocol</span>
              </div>
            </div>
          </section>

          {/* SIGN NEW CONTRACT MODAL */}
          {isSignContractOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
                <button
                  onClick={() => setIsSignContractOpen(false)}
                  className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <FileCheck className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Sign New Supply Contract
                    </h3>
                    <span className="text-xs text-slate-500">
                      Ludhiana Bio-CNG / CBG Plant (PB-CBG-01)
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-5">
                  Contract verified Punjab agricultural residue clusters with automated escrow backing and weighbridge settlement.
                </p>

                <form onSubmit={handleSignNewContract} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Select Target Supply Cluster
                    </label>
                    <select
                      value={signContractForm.clusterId}
                      onChange={(e) => setSignContractForm({ ...signContractForm, clusterId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600"
                    >
                      {availableClusters.map((cluster) => (
                        <option key={cluster.id} value={cluster.id} disabled={cluster.availableTonnes <= 0}>
                          {cluster.clusterName} ({cluster.district}) — {cluster.availableTonnes} t available
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Committed Tonnes
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={signContractForm.tonnes}
                        onChange={(e) => setSignContractForm({ ...signContractForm, tonnes: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Agreed Rate / Tonne
                      </label>
                      <input
                        type="text"
                        disabled
                        value="₹5,000 / t"
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Contract Value:</span>
                      <strong className="font-mono text-emerald-950">
                        ₹{((parseFloat(signContractForm.tonnes) || 0) * 5000).toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Escrow Locked on Signing:</span>
                      <strong className="font-mono text-emerald-900">
                        ₹{((parseFloat(signContractForm.tonnes) || 0) * 5000).toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-emerald-200 text-[11px] text-slate-500">
                      <span>Quality Requirement:</span>
                      <span>&lt; 15% Moisture Paddy Straw</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Protected by Punjab Agricultural Escrow protocol. Automated release at gate weighbridge.</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-agri-forest hover:bg-agri-darkest text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Sign Contract & Lock Escrow</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSignContractOpen(false)}
                      className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
