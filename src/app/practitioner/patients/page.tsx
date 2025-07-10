import AdminPagesHeader from "@/components/common/page-header";
import NewPatientBtn from "./_components/new-patient-btn";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const PractitionerPatientsPage = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Patients"
        subtitle={"Gérer les dossiers et les informations des patients"}
      >
        {/* <NewPatientBtn /> */}
        <Link
          href={"/practitioner/patients/nouveau"}
          className={buttonVariants()}
        >
          <Plus />
          <span>Nouveau patient</span>
        </Link>
      </AdminPagesHeader>
    </div>
  );
};

export default PractitionerPatientsPage;
