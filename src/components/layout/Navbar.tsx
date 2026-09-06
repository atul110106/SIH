'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RoleSwitcher } from './RoleSwitcher';
import {
  Menu,
  X,
  Sparkles,
  BookOpen,
  Briefcase,
  FlaskConical,
  MapPin,
  FileCheck2,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    activeView,
    setActiveView,
    fontSize,
    setFontSize,
    notification,
    applications,
    logEntries,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Count pending badges
  const pendingLogsCount = logEntries.filter((l) => l.verificationStatus === 'pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'dossier', label: 'Ayush Dossier', icon: FileCheck2 },
    { id: 'skill_engine', label: 'Skill Gap & Bridge', icon: BookOpen },
    { id: 'internships', label: 'Internships & Jobs', icon: Briefcase },
    { id: 'challenges', label: 'R&D Marketplace', icon: FlaskConical },
    { id: 'heatmap', label: 'Skill Heatmap', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-forest text-white shadow-md border-b border-emerald-800">
      {/* Top Official Government Banner */}
      <div className="bg-forest-dark text-[11px] sm:text-xs text-emerald-200/90 py-1 px-4 sm:px-8 border-b border-emerald-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Emblem of India Icon simulation */}
          <div className="flex items-center gap-1.5 font-semibold text-emerald-100">
            <span className="w-2 h-2 rounded-full bg-turmeric-400 animate-pulse"></span>
            <span>भारत सरकार | Government of India</span>
          </div>
          <span className="text-emerald-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline font-medium text-emerald-300">
            आयुष मंत्रालय (Ministry of Ayush) — SIH26044
          </span>
        </div>

        {/* Accessibility & Language Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
            <span className="text-slate-400">Text Size:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={cn(
                'px-1 hover:text-white font-bold',
                fontSize === 'normal' ? 'text-turmeric-400' : 'text-slate-300'
              )}
              title="Normal font size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={cn(
                'px-1 hover:text-white font-bold text-xs',
                fontSize === 'large' ? 'text-turmeric-400' : 'text-slate-300'
              )}
              title="Large font size"
            >
              A+
            </button>
          </div>
          <span className="text-emerald-300/80 text-[11px] font-medium hidden md:inline">
            Toll-Free Ayush Helpline: 1800-11-22-02
          </span>
        </div>
      </div>

      {/* Main Branding & Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo & Portal Identity */}
        <div
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          onClick={() => setActiveView('dashboard')}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-turmeric-500 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-forest rounded-[10px] flex items-center justify-center">
              <span className="text-turmeric-400 font-serif font-black text-xl">आ</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-200 transition-colors">
                AYUSH-SETU
              </h1>
              <span className="bg-turmeric-500/20 text-turmeric-300 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-turmeric-500/30">
                SIH26044
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 font-medium leading-none hidden sm:block">
              National Academia-Industry Skill Mapping & Placement Portal
            </p>
          </div>
        </div>

        {/* Center: Role Switcher (Desktop) */}
        <div className="hidden lg:flex items-center">
          <RoleSwitcher />
        </div>

        {/* Right: Notification & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Role Indicator on Mobile */}
          <div className="lg:hidden">
            <RoleSwitcher />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs (Desktop) */}
      <nav className="hidden lg:block bg-forest-light/60 border-t border-emerald-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative border-b-2',
                    isActive
                      ? 'text-white border-turmeric-400 bg-emerald-800/50'
                      : 'text-emerald-100/70 border-transparent hover:text-white hover:bg-emerald-800/30'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.id === 'dossier' && currentRole === 'academic' && pendingLogsCount > 0 && (
                    <span className="bg-amber-500 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {pendingLogsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-emerald-200/70 flex items-center gap-2 py-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Ayush Portal v2.4 Active</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-forest-dark border-t border-emerald-800 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-emerald-100 hover:bg-emerald-900/60'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-turmeric-400" />
                  <span>{item.label}</span>
                </div>
                {item.id === 'dossier' && currentRole === 'academic' && pendingLogsCount > 0 && (
                  <span className="bg-amber-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    {pendingLogsCount} pending
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Global Toast Notification */}
      {notification && (
        <div className="bg-gradient-to-r from-emerald-900 to-forest-dark border-b border-turmeric-400/40 text-emerald-100 px-4 py-2 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-inner animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-turmeric-400 shrink-0" />
          <span className="font-medium text-center">{notification}</span>
        </div>
      )}
    </header>
  );
};
