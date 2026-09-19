import React from 'react';
import { 
  Wheat, 
  Tractor, 
  Factory, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  DollarSign, 
  Truck, 
  Calendar, 
  Route, 
  Layers
} from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-20 md:py-28 bg-[#f8faf7] overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            Punjab Harvest Bottlenecks
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Built around Punjab's paddy-residue challenge.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every October and November, Punjab's post-harvest window creates urgent coordination challenges across farmers, baler contractors, and biomass processors.
          </p>
        </div>

        {/* Three Punjab Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: 🌾 FARMERS */}
          <div id="for-farmers" className="bg-white rounded-3xl p-7 sm:p-8 border border-amber-900/10 shadow-lg shadow-amber-950/5 relative overflow-hidden group hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-100/40 rounded-bl-full -z-0 pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
                  <Wheat className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 text-amber-900 border border-amber-200">
                  01 · Farmers
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                "Harvest creates a short window to clear fields and find a reliable buyer."
              </h3>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Punjab farmers have only 10 to 14 days between paddy harvesting and wheat sowing. Finding verified buyers who commit in advance is often impossible.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span>Uncertain pricing and delayed collection commitments</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span>Zero visibility into nearby plant demand</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span>Extreme urgency to prepare land for wheat cycle</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-800">
              Resolved via: Direct Escrow Contracts
            </div>
          </div>

          {/* Card 2: 🚜 COLLECTION */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-emerald-900/10 shadow-lg shadow-emerald-950/5 relative overflow-hidden group hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100/40 rounded-bl-full -z-0 pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shadow-xs">
                  <Tractor className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100/80 text-emerald-900 border border-emerald-200">
                  02 · Collection
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                "Balers and collection operators need to know which fields are worth visiting and when."
              </h3>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Collection machinery represents major capital expenditure. Operating without cluster dispatch leads to expensive empty runs and idle balers.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <span>Unpredictable field readiness across tehsils</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <span>Deadhead tractor transit burning costly diesel</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <span>Fragmented communication between fields & plants</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-800">
              Resolved via: Clustered Baler Dispatch
            </div>
          </div>

          {/* Card 3: 🏭 BIOMASS PLANTS */}
          <div id="for-plants" className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-lg shadow-slate-950/5 relative overflow-hidden group hover:border-slate-400/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-28 h-28 bg-slate-100 rounded-bl-full -z-0 pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 shadow-xs">
                  <Factory className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-900 border border-slate-300">
                  03 · Biomass Plants
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                "Plants need predictable quantities of feedstock at an economically viable delivered cost."
              </h3>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Punjab's bio-CNG, CBG, and 2G ethanol plants require hundreds of tonnes daily. Haulage costs beyond viable radius quickly destroy operating margins.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></span>
                  <span>Feedstock shortfalls throttling boiler capacity</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></span>
                  <span>Volatile spot-market broker markups</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></span>
                  <span>Inconsistent residue moisture and quality</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-800">
              Resolved via: Scheduled Intake Agreements
            </div>
          </div>

        </div>

        {/* Central Gap Bridge Ribbon */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-amber-50 border border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-agri-forest text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-xs font-black tracking-wider text-emerald-800 uppercase">
                THE PUNJAB GAP: RESOLVED BY ਪਰਾਲੀPay
              </div>
              <p className="text-sm text-slate-700 font-medium mt-0.5">
                Connecting Punjab Field → AI Viability → Smart Contract → Baler Pickup → Punjab Bio-Plant
              </p>
            </div>
          </div>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-white px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-50 transition-colors shrink-0 shadow-2xs"
          >
            <span>Explore Punjab Workflow</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
          </a>
        </div>

      </div>
    </section>
  );
}
