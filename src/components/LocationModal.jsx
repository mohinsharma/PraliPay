import React from 'react';
import { X, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LocationModal({ isOpen, onClose, targetLocation }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900/10 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top decorative gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center mx-auto mb-5 shadow-sm mt-2">
          <MapPin className="w-8 h-8 text-emerald-600 animate-bounce" />
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          <span>Regional Availability</span>
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Currently Available in Punjab
        </h3>

        {/* Dynamic description mentioning target location */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          <strong className="text-slate-900">ਪਰਾਲੀPay</strong> is currently available only in Punjab.{' '}
          <span className="text-emerald-800 font-semibold">
            {targetLocation ? `${targetLocation} support is coming soon.` : 'Support for other states is coming soon.'}
          </span>
        </p>

        <p className="text-xs text-slate-500 leading-relaxed mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
          We're working to expand to other agricultural states soon. Our current automated logistics, baler dispatch, and bio-refinery network are optimized specifically for Punjab's paddy farming landscape.
        </p>

        {/* Action button */}
        <button
          onClick={onClose}
          className="w-full bg-agri-forest hover:bg-agri-darkest text-white py-3 px-6 rounded-xl font-bold text-sm shadow-md hover:shadow-lg shadow-emerald-950/15 transition-all cursor-pointer"
        >
          Got it
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Punjab Network Active · 100% Operational</span>
        </div>
      </div>
    </div>
  );
}
