'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { PlusCircle, Sparkles, AlertCircle } from 'lucide-react';

interface AddLogEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLogEntryModal: React.FC<AddLogEntryModalProps> = ({ isOpen, onClose }) => {
  const { addLogEntry, studentProfile } = useApp();

  const [category, setCategory] = useState<'panchakarma' | 'formulation' | 'analytical_qc'>('panchakarma');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Dept of Kayachikitsa & Panchakarma');
  const [hoursOrBatch, setHoursOrBatch] = useState('');
  const [supervisor, setSupervisor] = useState('Prof. (Dr.) R. K. Joshi, HOD');
  const [botanicalNames, setBotanicalNames] = useState('');
  const [protocolStandard, setProtocolStandard] = useState('Ayurvedic Pharmacopoeia of India (API)');
  const [equipmentUsed, setEquipmentUsed] = useState('');
  const [observations, setObservations] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !hoursOrBatch) return;

    addLogEntry({
      category,
      title,
      department,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      hoursOrBatch,
      supervisor,
      institution: studentProfile.institution,
      details: {
        botanicalNames: botanicalNames ? botanicalNames.split(',').map((s) => s.trim()) : undefined,
        protocolStandard,
        equipmentUsed: equipmentUsed ? equipmentUsed.split(',').map((s) => s.trim()) : undefined,
        observations,
      },
    });

    onClose();
    // Reset form
    setTitle('');
    setHoursOrBatch('');
    setBotanicalNames('');
    setObservations('');
  };

  const autofillTemplate = (type: 'panchakarma' | 'formulation' | 'analytical_qc') => {
    setCategory(type);
    if (type === 'panchakarma') {
      setTitle('Matra Basti with Sahacharadi Taila in Gridhrasi (Sciatica)');
      setDepartment('Dept of Panchakarma Clinical IPD');
      setHoursOrBatch('45 Hours Supervised Ward Rotation');
      setSupervisor('Prof. (Dr.) Meenakshi Sundaram');
      setBotanicalNames('Barleria prionitis (Sahachara), Sesamum indicum');
      setProtocolStandard('Sushruta Samhita Chikitsa Sthana 37 / CCRAS Clinical Protocol');
      setEquipmentUsed('Sterile Disposable Basti Catheter, Temperature Water Bath');
      setObservations('Complete relief in radiating leg pain (SLR test improved from 40° to 75°). Retention time averaged 4.5 hours.');
    } else if (type === 'formulation') {
      setTitle('Classical Draksharishta Fermentation & Alcohol Proofing');
      setDepartment('Dept of Rasashastra & Bhaishajya Kalpana');
      setHoursOrBatch('Batch #AIIA-DKR-055 (40 Liters)');
      setSupervisor('Dr. Vaidya Anand Kumar, Pharmacist');
      setBotanicalNames('Vitis vinifera (Draksha), Woodfordia fruticosa (Dhataki Pushpa)');
      setProtocolStandard('Ayurvedic Formulary of India (AFI) Part-I, 1:15');
      setEquipmentUsed('Sandheya Patra Porcelain Fermenter, Specific Gravity Hydrometer');
      setObservations('Self-generated alcohol assay measured 8.4% v/v. Sandhana paka completed in 30 days at regulated 32°C ambient temperature.');
    } else {
      setTitle('TLC Identification of Curcuminoids in Curcuma longa Rhizome Lots');
      setDepartment('Central Ayush Quality Control & Phytochemistry Lab');
      setHoursOrBatch('Batch #QC-CUR-12 (12 Extraction Runs)');
      setSupervisor('Dr. Sunita Varma, Analytical Chemist');
      setBotanicalNames('Curcuma longa (Haridra)');
      setProtocolStandard('ICMR Quality Standards & API Part-I Vol I');
      setEquipmentUsed('CAMAG TLC Chamber, UV Cabinet 366nm, Silica Gel 60 F254 Plates');
      setObservations('Curcumin, Demethoxycurcumin, and Bisdemethoxycurcumin resolved distinctly at Rf 0.72, 0.58, 0.44 under Chloroform:Methanol (95:5).');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record New Ayush Clinical / Lab Logbook Entry"
      subtitle="Submitted entries are forwarded to the College Dean/HOD for verification and Council endorsement."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Quick Autofill Buttons */}
        <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-emerald-900 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Quick Fill Sample Protocol Template:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => autofillTemplate('panchakarma')}
              className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 text-xs font-medium transition-colors"
            >
              + Panchakarma Clinical Basti
            </button>
            <button
              type="button"
              onClick={() => autofillTemplate('formulation')}
              className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 text-xs font-medium transition-colors"
            >
              + Classical Asava-Arishta Batch
            </button>
            <button
              type="button"
              onClick={() => autofillTemplate('analytical_qc')}
              className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 text-xs font-medium transition-colors"
            >
              + Phytochemical TLC Analysis
            </button>
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Ayush Training Category *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'panchakarma', label: 'Clinical Panchakarma' },
              { id: 'formulation', label: 'Formulation Batch (GMP)' },
              { id: 'analytical_qc', label: 'Analytical QC & Testing' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id as any)}
                className={`p-2 rounded-xl border text-xs font-medium transition-all text-center ${
                  category === cat.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Procedure / Formulation / Test Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Classical Virechana Karma Protocol for Chronic Psoriasis"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
          />
        </div>

        {/* 2-column: Dept & Hours/Batch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Department / Hospital Ward *
            </label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Clinical Hours or Batch Yield *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 60 Hours Supervised / Batch #102 (25 kg)"
              value={hoursOrBatch}
              onChange={(e) => setHoursOrBatch(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
            />
          </div>
        </div>

        {/* 2-column: Supervisor & Protocol */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Supervising Faculty / HOD *
            </label>
            <input
              type="text"
              required
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Pharmacopoeia Standard / Monograph Reference
            </label>
            <input
              type="text"
              value={protocolStandard}
              onChange={(e) => setProtocolStandard(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
            />
          </div>
        </div>

        {/* Botanical Latin Names */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Botanical Flora / Mineral Ingredients (with Latin names)
          </label>
          <input
            type="text"
            placeholder="e.g. Withania somnifera (Ashwagandha), Tinospora cordifolia (Guduchi)"
            value={botanicalNames}
            onChange={(e) => setBotanicalNames(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
          />
        </div>

        {/* Equipment */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Laboratory / Clinical Equipment Mastered
          </label>
          <input
            type="text"
            placeholder="e.g. CAMAG TLC Scanner 4, PerkinElmer AAS, Shirodhara Automated Apparatus"
            value={equipmentUsed}
            onChange={(e) => setEquipmentUsed(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
          />
        </div>

        {/* Observations */}
        <div>
          <label className="block font-semibold text-slate-800 mb-1">
            Clinical / Analytical Observations & Quality Findings
          </label>
          <textarea
            rows={3}
            placeholder="Describe clinical outcome, Vega count, chromatographic Rf values, or assay percentages..."
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-slate-800"
          />
        </div>

        {/* Verification Alert */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <span>
            Upon submission, this entry will carry a &ldquo;Pending College Verification&rdquo; seal until signed off with digital faculty signature by the College Placement Head / Academic Dean.
          </span>
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
            <PlusCircle className="w-4 h-4" />
            Submit Logbook Entry
          </button>
        </div>
      </form>
    </Modal>
  );
};
