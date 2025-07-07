CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'PRACTITIONER', 'PATIENT');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role_enum";