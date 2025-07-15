import type { allergy } from "@/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Allergy = InferSelectModel<typeof allergy>;
