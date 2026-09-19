import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  FileCheck, 
  TrendingUp, 
  Sliders, 
  RefreshCw,
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function DecisionEngineSection({ onOpenRoleModal }) {
  // Interactive state for hackathon judges & users to test the AI decision engine
  const [distance, setDistance] = useState(7.2);
  const [residue, setResidue] = useState(5.2);
  const [contractGenerated, setContractGenerated] = useState(false);

  // Economic calculation formulas
  const plantOfferPerTonne = 5000; // ₹5,000 / tonne
  // Logistics cost: ₹850 base baling + (distance * ₹69.5)
  const logisticsPerTonne = Math.round(850 + distance * 69.44);
  const farmerPayoutPerTonne = Math.max(2200, plantOfferPerTonne - logisticsPerTonne - 800);
  const totalGrossValue = Math.round(residue * plantOfferPerTonne);
  const totalLogistics = Math.round(residue * logisticsPerTonne);
  const totalFarmerPayout = Math.round(residue * farmerPayoutPerTonne);
  const netPlatformMargin = totalGrossValue - totalLogistics - totalFarmerPayout;

  // Viability logic
  const isViable = distance <= 20 && residue >= 3.0;
  const isMarginal = !isViable && (distance <= 28 && residue >= 2.0);

  const handleGenerateContract = () => {
    setContractGenerated(true);
    setTimeout(() => {
      // scroll to CTA or open modal
    }, 1200);
  };

  const handleReset = () => {
    setDistance(7.2);
    setResidue(5.2);
    setContractGenerated(false);
  };

  return (
    <section id="decision-engine" className="relative py-20 md:py-28 bg-[#f8faf7] overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Proprietary AI Decision Engine
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Don't just find residue.{' '}
            <span className="bg-gradient-to-r from-agri-forest via-agri-emerald to-emerald-600 bg-clip-text text-transparent block sm:inline">
              Know when it's worth collecting.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            ਪਰਾਲੀPay evaluates residue quantity, plant demand, collection distance, transport cost and offered price to determine whether a field should be collected.
          </p>
        </div>

        {/* Large Decision Card Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-10 shadow-2xl shadow-emerald-950/10 ai-glow-emerald backdrop-blur-xl">
            
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold bg-slate-900 text-emerald-300 px-2.5 py-1 rounded-lg">
                    FIELD #PB-LDH102
                  </span>
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    📍 Ludhiana, Punjab
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Crop: Paddy · Area: 4.2 acres
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-800">
                  Automated Procurement & Route Viability Assessment (Punjab Grid)
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Reset to default prototype sample"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Demo</span>
                </button>
              </div>
            </div>

            {/* Interactive Simulation Sliders */}
            <div className="my-6 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-700" />
                  Live Scenario Simulation (Test the Engine):
                </span>
                <span className="text-emerald-700 font-normal hidden sm:inline">
                  Adjust distance and residue to see viability change
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Distance Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Haul Distance to Plant:</span>
                    <span className="font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      {distance.toFixed(1)} km
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="35"
                    step="0.5"
                    value={distance}
                    onChange={(e) => setDistance(parseFloat(e.target.value))}
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>2 km (Local)</span>
                    <span>15 km (Optimal)</span>
                    <span>35 km (Extended)</span>
                  </div>
                </div>

                {/* Residue Quantity Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Estimated Residue Quantity:</span>
                    <span className="font-mono text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      {residue.toFixed(1)} tonnes
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="15"
                    step="0.5"
                    value={residue}
                    onChange={(e) => setResidue(parseFloat(e.target.value))}
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>1.5 t (Smallholding)</span>
                    <span>5.2 t (Avg)</span>
                    <span>15 t (Commercial)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              
              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 block mb-1">Estimated Residue</span>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  {residue.toFixed(1)} <span className="text-sm font-normal text-slate-600">tonnes</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                  Moisture: 13.8%
                </span>
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 block mb-1">Distance</span>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  {distance.toFixed(1)} <span className="text-sm font-normal text-slate-600">km</span>
                </div>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                  Cluster Route #04
                </span>
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 block mb-1">Plant Offer</span>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  ₹{plantOfferPerTonne.toLocaleString()} <span className="text-xs font-normal text-slate-600">/ tonne</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                  Gross: ₹{totalGrossValue.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80">
                <span className="text-xs font-medium text-slate-500 block mb-1">Estimated Logistics</span>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">
                  ₹{logisticsPerTonne.toLocaleString()} <span className="text-xs font-normal text-slate-600">/ tonne</span>
                </div>
                <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                  Haul: ₹{totalLogistics.toLocaleString()}
                </span>
              </div>

            </div>

            {/* Viability Status Banner & Decision Recommendation */}
            <div className={`rounded-2xl p-5 sm:p-6 border transition-all duration-300 ${
              isViable 
                ? 'bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-teal-50 border-emerald-300' 
                : isMarginal
                ? 'bg-gradient-to-r from-amber-50 via-amber-100/50 to-yellow-50 border-amber-300'
                : 'bg-gradient-to-r from-rose-50 via-rose-100/50 to-orange-50 border-rose-300'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isViable ? 'bg-emerald-600 text-white' : isMarginal ? 'bg-amber-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    {isViable ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : isMarginal ? (
                      <AlertTriangle className="w-7 h-7" />
                    ) : (
                      <XCircle className="w-7 h-7" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                        isViable ? 'bg-emerald-500 animate-pulse' : isMarginal ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      <span className={`text-base sm:text-lg font-black tracking-wide ${
                        isViable ? 'text-emerald-900' : isMarginal ? 'text-amber-900' : 'text-rose-900'
                      }`}>
                        {isViable 
                          ? 'ECONOMICALLY VIABLE' 
                          : isMarginal 
                          ? 'MARGINALLY VIABLE (CLUSTER REQUIRED)' 
                          : 'UNVIABLE AT CURRENT HAUL DISTANCE'}
                      </span>
                    </div>
                    
                    <div className="text-xs sm:text-sm text-slate-700 font-medium mt-1">
                      {isViable ? (
                        <span>
                          Recommended: <strong className="text-emerald-950 font-bold">Generate Contract</strong> · Net Farmer Payout: <strong>₹{totalFarmerPayout.toLocaleString()}</strong>
                        </span>
                      ) : isMarginal ? (
                        <span>
                          Pair with adjacent fields in Ludhiana cluster to amortize baler mobilization overhead.
                        </span>
                      ) : (
                        <span>
                          Haul distance exceeds economic viability threshold for standalone collection.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button & Baler Assignment */}
                <div className="shrink-0">
                  {contractGenerated ? (
                    <div className="flex flex-col gap-1.5 bg-emerald-900 text-white p-3.5 rounded-2xl shadow-md border border-emerald-600">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <FileCheck className="w-4 h-4 text-emerald-300" />
                        <span>Contract #PP-102 Generated!</span>
                      </div>
                      <div className="text-[11px] text-emerald-200 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="font-semibold text-amber-300">🚜 Baler Assigned: Singh Agri Services</span>
                        <span>•</span>
                        <span>Pickup: Tomorrow</span>
                        <span>•</span>
                        <span className="bg-emerald-800/80 px-1.5 py-0.5 rounded font-medium text-white">Status: Scheduled for Pickup</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleGenerateContract}
                      disabled={!isViable && !isMarginal}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                        isViable
                          ? 'bg-agri-forest hover:bg-agri-darkest text-white hover:shadow-lg shadow-emerald-950/20'
                          : isMarginal
                          ? 'bg-amber-800 hover:bg-amber-900 text-white'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Recommended: Generate Contract</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Decision Logic Transparency Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-2">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                Parameters: Fuel Index ₹92/L · Baler Mobilization ₹850/t · Minimum Farmer Floor ₹2,200/t
              </span>
              <span className="font-mono text-emerald-800 font-semibold">
                Confidence: 98.4% · Model v2.4-agro
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
