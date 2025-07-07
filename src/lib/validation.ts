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
