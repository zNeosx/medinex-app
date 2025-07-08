import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const userRoleEnum = pgEnum("user_role_enum", [
  "ADMIN",
  "PRACTITIONER",
  "PATIENT",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  role: userRoleEnum().notNull().default("PATIENT"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});

export const specialty = pgTable("specialty", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const specialitiesRelations = relations(specialty, ({ many }) => ({
  practitionerSpecialties: many(practitionerSpecialties),
}));

export const specialitySelectSchema = createSelectSchema(specialty);

export const practitioner = pgTable("practitioner", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  medicalLicenseNumber: text("medical_license_number").notNull(),
  image: text("image"),
});

export const practitionerRelations = relations(practitioner, ({ many }) => ({
  practitionerSpecialties: many(practitionerSpecialties),
}));

// PractitionerSpecialties join table (for many-to-many relation)
export const practitionerSpecialties = pgTable(
  "practitioner_specialties",
  {
    practitionerId: text("practitioner_id")
      .notNull()
      .references(() => practitioner.id, { onDelete: "cascade" }),
    specialtyId: text("specialty_id")
      .notNull()
      .references(() => specialty.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.practitionerId, t.specialtyId] })],
);

export const practitionerSpecialtiesRelations = relations(
  practitionerSpecialties,
  ({ one }) => ({
    practitioner: one(practitioner, {
      fields: [practitionerSpecialties.practitionerId],
      references: [practitioner.id],
    }),
    specialty: one(specialty, {
      fields: [practitionerSpecialties.specialtyId],
      references: [specialty.id],
    }),
  }),
);

export const patient = pgTable("patient", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  postalCode: text("postal_code"),
  emergencyContact: text("emergency_contact"),
  emergencyPhone: text("emergency_phone"),
  bloodType: text("blood_type"),
  insuranceProvider: text("insurance_provider"),
  hasAccount: boolean("has_account").default(true).notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const patientRelations = relations(patient, ({ many }) => ({
  allergies: many(allergy),
  medicalConditions: many(medicalCondition),
}));

export const allergy = pgTable("allergy", {
  id: text("id").primaryKey(),
  patientId: text("patient_id")
    .notNull()
    .references(() => patient.id, { onDelete: "cascade" }),
  allergen: text("allergen").notNull(),
  severity: text("severity").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const allergyRelations = relations(allergy, ({ one }) => ({
  patient: one(patient, {
    fields: [allergy.patientId],
    references: [patient.id],
  }),
}));

export const medicalCondition = pgTable("medical_condition", {
  id: text("id").primaryKey(),
  patientId: text("patient_id")
    .notNull()
    .references(() => patient.id, { onDelete: "cascade" }),
  conditionName: text("condition_name").notNull(),
  diagnosisDate: timestamp("diagnosis_date").notNull(),
  status: text("status").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const medicalConditionRelations = relations(
  medicalCondition,
  ({ one }) => ({
    patient: one(patient, {
      fields: [medicalCondition.patientId],
      references: [patient.id],
    }),
  }),
);
