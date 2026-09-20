import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  IndianRupee, 
  Truck, 
  Tractor, 
  Layers, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Sparkles, 
  ChevronRight, 
  Percent, 
  BarChart3, 
  Wheat, 
  Factory,
  Search,
  Check
} from 'lucide-react';
import Logo from '../Logo';

export default function ProcurementDashboardView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'clusters' | 'economics' | 'dispatch' | 'plants'
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [selectedViabilityFilter, setSelectedViabilityFilter] = useState('All');

  // Middleman Cluster Supply Intelligence
  const [clusters, setClusters] = useState([
    {
      id: 'CLUST-LDH',
      district: 'Ludhiana',
      totalFields: 24,
      totalResidue: 126,
      availableResidue: 82,
      plantDemand: 100,
      shortfall: 18,
      status: 'High Shortfall',
      avgHaulKm: 8.2,
      topPlant: 'Ludhiana Bio-CNG'
    },
    {
      id: 'CLUST-MGA',
      district: 'Moga',
      totalFields: 18,
      totalResidue: 94,
      availableResidue: 60,
      plantDemand: 75,
      shortfall: 15,
      status: 'Moderate Shortfall',
      avgHaulKm: 12.5,
      topPlant: 'Ludhiana Bio-CNG / Moga Depot'
    },
    {
      id: 'CLUST-SGR',
      district: 'Sangrur',
      totalFields: 15,
      totalResidue: 71,
      availableResidue: 45,
      plantDemand: 60,
      shortfall: 15,
      status: 'Moderate Shortfall',
      avgHaulKm: 18.0,
      topPlant: 'Sangrur Bio-Energy'
    },
    {
      id: 'CLUST-PTA',
      district: 'Patiala',
      totalFields: 20,
      totalResidue: 110,
      availableResidue: 75,
      plantDemand: 90,
      shortfall: 15,
      status: 'Active Supply',
      avgHaulKm: 22.0,
      topPlant: 'Patiala Bio-Power'
    },
    {
      id: 'CLUST-BTI',
      district: 'Bathinda',
      totalFields: 22,
      totalResidue: 115,
      availableResidue: 70,
      plantDemand: 85,
      shortfall: 15,
      status: 'Active Supply',
      avgHaulKm: 24.5,
      topPlant: 'Bathinda Bio-Refinery'
    }
  ]);

  // Field-level Economics & Viability Matrix
  const [fields, setFields] = useState([
    {
      id: 'PB-LDH-01',
      farmer: 'Gurpreet Singh',
      district: 'Ludhiana',
      village: 'Sidhwan Bet',
      areaAcres: 4.2,
      areaHa: 1.7,
      residueTonnes: 5.2,
      haulKm: 8.2,
      balingCostPerTonne: 850,
      haulCostPerTonne: 570,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 5000,
      netMarginPerTonne: 1380, // 5000 - (850 + 570 + 2200)
      totalMargin: 7176, // 1380 * 5.2
      viability: 'High Margin',
      status: 'Available',
      assignedBaler: null,
      targetPlant: 'Ludhiana Bio-CNG'
    },
    {
      id: 'PB-LDH-02',
      farmer: 'Harinder Gill',
      district: 'Ludhiana',
      village: 'Jagraon',
      areaAcres: 6.1,
      areaHa: 2.47,
      residueTonnes: 7.8,
      haulKm: 9.4,
      balingCostPerTonne: 850,
      haulCostPerTonne: 650,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 5000,
      netMarginPerTonne: 1300,
      totalMargin: 10140,
      viability: 'High Margin',
      status: 'Contracted',
      assignedBaler: 'Singh Agri Services #02',
      targetPlant: 'Ludhiana Bio-CNG'
    },
    {
      id: 'PB-LDH-03',
      farmer: 'Balwinder Singh',
      district: 'Ludhiana',
      village: 'Raikot',
      areaAcres: 5.5,
      areaHa: 2.23,
      residueTonnes: 7.0,
      haulKm: 14.5,
      balingCostPerTonne: 850,
      haulCostPerTonne: 950,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 4950,
      netMarginPerTonne: 950,
      totalMargin: 6650,
      viability: 'Viable',
      status: 'Available',
      assignedBaler: null,
      targetPlant: 'Ludhiana Bio-CNG'
    },
    {
      id: 'PB-MGA-01',
      farmer: 'Davinder Brar',
      district: 'Moga',
      village: 'Baghapurana',
      areaAcres: 5.0,
      areaHa: 2.02,
      residueTonnes: 6.3,
      haulKm: 12.5,
      balingCostPerTonne: 850,
      haulCostPerTonne: 860,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 4950,
      netMarginPerTonne: 1040,
      totalMargin: 6552,
      viability: 'Viable',
      status: 'Available',
      assignedBaler: null,
      targetPlant: 'Ludhiana Bio-CNG'
    },
    {
      id: 'PB-MGA-02',
      farmer: 'Jaswant Sandhu',
      district: 'Moga',
      village: 'Dharamkot',
      areaAcres: 6.4,
      areaHa: 2.59,
      residueTonnes: 8.1,
      haulKm: 16.2,
      balingCostPerTonne: 850,
      haulCostPerTonne: 1120,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 4900,
      netMarginPerTonne: 730,
      totalMargin: 5913,
      viability: 'Tight',
      status: 'Contracted',
      assignedBaler: 'Majha Baler Network',
      targetPlant: 'Ludhiana Bio-CNG'
    },
    {
      id: 'PB-SGR-01',
      farmer: 'Mohinder Mann',
      district: 'Sangrur',
      village: 'Sunam',
      areaAcres: 5.5,
      areaHa: 2.23,
      residueTonnes: 7.3,
      haulKm: 11.0,
      balingCostPerTonne: 850,
      haulCostPerTonne: 760,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 4900,
      netMarginPerTonne: 1090,
      totalMargin: 7957,
      viability: 'Viable',
      status: 'Available',
      assignedBaler: null,
      targetPlant: 'Sangrur Bio-Energy'
    },
    {
      id: 'PB-PTA-01',
      farmer: 'Surjit Tiwana',
      district: 'Patiala',
      village: 'Nabha',
      areaAcres: 6.5,
      areaHa: 2.63,
      residueTonnes: 8.1,
      haulKm: 9.8,
      balingCostPerTonne: 850,
      haulCostPerTonne: 680,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 5050,
      netMarginPerTonne: 1320,
      totalMargin: 10692,
      viability: 'High Margin',
      status: 'Available',
      assignedBaler: null,
      targetPlant: 'Patiala Bio-Power'
    },
    {
      id: 'PB-BTI-01',
      farmer: 'Manmohan Sidhu',
      district: 'Bathinda',
      village: 'Talwandi Sabo',
      areaAcres: 7.0,
      areaHa: 2.83,
      residueTonnes: 8.8,
      haulKm: 15.0,
      balingCostPerTonne: 850,
      haulCostPerTonne: 1040,
      farmerPayoutPerTonne: 2200,
      plantPricePerTonne: 4900,
      netMarginPerTonne: 810,
      totalMargin: 7128,
      viability: 'Viable',
      status: 'Available',
      assignedBaler: null,
      targetPlant: 'Bathinda Bio-Refinery'
    }
  ]);

  // Filtered Fields
  const filteredFields = fields.filter(f => {
    if (selectedDistrictFilter !== 'All' && f.district !== selectedDistrictFilter) return false;
    if (selectedViabilityFilter !== 'All' && f.viability !== selectedViabilityFilter) return false;
    return true;
  });

  // Calculate Aggregates
  const totalFieldsCount = clusters.reduce((acc, c) => acc + c.totalFields, 0);
  const totalResidueTonnes = clusters.reduce((acc, c) => acc + c.totalResidue, 0);
  const totalAvailableTonnes = clusters.reduce((acc, c) => acc + c.availableResidue, 0);
  const totalDemandTonnes = clusters.reduce((acc, c) => acc + c.plantDemand, 0);
  const totalShortfallTonnes = clusters.reduce((acc, c) => acc + c.shortfall, 0);
  const totalExpectedNetMargin = fields.reduce((acc, f) => acc + f.totalMargin, 0);

  // Dispatch Action Handlers
  const handleDispatchBaler = (fieldId) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          status: 'Contracted',
          assignedBaler: 'Singh Agri Services #01'
        };
      }
      return f;
    }));
  };

  const handleAllocatePlant = (fieldId, plantName) => {
    setFields(prev => prev.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          targetPlant: plantName
        };
      }
      return f;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* 1. Middleman Sidebar */}
      <aside className="w-full md:w-68 lg:w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Coordinator Brand */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold shadow-inner">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
                  <span>ਪਰਾਲੀPay</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono uppercase">HQ</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Procurement Coordinator
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-medium">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
              Procurement & Economics
            </div>

            <button
              onClick={() => {
                setActiveTab('overview');
                document.getElementById('procurement-overview')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Executive Overview</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                5 Districts
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('clusters');
                document.getElementById('procurement-clusters')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'clusters'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>Cluster Intelligence</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                {totalShortfallTonnes}t Gap
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('economics');
                document.getElementById('procurement-economics')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'economics'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <IndianRupee className="w-4 h-4" />
                <span>Field Economics & Margins</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                ₹{Math.round(totalExpectedNetMargin / 1000)}k
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('dispatch');
                document.getElementById('procurement-dispatch')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'dispatch'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tractor className="w-4 h-4" />
                <span>Baler Fleet Dispatch</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                Active
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('plants');
                document.getElementById('procurement-plants')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'plants'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Factory className="w-4 h-4" />
                <span>Plant Offtake & Escrow</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                {clusters.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Switcher Footer */}
        <div className="p-4 border-t border-slate-800 space-y-1.5 text-xs">
          <div className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1">
            Role Switcher
          </div>
          <button
            onClick={() => onNavigate && onNavigate('farmer')}
            className="w-full text-left px-3 py-2 rounded-xl text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            🌾 Farmer Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('baler')}
            className="w-full text-left px-3 py-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            🚜 Baler Operator Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('plant')}
            className="w-full text-left px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            🏭 Bio-Energy Plant Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer pt-2 border-t border-slate-800"
          >
            <span>Platform Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* 2. Middleman Main Dashboard Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="text-lg font-black text-white tracking-tight">
                ਪਰਾਲੀPay Procurement Coordinator & Clearinghouse
              </h1>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                Internal Middleman System
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Coordinating Farmers ➔ Balers ➔ Biomass Plants with district-level residue matching & margin intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Clearinghouse Escrow Active</span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Exit HQ
            </button>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Top Aggregated Metric Cards */}
          <div id="procurement-overview" className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Metric 1: Monitored Fields */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                <span>TOTAL FIELDS</span>
                <Wheat className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {totalFieldsCount}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Across 5 Punjab Districts
              </span>
            </div>

            {/* Metric 2: Total Estimated Residue */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                <span>TOTAL RESIDUE</span>
                <Layers className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl font-black text-teal-300 font-mono">
                {totalResidueTonnes} t
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                District factors applied
              </span>
            </div>

            {/* Metric 3: Available Supply */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                <span>AVAILABLE SUPPLY</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {totalAvailableTonnes} t
              </div>
              <span className="text-[11px] text-emerald-400/80 mt-1 block">
                Ready for Baler pickup
              </span>
            </div>

            {/* Metric 4: Plant Demand */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                <span>PLANT DEMAND</span>
                <Factory className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-300 font-mono">
                {totalDemandTonnes} t
              </div>
              <span className="text-[11px] text-amber-400/80 mt-1 block">
                Committed off-take
              </span>
            </div>

            {/* Metric 5: Supply Shortfall */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
                <span>SUPPLY SHORTFALL</span>
                <AlertCircle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-400 font-mono">
                -{totalShortfallTonnes} t
              </div>
              <span className="text-[11px] text-rose-300/80 mt-1 block font-medium">
                High procurement demand
              </span>
            </div>

          </div>

          {/* SECTION 1: CLUSTER SUPPLY INTELLIGENCE */}
          <section id="procurement-clusters" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3 h-3" />
                  Cluster Supply Intelligence
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  Punjab Regional Procurement Clusters
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Aggregated supply vs. demand balance across primary Punjab agro-industrial hubs.
                </p>
              </div>
              <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                5 Primary Punjab Corridors
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {clusters.map((cluster) => (
                <div
                  key={cluster.id}
                  className="bg-slate-900 rounded-2xl p-4 border border-slate-800 hover:border-emerald-500/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">
                        {cluster.district}
                      </span>
                      <span className="text-[10px] font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
                        -{cluster.shortfall}t Gap
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-400 mb-3">
                      {cluster.totalFields} fields · ~{cluster.avgHaulKm}km haul
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between p-1.5 rounded-lg bg-slate-800/60">
                        <span className="text-slate-400">Total Residue:</span>
                        <strong className="text-white font-mono">{cluster.totalResidue} t</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                        <span className="text-emerald-300">Available:</span>
                        <strong className="text-emerald-400 font-mono">{cluster.availableResidue} t</strong>
                      </div>
                      <div className="flex justify-between p-1.5 rounded-lg bg-slate-800/60">
                        <span className="text-slate-400">Plant Demand:</span>
                        <strong className="text-amber-300 font-mono">{cluster.plantDemand} t</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Target: {cluster.topPlant}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: FIELD-LEVEL ECONOMICS & VIABILITY MATRIX */}
          <section id="procurement-economics" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <IndianRupee className="w-3 h-3" />
                  Middleman Margin & Viability Engine
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  Field-Level Economics & Clearinghouse Viability
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Internal calculations: Baling cost (₹850/t), haul distance cost, farmer floor payout (₹2,200/t) vs. plant contract price.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedDistrictFilter}
                  onChange={(e) => setSelectedDistrictFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="All">All Districts</option>
                  <option value="Ludhiana">Ludhiana</option>
                  <option value="Moga">Moga</option>
                  <option value="Sangrur">Sangrur</option>
                  <option value="Patiala">Patiala</option>
                  <option value="Bathinda">Bathinda</option>
                </select>

                <select
                  value={selectedViabilityFilter}
                  onChange={(e) => setSelectedViabilityFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="All">All Viabilities</option>
                  <option value="High Margin">High Margin</option>
                  <option value="Viable">Viable</option>
                  <option value="Tight">Tight</option>
                </select>
              </div>
            </div>

            {/* Economics Table */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Field / Farmer</th>
                      <th className="p-3.5">District / Village</th>
                      <th className="p-3.5 text-right">Area / Residue</th>
                      <th className="p-3.5 text-right">Haul Dist.</th>
                      <th className="p-3.5 text-right">Baling + Haul</th>
                      <th className="p-3.5 text-right">Farmer Floor</th>
                      <th className="p-3.5 text-right">Plant Price</th>
                      <th className="p-3.5 text-right">Net Margin / t</th>
                      <th className="p-3.5 text-right">Total Margin</th>
                      <th className="p-3.5 text-center">Viability</th>
                      <th className="p-3.5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredFields.map((field) => (
                      <tr key={field.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5">
                          <div className="font-mono font-bold text-white">{field.id}</div>
                          <div className="text-[11px] text-slate-400">{field.farmer}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="text-slate-200 font-medium">{field.district}</div>
                          <div className="text-[11px] text-slate-400">{field.village}</div>
                        </td>
                        <td className="p-3.5 text-right font-mono">
                          <div className="font-bold text-white">{field.residueTonnes} t</div>
                          <div className="text-[11px] text-slate-400">{field.areaAcres} acres</div>
                        </td>
                        <td className="p-3.5 text-right font-mono text-slate-300">
                          {field.haulKm} km
                        </td>
                        <td className="p-3.5 text-right font-mono">
                          <div className="text-slate-300">₹{field.balingCostPerTonne + field.haulCostPerTonne}</div>
                          <div className="text-[10px] text-slate-500">(₹{field.balingCostPerTonne} + ₹{field.haulCostPerTonne})</div>
                        </td>
                        <td className="p-3.5 text-right font-mono text-emerald-400 font-bold">
                          ₹{field.farmerPayoutPerTonne}
                        </td>
                        <td className="p-3.5 text-right font-mono text-amber-300 font-bold">
                          ₹{field.plantPricePerTonne}
                        </td>
                        <td className="p-3.5 text-right font-mono font-black text-emerald-300">
                          +₹{field.netMarginPerTonne}
                        </td>
                        <td className="p-3.5 text-right font-mono font-black text-emerald-400">
                          ₹{field.totalMargin.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            field.viability === 'High Margin'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : field.viability === 'Viable'
                              ? 'bg-blue-950 text-blue-300 border border-blue-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {field.viability}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          {field.status === 'Available' ? (
                            <button
                              onClick={() => handleDispatchBaler(field.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] shadow-sm transition-colors cursor-pointer"
                            >
                              Dispatch Baler
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              Dispatched
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>
                    Total Projected ParaliPay Middleman Clearinghouse Gross Margin: <strong>₹{totalExpectedNetMargin.toLocaleString()}</strong>
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Farmer protected with guaranteed floor · Baler paid per-tonne · Plant contracted under SLA
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: BALER FLEET & PLANT CLEARINGHOUSE TELEMETRY */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Baler Fleet Telemetry */}
            <div id="procurement-dispatch" className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-white">Baler Fleet Capacity & Telemetry</h3>
                  <span className="text-xs text-slate-400">Active baler operators across Punjab</span>
                </div>
                <Tractor className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Singh Agri Services (3 Balers)</div>
                    <div className="text-slate-400">Assigned: Sidhwan Bet & Jagraon (Ludhiana)</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400">84% Capacity</span>
                    <span className="text-[10px] text-slate-400 block">Rate: ₹850/t</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Majha Baler Network (2 Balers)</div>
                    <div className="text-slate-400">Assigned: Dharamkot & Nihal Singh Wala (Moga)</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400">65% Capacity</span>
                    <span className="text-[10px] text-slate-400 block">Rate: ₹850/t</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Malwa Residue Logistics (4 Balers)</div>
                    <div className="text-slate-400">Assigned: Sunam & Lehra (Sangrur)</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400">92% Capacity</span>
                    <span className="text-[10px] text-slate-400 block">Rate: ₹850/t</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plant Intake Contracts & SLA */}
            <div id="procurement-plants" className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-white">Plant Supply Agreements & Escrow</h3>
                  <span className="text-xs text-slate-400">Fixed-price guaranteed off-take contracts</span>
                </div>
                <Factory className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Ludhiana Bio-CNG / CBG Plant</div>
                    <div className="text-slate-400">Demand: 100 t/day · Agreed Rate: ₹5,000/t</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Escrow Locked</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">₹5,00,000</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Sangrur Bio-Energy Facility</div>
                    <div className="text-slate-400">Demand: 60 t/day · Agreed Rate: ₹4,900/t</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Escrow Locked</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">₹2,94,000</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Patiala Bio-Power Project</div>
                    <div className="text-slate-400">Demand: 90 t/day · Agreed Rate: ₹5,050/t</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Escrow Locked</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">₹4,54,500</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
