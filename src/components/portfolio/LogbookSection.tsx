'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AddLogEntryModal } from './AddLogEntryModal';
import {
  FileText,
  PlusCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Activity,
  Award,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export const LogbookSection: React.FC = () => {
  const { logEntries, currentRole } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'panchakarma' | 'formulation' | 'analytical_qc'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(logEntries[0]?.id || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredLogs = logEntries.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'panchakarma':
        return Activity;
      case 'formulation':
        return FlaskConical;
      case 'analytical_qc':
        return BookOpen;
      default:
        return FileText;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'panchakarma':
        return 'Clinical Panchakarma';
      case 'formulation':
        return 'Formulation Batch (GMP)';
      case 'analytical_qc':
        return 'Analytical QC & Testing';
      default:
        return category;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-4">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            Verified Clinical & Laboratory Logbook
          </h4>
          <p className="text-xs text-slate-500">
            Authenticated practical procedures, formulation yields, and analytical assays endorsed by college faculty.
          </p>
        </div>

        {/* Add Entry Action */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Record New Log Entry</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: `All Records (${logEntries.length})` },
          { id: 'panchakarma', label: 'Panchakarma Clinical' },
          { id: 'formulation', label: 'Classical Formulations' },
          { id: 'analytical_qc', label: 'Analytical QC & Testing' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveCategory(filter.id as any)}
            className={cn(
              'px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors',
              activeCategory === filter.id
                ? 'bg-emerald-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Logbook Items Accordion List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => {
          const Icon = getCategoryIcon(log.category);
          const isExpanded = expandedId === log.id;
          const isVerified = log.verificationStatus === 'verified';

          return (
            <div
              key={log.id}
              className={cn(
                'rounded-xl border transition-all overflow-hidden',
                isExpanded ? 'border-emerald-700/40 bg-emerald-50/20 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'
              )}
            >
              {/* Header / Click to Expand */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : log.id)}
                className="p-4 flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={cn(
                      'p-2.5 rounded-xl shrink-0 mt-0.5',
                      log.category === 'panchakarma'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.category === 'formulation'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                        {getCategoryLabel(log.category)}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {log.hoursOrBatch}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{log.date}</span>
                    </div>

                    <h5 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {log.title}
                    </h5>

                    <p className="text-xs text-slate-600 mt-1">
                      {log.department} — <span className="font-medium">{log.supervisor}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isVerified ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pending Verification</span>
                    </Badge>
                  )}

                  <div className="p-1 rounded text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700 bg-white">
                  {/* Verification Reference Pill */}
                  {isVerified && log.verificationRef && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-700" />
                        <span>
                          Dean Endorsement Seal:{' '}
                          <strong className="font-mono">{log.verificationRef}</strong>
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700">Digital Seal Valid</span>
                    </div>
                  )}

                  {/* Botanical Ingredients */}
                  {log.details.botanicalNames && log.details.botanicalNames.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-800 block mb-1">
                        Botanical Species / Formulations Used:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {log.details.botanicalNames.map((bot, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200 text-xs italic"
                          >
                            {bot}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Protocol Standard */}
                  {log.details.protocolStandard && (
                    <div>
                      <span className="font-semibold text-slate-800">
                        Pharmacopoeial Protocol Standard:
                      </span>{' '}
                      <span className="text-slate-600 font-mono text-xs">
                        {log.details.protocolStandard}
                      </span>
                    </div>
                  )}

                  {/* Equipment Used */}
                  {log.details.equipmentUsed && log.details.equipmentUsed.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-800 block mb-1">
                        Equipment & Instrumentation Mastered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {log.details.equipmentUsed.map((eq, i) => (
                          <span
                            key={i}
                            className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200 text-xs font-medium"
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Observations */}
                  {log.details.observations && (
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="font-semibold text-slate-900 block mb-1">
                        Clinical Outcome & Analytical Findings:
                      </span>
                      <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                        {log.details.observations}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AddLogEntryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
