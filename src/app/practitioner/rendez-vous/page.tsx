import AdminPagesHeader from "@/components/common/page-header";
import React from "react";
import NewAppointmentBtn from "./_components/new-appointment-btn";

const PractitionerAppointmentsPage = () => {
  return (
    <div>
      <AdminPagesHeader
        title="Rendez-vous"
        subtitle={"Gérer les rendez-vous et les horaires des patients"}
      >
        <NewAppointmentBtn />
      </AdminPagesHeader>
    </div>
  );
};

export default PractitionerAppointmentsPage;
