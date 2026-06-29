"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/http/queryClient";
import { ToastProvider } from "@shared/components/feedback/ToastProvider";
import { NotificationsProvider } from "@features/notifications/components/NotificationsProvider";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";

/** Ejecuta useCurrentUser DENTRO del QueryClientProvider para evitar
 *  "No QueryClient set" en SSR. Renderiza null, solo inicializa sesión. */
function Bootstrap() {
  useCurrentUser();
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Bootstrap />
        <NotificationsProvider>{children}</NotificationsProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
