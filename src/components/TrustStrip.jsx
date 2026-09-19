import React from 'react';
import { Wheat, Bot, Handshake, Tractor } from 'lucide-react';

export default function TrustStrip() {
  const cards = [
    {
      icon: Wheat,
      iconBg: 'bg-amber-100 text-amber-800 border-amber-200',
      badge: 'Residue → Revenue',
      title: 'Residue → Revenue',
      description: 'Turn agricultural waste into an economic opportunity.',
      metric: 'Instant Payout Calculation'
    },
    {
      icon: Bot,
      iconBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      badge: 'AI-Assisted',
      title: 'AI-Assisted',
      description: 'Estimate residue and evaluate collection viability.',
      metric: 'Satellite & Yield Models'
    },
    {
      icon: Handshake,
      iconBg: 'bg-blue-100 text-blue-800 border-blue-200',
      badge: 'Contract-Based',
      title: 'Contract-Based',
      description: 'Connect farmers and biomass buyers through transparent offers.',
      metric: 'Direct Escrow Terms'
    },
    {
      icon: Tractor,
      iconBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      badge: 'Coordinated Pickup',
      title: 'Coordinated Pickup',
      description: 'Move residue from field to plant efficiently.',
      metric: 'Optimized Baler Routing'
    }
  ];

  return (
    <section className="relative py-8 md:py-12 bg-white/60 border-y border-slate-200/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.iconBg} shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className="w-5 h-5" strokeWidth={2.2} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-snug">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
                  <span>{item.metric}</span>
                  <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
