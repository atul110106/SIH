'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/data/types';
import { GraduationCap, Building2, Briefcase, Landmark, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole } = useApp();

  const roles: {
    id: UserRole;
    title: string;
    badge: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'student',
      title: 'Student / Scholar',
      badge: 'Dr. Ananya Sharma (BAMS)',
      description: 'Logbook, Digital Dossier, Skill Gap & Apply',
      icon: GraduationCap,
    },
    {
      id: 'academic',
      title: 'Academic Institution',
      badge: 'AIIA Placement & Dean',
      description: 'Verify Student Logbooks & Manage MoUs',
      icon: Building2,
    },
    {
      id: 'industry',
      title: 'Industry Partner',
      badge: 'Himalaya & Dabur R&D',
      description: 'Post Internships, Review Dossiers & R&D Challenges',
      icon: Briefcase,
    },
    {
      id: 'ministry',
      title: 'Ministry Admin',
      badge: 'Ministry of Ayush / NCISM',
      description: 'National Skill-Gap Heatmap & Macro Analytics',
      icon: Landmark,
    },
  ];

  return (
    <div className="flex items-center gap-1 bg-emerald-950/40 p-1 rounded-xl border border-emerald-800/60 overflow-x-auto max-w-full">
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = currentRole === role.id;
        return (
          <button
            key={role.id}
            onClick={() => setCurrentRole(role.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
              isActive
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/40'
                : 'text-emerald-100/70 hover:text-white hover:bg-emerald-800/50'
            )}
            title={`${role.title}: ${role.description}`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline">{role.title}</span>
            <span className="md:hidden">{role.title.split(' ')[0]}</span>
            {isActive && <Check className="w-3 h-3 text-emerald-200 shrink-0" />}
          </button>
        );
      })}
    </div>
  );
};
