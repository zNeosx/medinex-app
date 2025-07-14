import AdminPagesHeader from "@/components/common/page-header";
import { buttonVariants } from "@/components/ui/button";
import { client } from "@/server/api";
import { toPatientDTO } from "@/server/helper";
import { Plus } from "lucide-react";
import Link from "next/link";
import PatientsStats from "./_components/patients-stats";
import PatientsTable from "./_components/patients-table";
const PractitionerPatientsPage = async () => {
  const response = await client.api.patients.$get();

  const json = await response.json();
  if (!response.ok || !json.data) {
    throw new Error(json.error?.message ?? "Une erreur est survenue");
  }

  const mappedPatients = json.data.map(toPatientDTO);
  return (
    <div className="space-y-6">
      <AdminPagesHeader
        title="Patients"
        subtitle={"Gérer les dossiers et les informations des patients"}
      >
        <Link
          href={"/practitioner/patients/nouveau"}
          className={buttonVariants()}
        >
          <Plus />
          <span>Nouveau patient</span>
        </Link>
      </AdminPagesHeader>

      <PatientsStats patients={mappedPatients} />

      <PatientsTable data={mappedPatients} />
    </div>
  );
};

export default PractitionerPatientsPage;
