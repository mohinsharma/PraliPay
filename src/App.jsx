import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import PunjabDashboard from './components/PunjabDashboard';
import DecisionEngineSection from './components/DecisionEngineSection';
import BalerDashboard from './components/BalerDashboard';
import ImpactSection from './components/ImpactSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import RoleModal from './components/RoleModal';
import LocationModal from './components/LocationModal';

export default function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    role: 'farmer'
  });

  const [locationModalState, setLocationModalState] = useState({
    isOpen: false,
    targetLocation: ''
  });

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

  return (
    <div className="min-h-screen bg-[#f8faf7] flex flex-col selection:bg-emerald-500/20 selection:text-emerald-950">
      {/* Sticky Glassmorphic Navbar with Interactive Punjab Location Selector */}
      <Navbar 
        onOpenRoleModal={() => handleOpenRoleModal('farmer')} 
        onSelectUnavailableLocation={handleSelectUnavailableLocation}
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

        {/* 6. Baler Operator Dashboard (Available Jobs, Telemetry, Earnings, Profile) */}
        <BalerDashboard onOpenRoleModal={(role) => handleOpenRoleModal(role || 'baler')} />

        {/* 7. AI Economic Decision Engine (Field #PB-LDH102 Ludhiana, Punjab) */}
        <DecisionEngineSection onOpenRoleModal={() => handleOpenRoleModal('farmer')} />

        {/* 7. Impact Section */}
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
