"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { SnackbarProvider } from "./Snackbar";

const queryClient = new QueryClient();

export default function GlobalProvider({ children }: PropsWithChildren) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}
