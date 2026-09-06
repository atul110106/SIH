'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StateSkillGap } from '@/data/types';
import {
  Landmark,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Award,
  Users,
  CheckCircle2,
  Building,
  GraduationCap,
  ShieldCheck,
  FileText,
  Search,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export const MinistryDashboard: React.FC = () => {
  const { stateSkillGaps, setNotification } = useApp();
  const [selectedState, setSelectedState] = useState<StateSkillGap>(stateSkillGaps[0]);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredStates = stateSkillGaps.filter((s) => {
    if (filterSeverity === 'all') return true;
    return s.shortageSeverity === filterSeverity;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="error" size="sm">High Shortage</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Moderate Gap</Badge>;
      case 'low':
        return <Badge variant="success" size="sm">Balanced</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Ministry Header */}
      <div className="bg-gradient-to-r from-forest via-forest-light to-emerald-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
              <span className="text-forest font-serif font-black text-2xl">आयुष</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-turmeric-300 font-semibold uppercase tracking-wider">
                  Ministry Admin & NCISM Directorate
                </span>
                <span className="bg-emerald-900 text-emerald-200 text-[10px] px-2 py-0.5 rounded border border-emerald-700">
                  Apex National Council
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Ministry of Ayush, Government of India
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                National Ayush Skill-Gap Heatmap, Accreditation Oversight & Workforce Placement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setNotification('National Ayush Skill Gap Policy Directive exported for Parliamentary Committee.')
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-turmeric-500 hover:bg-turmeric-600 text-slate-950 rounded-xl text-xs font-bold transition-colors shadow-md"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Export National Skill Report</span>
            </button>
          </div>
        </div>

        {/* 4 National Macro KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/60">
          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Total Registered Scholars</span>
              <Users className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              34,840{' '}
              <span className="text-xs font-normal text-emerald-300">verified</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">BAMS, BHMS, BUMS, Siddha</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Active Institutional MoUs</span>
              <Building className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              412{' '}
              <span className="text-xs font-normal text-emerald-300">MoUs</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">Across 28 States & UTs</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>National Placement Rate</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              78.4%{' '}
              <span className="text-xs font-normal text-emerald-300">placed</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">+6.2% YoY Improvement</p>
          </div>

          <div className="bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-800">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-1">
              <span>Bridge Certifications</span>
              <GraduationCap className="w-3.5 h-3.5 text-turmeric-300" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              14,290{' '}
              <span className="text-xs font-normal text-emerald-300">completed</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-0.5">CCRAS & SWAYAM Modules</p>
          </div>
        </div>
      </div>

      {/* Main Grid: State Skill-Gap Heatmap Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: States List with Severity Filter */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                  State-wise Ayush Skill Gap Directory
                </h3>
                <p className="text-xs text-slate-500">
                  Select a state to inspect demand bottlenecks
                </p>
              </div>
            </div>

            {/* Severity filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All States' },
                { id: 'high', label: 'Critical Shortage' },
                { id: 'medium', label: 'Moderate Gap' },
                { id: 'low', label: 'Balanced' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterSeverity(f.id as any)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors',
                    filterSeverity === f.id
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* States List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredStates.map((st) => {
                const isSelected = st.code === selectedState.code;
                return (
                  <button
                    key={st.code}
                    onClick={() => setSelectedState(st)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3',
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{st.state}</span>
                        <span className="text-xs text-slate-400 font-mono">[{st.code}]</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {st.totalStudents.toLocaleString()} Scholars • {st.placementRate}% Placement
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      {getSeverityBadge(st.shortageSeverity)}
                      <span className="text-[10px] text-slate-500 block mt-1">
                        {st.openIndustryDemands} Open Demands
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: State Detail View & Skill Imbalance Heatmap Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{selectedState.state}</h3>
                  {getSeverityBadge(selectedState.shortageSeverity)}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  State Ayush Ecosystem Profile & Industrial Placement Mapping
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-right">
                <span className="text-xs text-slate-400 block">Open Industry Vacancies</span>
                <span className="text-lg font-black text-emerald-800">
                  {selectedState.openIndustryDemands} Vacancies
                </span>
              </div>
            </div>

            {/* Critical Shortage Domains */}
            <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-200 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-rose-950 text-xs sm:text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  Severe Industry Shortage Domains (High Demand, Low Supply)
                </h4>
              </div>
              <p className="text-xs text-rose-800">
                FMCG & Ayush manufacturers report prolonged vacancies in these technical specializations:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedState.shortageDomains.map((domain, i) => (
                  <span
                    key={i}
                    className="bg-white text-rose-900 font-bold px-3 py-1.5 rounded-lg border border-rose-300 text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    <span>{domain}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Surplus Competency Domains */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Regional Talent Surplus Domains
              </h4>
              <p className="text-xs text-emerald-800">
                Strong academic graduate output in traditional clinical disciplines:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedState.surplusDomains.map((domain, i) => (
                  <span
                    key={i}
                    className="bg-white text-emerald-900 font-semibold px-3 py-1.5 rounded-lg border border-emerald-300 text-xs"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Policy Action */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Ministry Recommended Policy Intervention:
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mandate 40 hours of practical HPTLC & Schedule T cleanroom training in all State Ayush colleges in {selectedState.state}. Subsidize CCRAS instrumentation bridge workshops to resolve the {selectedState.openIndustryDemands} unfilled industry placements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
