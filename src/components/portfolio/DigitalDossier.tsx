'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CompetencyRadar } from './CompetencyRadar';
import { VerificationBadges } from './VerificationBadges';
import { LogbookSection } from './LogbookSection';
import {
  FileCheck2,
  Download,
  Share2,
  ShieldCheck,
  Award,
  Sparkles,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  Clock,
  Printer,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const DigitalDossier: React.FC = () => {
  const { studentProfile, logEntries, setNotification } = useApp();
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    setIsCopied(true);
    setNotification('Encrypted Dossier Verification URL copied to clipboard: https://ayush-setu.gov.in/verify/DL-AYU-2023-8841');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDownload = () => {
    setNotification('Generating Official Ayush Digital Dossier (PDF) with NCISM cryptographic seal...');
    setTimeout(() => {
      setNotification('Ayush Digital Dossier (PDF) successfully generated!');
    }, 1200);
  };

  const verifiedLogsCount = logEntries.filter((l) => l.verificationStatus === 'verified').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Candidate Header */}
      <div className="bg-gradient-to-r from-forest via-forest-light to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar with State Council Badge */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-900/60 p-1 border-2 border-turmeric-400 shadow-lg">
                <img
                  src={studentProfile.avatarUrl}
                  alt={studentProfile.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div
                className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full shadow-md border-2 border-white"
                title="State Ayush Council Verified"
              >
                <ShieldCheck className="w-4 h-4 text-turmeric-300" />
              </div>
            </div>

            {/* Information */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {studentProfile.name}
                </h2>
                <Badge variant="gold" size="sm">
                  Verified Candidate
                </Badge>
                <span className="bg-emerald-900/80 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full border border-emerald-700 font-mono">
                  {studentProfile.registrationNo}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                {studentProfile.degree}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/90 pt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-turmeric-300" />
                  {studentProfile.institution}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-turmeric-300" />
                  NCISM Endorsed Scholar
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleShare}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-900/70 hover:bg-emerald-900 text-emerald-100 rounded-xl text-xs font-semibold border border-emerald-700 transition-colors shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>{isCopied ? 'URL Copied!' : 'Share Dossier'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-turmeric-500 hover:bg-turmeric-600 text-slate-950 rounded-xl text-xs font-bold transition-colors shadow-md"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Export Ayush PDF</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Pill Cards */}
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
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Supervised IPD/OPD Rotations</p>
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
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Schedule T GMP Pilot Plant</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Verified Logbook Logs</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {verifiedLogsCount}{' '}
              <span className="text-xs font-normal text-emerald-300">/ {logEntries.length}</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Signed off by College Dean</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Council Licensing</span>
              <ShieldCheck className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-base sm:text-lg font-bold text-emerald-200 truncate">
              NCISM Central
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Good Standing Registry</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Badges & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <CompetencyRadar />
          <VerificationBadges />
        </div>

        <div className="lg:col-span-7">
          <LogbookSection />
        </div>
      </div>
    </div>
  );
};
