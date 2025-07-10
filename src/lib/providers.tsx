"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./react-query/get-query-client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ModalRoot from "@/components/modals/modal-root";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex min-h-screen flex-col">
          <main className="flex grow flex-col">{children}</main>
          <ModalRoot />
        </div>
      </ThemeProvider>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
