'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { ShieldCheck, Award, QrCode, CheckCircle2, FileText, Check, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const VerificationBadges: React.FC = () => {
  const { studentProfile } = useApp();
  const [selectedBadge, setSelectedBadge] = useState<{
    title: string;
    authority: string;
    regId: string;
    date: string;
    verifiedBy: string;
    details: string;
    qrHash: string;
  } | null>(null);

  const badges = [
    {
      id: 'council',
      title: 'State Ayush Council Registered',
      authority: studentProfile.councilName,
      regId: studentProfile.registrationNo,
      date: '12-Oct-2023',
      status: 'VERIFIED',
      verifiedBy: 'Registrar, Delhi Bharatiya Chikitsa Parishad',
      details:
        'Authenticated against National Commission for Indian System of Medicine (NCISM) Central Register Act 2020.',
      qrHash: 'AYUSH-NCISM-REG-2023-8841-SHA256-VALID',
      icon: ShieldCheck,
      color: 'border-emerald-200 bg-emerald-50/70 text-emerald-900',
    },
    {
      id: 'ncism',
      title: 'NCISM Academic Clinical Credits',
      authority: 'National Commission for Indian System of Medicine',
      regId: 'NCISM/EDU/2026/AIIA-044',
      date: '15-Feb-2026',
      status: 'VERIFIED',
      verifiedBy: 'Dean of Academic Affairs, AIIA New Delhi',
      details:
        'Certified 520 hours of supervised IPD/OPD Clinical Panchakarma rotations across Kayachikitsa, Shalya, and Shalakya departments.',
      qrHash: 'NCISM-CREDIT-520HRS-AIIA-VERIFIED',
      icon: Award,
      color: 'border-blue-200 bg-blue-50/70 text-blue-900',
    },
    {
      id: 'gmp',
      title: 'Schedule T Ayush GMP Certified',
      authority: 'PCIM&H / Ministry of Ayush Pilot Plant',
      regId: 'GMP-SCH-T-2026-902',
      date: '20-Jan-2026',
      status: 'VERIFIED',
      verifiedBy: 'Senior Quality Assurance Lead, Pilot Formulation Plant',
      details:
        'Trained on Schedule T Good Manufacturing Practices for ASU Drugs, Batch Manufacturing Records (BMR), and HVAC zoning.',
      qrHash: 'PCIMH-GMP-SCHT-VALID-CERT',
      icon: CheckCircle2,
      color: 'border-amber-200 bg-amber-50/70 text-amber-900',
    },
    {
      id: 'instruments',
      title: 'HPTLC & AAS Instrument Specialist',
      authority: 'Central Ayush Quality Control Laboratory',
      regId: 'QC-INST-2026-081',
      date: '02-Mar-2026',
      status: 'VERIFIED',
      verifiedBy: 'Chief Analytical Chemist, NABL Accredited Ayush Lab',
      details:
        'Independent instrument proficiency on CAMAG TLC Scanner 4 and PerkinElmer PinAAcle 900T AAS for heavy metal limit screening.',
      qrHash: 'NABL-INST-QC-AYUSH-CERT-VALID',
      icon: FileText,
      color: 'border-purple-200 bg-purple-50/70 text-purple-900',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Statutory & Academic Credentials
          </h4>
          <p className="text-xs text-slate-500">
            Cryptographically sealed and verified by State Ayush Council & NCISM
          </p>
        </div>
        <Badge variant="success" size="sm" className="hidden sm:inline-flex">
          100% Tamper-Proof
        </Badge>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              onClick={() => setSelectedBadge(b)}
              className={`p-3.5 rounded-xl border ${b.color} cursor-pointer hover:shadow-md transition-all flex items-start gap-3 group`}
            >
              <div className="p-2 rounded-lg bg-white/80 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                    {b.title}
                  </h5>
                  <QrCode className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">{b.authority}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                  <span className="font-mono bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                    {b.regId}
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> {b.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification Modal */}
      {selectedBadge && (
        <Modal
          isOpen={!!selectedBadge}
          onClose={() => setSelectedBadge(null)}
          title="Ayush Digital Credential Verification"
          subtitle="Ministry of Ayush National Verification Registry"
        >
          <div className="space-y-4">
            {/* Header Stamp */}
            <div className="bg-emerald-950 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-300 font-mono tracking-wider uppercase">
                  Authenticated Record
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">{selectedBadge.title}</h4>
                <p className="text-xs text-emerald-200">{selectedBadge.authority}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-800/80 border-2 border-turmeric-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7 text-turmeric-400" />
              </div>
            </div>

            {/* Simulated QR Code & Cryptographic Stamp */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-28 h-28 bg-white p-2 rounded-lg border border-slate-300 shadow-xs flex flex-col items-center justify-center shrink-0">
                {/* SVG QR Code Illustration */}
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-slate-800">
                  <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                  <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                  <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                  <circle cx="50" cy="50" r="12" fill="#047857" />
                  <rect x="35" y="15" width="10" height="15" fill="currentColor" />
                  <rect x="40" y="70" width="15" height="10" fill="currentColor" />
                  <rect x="70" y="45" width="15" height="15" fill="currentColor" />
                </svg>
                <span className="text-[9px] text-slate-500 font-mono mt-1">Scan to Verify</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 font-medium">Registration No / Ref:</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">{selectedBadge.regId}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Verified By:</span>
                  <p className="font-semibold text-slate-800">{selectedBadge.verifiedBy}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Verification Timestamp:</span>
                  <p className="font-medium text-slate-700">{selectedBadge.date} 11:42:19 IST</p>
                </div>
              </div>
            </div>

            {/* Scope Details */}
            <div className="text-xs text-slate-700 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
              <span className="font-bold text-emerald-950 block mb-1">Credential Scope:</span>
              <p className="leading-relaxed">{selectedBadge.details}</p>
            </div>

            {/* Tamper Evidence Hash */}
            <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-500 truncate">
              SHA256: {selectedBadge.qrHash}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close Verification Modal
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
