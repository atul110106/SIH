'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Briefcase,
  FlaskConical,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileCheck2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export const IndustryDashboard: React.FC = () => {
  const {
    internships,
    applications,
    updateApplicationStatus,
    challenges,
    setNotification,
    setActiveView,
  } = useApp();

  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCompany, setNewJobCompany] = useState('Himalaya Wellness Company');
  const [newJobStipend, setNewJobStipend] = useState('₹30,000 / month');

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(`New position "${newJobTitle}" successfully published to the Ayush National Portal!`);
    setIsPostJobModalOpen(false);
    setNewJobTitle('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Industry Header */}
      <div className="bg-gradient-to-r from-forest via-forest-light to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
              <span className="text-forest font-serif font-black text-xl">HIMALAYA</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-turmeric-300 font-semibold uppercase tracking-wider">
                  Ayush Pharma & FMCG Partner
                </span>
                <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded border border-emerald-700">
                  Ayush Premium Mark Certified
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Himalaya Wellness & Dabur India Ltd (R&D)
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                Talent Acquisition, Dossier Verification & Academic Research Consortia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-turmeric-500 hover:bg-turmeric-600 text-slate-950 rounded-xl text-xs font-bold transition-colors shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Post New Ayush Opening</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/60">
          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Candidate Dossiers Received</span>
              <FileCheck2 className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {applications.length}{' '}
              <span className="text-xs font-normal text-emerald-300">dossiers</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">NCISM / Council Verified</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Active Job Postings</span>
              <Briefcase className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {internships.length}{' '}
              <span className="text-xs font-normal text-emerald-300">positions</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">QC, R&D & Botanical Sourcing</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Active R&D Challenges</span>
              <FlaskConical className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {challenges.length}{' '}
              <span className="text-xs font-normal text-emerald-300">grants</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">₹64 Lakhs Committed Funding</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Institutional MoUs</span>
              <Award className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              18{' '}
              <span className="text-xs font-normal text-emerald-300">colleges</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">AIIA, NIA, BHU, GAU</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Candidate Applications & Digital Dossier Review */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-700" />
                  Incoming Candidate Digital Dossiers
                </h3>
                <p className="text-xs text-slate-500">
                  Review verified practical logs, HPTLC proficiencies, and State Council licensing without resume fraud.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                {applications.length} Candidates
              </span>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {app.applicantName}
                        </span>
                        <Badge variant="gold" size="sm">
                          Verified Candidate
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{app.applicantDegree}</p>
                      <span className="text-xs text-slate-500 font-mono">
                        Applied for: <strong className="text-slate-800">{app.internshipTitle}</strong>
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-black text-emerald-700">
                        {app.dossierSnapshot.matchPercentage}% Fit
                      </span>
                      <span className="text-[10px] text-slate-400 block">Dossier Match</span>
                    </div>
                  </div>

                  {/* Verified Practical Snapshot */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Council Reg:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {app.dossierSnapshot.registrationNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Clinical Hours:</span>
                      <span className="font-bold text-emerald-800">
                        {app.dossierSnapshot.clinicalHours} Hours
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">GMP Batches:</span>
                      <span className="font-bold text-slate-800">
                        {app.dossierSnapshot.verifiedBatches} Batches
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Current Status:</span>
                      <span className="font-bold text-amber-800 uppercase">
                        {app.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Action Pipeline Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-slate-200/80">
                    <button
                      onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold transition-colors"
                    >
                      Shortlist for Technical Interview
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app.id, 'offered')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      Extend Internship Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Active R&D Challenges & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                Company R&D Challenges
              </h4>
              <button
                onClick={() => setActiveView('challenges')}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
              >
                View Marketplace
              </button>
            </div>

            <div className="space-y-2.5">
              {challenges.slice(0, 2).map((ch) => (
                <div
                  key={ch.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 text-[11px] uppercase">
                      {ch.domain}
                    </span>
                    <span className="font-bold text-emerald-800">{ch.grantAmount}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 line-clamp-1">{ch.title}</h5>
                  <span className="text-[10px] text-slate-500 block">
                    {ch.proposalsCount} Scholar Proposals Received
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveView('challenges')}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold transition-colors"
            >
              Post New R&D Bottleneck
            </button>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      <Modal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        title="Post Ayush Industry Internship / Placement"
        subtitle="Specify required instrumentation, clinical rotation quotas, and degree criteria."
      >
        <form onSubmit={handlePostJob} className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Company / Organization *</label>
            <input
              type="text"
              required
              value={newJobCompany}
              onChange={(e) => setNewJobCompany(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Position Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ayush Analytical QC Analyst (HPTLC & AAS)"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Stipend / Package *</label>
            <input
              type="text"
              required
              value={newJobStipend}
              onChange={(e) => setNewJobStipend(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-800"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsPostJobModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg"
            >
              Publish Job
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
