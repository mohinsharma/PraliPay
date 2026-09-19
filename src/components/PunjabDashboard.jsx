import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  Factory, 
  MapPin, 
  TrendingUp, 
  Flame, 
  Wheat, 
  Tractor, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function PunjabDashboard({ onOpenRoleModal }) {
  const [selectedCluster, setSelectedCluster] = useState('ludhiana');

  const clusters = [
    {
      id: 'ludhiana',
      name: 'Ludhiana West Cluster',
      available: '142 tonnes',
      distance: '8.2 km',
      farms: 36,
      status: 'High Density Supply',
      purity: 'Grade A (13.5% H₂O)'
    },
    {
      id: 'moga',
      name: 'Moga-Jagraon Corridor',
      available: '118 tonnes',
      distance: '12.5 km',
      farms: 29,
      status: 'Active Baler Route',
      purity: 'Grade A (14.0% H₂O)'
    },
    {
      id: 'sangrur',
      name: 'Sangrur-Barnala Belt',
      available: '66 tonnes',
      distance: '18.0 km',
      farms: 18,
      status: 'Ready for Contract',
      purity: 'Grade B (15.2% H₂O)'
    }
  ];

  return (
    <section id="punjab-network" className="relative py-20 md:py-28 bg-[#fbfcf9] border-y border-slate-200/60 overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Punjab Autonomous Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Punjab Network
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Real-time prototype overview of crop residue availability, verified farm parcels, and bio-energy procurement demand across Punjab.
          </p>
        </div>

        {/* 1. Punjab Network Summary 4-Metric Strip (DEMO numbers only) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fields Analyzed</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Wheat className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
              124
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-700 font-semibold">Central Punjab</span>
              <span>· Demo Parcels</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Residue</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
              486 <span className="text-lg font-normal text-slate-500">tonnes</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-amber-700 font-semibold">Paddy Straw</span>
              <span>· Satellite Verified</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Contracts</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
              38
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-blue-700 font-semibold">Escrow Backed</span>
              <span>· Scheduled Dispatch</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nearby Plants</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                <Factory className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
              12
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-800 font-semibold">Punjab Bio-CNG / CBG</span>
              <span>Facilities</span>
            </div>
          </div>

        </div>

        {/* 2. Plant Dashboard: Punjab Feedstock Demand */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-emerald-900/10 shadow-xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-slate-100 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                Plant Procurement Dashboard
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Punjab Feedstock Demand
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Aggregated daily bio-refinery requirement vs. contracted and buffer feedstock available across Punjab supply corridors.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl font-medium">
                Prototype Telemetry · Demo Data
              </span>
            </div>
          </div>

          {/* Plant Demand Progress & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Required Today
              </span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                500 <span className="text-base font-medium text-slate-600">tonnes</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Continuous boiler & digester baseline for 24/7 Punjab bio-refinery operations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                Contracted
              </span>
              <div className="text-3xl font-extrabold text-emerald-800 font-mono">
                218 <span className="text-base font-medium text-emerald-700">tonnes</span>
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '43.6%' }}></div>
              </div>
              <p className="text-xs text-emerald-800 font-medium mt-2">
                43.6% secured via binding digital contracts
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80">
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block mb-1">
                Nearby Available
              </span>
              <div className="text-3xl font-extrabold text-amber-900 font-mono">
                326 <span className="text-base font-medium text-amber-800">tonnes</span>
              </div>
              <p className="text-xs text-amber-900 font-medium mt-2">
                Identified within viable 20 km collection radius ready for instant contract generation.
              </p>
            </div>

          </div>

          {/* Punjab Supply Clusters Table / Selector */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Punjab Supply Corridors (Ready for Procurement):
              </h4>
              <span className="text-xs text-slate-500">
                Click a corridor to inspect cluster yield
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {clusters.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCluster(c.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedCluster === c.id
                      ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-400/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{c.name}</span>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      {c.distance}
                    </span>
                  </div>
                  <div className="text-xl font-extrabold text-slate-800 font-mono">
                    {c.available}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{c.farms} Punjab parcels</span>
                    <span className="text-emerald-700 font-semibold">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                Sufficient nearby Punjab feedstock available to achieve 100% daily plant intake (500 tonnes).
              </span>
              <button
                onClick={() => onOpenRoleModal()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-agri-forest hover:bg-agri-darkest px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
              >
                <span>Contract Punjab Supply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Incoming Collections Section */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Tractor className="w-4 h-4 text-amber-600" />
                  <span>Incoming Collections</span>
                </h4>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Live Baler Telemetry
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>Ludhiana Field (#PB-LDH102)</span>
                    <span className="text-emerald-700 font-mono font-bold">5.2 tonnes</span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                    <Tractor className="w-3.5 h-3.5 text-amber-600" />
                    <span>Singh Agri Services</span>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md inline-block">
                    Status: En Route
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>Moga Field (#PB-MGA04)</span>
                    <span className="text-emerald-700 font-mono font-bold">6.4 tonnes</span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                    <Tractor className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dhillon Baler Fleet</span>
                  </div>
                  <div className="text-[11px] font-semibold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-md inline-block">
                    Status: Scheduled Today
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                    <span>Sangrur Field (#PB-SGR18)</span>
                    <span className="text-emerald-700 font-mono font-bold">7.1 tonnes</span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                    <Tractor className="w-3.5 h-3.5 text-amber-600" />
                    <span>Majha Custom Baling</span>
                  </div>
                  <div className="text-[11px] font-semibold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md inline-block">
                    Status: Intake Active
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
