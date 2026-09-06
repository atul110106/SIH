import React from 'react';
import { ShieldCheck, HeartPulse, Building, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-20 lg:pb-12 mt-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-serif font-bold text-base">
                आ
              </div>
              <span className="font-bold text-white tracking-tight text-base">AYUSH-SETU</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unified National Portal for Academia-Industry Collaboration, Clinical Logbook Verification, Skill Mapping & Placement under the Ministry of Ayush, Government of India.
            </p>
            <div className="pt-2">
              <span className="text-[11px] bg-slate-800 text-emerald-400 px-2 py-1 rounded border border-slate-700 inline-block font-mono">
                SIH Problem ID: SIH26044
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Statutory Ayush Councils
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                National Commission for Indian System of Medicine (NCISM)
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                National Commission for Homoeopathy (NCH)
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Pharmacopoeia Commission for Indian Medicine (PCIM&H)
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                National Medicinal Plants Board (NMPB)
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Research & Apex Institutes
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                All India Institute of Ayurveda (AIIA), New Delhi
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Central Council for Research in Ayurvedic Sciences (CCRAS)
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                National Institute of Ayurveda (NIA), Jaipur
              </li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                Central Council for Research in Homoeopathy (CCRH)
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Standards & Pharmacovigilance
            </h4>
            <div className="text-xs text-slate-400 space-y-1.5">
              <p>Schedule T Ayush Good Manufacturing Practices (GMP)</p>
              <p>Ayush Standard & Ayush Premium Mark Certification</p>
              <p>National Pharmacovigilance Programme for ASU&H Drugs</p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-[11px] text-emerald-300">
              <div className="font-semibold text-white mb-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Digital Dossier Verified
              </div>
              Encrypted credential logs verified through State Council registers.
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Ministry of Ayush, Government of India. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Audit: CERT-In</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
