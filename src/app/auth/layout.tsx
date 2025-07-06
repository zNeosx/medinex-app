import Logo from "@/components/common/logo";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full flex-1 flex-col items-center justify-center py-10">
      <div className="flex w-full flex-col items-center gap-4">
        <Logo direction="vertical" />
        <p className="text-muted-foreground">
          Gestion des rendez-vous médicaux
        </p>
      </div>
      <main className="my-8 w-full">{children}</main>
    </div>
  );
}
