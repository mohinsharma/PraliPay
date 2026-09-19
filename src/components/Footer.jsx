import React from 'react';
import { Leaf, Mail } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onOpenContact }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="mb-3">
              <Logo size="md" variant="light" />
            </div>

            <p className="text-sm text-slate-300 font-medium mb-3">
              "Built for Punjab. Designed to turn crop residue into value."
            </p>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              ਪਰਾਲੀPay is an intelligent agricultural logistics and procurement protocol bridging the gap between Punjab farm fields and clean bio-energy plants.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Platform Navigation
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('for-farmers')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Farmers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('baler-dashboard')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Baler Operators
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('for-plants')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Plants
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('punjab-network')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-300 font-semibold"
                >
                  Punjab Network
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hackathon Info */}
          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Hackathon Project
            </div>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Developed for hackathon evaluation in AgriTech & ClimateTech categories.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Mail className="w-4 h-4" />
              <span>contact@paralipay.in</span>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-300 font-medium">
              Built for a sustainable agricultural future.
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} ਪਰਾਲੀPay. Prototype Landing Page.
          </div>
        </div>

      </div>
    </footer>
  );
}
