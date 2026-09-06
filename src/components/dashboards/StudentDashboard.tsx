'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Clock,
  Layers,
  FileCheck2,
  BookOpen,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Award,
  PlusCircle,
  Building,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export const StudentDashboard: React.FC = () => {
  const {
    studentProfile,
    logEntries,
    applications,
    internships,
    calculateMatchScore,
    completedCourses,
    setActiveView,
  } = useApp();

  const verifiedLogs = logEntries.filter((l) => l.verificationStatus === 'verified');
  const pendingLogs = logEntries.filter((l) => l.verificationStatus === 'pending');

  const topJobs = internships.slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Hero */}
      <div className="bg-gradient-to-r from-forest via-forest-light to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-900/60 p-1 border-2 border-turmeric-400 shadow-md shrink-0">
              <img
                src={studentProfile.avatarUrl}
                alt={studentProfile.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs text-turmeric-300 font-semibold uppercase tracking-wider">
                  Ayush Scholar Portal
                </span>
                <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded border border-emerald-700 font-mono">
                  {studentProfile.registrationNo}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Namaste, {studentProfile.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                {studentProfile.degree} • {studentProfile.institution}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setActiveView('dossier')}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-turmeric-500 hover:bg-turmeric-600 text-slate-950 rounded-xl text-xs font-bold transition-colors shadow-md"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Open Ayush Dossier</span>
            </button>
            <button
              onClick={() => setActiveView('skill_engine')}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-900/70 hover:bg-emerald-900 text-emerald-100 rounded-xl text-xs font-semibold border border-emerald-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Check Skill Gaps</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/60">
          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Clinical Hours</span>
              <Clock className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {studentProfile.totalClinicalHours}{' '}
              <span className="text-xs font-normal text-emerald-300">hrs</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Panchakarma & IPD Rotation</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Formulation Batches</span>
              <Layers className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {studentProfile.totalFormulationBatches}{' '}
              <span className="text-xs font-normal text-emerald-300">batches</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">GMP Pilot Plant Certified</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Active Applications</span>
              <Briefcase className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {applications.length}{' '}
              <span className="text-xs font-normal text-emerald-300">active</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Dossiers Under Industry Review</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Bridge Modules</span>
              <Award className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {completedCourses.length}{' '}
              <span className="text-xs font-normal text-emerald-300">completed</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">CCRAS / SWAYAM Certified</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Logbook & Skill Match Quick view */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Skill-Match Highlight */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                  Target Industry Match Analysis
                </h4>
                <p className="text-xs text-slate-500">
                  Top corporate openings tailored to your verified Ayush clinical & QC records.
                </p>
              </div>
              <button
                onClick={() => setActiveView('skill_engine')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <span>Full Gap Analyzer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {topJobs.map((job) => {
                const score = calculateMatchScore(job);
                return (
                  <div
                    key={job.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 hover:bg-emerald-50/20 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                          {job.company}
                        </span>
                        <span className="text-xs text-slate-500">{job.location.split(',')[0]}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-sm mt-1 truncate">
                        {job.title}
                      </h5>
                      <span className="text-xs text-slate-600 font-medium">
                        {job.stipendOrSalary} • {job.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div
                          className={`text-sm font-black ${
                            score >= 80 ? 'text-emerald-700' : 'text-amber-600'
                          }`}
                        >
                          {score}%
                        </div>
                        <span className="text-[10px] text-slate-400">Match</span>
                      </div>
                      <button
                        onClick={() => setActiveView('skill_engine')}
                        className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs transition-colors"
                        title="Analyze Gaps"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Logbook Overview */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-700" />
                  Recent Clinical & Lab Logbook Records
                </h4>
                <p className="text-xs text-slate-500">
                  {verifiedLogs.length} verified by college dean, {pendingLogs.length} awaiting sign-off.
                </p>
              </div>
              <button
                onClick={() => setActiveView('dossier')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <span>View Full Logbook</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {logEntries.slice(0, 3).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold text-emerald-800 uppercase">
                      {log.department.split(' ')[0]} • {log.hoursOrBatch}
                    </span>
                    <h5 className="font-bold text-slate-900 truncate mt-0.5">{log.title}</h5>
                    <span className="text-slate-500 text-[11px]">{log.supervisor}</span>
                  </div>

                  <div className="shrink-0">
                    {log.verificationStatus === 'verified' ? (
                      <Badge variant="success" size="sm">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm">
                        Pending Sign-off
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Application Status & Bridge Modules */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Applications Card */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              Active Applications
            </h4>
            <p className="text-xs text-slate-500">
              Track your transmitted Ayush Digital Dossiers
            </p>

            <div className="space-y-2">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{app.company}</span>
                    <Badge
                      variant={app.status === 'shortlisted' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {app.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-slate-600 truncate">{app.internshipTitle}</p>
                  <span className="text-[10px] text-slate-400 block">Applied: {app.appliedDate}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveView('internships')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
            >
              Browse More Ayush Openings
            </button>
          </div>

          {/* CCRAS Bridge Course Card */}
          <div className="bg-gradient-to-br from-emerald-950 to-forest-dark text-white rounded-2xl p-5 border border-emerald-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-turmeric-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>CCRAS / SWAYAM Bridge</span>
            </div>
            <h4 className="font-bold text-white text-sm">
              Upgrade Your Instrumentation Skills
            </h4>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Complete free Ministry-accredited bridge modules in HPTLC, Schedule T GMP, and AAS heavy metal limits to boost your eligibility for FMCG leaders like Himalaya and Dabur.
            </p>
            <button
              onClick={() => setActiveView('skill_engine')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              View Free Bridge Modules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
