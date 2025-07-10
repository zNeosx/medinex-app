"use client";

import { fullPatientSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModalStore } from "@/stores/modal.store";
import { Switch } from "../ui/switch";
import { bloodTypeEnum, genderEnum, severityEnum } from "@/server/db/schema";
import { Textarea } from "../ui/textarea";
import { Trash } from "lucide-react";
import { useCreatePatient } from "@/server/features/patients/create";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = fullPatientSchema;

const NewPatientForm = () => {
  const router = useRouter();
  const { closeModal } = useModalStore();

  const mutation = useCreatePatient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: {
        firstName: "",
        lastName: "",
        email: undefined,
        dateOfBirth: undefined,
        gender: undefined,
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        emergencyContact: "",
        emergencyPhone: "",
        bloodType: undefined,
        insuranceProvider: "",
        hasAccount: true,
      },
      allergies: [{ allergen: "", severity: "mild" }],
      medicalConditions: undefined,
    },
  });

  const {
    fields: allergyFields,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    control: form.control,
    name: "allergies",
  });

  const {
    fields: conditionFields,
    append: appendCondition,
    remove: removeCondition,
  } = useFieldArray({
    control: form.control,
    name: "medicalConditions",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await mutation.mutateAsync(values);
      toast.success("Votre compte a bien été créé.");
      router.push("/practitioner/patients");
    } catch (error) {
      console.error("Erreur de la création d'un patient :", error);
      toast.error((error as Error).message);
    }
  }

  const patientHasAccount = form.watch("patient.hasAccount");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={mutation.isPending}
          className="space-y-8 overflow-y-auto"
        >
          <FormField
            control={form.control}
            name="patient.hasAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avec un compte</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        form.setValue("patient.email", undefined);
                      }
                      field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="patient.gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner votre genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...genderEnum.enumValues].map((s, index) => (
                        <SelectItem key={index} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="patient.firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patient.lastName"
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
          <div className="grid gap-3 sm:grid-cols-2">
            {patientHasAccount ? (
              <FormField
                control={form.control}
                name="patient.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jeandoe@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            <FormField
              control={form.control}
              name="patient.phone"
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
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="patient.dateOfBirth"
              render={({ field }) => {
                const { value, onChange, ...props } = field;
                return (
                  <FormItem className="w-full">
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <div className="flex w-full">
                        <Input
                          className="w-full flex-1"
                          type="date"
                          value={String(value)}
                          onChange={(event) => {
                            onChange(event.target.value.toString());
                          }}
                          {...props}
                        />
                      </div>
                      {/* <DatePickerWithFields /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="patient.bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Groupe sanguin</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner votre groupe sanguin" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...bloodTypeEnum.enumValues].map((s, index) => (
                          <SelectItem key={index} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="patient.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="patient.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patient.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="patient.emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact (Urgence)</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane DOE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patient.emergencyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone (Urgence)</FormLabel>
                  <FormControl>
                    <Input placeholder="+262692010203" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="patient.insuranceProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assurance</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className="flex items-center justify-between">
              <h4 className="mb-2 text-sm font-medium">Allergies connues</h4>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() =>
                  appendAllergy({ allergen: "", severity: "mild" })
                }
              >
                + Ajouter
              </Button>
            </div>
            {allergyFields.map((field, index) => (
              <div
                key={field.id}
                className="my-4 flex items-center gap-3 border-b pb-4"
              >
                <FormField
                  control={form.control}
                  name={`allergies.${index}.allergen`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Nom de l'allergène" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`allergies.${index}.severity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Gravité" />
                          </SelectTrigger>
                          <SelectContent>
                            {severityEnum.enumValues.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeAllergy(index)}
                >
                  <Trash />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Conditions médicales</h3>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() =>
                  appendCondition({
                    conditionName: "",
                    diagnosisDate: new Date(), // yyyy-mm-dd
                    status: "",
                    notes: "",
                  })
                }
              >
                + Ajouter
              </Button>
            </div>

            {conditionFields.length === 0 && (
              <p className="text-muted-foreground text-sm italic">
                Aucune condition médicale
              </p>
            )}

            {conditionFields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-wrap items-end gap-3 border-b pb-4"
              >
                <FormField
                  control={form.control}
                  name={`medicalConditions.${index}.conditionName`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de la condition" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`medicalConditions.${index}.diagnosisDate`}
                  render={({ field }) => {
                    const { value, onChange, ...restField } = field;
                    return (
                      <FormItem>
                        <FormLabel>Date du diagnostic</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            value={
                              value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              onChange(value ? new Date(value) : undefined);
                            }}
                            {...restField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name={`medicalConditions.${index}.status`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <FormControl>
                        <Input placeholder="Actif, Résolu..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  className="shrink"
                  variant="destructive"
                  onClick={() => removeCondition(index)}
                >
                  <Trash />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            ))}
          </div>
        </fieldset>
        <div
          className={"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"}
        >
          <Button
            variant={"outline"}
            onClick={() => closeModal()}
            isLoading={mutation.isPending}
          >
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewPatientForm;
