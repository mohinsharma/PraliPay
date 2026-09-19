import React from 'react';
import { ArrowRight, Wheat, Factory, ShieldCheck, Sparkles } from 'lucide-react';

export default function FinalCTA({ onSelectRole }) {
  return (
    <section className="relative py-20 md:py-28 bg-[#f8faf7] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-agri-darkest via-agri-forest to-agri-primary rounded-3xl p-8 sm:p-14 text-center text-white shadow-2xl shadow-emerald-950/20 border border-emerald-700/40 relative overflow-hidden">
          
          {/* Subtle glowing ambient rings */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Join The Punjab ਪਰਾਲੀPay Network
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight mb-6">
            Ready to turn Punjab's parali into value?
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Whether you cultivate paddy, operate collection balers, or run a regional biomass / biogas plant, ਪਰਾਲੀPay brings all sides together into profitable, scheduled contracts.
          </p>

          {/* Three Distinct Role Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-3xl mx-auto">
            
            {/* Farmer Button */}
            <button
              onClick={() => onSelectRole('farmer')}
              id="cta-farmer-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-agri-forest text-sm sm:text-base font-bold px-5 sm:px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
            >
              <span className="text-lg">🌾</span>
              <span>I'm a Punjab Farmer</span>
              <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Baler Button */}
            <button
              onClick={() => onSelectRole('baler')}
              id="cta-baler-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm sm:text-base font-bold px-5 sm:px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
            >
              <span className="text-lg">🚜</span>
              <span>I'm a Baler Operator</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Plant Button */}
            <button
              onClick={() => onSelectRole('plant')}
              id="cta-plant-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-800/90 hover:bg-emerald-800 text-white text-sm sm:text-base font-bold px-5 sm:px-6 py-3.5 rounded-2xl border border-emerald-400/30 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
            >
              <span className="text-lg">🏭</span>
              <span>I'm a Punjab Bio-Plant</span>
              <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* Assurance footer info */}
          <div className="mt-8 pt-6 border-t border-emerald-800/60 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200/70 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Buyers & Farmers Only
            </span>
            <span>•</span>
            <span>Zero Upfront Platform Fee for Farmers</span>
            <span>•</span>
            <span>Hackathon Prototype Demo</span>
          </div>

        </div>
      </div>
    </section>
  );
}
