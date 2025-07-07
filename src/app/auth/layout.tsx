import Logo from "@/components/common/logo";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (data) {
    redirect("/practitioner/tableau-de-bord");
  }

  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-center py-10">
      <div className="flex w-full flex-col items-center gap-4">
        <Logo direction="vertical" logoSize={32} textClassName="text-3xl" />
        <p className="text-muted-foreground">
          Gestion des rendez-vous médicaux
        </p>
      </div>
      <main className="my-8 w-full">{children}</main>
    </div>
  );
}
