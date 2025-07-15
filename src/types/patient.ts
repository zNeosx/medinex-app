import type { InferSelectModel } from "drizzle-orm";
import type { patient } from "@/server/db/schema";
import type { Allergy } from "./allergy";
import type { MedicalCondition } from "./medical-condition";

export type Patient = InferSelectModel<typeof patient> & {
  email?: string;
  allergies?: Allergy[];
  medicalConditions?: MedicalCondition[];
};

export type PatientWithEmail = Patient & {
  email?: string;
};

export type PatientFormDB = Omit<
  Patient,
  "dateOfBirth" | "createdAt" | "updatedAt" | "allergies" | "medicalConditions"
> & {
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  allergies: AllergyFormDB[];
  medicalConditions: MedicalConditionFromDB[];
};

export type AllergyFormDB = Omit<Allergy, "createdAt"> & {
  createdAt: string;
};

export type MedicalConditionFromDB = Omit<
  MedicalCondition,
  "diagnosisDate" | "createdAt"
> & {
  diagnosisDate: string;
  createdAt: string;
};
