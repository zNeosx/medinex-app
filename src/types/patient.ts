import type { InferSelectModel } from "drizzle-orm";
import type { patient } from "@/server/db/schema";

export type Patient = InferSelectModel<typeof patient>;

export type PatientFormDB = Omit<
  Patient,
  "dateOfBirth" | "createdAt" | "updatedAt"
> & {
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
};
