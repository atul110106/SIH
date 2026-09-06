'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Internship } from '@/data/types';
import { ApplyDossierModal } from './ApplyDossierModal';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Building,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export const InternshipList: React.FC = () => {
  const { internships, applications, calculateMatchScore } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeJobForApply, setActiveJobForApply] = useState<Internship | null>(null);
  const [viewDetailJob, setViewDetailJob] = useState<Internship | null>(null);

  const categories = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'qc_qa', label: 'Quality Control & Testing' },
    { id: 'formulation', label: 'Formulation R&D' },
    { id: 'botanical', label: 'Botanical Sourcing & GACP' },
    { id: 'clinical', label: 'Clinical Residencies' },
    { id: 'regulatory', label: 'Regulatory Affairs (ASU)' },
  ];

  const filteredJobs = internships.filter((job) => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-forest to-forest-dark rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-turmeric-300 text-xs font-semibold mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              Verified Ayush Employment & Residency Hub
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Ayush Internships, Clinical Residencies & Placements
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
              Authentic openings from premier Ayush pharmaceutical manufacturers, NABH Panchakarma hospitals, and botanical supply organizations. Apply directly with your cryptographically verified Ayush Digital Dossier.
            </p>
          </div>

          <div className="bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800 text-center shrink-0 min-w-[200px]">
            <span className="text-xs text-emerald-300 block font-medium">Your Active Applications</span>
            <span className="text-3xl font-extrabold text-turmeric-400 mt-1 block">
              {applications.length}
            </span>
            <span className="text-[11px] text-emerald-300 font-medium">
              Verified Dossiers Transmitted
            </span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-900/10 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by role, company (Himalaya, Dabur, Patanjali), instrument (HPTLC, AAS), or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors',
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJobs.map((job) => {
          const matchScore = calculateMatchScore(job);
          const hasApplied = applications.some((a) => a.internshipId === job.id);

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                        {job.company}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {job.type}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg mt-1">
                      {job.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={cn(
                        'text-sm font-black',
                        matchScore >= 80 ? 'text-emerald-700' : 'text-amber-600'
                      )}
                    >
                      {matchScore}% Match
                    </div>
                    <span className="text-[10px] text-slate-400 block">Dossier Fit</span>
                  </div>
                </div>

                {/* Location & Stipend */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-900">
                    {job.stipendOrSalary}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {job.duration}
                  </span>
                </div>

                {/* Brief description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Required Ayush Skills */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Required Ayush Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prerequisites Badge */}
                <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-[11px] text-emerald-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Eligible: {job.prerequisites.degreeAllowed.join(', ')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setViewDetailJob(job)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2"
                >
                  View Full Job Specification
                </button>

                {hasApplied ? (
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3.5 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Applied with Dossier</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveJobForApply(job)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-turmeric-300" />
                    <span>Apply with Dossier</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Applications Tracker */}
      {applications.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-700" />
              Candidate Application Pipeline Tracker ({applications.length})
            </h4>
            <p className="text-xs text-slate-500">
              Live recruitment stage for dossiers transmitted to Ayush industry partners.
            </p>
          </div>

          <div className="space-y-3">
            {applications.map((app) => {
              const statusColors = {
                submitted: 'bg-blue-50 text-blue-800 border-blue-200',
                college_endorsed: 'bg-amber-50 text-amber-900 border-amber-200',
                shortlisted: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold',
                offered: 'bg-purple-50 text-purple-900 border-purple-200 font-bold',
                rejected: 'bg-rose-50 text-rose-800 border-rose-200',
              };

              return (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full border ${
                          statusColors[app.status]
                        }`}
                      >
                        {app.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{app.id}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{app.appliedDate}</span>
                    </div>

                    <h5 className="font-bold text-slate-900 text-sm">{app.internshipTitle}</h5>
                    <p className="text-xs text-slate-600 font-medium">{app.company}</p>
                  </div>

                  <div className="text-right text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 shrink-0">
                    <span className="block text-[11px] text-slate-400">Attached Snapshot:</span>
                    <strong className="text-slate-800 font-mono">{app.dossierSnapshot.registrationNo}</strong> •{' '}
                    <span className="text-emerald-700 font-bold">{app.dossierSnapshot.clinicalHours} hrs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Job Detail Modal */}
      {viewDetailJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase">
                  {viewDetailJob.company}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{viewDetailJob.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{viewDetailJob.location}</p>
              </div>
              <button
                onClick={() => setViewDetailJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Detailed Description:</span>
                <p className="leading-relaxed">{viewDetailJob.description}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Key Responsibilities:</span>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  {viewDetailJob.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-950 block mb-1">
                  Statutory Equipment & Practical Prerequisites:
                </span>
                <p className="text-xs text-emerald-900">
                  {viewDetailJob.prerequisites.requiredInstruments?.join(', ') ||
                    'Clinical Panchakarma Ward rotations and case records.'}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewDetailJob(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveJobForApply(viewDetailJob);
                  setViewDetailJob(null);
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold"
              >
                Apply with Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* One-Click Apply Modal */}
      <ApplyDossierModal
        internship={activeJobForApply}
        isOpen={!!activeJobForApply}
        onClose={() => setActiveJobForApply(null)}
      />
    </div>
  );
};
