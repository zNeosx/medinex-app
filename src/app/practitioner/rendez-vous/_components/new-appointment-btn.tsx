"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const NewAppointmentBtn = () => {
  return (
    <Button className="sm:w-fit">
      <Plus />
      <span>Nouveau rendez-vous</span>
    </Button>
  );
};

export default NewAppointmentBtn;
