CREATE TABLE "practitioner" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"phone" text NOT NULL,
	"medical_license_number" text NOT NULL,
	"image" text,
	CONSTRAINT "practitioner_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "practitioner_specialties" (
	"practitioner_id" text NOT NULL,
	"specialty_id" text NOT NULL,
	CONSTRAINT "practitioner_specialties_practitioner_id_specialty_id_pk" PRIMARY KEY("practitioner_id","specialty_id")
);
--> statement-breakpoint
ALTER TABLE "practitioner" ADD CONSTRAINT "practitioner_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_specialties" ADD CONSTRAINT "practitioner_specialties_practitioner_id_practitioner_id_fk" FOREIGN KEY ("practitioner_id") REFERENCES "public"."practitioner"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "practitioner_specialties" ADD CONSTRAINT "practitioner_specialties_specialty_id_specialty_id_fk" FOREIGN KEY ("specialty_id") REFERENCES "public"."specialty"("id") ON DELETE cascade ON UPDATE no action;