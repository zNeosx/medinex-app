/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ModalType, useModalStore } from "@/stores/modal.store";
import type { Patient } from "@/types/patient";
import PatientRecordTab from "@/app/practitioner/patients/_components/patient-record.tab";

const PatientRecordDetailsModal = () => {
  const { currentModal, closeModal, modalProps } = useModalStore();
  const isOpen = currentModal === ModalType.PATIENT_RECORD_DETAILS;

  if (!isOpen) return null;

  const props: Patient = modalProps.data;

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="w-full overflow-auto md:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {props.firstName} {props.lastName}
          </DialogTitle>
          <DialogDescription>Détails du dossier du patient</DialogDescription>
        </DialogHeader>
        <PatientRecordTab patient={props} />
      </DialogContent>
    </Dialog>
  );
};

export default PatientRecordDetailsModal;
