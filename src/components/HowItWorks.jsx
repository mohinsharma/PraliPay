import React from 'react';
import { 
  Scan, 
  Calculator, 
  FileCheck2, 
  Truck, 
  ArrowRight, 
  CheckCircle, 
  Satellite, 
  Scale, 
  ShieldCheck, 
  Factory,
  Wheat,
  MapPin
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Punjab Field Analysis',
      subtitle: 'AI-Assisted Residue Estimation',
      description: 'Punjab farmers log field coordinates or Khasra numbers. Sentinel-2 multispectral satellite data & Punjab paddy yield baselines estimate straw volume with 95%+ precision.',
      icon: Scan,
      tag: 'Satellite AI',
      sublabel: 'Punjab Field'
    },
    {
      num: '02',
      title: 'Economic Viability Check',
      subtitle: 'Dynamic Decision Engine',
      description: 'Calculates whether collection is economically viable considering haul distance to nearby Punjab bio-plants, local diesel rates, and baler mobilization costs.',
      icon: Calculator,
      tag: 'Logistics Math',
      sublabel: 'Viability Engine'
    },
    {
      num: '03',
      title: 'Transparent Contract',
      subtitle: 'Guaranteed Procurement Terms',
      description: 'Generates a binding digital agreement with transparent price per tonne, committed pickup window, and escrow deposit from regional Punjab bio-energy plants.',
      icon: FileCheck2,
      tag: 'Escrow Backed',
      sublabel: 'Digital Agreement'
    },
    {
      num: '04',
      title: 'Baler Pickup & Delivery',
      subtitle: 'Punjab Biomass / Biogas Plant',
      description: 'Dispatches local baler operators in high-density tehsil clusters, transporting compressed bales directly from field gate to the Punjab bio-refinery.',
      icon: Truck,
      tag: 'Cluster Dispatch',
      sublabel: 'Punjab Bio-Plant'
    }
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-28 bg-white border-y border-slate-200/60 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-50/70 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            Punjab Core Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            From Punjab field to clean fuel.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            A specialized 4-stage lifecycle engineered to solve Punjab's seasonal paddy residue challenge with zero delay.
          </p>
        </div>

        {/* 4-Step Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 -translate-y-12 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative bg-[#fbfcf9] rounded-2xl p-6 sm:p-7 border border-emerald-900/10 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group z-10 hover:-translate-y-1"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-800 shadow-sm group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
                      <Icon className="w-6 h-6" strokeWidth={2.2} />
                    </div>
                    
                    <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-emerald-600 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                      {step.tag}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 mb-2.5">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="text-emerald-800 font-semibold">{step.sublabel}</span>
                  {index < 3 && (
                    <span className="lg:hidden flex items-center gap-1 text-emerald-700 font-semibold">
                      Next <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* 8-Step End-to-End Baler Integrated Workflow Pipeline */}
        <div className="mt-14 p-6 sm:p-7 rounded-3xl bg-[#f8faf7] border border-emerald-900/10 shadow-sm">
          <div className="text-center mb-5">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Full 8-Step Lifecycle
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-2">
              End-to-End Residue & Value Stream
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-semibold text-slate-700">
            <span className="bg-amber-50 text-amber-900 border border-amber-200 px-3 py-2 rounded-xl shadow-2xs flex items-center gap-1.5">
              <span>🌾</span>
              <span>Farmer</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="bg-white text-slate-800 border border-slate-200 px-3 py-2 rounded-xl shadow-2xs">
              AI-assisted residue estimation
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="bg-white text-slate-800 border border-slate-200 px-3 py-2 rounded-xl shadow-2xs">
              Economic viability check
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="bg-white text-slate-800 border border-slate-200 px-3 py-2 rounded-xl shadow-2xs">
              Contract
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="bg-amber-500 text-white px-3 py-2 rounded-xl shadow-xs flex items-center gap-1.5">
              <span>🚜</span>
              <span>Baler / Residue Collector</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="bg-white text-slate-800 border border-slate-200 px-3 py-2 rounded-xl shadow-2xs">
              Collection
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xs flex items-center gap-1.5">
              <span>🏭</span>
              <span>Biomass / Biogas Plant</span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            <span className="bg-emerald-700 text-white px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 font-bold">
              <span>₹</span>
              <span>Payment</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
