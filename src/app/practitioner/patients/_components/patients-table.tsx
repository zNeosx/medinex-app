"use client";

import { PatientsDataTable } from "@/app/practitioner/patients/_components/data-table";
import { ModalType, useModalStore } from "@/stores/modal.store";
import type { Patient } from "@/types/patient";
import { getPatientColumns } from "./columns";

type Props = {
  data: Patient[];
};
const PatientsTable = ({ data }: Props) => {
  const { openModal } = useModalStore();

  const handleViewDetails = (patient: Patient) => {
    openModal(ModalType.PATIENT_RECORD_DETAILS, {
      data: patient,
    });
  };

  const columns = getPatientColumns(handleViewDetails);
  return (
    <PatientsDataTable
      tableContainerClassName="border-none"
      columns={columns}
      data={data}
    />
  );
};

export default PatientsTable;
