'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export const CompetencyRadar: React.FC = () => {
  const { studentProfile } = useApp();
  const comp = studentProfile.competencies;

  // 6 Domain axes
  const axes = [
    { key: 'clinical', label: 'Clinical & Panchakarma', value: comp.clinical, benchmark: 75 },
    { key: 'formulation', label: 'Formulation R&D', value: comp.formulation, benchmark: 75 },
    { key: 'instrumentation', label: 'Analytical QC (HPTLC/AAS)', value: comp.instrumentation, benchmark: 80 },
    { key: 'gmp', label: 'Ayush GMP (Schedule T)', value: comp.gmp, benchmark: 75 },
    { key: 'pharmacovigilance', label: 'Pharmacovigilance (PvPI)', value: comp.pharmacovigilance, benchmark: 70 },
    { key: 'gacp', label: 'GACP & Botanic Sourcing', value: comp.gacp, benchmark: 70 },
  ];

  const size = 320;
  const center = size / 2;
  const radius = 105;
  const totalAxes = axes.length;

  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (val / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build polygon path for student
  const studentPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.value);
      return `${x},${y}`;
    })
    .join(' ');

  // Build polygon path for benchmark
  const benchmarkPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.benchmark);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
            Ayush Domain Competency Radar
          </h4>
          <p className="text-xs text-slate-500">
            Real-time readiness vs National Industry Standards
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500/30 border border-emerald-600"></span>
            <span className="text-slate-600 font-medium">Candidate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border border-amber-400 border-dashed"></span>
            <span className="text-slate-500">Benchmark</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Concentric grid circles */}
          {[0.25, 0.5, 0.75, 1].map((level, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={radius * level}
              fill="none"
              stroke="#e2e8f0"
              strokeDasharray={level === 1 ? 'none' : '3 3'}
              strokeWidth="1"
            />
          ))}

          {/* Radial axis lines */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
            );
          })}

          {/* Benchmark Polygon */}
          <polygon
            points={benchmarkPoints}
            fill="rgba(245, 158, 11, 0.08)"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Student Competency Polygon */}
          <polygon
            points={studentPoints}
            fill="rgba(16, 185, 129, 0.25)"
            stroke="#059669"
            strokeWidth="2.5"
            className="transition-all duration-500"
          />

          {/* Data Points */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(i, axis.value);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                className="fill-emerald-600 stroke-white stroke-2 hover:r-5 transition-all cursor-pointer"
              >
                <title>{`${axis.label}: ${axis.value}% (Benchmark: ${axis.benchmark}%)`}</title>
              </circle>
            );
          })}

          {/* Axis Labels */}
          {axes.map((axis, i) => {
            const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
            const labelR = radius + 24;
            const lx = center + labelR * Math.cos(angle);
            const ly = center + labelR * Math.sin(angle);

            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor={Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-[10px] sm:text-[11px] font-semibold fill-slate-700"
              >
                {axis.label.split(' ')[0]} ({axis.value}%)
              </text>
            );
          })}
        </svg>
      </div>

      {/* Axis Breakdown Bar List */}
      <div className="w-full grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
        {axes.map((axis) => (
          <div key={axis.key} className="bg-slate-50 p-2 rounded-lg text-xs">
            <div className="flex justify-between text-slate-700 font-medium mb-1">
              <span className="truncate pr-1">{axis.label.split('(')[0]}</span>
              <span className="font-bold text-emerald-700">{axis.value}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${axis.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
