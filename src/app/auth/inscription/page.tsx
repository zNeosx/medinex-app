import React from "react";
import PractitionerRegisterForm from "./_components/practitioner-register.form";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { specialitiesOptions } from "@/lib/react-query/options/speciality.option";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const InscriptionPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(specialitiesOptions);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PractitionerRegisterForm />
    </HydrationBoundary>
  );
};

export default InscriptionPage;
