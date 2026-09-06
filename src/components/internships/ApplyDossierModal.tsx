'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Internship } from '@/data/types';
import { Modal } from '@/components/ui/Modal';
import { ShieldCheck, CheckCircle2, Award, Clock, Layers, FileCheck2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ApplyDossierModalProps {
  internship: Internship | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyDossierModal: React.FC<ApplyDossierModalProps> = ({
  internship,
  isOpen,
  onClose,
}) => {
  const { studentProfile, calculateMatchScore, applyToInternship } = useApp();

  if (!internship) return null;

  const matchScore = calculateMatchScore(internship);

  const handleApply = () => {
    applyToInternship(internship.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="One-Click Apply with Ayush Digital Dossier"
      subtitle={`Transmitting verified credentials to ${internship.company}`}
      maxWidth="xl"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Job Snippet */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase">{internship.company}</span>
            <h4 className="font-bold text-slate-900 text-sm">{internship.title}</h4>
            <span className="text-xs text-slate-500">{internship.location} • {internship.stipendOrSalary}</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-emerald-700">{matchScore}%</span>
            <span className="text-[10px] text-slate-400 block">Match Score</span>
          </div>
        </div>

        {/* Dossier Snapshot Being Sent */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-700" />
              Attached Verified Credentials from Digital Dossier:
            </h5>
            <Badge variant="success" size="sm">
              Cryptographically Verified
            </Badge>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Applicant Name:</span>
                <span className="font-bold text-slate-900">{studentProfile.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Ayush Council Reg:</span>
                <span className="font-mono font-bold text-emerald-900">{studentProfile.registrationNo}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Clinical Panchakarma:</span>
                <span className="font-bold text-slate-900">{studentProfile.totalClinicalHours} Hours Verified</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Formulation Batches:</span>
                <span className="font-bold text-slate-900">{studentProfile.totalFormulationBatches} Batches (GMP)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/80 text-xs">
              <span className="text-slate-500 font-medium block mb-1">
                Verified Instrumentation & Lab Proficiencies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {studentProfile.instrumentsMastered.slice(0, 3).map((inst, i) => (
                  <span
                    key={i}
                    className="bg-white text-emerald-950 px-2 py-0.5 rounded border border-emerald-300 text-[11px] font-medium"
                  >
                    {inst.split('(')[0]}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-emerald-900/90 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Verified through {studentProfile.councilName} and signed by College Dean.
              </span>
            </div>
          </div>
        </div>

        {/* Transmission Note */}
        <div className="text-xs text-slate-500 italic">
          By applying, your complete encrypted clinical logbook records, instrumentation certificates, and institutional endorsements will be securely shared with {internship.company}&rsquo;s technical hiring committee.
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-turmeric-300" />
            Transmit Verified Dossier & Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};
