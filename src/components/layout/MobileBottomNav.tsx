'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, FileCheck2, BookOpen, Briefcase, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileBottomNav: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const items = [
    { id: 'dashboard', label: 'Home', icon: Sparkles },
    { id: 'dossier', label: 'Dossier', icon: FileCheck2 },
    { id: 'skill_engine', label: 'Skill Gap', icon: BookOpen },
    { id: 'internships', label: 'Jobs', icon: Briefcase },
    { id: 'challenges', label: 'R&D', icon: FlaskConical },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              'flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors flex-1',
              isActive
                ? 'text-emerald-800 font-bold'
                : 'text-slate-500 hover:text-emerald-700'
            )}
          >
            <div
              className={cn(
                'p-1 rounded-full transition-all',
                isActive ? 'bg-emerald-100 text-emerald-800' : ''
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
