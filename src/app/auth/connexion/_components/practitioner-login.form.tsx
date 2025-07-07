"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { practitionerLoginSchema } from "@/lib/validation";
import { useRegisterPractitioner } from "@/server/features/auth/register-practitioner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const PractitionerLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = practitionerLoginSchema;

  const mutation = useRegisterPractitioner();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    setIsLoading(true);
    const { error } = await authClient.signIn.email({ ...values });
    setIsLoading(false);
    console.log("error", error);

    if (error) {
      if (error.statusText === "Not found") {
        toast.error("Aucun compte lié à cette adresse email.");
        return;
      }
      toast.error(error.message ?? "Une erreur est survenue.");
      return;
    }
    toast.success(
      "Connexion réussie. Vous allez être redirigé vers votre tableau de bord.",
    );
    router.push("/practitioner/tableau-de-bord");
  }

  return (
    <Card className="mx-auto w-full max-w-md border-none">
      <CardHeader>
        <CardTitle className="flex items-end gap-2">
          Bon retour parmi nous ! 👋
        </CardTitle>
        <CardDescription>
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              disabled={mutation.isPending || isLoading}
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
              name="password"
              disabled={mutation.isPending || isLoading}
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

            <Button
              isLoading={mutation.isPending || isLoading}
              type="submit"
              className="w-full"
            >
              Je me connecte
            </Button>
          </form>
        </Form>
        <p className="text-center text-xs text-gray-600">
          Vous n&apos;avez pas de compte ?{" "}
          <Link href="/auth/inscription" className="text-primary font-semibold">
            Inscrivez-vous ici
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default PractitionerLoginForm;
