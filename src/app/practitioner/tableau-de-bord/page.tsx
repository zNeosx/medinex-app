import AdminPagesHeader from "@/components/common/page-header";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function PractitionerDashboardPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    redirect("/auth/connexion");
  }

  const today = new Date();

  return (
    <div>
      <AdminPagesHeader
        title="Tableau de bord"
        subtitle={`Bon retour ${data.user.email}, Voici vos rendez-vous pour le ${
          formatDateTime({
            dateString: today,
          }).dateLong
        }`}
      />
    </div>
  );
}

export default PractitionerDashboardPage;
