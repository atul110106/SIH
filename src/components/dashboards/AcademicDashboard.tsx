'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  FileCheck2,
  ShieldCheck,
  Check,
  X,
  Award,
  Users,
  Briefcase,
  Layers,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export const AcademicDashboard: React.FC = () => {
  const { logEntries, verifyLogEntry, mous, studentProfile, setNotification } = useApp();
  const [selectedLogForReview, setSelectedLogForReview] = useState<any | null>(null);

  const pendingLogs = logEntries.filter((l) => l.verificationStatus === 'pending');
  const verifiedLogs = logEntries.filter((l) => l.verificationStatus === 'verified');

  const totalQuota = mous.reduce((acc, m) => acc + m.annualInternshipQuota, 0);
  const totalActiveInterns = mous.reduce((acc, m) => acc + m.activeInterns, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* College Header Banner */}
      <div className="bg-gradient-to-r from-forest via-forest-light to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
              <span className="text-forest font-serif font-black text-2xl">AIIA</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-turmeric-300 font-semibold uppercase tracking-wider">
                  Academic Dean & Placement Head
                </span>
                <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded border border-emerald-700">
                  NAAC A++ Accredited
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                All India Institute of Ayurveda (AIIA), New Delhi
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                Institutional Directorate for Student Credential Endorsement & Industry MoUs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setNotification('Institutional Batch Placement Report exported for NCISM compliance audit.')
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-900/70 hover:bg-emerald-900 text-emerald-100 rounded-xl text-xs font-semibold border border-emerald-700 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export NCISM Audit Report</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/60">
          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Pending Logbook Verifications</span>
              <FileCheck2 className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {pendingLogs.length}{' '}
              <span className="text-xs font-normal text-emerald-300">awaiting seal</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Dean Digital Signature Queue</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Active Industry MoUs</span>
              <Building2 className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {mous.length}{' '}
              <span className="text-xs font-normal text-emerald-300">active MoUs</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Dabur, Himalaya, Kottakkal, Patanjali</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>MoU Quota Placement</span>
              <Briefcase className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {totalActiveInterns}{' '}
              <span className="text-xs font-normal text-emerald-300">/ {totalQuota} placed</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">78% Quota Utilization</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Endorsed Records</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {verifiedLogs.length}{' '}
              <span className="text-xs font-normal text-emerald-300">records</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Council Sealed & Audited</p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Pending Logbook Approvals Queue */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  Student Practical Credential Endorsement Queue
                </h3>
                <p className="text-xs text-slate-500">
                  Review practical hours, formulation yields, and analytical assays submitted by scholars for official Dean digital sign-off.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full">
                {pendingLogs.length} Pending
              </span>
            </div>

            {pendingLogs.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
                <Check className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h5 className="font-bold text-slate-800 text-sm">All Submissions Verified</h5>
                <p className="text-xs text-slate-500 mt-0.5">
                  There are no pending clinical or laboratory log entries awaiting your verification seal.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/70 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                            {log.category}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{log.hoursOrBatch}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                          {log.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Submitted by: <strong className="text-slate-800">{studentProfile.name}</strong> ({studentProfile.registrationNo})
                        </p>
                        <p className="text-xs text-slate-500">
                          Supervisor: {log.supervisor} • {log.department}
                        </p>
                      </div>

                      <Badge variant="warning" size="sm">
                        Pending Sign-off
                      </Badge>
                    </div>

                    {/* Monograph & Observations snippet */}
                    <div className="p-2.5 rounded-lg bg-white border border-amber-200/80 text-xs text-slate-700 space-y-1">
                      <div>
                        <strong>Pharmacopoeial Reference:</strong>{' '}
                        <span className="font-mono text-[11px] text-slate-600">
                          {log.details.protocolStandard}
                        </span>
                      </div>
                      <p className="text-slate-600 line-clamp-2 italic">
                        &ldquo;{log.details.observations}&rdquo;
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => verifyLogEntry(log.id, 'rejected')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Request Revision</span>
                      </button>

                      <button
                        onClick={() => verifyLogEntry(log.id, 'verified')}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>Affix Dean Seal & Verify</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Institutional MoUs Management */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-700" />
                  Institutional Industry MoUs
                </h3>
                <p className="text-xs text-slate-500">
                  Bilateral training quotas & collaborative R&D agreements.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {mous.map((mou) => (
                <div
                  key={mou.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      {mou.industryPartner}
                    </span>
                    <Badge variant="success" size="sm">
                      {mou.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Partner Domain:</span>
                      <span className="font-medium text-slate-800">{mou.partnerType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Validity Until:</span>
                      <span className="font-medium text-slate-800">{mou.validityUntil}</span>
                    </div>
                  </div>

                  {/* Quota Progress Bar */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                      <span>Intern Quota Filled:</span>
                      <span className="font-bold text-emerald-800">
                        {mou.activeInterns} / {mou.annualInternshipQuota} scholars
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full"
                        style={{
                          width: `${(mou.activeInterns / mou.annualInternshipQuota) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-800 font-semibold pt-0.5">
                    • {mou.jointResearchProjects} Active Funded Joint Research Projects
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                setNotification('Initiated drafting of new Bilateral MoU with Patanjali Bio-Research.')
              }
              className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Draft New Industry MoU</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
