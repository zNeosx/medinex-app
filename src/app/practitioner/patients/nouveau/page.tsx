import NewPatientForm from "@/components/forms/new-patient.form";
import React from "react";

const NewPatientPage = () => {
  return (
    <>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold">Ajouter un nouveau patient</h2>
          <p className="text-muted-foreground text-sm">
            Saisir les informations relatives au patient pour créer un nouveau
            dossier
          </p>
        </div>
        <NewPatientForm />
      </div>
    </>
  );
};

export default NewPatientPage;
