CREATE TABLE "allergy" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"allergen" text NOT NULL,
	"severity" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medical_condition" (
	"id" text PRIMARY KEY NOT NULL,
	"patient_id" text NOT NULL,
	"condition_name" text NOT NULL,
	"diagnosis_date" timestamp NOT NULL,
	"status" text NOT NULL,
	"notes" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patient" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"gender" text NOT NULL,
	"phone" text NOT NULL,
	"address" text,
	"city" text,
	"postal_code" text,
	"emergency_contact" text,
	"emergency_phone" text,
	"blood_type" text,
	"insurance_provider" text,
	"has_account" boolean DEFAULT true NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "patient_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "allergy" ADD CONSTRAINT "allergy_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medical_condition" ADD CONSTRAINT "medical_condition_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patient" ADD CONSTRAINT "patient_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;