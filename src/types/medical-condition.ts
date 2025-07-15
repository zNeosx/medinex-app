import type { medicalCondition } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type MedicalCondition = InferSelectModel<typeof medicalCondition>;
