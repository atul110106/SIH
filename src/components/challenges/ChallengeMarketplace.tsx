'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ResearchChallenge } from '@/data/types';
import { SubmitProposalModal } from './SubmitProposalModal';
import {
  FlaskConical,
  Award,
  Calendar,
  Clock,
  Send,
  Building,
  CheckCircle2,
  FileText,
  Users,
  Search,
  Filter,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export const ChallengeMarketplace: React.FC = () => {
  const { challenges, proposals } = useApp();
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [activeChallengeForProposal, setActiveChallengeForProposal] = useState<ResearchChallenge | null>(null);

  const domains = [
    { id: 'all', label: 'All R&D Bottlenecks' },
    { id: 'Formulation Stability', label: 'Formulation Stability' },
    { id: 'Phytochemistry', label: 'Phytochemistry & Markers' },
    { id: 'Rasashastra', label: 'Rasashastra & Nano-Ayurveda' },
  ];

  const filteredChallenges = challenges.filter((c) => {
    if (selectedDomain === 'all') return true;
    return c.domain === selectedDomain;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-forest via-emerald-900 to-forest-dark rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-turmeric-300 text-xs font-semibold mb-3">
            <FlaskConical className="w-3.5 h-3.5" />
            Industry-Academia Co-Innovation Marketplace
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Ayush Corporate R&D Challenges & Research Grants
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 leading-relaxed">
            Leading herbal pharmaceutical & FMCG conglomerates (Dabur, Himalaya, Patanjali, Baidyanath) post active technical bottlenecks. Ayush post-graduate scholars and university faculty submit funded collaborative research proposals.
          </p>
        </div>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {domains.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDomain(d.id)}
            className={cn(
              'px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-colors',
              selectedDomain === d.id
                ? 'bg-emerald-800 text-white font-bold shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div className="space-y-3">
              {/* Header Sponsor & Grant */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {challenge.domain}
                  </span>
                  <p className="text-xs text-slate-500 font-semibold mt-1.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {challenge.sponsor}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base sm:text-lg font-black text-emerald-800">
                    {challenge.grantAmount}
                  </div>
                  <span className="text-[11px] text-slate-500">Funded Grant</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {challenge.title}
              </h3>

              {/* Brief */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {challenge.problemBrief}
              </p>

              {/* Deliverables Checklist */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold text-slate-800 block">
                  Mandatory Project Deliverables:
                </span>
                {challenge.deliverables.slice(0, 2).map((del, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>

              {/* Metadata row */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Timeline: {challenge.timeline}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Deadline: {challenge.deadline}
                </span>
                <span className="text-emerald-700 font-semibold">
                  {challenge.proposalsCount} Proposals
                </span>
              </div>
            </div>

            {/* Submit Proposal CTA */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setActiveChallengeForProposal(challenge)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Faculty / Scholar Proposal</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Proposals Tracker */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              Active Institutional Research Proposals ({proposals.length})
            </h4>
            <p className="text-xs text-slate-500">
              Joint research submissions currently under technical jury evaluation by Ayush corporate partners.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="warning" size="sm">
                    {prop.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-xs text-slate-500 font-mono">Ref: {prop.id}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">Submitted: {prop.submittedDate}</span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm truncate">
                  {prop.challengeTitle}
                </h5>
                <p className="text-xs text-slate-600">
                  PI: <strong className="text-slate-800">{prop.piName}</strong> ({prop.piDesignation}),{' '}
                  {prop.institute}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1 italic">
                  &ldquo;{prop.methodologySummary}&rdquo;
                </p>
              </div>

              <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1">
                <span className="text-xs text-slate-400">Grant Requested</span>
                <span className="font-bold text-emerald-800 text-sm sm:text-base">
                  {prop.budgetRequested}
                </span>
                <span className="text-[11px] text-slate-500">Sponsor: {prop.sponsor.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SubmitProposalModal
        challenge={activeChallengeForProposal}
        isOpen={!!activeChallengeForProposal}
        onClose={() => setActiveChallengeForProposal(null)}
      />
    </div>
  );
};
