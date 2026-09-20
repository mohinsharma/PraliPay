import React, { useState } from 'react';
import {
  Wheat,
  MapPin,
  Sparkles,
  Plus,
  CheckCircle2,
  Layers,
  TrendingUp,
  IndianRupee,
  ArrowRight,
  Calendar,
  Clock,
  FileCheck,
  Factory,
  ShieldCheck,
  LogOut,
  Eye,
  ChevronRight,
  X,
  Bell,
  Menu,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import AddFieldModal from './AddFieldModal';

export default function FarmerDashboardView({ onNavigate }) {
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const [selectedFieldForBuyers, setSelectedFieldForBuyers] = useState(null);
  const [selectedFieldForView, setSelectedFieldForView] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'fields' | 'contracts' | 'telemetry' | 'profile'
  const [contractCreated, setContractCreated] = useState(false);

  // Initial demo fields
  const [fields, setFields] = useState([
    {
      id: 'FIELD-PB-01',
      name: 'Field 01',
      location: 'Ludhiana, Punjab',
      areaAcres: 4.2,
      areaHectares: 1.70,
      crop: 'Paddy',
      estimatedResidue: 5.2,
      pickupStatus: 'Ready for Baler',
      contractStatus: 'Available for Procurement',
      dateAnalyzed: '2026-09-18',
      ndvi: 0.68,
      confidence: 'Prototype Estimate'
    },
    {
      id: 'FIELD-PB-02',
      name: 'Field 02',
      location: 'Jagraon, Punjab',
      areaAcres: 3.8,
      areaHectares: 1.54,
      crop: 'Paddy',
      estimatedResidue: 4.7,
      pickupStatus: 'Scheduled',
      contractStatus: 'Contracted',
      dateAnalyzed: '2026-09-15',
      ndvi: 0.65,
      confidence: 'Prototype Estimate'
    },
    {
      id: 'FIELD-PB-03',
      name: 'Field 03',
      location: 'Raikot, Punjab',
      areaAcres: 3.8,
      areaHectares: 1.54,
      crop: 'Paddy',
      estimatedResidue: 4.7,
      pickupStatus: 'Ready for Baler',
      contractStatus: 'Available for Procurement',
      dateAnalyzed: '2026-09-12',
      ndvi: 0.63,
      confidence: 'Prototype Estimate'
    }
  ]);

  // Handle saving a newly drawn & analyzed field
  const handleSaveField = (newField) => {
    setFields([newField, ...fields]);
  };

  // Compute summary metrics dynamically
  const totalFields = fields.length;
  const totalArea = Math.round(fields.reduce((acc, f) => acc + f.areaAcres, 0) * 10) / 10;
  const totalResidue = Math.round(fields.reduce((acc, f) => acc + f.estimatedResidue, 0) * 10) / 10;
  const activeContractsCount = 2;

  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col md:flex-row">
      {/* 1. Farmer Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 text-white flex-shrink-0 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                ਪ
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-white">
                  ਪਰਾਲੀ<span className="text-emerald-400">Pay</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Farmer Portal · Punjab
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-sm font-medium">
            <button
              onClick={() => {
                setActiveTab('overview');
                document.getElementById('farmer-overview')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'overview'
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('fields');
                document.getElementById('farmer-fields')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${activeTab === 'fields'
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
            >
              <div className="flex items-center gap-3">
                <Wheat className="w-4 h-4" />
                <span>My Fields</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                {fields.length}
              </span>
            </button>

            <button
              onClick={() => setIsAddFieldOpen(true)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-emerald-400 hover:text-white hover:bg-slate-900 transition-all cursor-pointer font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Field</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Return to Landing Page & Switch Role */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <span>Platform Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('baler')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-amber-300 transition-colors cursor-pointer"
          >
            🚜 Switch to Baler Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('plant')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            🏭 Switch to Plant Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('procurement')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-teal-300 transition-colors cursor-pointer"
          >
            🏢 Switch to Coordinator HQ
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg shadow-inner">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Gurpreet Singh
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                  Verified Farmer
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ludhiana West Cluster, Punjab</span>
                <span>·</span>
                <span className="text-slate-400 font-mono">ID: PB-FAR-102</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddFieldOpen(true)}
              id="header-add-field-btn"
              className="inline-flex items-center gap-2 bg-agri-forest hover:bg-agri-darkest text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer group"
            >
              <Plus className="w-4 h-4 text-emerald-300 group-hover:scale-120 transition-transform" />
              <span>+ Add Field</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Switch Role / Exit
            </button>
          </div>
        </header>

        {/* Main Dashboard Body */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">

          {/* PART 2 & 11: Primary CTA Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-agri-forest via-emerald-800 to-teal-900 text-white p-7 sm:p-10 shadow-xl border border-emerald-600/30">
            {/* Background glowing orbs */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  Satellite-Assisted Field Residue Intelligence
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Map Your Field to Estimate Crop Residue.
                </h1>
                <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                  Map your field to estimate area, crop residue and schedule coordinated baler pickup using Sentinel-2 satellite analysis.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setIsAddFieldOpen(true)}
                  id="farmer-cta-add-field-btn"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-emerald-950/20 transition-all cursor-pointer group"
                >
                  <Plus className="w-5 h-5 text-slate-950 group-hover:rotate-90 transition-transform duration-200" />
                  <span>+ Add Field</span>
                </button>
              </div>
            </div>
          </div>

          {/* PART 11: FARMER DASHBOARD OVERVIEW METRICS (Farmer Information Visibility: No Internal Values) */}
          <section id="farmer-overview" aria-labelledby="overview-metrics-title">
            <h2 id="overview-metrics-title" className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
              Harvest & Residue Portfolio Overview
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Metric 1: My Fields */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">My Fields</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <Wheat className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {totalFields}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Punjab Agricultural Parcels
                </div>
              </div>

              {/* Metric 2: Total Area */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Area</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {totalArea} <span className="text-sm font-bold text-slate-500 font-sans">acres</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  ≈ {(totalArea / 2.471).toFixed(1)} hectares
                </div>
              </div>

              {/* Metric 3: Estimated Residue */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Residue</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {totalResidue} <span className="text-sm font-bold text-slate-500 font-sans">tonnes</span>
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mt-1">
                  Paddy Crop Straw
                </div>
              </div>

              {/* Metric 4: Collection / Pickup Readiness (Replaced internal value) */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pickup Readiness</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-900 font-mono">
                  Scheduled
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Baler Fleet Dispatched
                </div>
              </div>

              {/* Metric 5: Active Contracts */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs hover:shadow-md transition-shadow col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Contracts</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {activeContractsCount}
                </div>
                <div className="text-[11px] text-blue-700 font-semibold mt-1">
                  Procurement Confirmed
                </div>
              </div>
            </div>
          </section>

          {/* PART 10 & 11: “MY FIELDS” SECTION */}
          <section id="farmer-fields" aria-labelledby="my-fields-title" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 id="my-fields-title" className="text-xl font-extrabold text-slate-900">
                  My Fields
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your registered agricultural parcels with automated satellite NDVI analysis and residue estimates.
                </p>
              </div>

              <button
                onClick={() => setIsAddFieldOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-300 transition-colors cursor-pointer w-fit"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Field</span>
              </button>
            </div>

            {/* Field Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="bg-white rounded-3xl p-6 border-2 border-emerald-500/20 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                          🌾
                        </span>
                        <div>
                          <h3 className="text-base font-extrabold text-slate-900">
                            {field.name}
                          </h3>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            {field.location}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {field.crop}
                      </span>
                    </div>

                    {/* Field Data Matrix (Farmer Sees Area, Crop, Estimated Residue, Pickup Status - NO internal value) */}
                    <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Area</span>
                        <span className="text-slate-900 font-extrabold font-mono text-sm">
                          {field.areaAcres} acres
                        </span>
                        <span className="text-[10px] text-slate-400 block">≈ {field.areaHectares} ha</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Estimated Residue</span>
                        <span className="text-emerald-900 font-extrabold font-mono text-sm">
                          {field.estimatedResidue} tonnes
                        </span>
                        <span className="text-[10px] text-slate-400 block">NDVI {field.ndvi || 0.68}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 col-span-2">
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-800 block text-[10px] uppercase font-bold">Collection Status</span>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            {field.pickupStatus || 'Ready for Baler'}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 mt-1 block">
                          Contract: {field.contractStatus || 'Available for Procurement'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFieldForView(field)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Analysis</span>
                    </button>

                    <button
                      onClick={() => setSelectedFieldForBuyers(field)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-agri-forest hover:bg-agri-darkest text-white text-xs font-bold py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Factory className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Find Buyers</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* DEDICATED ADD FIELD WORKFLOW MODAL */}
      <AddFieldModal
        isOpen={isAddFieldOpen}
        onClose={() => setIsAddFieldOpen(false)}
        onSaveField={handleSaveField}
        onFindBuyers={(analysis) => {
          setSelectedFieldForBuyers({
            name: analysis.name || 'New Field',
            areaAcres: analysis.area?.acres || 4.2,
            areaHectares: analysis.area?.hectares || 1.70,
            estimatedResidue: analysis.estimated_residue || analysis.estimated_residue_tonnes || 5.2,
            location: analysis.location || 'Ludhiana, Punjab',
            pickupStatus: 'Ready for Baler',
            contractStatus: 'Available for Procurement'
          });
        }}
      />

      {/* VIEW ANALYSIS MODAL (NO INTERNAL VALUES) */}
      {selectedFieldForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900/10">
            <button
              onClick={() => setSelectedFieldForView(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Layers className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {selectedFieldForView.name} Analysis
                </h3>
                <span className="text-xs text-slate-500">
                  📍 {selectedFieldForView.location}
                </span>
              </div>
            </div>

            <div className="my-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Field Area:</span>
                <span className="font-bold text-slate-900">{selectedFieldForView.areaAcres} acres ({selectedFieldForView.areaHectares} ha)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Crop:</span>
                <span className="font-bold text-emerald-900">{selectedFieldForView.crop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Satellite Analysis:</span>
                <span className="font-bold text-emerald-700">Available (Sentinel-2)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Vegetation Index:</span>
                <span className="font-bold text-emerald-800">NDVI {selectedFieldForView.ndvi || 0.68}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estimated Residue:</span>
                <span className="font-black text-emerald-950 font-mono text-base">{selectedFieldForView.estimatedResidue} tonnes</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-emerald-200">
                <span className="text-slate-700 font-semibold">Pickup Status:</span>
                <span className="font-bold text-emerald-800">{selectedFieldForView.pickupStatus || 'Ready for Baler'}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 mb-6 flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Analysis Confidence: <strong>{selectedFieldForView.confidence || 'AI-assisted prototype estimate'}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedFieldForBuyers(selectedFieldForView);
                  setSelectedFieldForView(null);
                }}
                className="flex-1 bg-agri-forest text-white py-2.5 rounded-xl font-bold text-sm hover:bg-agri-darkest transition-colors cursor-pointer"
              >
                Find Buyers
              </button>
              <button
                onClick={() => setSelectedFieldForView(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FIND BUYERS / CONTRACT MODAL (PART 12) */}
      {selectedFieldForBuyers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-900/10">
            <button
              onClick={() => {
                setSelectedFieldForBuyers(null);
                setContractCreated(false);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!contractCreated ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Factory className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Find Buyers for {selectedFieldForBuyers.name}
                    </h3>
                    <span className="text-xs text-slate-500">
                      📍 {selectedFieldForBuyers.location} · {selectedFieldForBuyers.estimatedResidue} tonnes Paddy Straw
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4">
                  Match with Punjab bio-CNG and CBG plants within optimal haul radius for automated contract generation.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      id: 'PLANT-LDH-01',
                      name: 'Ludhiana CBG Plant',
                      location: 'Ludhiana West (7.2 km away)',
                      offerRate: '₹5,000 / tonne',
                      netFarmerPayout: '₹2,200 / tonne',
                      paymentTerms: 'Instant Escrow on Gate Weighbridge'
                    },
                    {
                      id: 'PLANT-JAG-02',
                      name: 'Jagraon Biofuels Ltd.',
                      location: 'Jagraon Corridor (12.5 km away)',
                      offerRate: '₹5,100 / tonne',
                      netFarmerPayout: '₹2,150 / tonne',
                      paymentTerms: 'T+1 Bank Transfer'
                    }
                  ].map((plant, idx) => (
                    <div key={plant.id} className={`p-4 rounded-2xl border transition-all ${idx === 0 ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-400/20' : 'bg-slate-50 border-slate-200'
                      }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-slate-900">{plant.name}</span>
                        <span className="text-xs font-black text-emerald-800">{plant.offerRate}</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">{plant.location}</div>
                      <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200/60">
                        <span>Net Farmer Payout: <strong>{plant.netFarmerPayout}</strong></span>
                        <span className="text-emerald-700 font-bold">{plant.paymentTerms}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setContractCreated(true)}
                    className="flex-1 bg-agri-forest hover:bg-agri-darkest text-white py-3 rounded-xl font-extrabold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileCheck className="w-4 h-4 text-emerald-300" />
                    <span>Generate Procurement Contract</span>
                  </button>
                  <button
                    onClick={() => setSelectedFieldForBuyers(null)}
                    className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Contract Proposal #PP-PB-102 Generated!
                </h3>
                <p className="text-xs text-slate-600 mb-5 max-w-sm mx-auto">
                  Matched with <strong>Ludhiana CBG Plant</strong>. A nearby baler fleet (Singh Agri Services) has been alerted for pickup dispatch.
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs text-emerald-950 space-y-1.5 mb-6">
                  <div className="flex justify-between">
                    <span>Target Parcel:</span>
                    <strong>{selectedFieldForBuyers.name} ({selectedFieldForBuyers.areaAcres} acres)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Committed Residue:</span>
                    <strong>{selectedFieldForBuyers.estimatedResidue} tonnes</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Pickup Status:</span>
                    <strong className="text-emerald-800">Baler Dispatched (Singh Agri Services)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Contract Status:</span>
                    <strong className="text-emerald-700">Locked in Punjab Agri Escrow</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedFieldForBuyers(null);
                    setContractCreated(false);
                  }}
                  className="w-full bg-agri-forest text-white py-2.5 rounded-xl font-bold text-sm hover:bg-agri-darkest transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
