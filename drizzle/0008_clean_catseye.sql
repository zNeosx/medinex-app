CREATE TYPE "public"."blood_type_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');--> statement-breakpoint
ALTER TABLE "patient" ALTER COLUMN "blood_type" SET DATA TYPE blood_type_enum;