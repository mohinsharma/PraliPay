import React from 'react';
import { IndianRupee, Factory, Route, Check, TrendingUp, ShieldCheck, Leaf } from 'lucide-react';

export default function ImpactSection() {
  const metrics = [
    {
      icon: IndianRupee,
      title: '₹ Farmer Value',
      highlight: 'Guaranteed Net Income',
      subtitle: 'Per Hectare Monetization',
      description: 'Converts agricultural residue from a disposal liability into a predictable revenue stream with zero upfront baling costs and automated bank deposits.',
      benefits: [
        'Guaranteed floor price per tonne',
        'Direct bank escrow settlement',
        'Zero coordination stress for harvest'
      ],
      tag: 'Economic Uplift',
      color: 'amber'
    },
    {
      icon: Factory,
      title: 'Reliable Feedstock',
      highlight: 'Continuous Plant Intake',
      subtitle: 'Predictable Biomass Supply',
      description: 'Eliminates sudden boiler shutdowns and volatile spot-market pricing by providing plants with scheduled multi-field delivery pipelines and verified moisture levels.',
      benefits: [
        'Predictable calorific intake schedules',
        'Verified moisture & quality telemetry',
        'Long-term contractual stability'
      ],
      tag: 'Operational Security',
      color: 'emerald'
    },
    {
      icon: Route,
      title: 'Optimized Collection',
      highlight: 'Clustered Baler Routing',
      subtitle: 'Minimized Logistics Overhead',
      description: 'Intelligent aggregation algorithm groups neighboring parcels into dense pickup corridors, slashing machinery transit time and diesel expenditure.',
      benefits: [
        'Density-based baler dispatching',
        'Minimizes empty deadhead truck trips',
        'Fits tight 14-day harvest windows'
      ],
      tag: 'Logistics Efficiency',
      color: 'blue'
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-white border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Ecosystem Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Better economics. Better utilization. Less waste.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            By aligning incentives through algorithmic pricing and automated aggregation, ਪਰਾਲੀPay unlocks shared economic value across Punjab's agricultural supply chain.
          </p>
        </div>

        {/* 3 Large Prototype Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-[#fbfcf9] rounded-3xl p-8 border border-emerald-900/10 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-800 shadow-sm group-hover:scale-105 group-hover:bg-agri-forest group-hover:text-white transition-all duration-200">
                      <Icon className="w-7 h-7" strokeWidth={2.2} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                      {m.tag}
                    </span>
                  </div>

                  {/* Title & Key Highlights */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {m.title}
                    </h3>
                    <div className="text-sm font-bold text-emerald-700 mt-1">
                      {m.highlight}
                    </div>
                    <div className="text-xs font-medium text-slate-400">
                      {m.subtitle}
                    </div>
                  </div>

                  {/* Core Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {m.description}
                  </p>

                  {/* Benefit Points */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
                    {m.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>Prototype Architecture Metric</span>
                  <span className="font-mono text-emerald-700 font-semibold">Model v2.4</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
