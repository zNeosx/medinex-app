CREATE TYPE "public"."gender_enum" AS ENUM('male', 'female', 'other', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."severity_enum" AS ENUM('mild', 'moderate', 'severe');--> statement-breakpoint
ALTER TABLE "allergy" ALTER COLUMN "severity" SET DATA TYPE severity_enum;--> statement-breakpoint
ALTER TABLE "patient" ALTER COLUMN "gender" SET DATA TYPE gender_enum;