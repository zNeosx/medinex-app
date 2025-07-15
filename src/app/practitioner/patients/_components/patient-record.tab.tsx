import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Patient } from "@/types/patient";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecordOverview from "./record-overview";
import RecordMedicalInfo from "./record-medical-info";

type Props = {
  patient: Patient;
};
const PatientRecordTab = ({ patient }: Props) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <ScrollArea>
        <TabsList className="w-full">
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="medicalInfo">Information Médicale</TabsTrigger>
          <TabsTrigger value="contact">Contact & Urgence</TabsTrigger>
        </TabsList>
      </ScrollArea>
      <TabsContent value="overview">
        <RecordOverview patient={patient} />
      </TabsContent>
      <TabsContent value="medicalInfo">
        <RecordMedicalInfo patient={patient} />
      </TabsContent>
      <TabsContent value="contact">Contact</TabsContent>
    </Tabs>
  );
};

export default PatientRecordTab;
