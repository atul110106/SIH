'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Internship } from '@/data/types';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Award,
  Zap,
  Clock,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import confetti from 'canvas-confetti';

export const SkillGapEngine: React.FC = () => {
  const {
    internships,
    calculateMatchScore,
    getMissingSkills,
    completedCourses,
    completeBridgeCourse,
    applyToInternship,
    setActiveView,
  } = useApp();

  const [selectedJobId, setSelectedJobId] = useState<string>(internships[0]?.id || 'job-001');

  const selectedJob = internships.find((j) => j.id === selectedJobId) || internships[0];
  const matchScore = calculateMatchScore(selectedJob);
  const { missing, suggestedCourses } = getMissingSkills(selectedJob);

  const handleCompleteCourse = (courseId: string) => {
    completeBridgeCourse(courseId);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-forest to-forest-dark rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-turmeric-300 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              Automated Ayush Skill Mapping & Bridge Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Domain Competency Gap Analyzer
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
              Cross-references your verified clinical logbooks and lab certifications against actual industry job descriptions (Himalaya, Dabur, Patanjali). Automatically flags missing skills and prescribes accredited CCRAS/SWAYAM bridge modules.
            </p>
          </div>

          <div className="bg-emerald-950/70 p-4 rounded-2xl border border-emerald-800 text-center shrink-0 min-w-[200px]">
            <span className="text-xs text-emerald-300 block font-medium">Completed Bridge Courses</span>
            <span className="text-3xl font-extrabold text-turmeric-400 mt-1 block">
              {completedCourses.length}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">
              +{completedCourses.length * 7}% National Score Uplift
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Matcher & Target Job Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Select Target Opportunity */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
              Select Industry Target Role
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Analyze your qualification gap for active Ayush positions
            </p>

            <div className="space-y-2">
              {internships.map((job) => {
                const isSelected = job.id === selectedJob.id;
                const score = calculateMatchScore(job);

                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-emerald-800 truncate">
                        {job.company}
                      </div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {job.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {job.location.split(',')[0]}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`text-sm font-black ${
                          score >= 80 ? 'text-emerald-700' : 'text-amber-600'
                        }`}
                      >
                        {score}%
                      </div>
                      <span className="text-[10px] text-slate-400 block">Match</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Detailed Match Breakdown & Missing Competency Alert */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-5">
            {/* Header info for selected job */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" size="sm">
                    {selectedJob.company}
                  </Badge>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-600 font-medium">{selectedJob.duration}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedJob.stipendOrSalary}</p>
              </div>

              {/* Match Gauge */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={matchScore >= 80 ? 'text-emerald-600' : 'text-amber-500'}
                      strokeDasharray={`${matchScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-slate-900">
                    {matchScore}%
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {matchScore >= 80 ? 'High Match Profile' : 'Skill Gap Identified'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {matchScore >= 80
                      ? 'Recommended for instant shortlisting'
                      : 'Bridge training recommended'}
                  </span>
                </div>
              </div>
            </div>

            {/* High Match Unlock Banner if score >= 85 */}
            {matchScore >= 85 && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-900 flex items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-emerald-950">
                      Tier-1 Preferred Candidate Eligibility Unlocked!
                    </h5>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Your completed bridge certifications put you in the top 5% of verified applicants for {selectedJob.company}.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => applyToInternship(selectedJob.id)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-xs"
                >
                  Apply Now
                </button>
              </div>
            )}

            {/* Verified Matching Skills */}
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Matching Competencies in Candidate Dossier
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.requiredSkills
                  .filter((skill) => !missing.some((m) => m.toLowerCase().includes(skill.toLowerCase().split(' ')[0])))
                  .map((skill, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200 text-xs font-medium"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{skill}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Missing Critical Competencies */}
            {missing.length > 0 && (
              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-950 text-xs sm:text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Flagged Competency Gaps for this Role ({missing.length})
                </h4>
                <p className="text-xs text-amber-800">
                  The employer specifically requires candidate certification in the following protocols:
                </p>
                <div className="space-y-1.5 pt-1">
                  {missing.map((gap, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-white/90 px-3 py-1.5 rounded-lg border border-rose-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <span>Missing: {gap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Bridge Course Recommender Section */}
            {suggestedCourses.length > 0 ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-emerald-700" />
                      Recommended Ministry-Accredited Bridge Modules
                    </h4>
                    <p className="text-xs text-slate-500">
                      Free online modules by CCRAS / SWAYAM to bridge your exact missing competencies.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedCourses.map((course) => {
                    const isCompleted = completedCourses.includes(course.id);
                    return (
                      <div
                        key={course.id}
                        className="p-4 bg-gradient-to-br from-white to-emerald-50/40 rounded-xl border border-emerald-200 shadow-xs flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                              {course.level}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {course.hours} Hours
                            </span>
                          </div>

                          <h5 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                            {course.title}
                          </h5>

                          <p className="text-[11px] text-slate-600 font-medium">
                            Conducted by: <span className="text-emerald-900 font-semibold">{course.offeredBy}</span>
                          </p>

                          <p className="text-xs text-slate-600 line-clamp-2">
                            {course.description}
                          </p>

                          <div className="bg-white p-2 rounded-lg border border-slate-200 text-[11px] text-slate-700">
                            <span className="font-semibold text-emerald-900 block mb-0.5">
                              Key Monograph Learning:
                            </span>
                            {course.syllabusHighlights[0]}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-emerald-100 flex items-center justify-between gap-2">
                          <div className="text-[11px] font-bold text-emerald-700">
                            +{course.scoreBoost}% Readiness Boost
                          </div>

                          {isCompleted ? (
                            <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Certified & Applied</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleCompleteCourse(course.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-turmeric-300" />
                              <span>Simulate Completion</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-emerald-950 text-sm">No Critical Skill Gaps Detected</h5>
                <p className="text-xs text-emerald-800">
                  Your clinical logbooks and analytical testing records fully satisfy all statutory prerequisites for this role!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
