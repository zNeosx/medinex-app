"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { practitionerRegisterSchema } from "@/lib/validation";
// import { ModalType, useModalStore } from "@/stores/modal.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { specialitiesOptions } from "@/lib/react-query/options/speciality.option";
import { useRegisterPractitioner } from "@/server/features/auth/register-practitioner";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Stethoscope } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PractitionerRegisterForm = () => {
  const router = useRouter();

  const formSchema = practitionerRegisterSchema;

  const { data: specialities } = useSuspenseQuery(specialitiesOptions);

  const mutation = useRegisterPractitioner();

  //     if (error) {
  //       throw new Error(error.message);
  //     }

  //     return;
  //   },
  // });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      medicalSpeciality: "",
      medicalLicenseNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
    if (mutation.error) {
      toast.error(mutation.error.message);
      return;
    }
    toast.success("Votre compte a bien été créé. ");
    router.push("/practitioner/tableau-de-bord");
  }

  return (
    <Card className="mx-auto w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="flex items-end gap-2">
          <Stethoscope size={20} /> Inscription Praticien
        </CardTitle>
        <CardDescription>
          Inscrivez-vous en tant que praticien pour rejoindre notre plateforme
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="firstName"
                disabled={mutation.isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                disabled={mutation.isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="DOE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              disabled={mutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              disabled={mutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="+262692010203" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalSpeciality"
              disabled={mutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spécialité</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner votre spécialité" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialities?.data.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalLicenseNumber"
              disabled={mutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de licence médicale</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={mutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              disabled={mutation.isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              isLoading={mutation.isPending}
              type="submit"
              className="w-full"
            >
              Créer mon compte
            </Button>
          </form>
        </Form>
        <p className="text-center text-xs text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link href="/auth/connexion" className="text-primary font-semibold">
            Connectez-vous ici
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default PractitionerRegisterForm;
