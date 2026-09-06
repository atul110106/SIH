'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ResearchChallenge } from '@/data/types';
import { Modal } from '@/components/ui/Modal';
import { Send, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

interface SubmitProposalModalProps {
  challenge: ResearchChallenge | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitProposalModal: React.FC<SubmitProposalModalProps> = ({
  challenge,
  isOpen,
  onClose,
}) => {
  const { submitProposal, studentProfile } = useApp();

  const [piName, setPiName] = useState('Prof. (Dr.) Anand Kumar');
  const [piDesignation, setPiDesignation] = useState('Professor & HOD, Rasashastra Dept');
  const [institute, setInstitute] = useState(studentProfile.institution);
  const [coInvestigators, setCoInvestigators] = useState('Dr. Ananya Sharma (PG Scholar), Dr. Sunita Varma (Analytical Chemist)');
  const [methodology, setMethodology] = useState('');
  const [budget, setBudget] = useState(challenge?.grantAmount || '₹16,50,000');
  const [duration, setDuration] = useState(challenge?.timeline || '12 Months');

  if (!challenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProposal({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      sponsor: challenge.sponsor,
      piName,
      piDesignation,
      institute,
      coInvestigators: coInvestigators.split(',').map((s) => s.trim()),
      methodologySummary: methodology || 'Comprehensive analytical protocol combining green phytopharmaceutical extraction and ICH stability testing.',
      budgetRequested: budget,
      proposedDuration: duration,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Academia-Industry Collaborative R&D Proposal"
      subtitle={`Target Sponsor: ${challenge.sponsor} • Sanction Grant: Up to ${challenge.grantAmount}`}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
          <div className="text-xs font-semibold text-emerald-950 mb-0.5">R&D Challenge Objective:</div>
          <p className="text-xs text-emerald-900 font-medium">{challenge.title}</p>
        </div>

        {/* PI Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Principal Investigator (PI) Name *
            </label>
            <input
              type="text"
              required
              value={piName}
              onChange={(e) => setPiName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Designation & Faculty Post *
            </label>
            <input
              type="text"
              required
              value={piDesignation}
              onChange={(e) => setPiDesignation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Institute & Co-Investigators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Lead Academic Institute *
            </label>
            <input
              type="text"
              required
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Proposed Duration
            </label>
            <input
              type="text"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Co-Investigators & Scholars */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Co-Investigators & Participating PG Scholars (Separated by commas)
          </label>
          <input
            type="text"
            required
            value={coInvestigators}
            onChange={(e) => setCoInvestigators(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Total Research Grant Requested (INR) *
          </label>
          <input
            type="text"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Methodology */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Technical Methodology & AYUSH Pharmacopoeial Approach *
          </label>
          <textarea
            rows={4}
            required
            placeholder="Outline your experimental design, chromatographic or formulation techniques, and laboratory instrumentation to be used..."
            value={methodology}
            onChange={(e) => setMethodology(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Compliance declaration */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" required defaultChecked className="mt-0.5 rounded text-emerald-600" />
            <span>
              I certify that our institution possesses institutional ethical approval (IAEC/IEC) and NABL/Ayush-recognized analytical facilities required for the execution of this research grant.
            </span>
          </label>
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
            type="submit"
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit Collaborative Proposal
          </button>
        </div>
      </form>
    </Modal>
  );
};
