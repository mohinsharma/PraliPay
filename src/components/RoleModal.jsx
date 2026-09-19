import React, { useState } from 'react';
import { X, Wheat, Tractor, Factory, ArrowRight, CheckCircle, ShieldCheck, Sparkles, MapPin, Calculator } from 'lucide-react';

export default function RoleModal({ isOpen, onClose, initialRole = 'farmer' }) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    cropOrCapacity: '',
    contact: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                ਪਰਾਲੀPay Onboarding
              </span>
            </div>
            
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Select your role in Punjab
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Connect your Punjab agricultural parcel, baler fleet, or bio-refinery to participate in structured residue contracts.
            </p>

            {/* Role Switcher Tabs (3 Roles) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              
              {/* Option 1: Farmer */}
              <button
                type="button"
                onClick={() => setSelectedRole('farmer')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'farmer'
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Wheat className="w-4 h-4" />
                  </div>
                  {selectedRole === 'farmer' && <CheckCircle className="w-4 h-4 text-amber-700" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Farmer</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    "I have crop residue to sell"
                  </div>
                </div>
              </button>

              {/* Option 2: Baler / Residue Collector */}
              <button
                type="button"
                onClick={() => setSelectedRole('baler')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'baler'
                    ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-400/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Tractor className="w-4 h-4" />
                  </div>
                  {selectedRole === 'baler' && <CheckCircle className="w-4 h-4 text-emerald-700" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Baler / Residue Collector</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    "I collect and transport crop residue"
                  </div>
                </div>
              </button>

              {/* Option 3: Biomass / Biogas Plant */}
              <button
                type="button"
                onClick={() => setSelectedRole('plant')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedRole === 'plant'
                    ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-400/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                    <Factory className="w-4 h-4" />
                  </div>
                  {selectedRole === 'plant' && <CheckCircle className="w-4 h-4 text-slate-800" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Biomass / Biogas Plant</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    "I need agricultural residue for my plant"
                  </div>
                </div>
              </button>

            </div>

            {/* Simulated Quick Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name / Enterprise Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    selectedRole === 'farmer' 
                      ? 'e.g. Gurpreet Singh' 
                      : selectedRole === 'baler'
                      ? 'e.g. Singh Agri Machinery Services'
                      : 'e.g. Punjab BioEnergy Corp Ltd.'
                  }
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Punjab District
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ludhiana, Sangrur, Patiala"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {selectedRole === 'farmer' 
                      ? 'Paddy Land Area (Acres)' 
                      : selectedRole === 'baler'
                      ? 'Baler Machinery / Fleet'
                      : 'Daily Boiler Capacity (Tonnes)'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      selectedRole === 'farmer' 
                        ? 'e.g. 4.2 Acres' 
                        : selectedRole === 'baler'
                        ? 'e.g. 2 Round Balers + Rake'
                        : 'e.g. 50 Tonnes / Day'
                    }
                    value={formData.cropOrCapacity}
                    onChange={(e) => setFormData({ ...formData, cropOrCapacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp (for Instant OTP & Dispatch Alerts)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-agri-forest hover:bg-agri-darkest text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Request Verification & Demo Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transparent Punjab agricultural escrow protocol</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Registration Logged!
            </h3>
            
            <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
              Thank you, <strong>{formData.name || 'Partner'}</strong>. Your role as <strong>{selectedRole.toUpperCase()}</strong> in <strong>{formData.location || 'Punjab Cluster'}</strong> has been registered in the ਪਰਾਲੀPay prototype queue.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs text-emerald-900 mb-6 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Next Prototype Step:
              </div>
              <p>
                {selectedRole === 'farmer' && 'Our satellite NDVI residue detection algorithm will scan your coordinate zone and generate an initial contract proposal.'}
                {selectedRole === 'baler' && 'Nearby field collection jobs within your operating radius will be matched and dispatched to your baler fleet.'}
                {selectedRole === 'plant' && 'Your daily boiler intake requirements will be matched to clustered farm contracts for scheduled delivery.'}
              </p>
            </div>

            <button
              onClick={resetAndClose}
              className="bg-agri-forest text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-agri-darkest transition-colors cursor-pointer"
            >
              Return to Platform
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
