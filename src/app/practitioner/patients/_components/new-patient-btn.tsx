"use client";
import { Button } from "@/components/ui/button";
import { ModalType, useModalStore } from "@/stores/modal.store";
import { Plus } from "lucide-react";
import React from "react";

const NewPatientBtn = () => {
  const { openModal } = useModalStore();
  return (
    <Button
      className="sm:w-fit"
      onClick={() => openModal(ModalType.NEW_PATIENT)}
    >
      <Plus />
      <span>Nouveau patient</span>
    </Button>
  );
};

export default NewPatientBtn;
