import { bloodTypeEnum, genderEnum, severityEnum } from "@/server/db/schema";
import { z } from "zod";

export const practitionerRegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Votre prénom doit comporter au moins 2 caractères")
      .max(50, "Votre prénom doit comporter au plus 50 caractères"),
    lastName: z
      .string()
      .min(2, "Votre nom doit comporter au moins 2 caractères")
      .max(50, "Votre nom doit comporter au plus 50 caractères"),
    email: z.string().email("Veuillez entrer une adresse email valide"),
    phone: z
      .string()
      .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres")
      .max(15, "Le numéro de téléphone doit comporter au plus 15 chiffres"),
    medicalSpeciality: z.string(),
    medicalLicenseNumber: z
      .string()
      .min(2, "Veuillez entrer votre numéro de licence médicale."),
    password: z
      .string()
      .min(8, "Votre mot de passe doit comporter au moins 8 caractères"),
    confirmPassword: z.string().min(1, "Veuillez confirmer votre mot de passe"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Les mots de passe ne correspondent pas",
  });

export const practitionerLoginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(1, "Veuillez entrer votre mot de passe"),
});

export const patientFormSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.coerce.date(),
    gender: z.enum([...genderEnum.enumValues]),
    phone: z.string().min(5),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    emergencyContact: z.string().optional(),
    emergencyPhone: z.string().optional(),
    bloodType: z.enum([...bloodTypeEnum.enumValues]).optional(),
    insuranceProvider: z.string().optional(),
    hasAccount: z.boolean(),
    email: z.string().email().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasAccount && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'email est requis si le patient a un compte",
        path: ["email"],
      });
    }
  });

export const allergySchema = z.object({
  allergen: z.string().min(1, "Allergène requis"),
  severity: z.enum([...severityEnum.enumValues]),
});

export const medicalConditionSchema = z.object({
  conditionName: z.string().min(1, "Nom de la condition requis"),
  diagnosisDate: z.coerce.date({
    required_error: "Date du diagnostic requise",
  }),
  status: z.string().min(1),
  notes: z.string().optional(),
});

export const fullPatientSchema = z.object({
  patient: patientFormSchema,
  allergies: z.array(allergySchema).optional(),
  medicalConditions: z.array(medicalConditionSchema).optional(),
});
