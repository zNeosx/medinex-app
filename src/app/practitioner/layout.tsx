import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { PractitionerSidebar } from "./_components/practitioner-sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function PractitionerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <PractitionerSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between p-2">
          <SidebarTrigger className="-ml-1" />

          <ModeToggle />
        </header>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
