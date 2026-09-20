import React, { useState } from 'react';
import { 
  Tractor, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  IndianRupee, 
  Calendar, 
  Navigation, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Truck, 
  Layers, 
  Sparkles,
  Phone,
  Factory,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import DispatchRouteMap from './DispatchRouteMap';

export default function BalerDashboardView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'available' | 'myjobs' | 'route' | 'earnings' | 'profile'
  const [availableCount, setAvailableCount] = useState(12);
  const [assignedCount, setAssignedCount] = useState(4);
  const [tonnesToCollect, setTonnesToCollect] = useState(18.6);
  const [todayEarnings, setTodayEarnings] = useState(8400);

  // Available Collection Jobs (Part 13)
  const [availableJobs, setAvailableJobs] = useState([
    {
      id: 'JOB-LDH102',
      fieldLocation: 'Ludhiana, Punjab',
      crop: 'Paddy Straw',
      estimatedTonnes: 5.2,
      distance: '8.4 km',
      pickupDate: 'Tomorrow',
      destinationPlant: 'Ludhiana CBG Plant',
      collectionPayment: 2100,
      farmer: 'Gurpreet Singh',
      contact: '+91 98765 11022'
    },
    {
      id: 'JOB-MGA08',
      fieldLocation: 'Moga South, Punjab',
      crop: 'Paddy Straw',
      estimatedTonnes: 6.8,
      distance: '9.4 km',
      pickupDate: 'Tomorrow Morning',
      destinationPlant: 'Ludhiana CBG Plant',
      collectionPayment: 2720,
      farmer: 'Harinder Gill',
      contact: '+91 98765 22033'
    },
    {
      id: 'JOB-SGR14',
      fieldLocation: 'Sangrur Central, Punjab',
      crop: 'Paddy Straw',
      estimatedTonnes: 5.0,
      distance: '11.2 km',
      pickupDate: 'Oct 12',
      destinationPlant: 'Sangrur Bio-Energy',
      collectionPayment: 2000,
      farmer: 'Jasbir Dhaliwal',
      contact: '+91 98765 33044'
    },
    {
      id: 'JOB-JAG05',
      fieldLocation: 'Jagraon West, Punjab',
      crop: 'Paddy Straw',
      estimatedTonnes: 4.8,
      distance: '6.5 km',
      pickupDate: 'Oct 13',
      destinationPlant: 'Ludhiana CBG Plant',
      collectionPayment: 1920,
      farmer: 'Sukhdev Singh',
      contact: '+91 98765 44055'
    }
  ]);

  // Active Assigned Jobs
  const [myJobs, setMyJobs] = useState([
    {
      id: 'JOB-LDH98',
      fieldLocation: 'Jagraon, Ludhiana',
      estimatedTonnes: 5.2,
      balerUnit: 'Baler Unit #02',
      driver: 'Manjit Singh',
      destinationPlant: 'Ludhiana CBG Plant',
      statusText: 'En Route to Plant',
      statusColor: 'emerald',
      eta: 'ETA: 35 mins'
    },
    {
      id: 'JOB-JAG12',
      fieldLocation: 'Sidhwan Bet, Punjab',
      estimatedTonnes: 4.8,
      balerUnit: 'Baler Unit #01',
      driver: 'Kuldeep Singh',
      destinationPlant: 'Ludhiana CBG Plant',
      statusText: 'Scheduled for Pickup',
      statusColor: 'blue',
      eta: 'Today 2:30 PM'
    },
    {
      id: 'JOB-BNL03',
      fieldLocation: 'Barnala Road, Punjab',
      estimatedTonnes: 6.1,
      balerUnit: 'Baler Unit #03',
      driver: 'Avtar Singh',
      destinationPlant: 'Sangrur Bio-Energy',
      statusText: 'Baling In Progress',
      statusColor: 'amber',
      eta: '65% Complete'
    },
    {
      id: 'JOB-RAI09',
      fieldLocation: 'Raikot East, Punjab',
      estimatedTonnes: 2.5,
      balerUnit: 'Baler Unit #01',
      driver: 'Kuldeep Singh',
      destinationPlant: 'Ludhiana CBG Plant',
      statusText: 'Loading Bales',
      statusColor: 'teal',
      eta: 'Departing in 15m'
    }
  ]);

  const [acceptedJobIds, setAcceptedJobIds] = useState([]);

  // Handle Accept Job action
  const handleAcceptJob = (job) => {
    if (acceptedJobIds.includes(job.id)) return;

    setAcceptedJobIds([...acceptedJobIds, job.id]);
    setAvailableJobs(availableJobs.filter(j => j.id !== job.id));
    setAvailableCount(prev => Math.max(0, prev - 1));
    setAssignedCount(prev => prev + 1);
    setTonnesToCollect(prev => Math.round((prev + job.estimatedTonnes) * 10) / 10);
    setTodayEarnings(prev => prev + job.collectionPayment);

    // Add to My Jobs
    const newJob = {
      id: job.id,
      fieldLocation: job.fieldLocation,
      estimatedTonnes: job.estimatedTonnes,
      balerUnit: 'Baler Unit #02',
      driver: 'Manjit Singh',
      destinationPlant: job.destinationPlant,
      statusText: 'Dispatched to Field',
      statusColor: 'emerald',
      eta: 'Pickup: ' + job.pickupDate
    };
    setMyJobs([newJob, ...myJobs]);
  };

  return (
    <div className="min-h-screen bg-[#fbfcf9] flex flex-col md:flex-row">
      {/* 1. Baler Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-950 text-white flex-shrink-0 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                🚜
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-white">
                  ਪਰਾਲੀ<span className="text-amber-400">Pay</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Baler / Collector Portal
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-sm font-medium">
            <button
              onClick={() => {
                setActiveTab('overview');
                document.getElementById('baler-overview')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('available');
                document.getElementById('baler-available-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'available'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span>Available Jobs</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                {availableCount}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('myjobs');
                document.getElementById('baler-my-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'myjobs'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>My Jobs</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                {assignedCount}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('route');
                document.getElementById('baler-route-map')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'route'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>Route / Map</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('earnings');
                document.getElementById('baler-earnings')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'earnings'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <IndianRupee className="w-4 h-4" />
              <span>Earnings</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('profile');
                document.getElementById('baler-fleet-profile')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Fleet Profile</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button
            onClick={() => onNavigate && onNavigate('landing')}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <span>Platform Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('farmer')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            🌾 Switch to Farmer Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('plant')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            🏭 Switch to Plant Portal
          </button>
          <button
            onClick={() => onNavigate && onNavigate('procurement')}
            className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] text-slate-500 hover:text-amber-300 transition-colors cursor-pointer"
          >
            🏢 Switch to Coordinator HQ
          </button>
        </div>
      </aside>

      {/* 2. Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Singh Agri Machinery Services
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                  Fleet Active (3 Balers)
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Ludhiana West Hub, Punjab</span>
                <span>·</span>
                <span className="text-slate-400 font-mono">Baler ID: PB-BLR-04</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Dispatch</span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Switch Role / Exit
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* Section Header & Overview */}
          <section id="baler-overview" className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Tractor className="w-3.5 h-3.5 text-amber-700" />
                Punjab Residue Logistics & Fleet Dispatch
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Baler / Residue Collector Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time dispatch coordination connecting Punjab baler units with verified farmer fields and bio-refineries.
              </p>
            </div>

            {/* PART 13 OVERVIEW METRICS: Available Jobs: 12, Assigned: 4, Tonnes: 18.6 t, Today's Earnings: ₹8,400 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Metric 1: Available Jobs */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Jobs</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {availableCount}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mt-1">
                  Ludhiana & Moga Clusters
                </div>
              </div>

              {/* Metric 2: Assigned Jobs */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Jobs</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {assignedCount}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Active in Pipeline
                </div>
              </div>

              {/* Metric 3: Tonnes to Collect */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tonnes to Collect</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 font-mono">
                  {tonnesToCollect} <span className="text-sm font-bold text-slate-500 font-sans">t</span>
                </div>
                <div className="text-[11px] text-blue-700 font-semibold mt-1">
                  Scheduled Today & Tomorrow
                </div>
              </div>

              {/* Metric 4: Today's Earnings */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Earnings</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-900 font-mono">
                  ₹{todayEarnings.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Escrow Settlement Ready
                </div>
              </div>

            </div>
          </section>

          {/* PART 13: AVAILABLE JOBS SECTION */}
          <section id="baler-available-jobs" aria-labelledby="available-jobs-title" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="available-jobs-title" className="text-xl font-extrabold text-slate-900">
                  Available Jobs ({availableJobs.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified farmer parcels ready for baling and collection with guaranteed plant off-take.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-5 border-2 border-slate-200/80 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="text-sm font-extrabold text-slate-900">
                            {job.fieldLocation}
                          </div>
                          <div className="text-xs text-slate-500">
                            Farmer: {job.farmer}
                          </div>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold bg-slate-900 text-amber-300 px-2.5 py-1 rounded-lg">
                        {job.id}
                      </span>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Tonnes</span>
                        <span className="text-sm font-black font-mono text-slate-900 mt-0.5 block">
                          {job.estimatedTonnes} tonnes
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Haul Distance</span>
                        <span className="text-sm font-black font-mono text-slate-900 mt-0.5 block">
                          {job.distance}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Pickup Date</span>
                        <span className="text-xs font-bold text-slate-900 mt-0.5 block">
                          {job.pickupDate}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Destination Plant</span>
                        <span className="text-xs font-bold text-emerald-800 mt-0.5 block truncate">
                          {job.destinationPlant}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment & Accept Job Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Collection Payment</span>
                      <span className="text-lg font-black font-mono text-emerald-900">
                        ₹{job.collectionPayment.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAcceptJob(job)}
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept Job</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MY JOBS SECTION (ACTIVE PIPELINE) */}
          <section id="baler-my-jobs" aria-labelledby="my-jobs-title" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h2 id="my-jobs-title" className="text-xl font-extrabold text-slate-900 mb-1">
              My Jobs — Active Pipeline ({myJobs.length})
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Track real-time baler unit assignments, pickup telemetry, and plant gate delivery status.
            </p>

            <div className="space-y-3">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                      🚜
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">{job.id}</span>
                        <span className="text-xs text-slate-500">· {job.fieldLocation}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {job.estimatedTonnes} tonnes · {job.balerUnit} ({job.driver}) → {job.destinationPlant}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {job.eta}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg">
                      {job.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DISPATCH ROUTE & SHORTEST PATH GOOGLE MAP */}
          <DispatchRouteMap activeJob={myJobs[0]} />

          {/* EARNINGS PREVIEW */}
          <div id="baler-earnings" className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Baler Revenue & Escrow</h3>
                <span className="text-xs text-slate-500">Fixed rate ₹1,400 / tonne baling fee</span>
              </div>
              <IndianRupee className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 flex justify-between items-center border border-slate-100">
                <span className="text-slate-600">Today's Collections:</span>
                <span className="font-mono font-bold text-slate-900">6.0 t (₹8,400)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 flex justify-between items-center border border-slate-100">
                <span className="text-slate-600">In-Transit Pipeline:</span>
                <span className="font-mono font-bold text-slate-900">18.6 t (₹26,040)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center">
                <span className="text-emerald-900 font-bold">Weekly Escrow:</span>
                <span className="text-lg font-black font-mono text-emerald-900">₹34,440</span>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant automated release upon plant weighbridge QR scan</span>
            </div>
          </div>

          {/* FLEET PROFILE SECTION */}
          <section id="baler-fleet-profile" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-3 h-3 text-amber-700" />
                  Verified Operator Registry
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Fleet Profile & Machinery Specifications
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Registered Punjab baler machines, telemetry status, and certified drivers under PB-BLR-04.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5 w-fit">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Punjab Govt Subsidy & CRM Registered</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-sm">Baler Unit #01</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Active</span>
                </div>
                <div className="text-slate-600">Model: Claas Markant 65 High-Density</div>
                <div className="text-slate-600">Driver: Kuldeep Singh</div>
                <div className="text-slate-500 text-[11px] font-mono">Daily Capacity: 40 tonnes/day</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-sm">Baler Unit #02</strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">Active</span>
                </div>
                <div className="text-slate-600">Model: New Holland Roll-Belt 450</div>
                <div className="text-slate-600">Driver: Manjit Singh</div>
                <div className="text-slate-500 text-[11px] font-mono">Daily Capacity: 45 tonnes/day</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 text-sm">Baler Unit #03</strong>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">Maintenance</span>
                </div>
                <div className="text-slate-600">Model: John Deere 459 Standard Round</div>
                <div className="text-slate-600">Driver: Avtar Singh</div>
                <div className="text-slate-500 text-[11px] font-mono">Daily Capacity: 35 tonnes/day</div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
