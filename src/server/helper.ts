import type { PatientFormDB } from "@/types/patient";

export function toPatientDTO(patient: PatientFormDB) {
  return {
    ...patient,
    allergies: patient.allergies?.map((a) => ({
      ...a,
      createdAt: new Date(a.createdAt),
    })),
    medicalConditions: patient.medicalConditions?.map((m) => ({
      ...m,
      createdAt: new Date(m.createdAt),
      diagnosisDate: new Date(m.diagnosisDate),
    })),
    dateOfBirth: new Date(patient.dateOfBirth),
    createdAt: new Date(patient.createdAt),
    updatedAt: new Date(patient.updatedAt),
  };
}
