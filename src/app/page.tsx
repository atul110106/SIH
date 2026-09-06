'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Footer } from '@/components/layout/Footer';
import { StudentDashboard } from '@/components/dashboards/StudentDashboard';
import { AcademicDashboard } from '@/components/dashboards/AcademicDashboard';
import { IndustryDashboard } from '@/components/dashboards/IndustryDashboard';
import { MinistryDashboard } from '@/components/dashboards/MinistryDashboard';
import { DigitalDossier } from '@/components/portfolio/DigitalDossier';
import { SkillGapEngine } from '@/components/skill-engine/SkillGapEngine';
import { InternshipList } from '@/components/internships/InternshipList';
import { ChallengeMarketplace } from '@/components/challenges/ChallengeMarketplace';

export default function Home() {
  const { currentRole, activeView, fontSize } = useApp();

  // Apply font size scaling to body
  useEffect(() => {
    document.body.classList.remove('font-large', 'font-larger');
    if (fontSize === 'large') {
      document.body.classList.add('font-large');
    } else if (fontSize === 'larger') {
      document.body.classList.add('font-larger');
    }
  }, [fontSize]);

  const renderContent = () => {
    switch (activeView) {
      case 'dossier':
        return <DigitalDossier />;
      case 'skill_engine':
        return <SkillGapEngine />;
      case 'internships':
        return <InternshipList />;
      case 'challenges':
        return <ChallengeMarketplace />;
      case 'heatmap':
        return <MinistryDashboard />;
      case 'dashboard':
      default:
        switch (currentRole) {
          case 'student':
            return <StudentDashboard />;
          case 'academic':
            return <AcademicDashboard />;
          case 'industry':
            return <IndustryDashboard />;
          case 'ministry':
            return <MinistryDashboard />;
        }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 px-3 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
