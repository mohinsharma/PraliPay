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
  Factory
} from 'lucide-react';

export default function BalerDashboard({ onOpenRoleModal }) {
  const [assignedCount, setAssignedCount] = useState(4);
  const [acceptedJobs, setAcceptedJobs] = useState([]);

  // Available Collection Jobs
  const availableJobs = [
    {
      id: 'JOB-LDH102',
      fieldId: 'Field #PB-LDH102',
      location: 'Ludhiana West',
      crop: 'Paddy Straw',
      area: '4.2 acres',
      residue: '5.2 tonnes',
      distance: '7.2 km',
      destination: 'Ludhiana CBG Plant',
      ratePerTonne: '₹1,400',
      payout: '₹7,280',
      status: 'Ready for Baler',
      farmer: 'Gurpreet Singh'
    },
    {
      id: 'JOB-MGA08',
      fieldId: 'Field #PB-MGA08',
      location: 'Moga South',
      crop: 'Paddy Straw',
      area: '5.5 acres',
      residue: '6.8 tonnes',
      distance: '9.4 km',
      destination: 'Ludhiana CBG Plant',
      ratePerTonne: '₹1,400',
      payout: '₹9,520',
      status: 'Harvest Complete',
      farmer: 'Harinder Gill'
    },
    {
      id: 'JOB-SGR14',
      fieldId: 'Field #PB-SGR14',
      location: 'Sangrur Central',
      crop: 'Paddy Straw',
      area: '4.0 acres',
      residue: '5.0 tonnes',
      distance: '11.2 km',
      destination: 'Sangrur Bio-Energy',
      ratePerTonne: '₹1,400',
      payout: '₹7,000',
      status: 'AI Verified',
      farmer: 'Jasbir Dhaliwal'
    }
  ];

  // Active Collection Job Pipeline
  const activeJobs = [
    {
      id: 'JOB-LDH98',
      fieldId: 'Field #PB-LDH98',
      location: 'Jagraon, Ludhiana',
      residue: '5.2 tonnes',
      balerUnit: 'Baler Unit #02',
      driver: 'Manjit Singh',
      destination: 'Ludhiana CBG Plant',
      statusText: 'En Route to Plant',
      statusColor: 'emerald',
      eta: 'ETA: 35 mins'
    },
    {
      id: 'JOB-JAG12',
      fieldId: 'Field #PB-JAG12',
      location: 'Sidhwan Bet',
      residue: '4.8 tonnes',
      balerUnit: 'Baler Unit #01',
      driver: 'Kuldeep Singh',
      destination: 'Ludhiana CBG Plant',
      statusText: 'Scheduled for Pickup',
      statusColor: 'blue',
      eta: 'Today 2:30 PM'
    },
    {
      id: 'JOB-BNL03',
      fieldId: 'Field #PB-BNL03',
      location: 'Barnala Road',
      residue: '6.1 tonnes',
      balerUnit: 'Baler Unit #03',
      driver: 'Avtar Singh',
      destination: 'Sangrur Bio-Energy',
      statusText: 'Baling In Progress',
      statusColor: 'amber',
      eta: '65% Complete'
    }
  ];

  const handleAcceptJob = (jobId) => {
    if (!acceptedJobs.includes(jobId)) {
      setAcceptedJobs([...acceptedJobs, jobId]);
      setAssignedCount(prev => prev + 1);
    }
  };

  return (
    <section id="baler-dashboard" className="relative py-20 md:py-28 bg-[#fbfcf9] border-b border-slate-200/60 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Tractor className="w-3.5 h-3.5 text-amber-700" />
            Baler Dispatch & Fleet Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Baler Operator Dashboard
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Coordinating Punjab's mobile baler fleets with verified farmer fields and scheduled bio-plant delivery slots.
          </p>
        </div>

        {/* Baler Profile Header Bar */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
              <Tractor className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Singh Agri Machinery Services
                </h3>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Baler
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-2">
                <span>📍 Ludhiana West Hub</span>
                <span>•</span>
                <span>Fleet: 3 Round Balers · 2 Rakes · 4 Tractors</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">4.9 ★ (84 Pickups Completed)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Available for Dispatch</span>
            </span>
          </div>
        </div>

        {/* 4-Metric Key Performance Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Jobs</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              14 <span className="text-sm font-normal text-slate-500">fields</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Within 15 km operating radius
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Jobs</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              {assignedCount} <span className="text-sm font-normal text-slate-500">active</span>
            </div>
            <div className="text-xs text-blue-700 font-medium mt-1">
              2 En Route · 2 Scheduled
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tonnes to Collect</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              24.8 <span className="text-sm font-normal text-slate-500">tonnes</span>
            </div>
            <div className="text-xs text-emerald-800 font-medium mt-1">
              Today's scheduled quota
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Earnings</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-emerald-800 font-mono tracking-tight">
              ₹34,720
            </div>
            <div className="text-xs text-emerald-700 font-medium mt-1">
              Direct DBT to bank account
            </div>
          </div>

        </div>

        {/* Two-Column Grid: Left (Recommended Jobs & Pipeline) / Right (Punjab Map & Dispatch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Recommended Jobs & Job Status (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Recommended Collection Jobs */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-900/10 shadow-md">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Recommended Collection Jobs
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clustered fields matched to minimize diesel transit
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Auto-Optimized
                </span>
              </div>

              <div className="space-y-4">
                {availableJobs.map((job) => {
                  const isAccepted = acceptedJobs.includes(job.id);
                  return (
                    <div 
                      key={job.id}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-emerald-400/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {job.fieldId}
                          </span>
                          <span className="text-xs text-slate-600 font-semibold">
                            📍 {job.location}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                            {job.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-0.5 pt-1">
                          <span>Crop: <strong>{job.crop}</strong></span>
                          <span>•</span>
                          <span>Residue: <strong>{job.residue}</strong> ({job.area})</span>
                          <span>•</span>
                          <span>Haul: <strong>{job.distance}</strong> to {job.destination}</span>
                        </div>
                        <div className="text-xs text-slate-500 pt-0.5">
                          Farmer: {job.farmer} · Rate: {job.ratePerTonne} / tonne
                        </div>
                      </div>

                      <div className="flex items-center sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-500 block">Baler Payout</span>
                          <span className="text-base font-extrabold text-emerald-800 font-mono">
                            {job.payout}
                          </span>
                        </div>

                        {isAccepted ? (
                          <div className="inline-flex items-center gap-1.5 bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                            <span>Accepted</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAcceptJob(job.id)}
                            className="inline-flex items-center gap-1.5 bg-agri-forest hover:bg-agri-darkest text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
                          >
                            <span>Accept & Dispatch</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Collection Job Status (Active Fleet) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-900/10 shadow-md">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Collection Job Status
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live telemetry for currently dispatched machinery
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                  Active Units: 3
                </span>
              </div>

              <div className="space-y-3.5">
                {activeJobs.map((job) => (
                  <div 
                    key={job.id}
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-amber-600 mt-0.5">
                        <Tractor className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{job.fieldId}</span>
                          <span className="text-xs text-slate-500">· {job.location}</span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">
                          {job.balerUnit} ({job.driver}) · <strong>{job.residue}</strong>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Delivery: {job.destination}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <div className={`text-xs font-bold px-2.5 py-0.5 rounded-md inline-block ${
                        job.statusColor === 'emerald'
                          ? 'bg-emerald-100 text-emerald-800'
                          : job.statusColor === 'blue'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {job.statusText}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {job.eta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Simple Punjab Map & Dispatch Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Simple Punjab Corridor Map Card */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Punjab Fleet Map</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ludhiana Corridor
                </span>
              </div>

              {/* Simple stylized Punjab corridor graphic */}
              <div className="relative h-60 rounded-2xl bg-[#f6faf5] border border-emerald-100 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 grid-pattern opacity-60" />

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Route curves connecting Moga to Jagraon to Ludhiana */}
                  <path 
                    d="M 20,40 Q 45,35 75,55" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="1.8" 
                    strokeDasharray="3,3" 
                    className="animate-flow-dash"
                  />
                  <path 
                    d="M 30,75 Q 55,65 75,55" 
                    fill="none" 
                    stroke="#d97706" 
                    strokeWidth="1.4" 
                    strokeDasharray="2,2" 
                    className="animate-flow-dash"
                  />
                </svg>

                {/* Baler 01 Node */}
                <div className="absolute top-[35%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                  <div className="p-1.5 rounded-full bg-amber-500 text-white shadow-md animate-pulse">
                    <Tractor className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-800 bg-white/90 px-1.5 py-0.2 rounded border border-slate-200 mt-1 block">
                    Baler #01
                  </span>
                </div>

                {/* Baler 02 Node */}
                <div className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                  <div className="p-1.5 rounded-full bg-emerald-600 text-white shadow-md">
                    <Tractor className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-800 bg-white/90 px-1.5 py-0.2 rounded border border-slate-200 mt-1 block">
                    Baler #02
                  </span>
                </div>

                {/* Destination: Plant Node */}
                <div className="absolute top-[55%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                  <div className="p-2 rounded-xl bg-agri-forest text-white shadow-lg border border-emerald-400">
                    <Factory className="w-4 h-4 text-emerald-300" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-900 bg-white/95 px-2 py-0.5 rounded border border-emerald-300 mt-1 block shadow-xs">
                    Ludhiana CBG
                  </span>
                </div>
              </div>

              {/* Haulage efficiency callout */}
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Cluster Aggregation Engine</span>
                </div>
                <p className="text-slate-600">
                  Empty-run tractor transit reduced by 34% by grouping adjacent paddy fields along the GT Road corridor.
                </p>
              </div>
            </div>

            {/* Quick Baler Operator Actions */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-md">
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                Operator Support & Dispatch
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Need customized route scheduling or direct weighbridge assistance at the plant?
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => onOpenRoleModal('baler')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Tractor className="w-4 h-4 text-amber-600" />
                    <span>Register Additional Baler Machinery</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Punjab Baler Helpline</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900">+91 161 245 8890</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
