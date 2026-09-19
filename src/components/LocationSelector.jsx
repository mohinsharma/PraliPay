import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check, Sparkles } from 'lucide-react';

export default function LocationSelector({ onSelectUnavailable }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const locations = [
    { name: 'Punjab', available: true, note: 'Available now' },
    { name: 'Haryana', available: false, note: 'Coming soon' },
    { name: 'Uttar Pradesh', available: false, note: 'Coming soon' },
    { name: 'Rajasthan', available: false, note: 'Coming soon' },
    { name: 'Madhya Pradesh', available: false, note: 'Coming soon' },
    { name: 'Maharashtra', available: false, note: 'Coming soon' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationClick = (loc) => {
    setIsOpen(false);
    if (!loc.available) {
      onSelectUnavailable(loc.name);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Location Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold transition-all shadow-xs cursor-pointer group select-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        <span className="tracking-wide">Punjab</span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-emerald-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-900/10 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>Operating Regions</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
              v1.0
            </span>
          </div>

          <div className="py-1 space-y-1">
            {locations.map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => handleLocationClick(loc)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                  loc.available
                    ? 'bg-emerald-50/90 text-emerald-950 font-bold border border-emerald-200/60 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {loc.available ? (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
                  ) : (
                    <span className="flex h-2 w-2 rounded-full bg-slate-300"></span>
                  )}
                  <span>{loc.name}</span>
                </div>

                <div className="flex items-center gap-1">
                  {loc.available ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      Available now <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      Coming soon
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-1 pt-2 border-t border-slate-100 px-2 py-1 text-[10px] text-slate-400 text-center">
            Currently active across all 23 Punjab districts
          </div>
        </div>
      )}
    </div>
  );
}
