import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from './Logo';
import LocationSelector from './LocationSelector';

export default function Navbar({ onOpenRoleModal, onSelectUnavailableLocation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-sm py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Location Selector */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center group focus:outline-none"
              aria-label="ਪਰਾਲੀPay Home"
            >
              <Logo size="md" />
            </a>

            {/* Interactive Location Selector Dropdown */}
            <LocationSelector onSelectUnavailable={onSelectUnavailableLocation} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollTo('how-it-works')}
              className="hover:text-emerald-800 transition-colors py-1 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('for-farmers')}
              className="hover:text-emerald-800 transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              For Farmers
            </button>
            <button
              onClick={() => scrollTo('baler-dashboard')}
              className="hover:text-emerald-800 transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              For Balers
            </button>
            <button
              onClick={() => scrollTo('for-plants')}
              className="hover:text-emerald-800 transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              For Plants
            </button>
            <button
              onClick={() => scrollTo('punjab-network')}
              className="hover:text-emerald-800 transition-colors py-1 cursor-pointer flex items-center gap-1.5 font-semibold text-emerald-800"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Punjab Network
            </button>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenRoleModal()}
              id="nav-get-started-btn"
              className="inline-flex items-center gap-2 bg-agri-forest hover:bg-agri-darkest text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-emerald-900/20 transition-all duration-200 group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Operating Region:</span>
            <LocationSelector onSelectUnavailable={(loc) => {
              setMobileMenuOpen(false);
              onSelectUnavailableLocation(loc);
            }} />
          </div>

          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('for-farmers')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            For Farmers
          </button>
          <button
            onClick={() => scrollTo('baler-dashboard')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            For Balers
          </button>
          <button
            onClick={() => scrollTo('for-plants')}
            className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            For Plants
          </button>
          <button
            onClick={() => scrollTo('punjab-network')}
            className="block w-full text-left py-2 text-base font-semibold text-emerald-800 hover:text-emerald-900 flex items-center justify-between"
          >
            <span>Punjab Network</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Active</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRoleModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-agri-forest text-white py-3 rounded-xl font-semibold shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
