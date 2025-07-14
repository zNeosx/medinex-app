import type { patientStatusEnum, severityEnum } from "@/server/db/schema";

export type Severity = (typeof severityEnum.enumValues)[number];
export type PatientStatus = (typeof patientStatusEnum.enumValues)[number];
