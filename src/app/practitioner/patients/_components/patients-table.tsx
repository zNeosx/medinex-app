import { DataTable } from "@/components/common/data-table";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { patientColumns } from "./data-table/columns";
import type { Patient } from "@/types/patient";

type Props = {
  data: Patient[];
};
const PatientsTable = ({ data }: Props) => {
  // return (
  //   <Card>
  //     <CardContent>@TODO: PatientsTable</CardContent>
  //   </Card>
  // );

  return <DataTable columns={patientColumns} data={data} />;
};

export default PatientsTable;
