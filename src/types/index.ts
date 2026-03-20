export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  age: number;
  dob: string;
  sex: 'Male' | 'Female' | 'Other';
  address: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Offline';
  avatarGradient: string;
  insurance: string;
  mrn: string;
}

export interface Visit {
  id: string;
  patientId: string;
  date: string;
  time: string;
  type: 'Video Visit' | 'In-Person' | 'Phone Call';
  duration: string;
  provider: string;
  status: 'Completed' | 'Pending' | 'Cancelled' | 'In Progress' | 'Scheduled';
  reason: string;
  cost: string;
  room: string;
  chiefComplaint: string;
}

export interface SOAPNote {
  visitId: string;
  subjective: {
    chiefComplaint: string;
    hpi: string;
    pmh: string;
    pastSurgeries: string;
    socialHistory: string;
    healthHabits: string;
    familyHistory: string;
    medications: string;
    allergies: string;
    ros: string;
  };
  objective: {
    vitals: string;
    physicalExam: string;
    labsDiagnostics: string;
  };
  assessment: {
    diagnosis: string;
  };
  plan: {
    treatmentPlan: string;
    prescriptions: string;
    followUp: string;
  };
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  prescriber: string;
  startDate: string;
  status: 'Active' | 'Discontinued' | 'On Hold';
  refills: number;
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  status: 'Active' | 'Resolved';
  onsetDate: string;
  source: string;
}

export interface Problem {
  id: string;
  name: string;
  icd10: string;
  status: 'Active' | 'Resolved' | 'Inactive';
  onsetDate: string;
  diagnosedBy: string;
  notes: string;
}

export interface VitalSigns {
  date: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  weight: number;
  height: string;
  bmi: number;
}
