export type UserRole = 'student' | 'academic' | 'industry' | 'ministry';

export interface LogEntry {
  id: string;
  category: 'panchakarma' | 'formulation' | 'analytical_qc';
  title: string;
  department: string;
  date: string;
  hoursOrBatch: string;
  supervisor: string;
  institution: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  verificationRef?: string;
  details: {
    botanicalNames?: string[];
    protocolStandard?: string;
    observations?: string;
    equipmentUsed?: string[];
  };
}

export interface StudentProfile {
  id: string;
  name: string;
  degree: string;
  institution: string;
  registrationNo: string;
  councilName: string;
  councilVerified: boolean;
  ncismEndorsed: boolean;
  avatarUrl: string;
  totalClinicalHours: number;
  totalFormulationBatches: number;
  instrumentsMastered: string[];
  competencies: {
    gacp: number;
    gmp: number;
    formulation: number;
    pharmacovigilance: number;
    instrumentation: number;
    clinical: number;
  };
  completedBridgeCourses: string[];
}

export interface BridgeCourse {
  id: string;
  title: string;
  offeredBy: string;
  hours: number;
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  targetCompetency: 'instrumentation' | 'gmp' | 'pharmacovigilance' | 'gacp' | 'formulation' | 'clinical';
  scoreBoost: number;
  description: string;
  syllabusHighlights: string[];
  certificationBadge: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  category: 'qc_qa' | 'formulation' | 'botanical' | 'clinical' | 'regulatory';
  location: string;
  type: 'Internship' | 'Full-time' | 'Residency';
  stipendOrSalary: string;
  duration: string;
  openings: number;
  requiredSkills: string[];
  prerequisites: {
    minClinicalHours?: number;
    requiredInstruments?: string[];
    degreeAllowed: string[];
  };
  description: string;
  responsibilities: string[];
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  applicantName: string;
  applicantDegree: string;
  appliedDate: string;
  status: 'submitted' | 'college_endorsed' | 'shortlisted' | 'offered' | 'rejected';
  dossierSnapshot: {
    registrationNo: string;
    clinicalHours: number;
    verifiedBatches: number;
    matchPercentage: number;
  };
}

export interface ResearchChallenge {
  id: string;
  title: string;
  sponsor: string;
  domain: 'Phytochemistry' | 'Formulation Stability' | 'Rasashastra' | 'Botanical Cultivation';
  grantAmount: string;
  timeline: string;
  deadline: string;
  proposalsCount: number;
  problemBrief: string;
  deliverables: string[];
  eligibility: string;
}

export interface ResearchProposal {
  id: string;
  challengeId: string;
  challengeTitle: string;
  sponsor: string;
  piName: string;
  piDesignation: string;
  institute: string;
  coInvestigators: string[];
  methodologySummary: string;
  budgetRequested: string;
  proposedDuration: string;
  status: 'submitted' | 'under_review' | 'shortlisted' | 'sanctioned';
  submittedDate: string;
}

export interface AcademicMoU {
  id: string;
  industryPartner: string;
  partnerType: 'Ayush Pharma' | 'Herbal FMCG' | 'NABH Hospital' | 'Botanical Cooperative';
  signedDate: string;
  validityUntil: string;
  annualInternshipQuota: number;
  activeInterns: number;
  jointResearchProjects: number;
  status: 'Active' | 'Under Renewal';
}

export interface StateSkillGap {
  state: string;
  code: string;
  surplusDomains: string[];
  shortageDomains: string[];
  totalStudents: number;
  placementRate: number;
  openIndustryDemands: number;
  shortageSeverity: 'high' | 'medium' | 'low';
}
