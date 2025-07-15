CREATE TYPE "public"."appointment_status" AS ENUM('scheduled', 'cancelled', 'pending');--> statement-breakpoint
CREATE TABLE "appointment" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"practitioner_id" text NOT NULL,
	"date" timestamp NOT NULL,
	"duration_minutes" integer DEFAULT 30 NOT NULL,
	"appointment_type_id" text NOT NULL,
	"status" "appointment_status" DEFAULT 'pending' NOT NULL,
	"reason" text,
	"notes" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appointment_type" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_appointment_type_id_appointment_type_id_fk" FOREIGN KEY ("appointment_type_id") REFERENCES "public"."appointment_type"("id") ON DELETE no action ON UPDATE no action;