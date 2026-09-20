import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import PunjabDashboard from './components/PunjabDashboard';
import ImpactSection from './components/ImpactSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import RoleModal from './components/RoleModal';
import LocationModal from './components/LocationModal';

// Separate Dedicated Role Dashboards
import FarmerDashboardView from './components/farmer/FarmerDashboardView';
import BalerDashboardView from './components/baler/BalerDashboardView';
import PlantDashboardView from './components/plant/PlantDashboardView';
import ProcurementDashboardView from './components/admin/ProcurementDashboardView';

export default function App() {
  // Determine initial view from window location pathname or hash
  const getInitialView = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('/farmer/dashboard') || hash.includes('/farmer/dashboard')) return 'farmer';
    if (path.includes('/baler/dashboard') || hash.includes('/baler/dashboard')) return 'baler';
    if (path.includes('/plant/dashboard') || hash.includes('/plant/dashboard')) return 'plant';
    if (path.includes('/procurement/dashboard') || hash.includes('/procurement/dashboard') || path.includes('/admin/dashboard') || hash.includes('/admin/dashboard')) return 'procurement';
    return 'landing';
  };

  const [currentView, setCurrentView] = useState(getInitialView);

  const [modalState, setModalState] = useState({
    isOpen: false,
    role: 'farmer'
  });

  const [locationModalState, setLocationModalState] = useState({
    isOpen: false,
    targetLocation: ''
  });

  // Handle navigation between views with browser history support
  const handleNavigate = (view) => {
    setCurrentView(view);
    let targetPath = '/';
    if (view === 'farmer') targetPath = '/farmer/dashboard';
    else if (view === 'baler') targetPath = '/baler/dashboard';
    else if (view === 'plant') targetPath = '/plant/dashboard';
    else if (view === 'procurement' || view === 'admin') targetPath = '/procurement/dashboard';

    window.history.pushState({ view }, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenRoleModal = (role = 'farmer') => {
    setModalState({
      isOpen: true,
      role
    });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleSelectUnavailableLocation = (locationName) => {
    setLocationModalState({
      isOpen: true,
      targetLocation: locationName
    });
  };

  const handleCloseLocationModal = () => {
    setLocationModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Render Dedicated Farmer Dashboard View
  if (currentView === 'farmer') {
    return <FarmerDashboardView onNavigate={handleNavigate} />;
  }

  // Render Dedicated Baler Dashboard View
  if (currentView === 'baler') {
    return <BalerDashboardView onNavigate={handleNavigate} />;
  }

  // Render Dedicated Plant Dashboard View
  if (currentView === 'plant') {
    return <PlantDashboardView onNavigate={handleNavigate} />;
  }

  // Render Dedicated ParaliPay Middleman Procurement Dashboard View
  if (currentView === 'procurement' || currentView === 'admin') {
    return <ProcurementDashboardView onNavigate={handleNavigate} />;
  }

  // Render Original Complete Landing Page (100% Preserved)
  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col selection:bg-emerald-500/20 selection:text-emerald-950">
      {/* Sticky Glassmorphic Navbar with Interactive Punjab Location Selector */}
      <Navbar 
        onOpenRoleModal={() => handleOpenRoleModal('farmer')} 
        onSelectUnavailableLocation={handleSelectUnavailableLocation}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section with Punjab Map Centerpiece */}
        <Hero onOpenRoleModal={() => handleOpenRoleModal('farmer')} />

        {/* 2. Trust / Value Strip */}
        <TrustStrip />

        {/* 3. Punjab-Specific Problem Section (3 Cards: Farmers, Collection, Biomass Plants) */}
        <ProblemSection />

        {/* 4. How It Works (Punjab Field -> AI -> Viability -> Contract -> Baler -> Punjab Bio-Plant) */}
        <HowItWorks />

        {/* 5. Punjab Dashboard: Punjab Network & Feedstock Demand */}
        <PunjabDashboard onOpenRoleModal={() => handleOpenRoleModal('plant')} />

        {/* 6. Impact Section */}
        <ImpactSection />

        {/* 8. Final Call To Action */}
        <FinalCTA onSelectRole={(role) => handleOpenRoleModal(role)} />
      </main>

      {/* 9. Footer */}
      <Footer onOpenContact={() => handleOpenRoleModal('farmer')} />

      {/* Interactive Punjab Role Onboarding Modal */}
      <RoleModal
        isOpen={modalState.isOpen}
        initialRole={modalState.role}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />

      {/* Location Availability Modal for Non-Punjab Regions */}
      <LocationModal
        isOpen={locationModalState.isOpen}
        targetLocation={locationModalState.targetLocation}
        onClose={handleCloseLocationModal}
      />
    </div>
  );
}

