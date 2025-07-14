import { PatientsDataTable } from "@/app/practitioner/patients/_components/data-table";
import type { Patient } from "@/types/patient";
import { patientColumns } from "./columns";

type Props = {
  data: Patient[];
};
const PatientsTable = ({ data }: Props) => {
  return (
    <PatientsDataTable
      tableContainerClassName="border-none"
      columns={patientColumns}
      data={data}
    />
  );
};

export default PatientsTable;
