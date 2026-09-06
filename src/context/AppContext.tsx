'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  LogEntry,
  BridgeCourse,
  Internship,
  Application,
  ResearchChallenge,
  ResearchProposal,
  AcademicMoU,
  StateSkillGap,
} from '@/data/types';
import {
  initialStudentProfile,
  initialLogEntries,
  bridgeCourses as initialBridgeCourses,
  initialInternships,
  initialApplications,
  initialChallenges,
  initialProposals,
  initialMoUs,
  stateSkillGaps as initialSkillGaps,
} from '@/data/ayushData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  studentProfile: StudentProfile;
  logEntries: LogEntry[];
  addLogEntry: (entry: Omit<LogEntry, 'id' | 'verificationStatus' | 'verificationRef'>) => void;
  verifyLogEntry: (id: string, status: 'verified' | 'rejected', notes?: string) => void;
  bridgeCourses: BridgeCourse[];
  completedCourses: string[];
  completeBridgeCourse: (courseId: string) => void;
  internships: Internship[];
  applications: Application[];
  applyToInternship: (internshipId: string) => boolean;
  updateApplicationStatus: (
    applicationId: string,
    status: Application['status']
  ) => void;
  challenges: ResearchChallenge[];
  proposals: ResearchProposal[];
  submitProposal: (
    proposal: Omit<ResearchProposal, 'id' | 'status' | 'submittedDate'>
  ) => void;
  mous: AcademicMoU[];
  stateSkillGaps: StateSkillGap[];
  calculateMatchScore: (internship: Internship) => number;
  getMissingSkills: (internship: Internship) => { missing: string[]; suggestedCourses: BridgeCourse[] };
  fontSize: 'normal' | 'large' | 'larger';
  setFontSize: (size: 'normal' | 'large' | 'larger') => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialStudentProfile);
  const [logEntries, setLogEntries] = useState<LogEntry[]>(initialLogEntries);
  const [bridgeCourses] = useState<BridgeCourse[]>(initialBridgeCourses);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [internships, setInternships] = useState<Internship[]>(initialInternships);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [challenges, setChallenges] = useState<ResearchChallenge[]>(initialChallenges);
  const [proposals, setProposals] = useState<ResearchProposal[]>(initialProposals);
  const [mous, setMous] = useState<AcademicMoU[]>(initialMoUs);
  const [stateSkillGaps] = useState<StateSkillGap[]>(initialSkillGaps);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-clear notification after 4s
  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const addLogEntry = (entry: Omit<LogEntry, 'id' | 'verificationStatus' | 'verificationRef'>) => {
    const newEntry: LogEntry = {
      ...entry,
      id: `log-${Date.now().toString().slice(-4)}`,
      verificationStatus: 'pending',
    };
    setLogEntries((prev) => [newEntry, ...prev]);
    setNotification('Logbook entry submitted successfully! Sent to Academic Dean for verification.');
  };

  const verifyLogEntry = (id: string, status: 'verified' | 'rejected') => {
    setLogEntries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              verificationStatus: status,
              verificationRef:
                status === 'verified'
                  ? `AIIA/VERIF/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`
                  : undefined,
            }
          : item
      )
    );
    setNotification(
      status === 'verified'
        ? 'Credential successfully verified with Institute Digital Signature & Seal.'
        : 'Credential rejected and returned to scholar for revision.'
    );
  };

  const completeBridgeCourse = (courseId: string) => {
    if (completedCourses.includes(courseId)) return;
    const course = bridgeCourses.find((c) => c.id === courseId);
    if (!course) return;

    setCompletedCourses((prev) => [...prev, courseId]);

    // Boost student's competency
    setStudentProfile((prev) => {
      const updatedCompetencies = { ...prev.competencies };
      const compKey = course.targetCompetency as keyof typeof updatedCompetencies;
      if (compKey in updatedCompetencies) {
        updatedCompetencies[compKey] = Math.min(100, updatedCompetencies[compKey] + course.scoreBoost);
      }
      return {
        ...prev,
        completedBridgeCourses: [...prev.completedBridgeCourses, course.title],
        competencies: updatedCompetencies,
      };
    });

    setNotification(
      `Congratulations! Completed "${course.title}". Domain readiness score updated (+${course.scoreBoost}% in ${course.targetCompetency.toUpperCase()})!`
    );
  };

  const calculateMatchScore = (internship: Internship): number => {
    let baseScore = 65;
    const comp = studentProfile.competencies;

    if (internship.category === 'qc_qa') {
      baseScore = Math.round(comp.instrumentation * 0.5 + comp.gmp * 0.3 + comp.gacp * 0.2);
    } else if (internship.category === 'formulation') {
      baseScore = Math.round(comp.formulation * 0.55 + comp.gmp * 0.3 + comp.clinical * 0.15);
    } else if (internship.category === 'botanical') {
      baseScore = Math.round(comp.gacp * 0.6 + comp.instrumentation * 0.25 + comp.gmp * 0.15);
    } else if (internship.category === 'clinical') {
      baseScore = Math.round(comp.clinical * 0.6 + comp.formulation * 0.2 + comp.pharmacovigilance * 0.2);
    } else if (internship.category === 'regulatory') {
      baseScore = Math.round(comp.pharmacovigilance * 0.5 + comp.gmp * 0.3 + comp.gacp * 0.2);
    }

    // Additional boost if completed specific bridge courses
    if (completedCourses.length > 0) {
      baseScore = Math.min(98, baseScore + completedCourses.length * 7);
    }

    return Math.min(98, Math.max(45, baseScore));
  };

  const getMissingSkills = (internship: Internship) => {
    const missing: string[] = [];
    const suggestedCourses: BridgeCourse[] = [];

    if (internship.category === 'qc_qa') {
      if (!completedCourses.includes('crs-001') && studentProfile.competencies.instrumentation < 85) {
        missing.push('AAS / ICP-MS Heavy Metal Limit Testing (Gazette GSR 560-E)');
        const c = bridgeCourses.find((x) => x.id === 'crs-001');
        if (c) suggestedCourses.push(c);
      }
      if (!completedCourses.includes('crs-002') && studentProfile.competencies.gmp < 80) {
        missing.push('Schedule T Cleanroom & Cross-Contamination Protocols');
        const c = bridgeCourses.find((x) => x.id === 'crs-002');
        if (c) suggestedCourses.push(c);
      }
    } else if (internship.category === 'formulation') {
      if (!completedCourses.includes('crs-002') && studentProfile.competencies.gmp < 85) {
        missing.push('Schedule T Ayush Batch Manufacturing Record (BMR) Audit');
        const c = bridgeCourses.find((x) => x.id === 'crs-002');
        if (c) suggestedCourses.push(c);
      }
    } else if (internship.category === 'botanical') {
      if (!completedCourses.includes('crs-004') && studentProfile.competencies.gacp < 85) {
        missing.push('NMPB Geo-Tagging & Herbarium Accession Verification');
        const c = bridgeCourses.find((x) => x.id === 'crs-004');
        if (c) suggestedCourses.push(c);
      }
    } else if (internship.category === 'regulatory') {
      if (!completedCourses.includes('crs-003') && studentProfile.competencies.pharmacovigilance < 85) {
        missing.push('PvPI Blue Form Causality Assessment (WHO-UMC Scale)');
        const c = bridgeCourses.find((x) => x.id === 'crs-003');
        if (c) suggestedCourses.push(c);
      }
    }

    return { missing, suggestedCourses };
  };

  const applyToInternship = (internshipId: string): boolean => {
    const existing = applications.find((a) => a.internshipId === internshipId);
    if (existing) {
      setNotification('You have already applied for this role with your Ayush Digital Dossier.');
      return false;
    }

    const targetJob = internships.find((j) => j.id === internshipId);
    if (!targetJob) return false;

    const matchScore = calculateMatchScore(targetJob);
    const newApp: Application = {
      id: `app-${Date.now().toString().slice(-4)}`,
      internshipId,
      internshipTitle: targetJob.title,
      company: targetJob.company,
      applicantName: studentProfile.name,
      applicantDegree: studentProfile.degree,
      appliedDate: 'Just now',
      status: 'submitted',
      dossierSnapshot: {
        registrationNo: studentProfile.registrationNo,
        clinicalHours: studentProfile.totalClinicalHours,
        verifiedBatches: studentProfile.totalFormulationBatches,
        matchPercentage: matchScore,
      },
    };

    setApplications((prev) => [newApp, ...prev]);
    setNotification(
      `Application successfully submitted to ${targetJob.company}! Your verified Ayush Dossier has been transmitted.`
    );
    return true;
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: Application['status']
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
    );
    setNotification(`Application status updated to "${status.replace('_', ' ').toUpperCase()}".`);
  };

  const submitProposal = (
    proposal: Omit<ResearchProposal, 'id' | 'status' | 'submittedDate'>
  ) => {
    const newProp: ResearchProposal = {
      ...proposal,
      id: `prop-${Date.now().toString().slice(-4)}`,
      status: 'submitted',
      submittedDate: 'Just now',
    };
    setProposals((prev) => [newProp, ...prev]);
    setNotification('Collaborative Research Proposal successfully submitted to Industry Jury!');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeView,
        setActiveView,
        studentProfile,
        logEntries,
        addLogEntry,
        verifyLogEntry,
        bridgeCourses,
        completedCourses,
        completeBridgeCourse,
        internships,
        applications,
        applyToInternship,
        updateApplicationStatus,
        challenges,
        proposals,
        submitProposal,
        mous,
        stateSkillGaps,
        calculateMatchScore,
        getMissingSkills,
        fontSize,
        setFontSize,
        notification,
        setNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
