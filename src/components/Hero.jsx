import React from 'react';
import { ArrowRight, ChevronRight, Sparkles, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import HeroMapVisual from './HeroMapVisual';

export default function Hero({ onOpenRoleModal }) {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Soft Ambient Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-100/20 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Location & Tagline Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs">
                <span>📍 Built for Punjab</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-extrabold tracking-wide">
                <span>"ਪਰਾਲੀ ਤੋਂ ਕਮਾਈ।"</span>
              </div>
            </div>

            {/* Core Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Turn Crop Residue{' '}
              <span className="block mt-1 bg-gradient-to-r from-agri-forest via-agri-emerald to-emerald-600 bg-clip-text text-transparent">
                Into Value.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              ਪਰਾਲੀPay connects Punjab farmers with biomass and biogas buyers, turning crop residue into transparent contracts and coordinated collection.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={() => onOpenRoleModal()}
                id="hero-get-started-btn"
                className="inline-flex items-center justify-center gap-2.5 bg-agri-forest hover:bg-agri-darkest text-white text-base font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:shadow-emerald-950/25 transition-all duration-200 group cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-base font-semibold px-6 py-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>See How It Works</span>
              </button>
            </div>

            {/* Core Value Quote / Tagline Banner */}
            <div className="w-full max-w-lg p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/50 border border-emerald-900/10 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    The ਪਰਾਲੀPay Promise · ਪੰਜਾਬ
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 italic">
                    "ਪਰਾਲੀ ਤੋਂ ਕਮਾਈ। You have the residue. Punjab's clean energy plants need the fuel. We make the connection profitable."
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Centerpiece Visualization */}
          <div className="lg:col-span-6 w-full">
            <HeroMapVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
