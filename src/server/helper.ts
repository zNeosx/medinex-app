import type { PatientFormDB } from "@/types/patient";

export function toPatientDTO(patient: PatientFormDB) {
  return {
    ...patient,
    dateOfBirth: new Date(patient.dateOfBirth),
    createdAt: new Date(patient.createdAt),
    updatedAt: new Date(patient.updatedAt),
  };
}
