"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "./react-query/get-query-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
