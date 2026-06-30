import * as React from "react";
import { AppShell } from "@shared/components/layout/AppShell";
import { Sidebar } from "@shared/components/layout/Sidebar";
import { Topbar } from "@shared/components/layout/Topbar";
import { RequireAuth } from "@features/auth/components/RequireAuth";
import { SsrSessionHydrator } from "@features/auth/components/SsrSessionHydrator";
import { getSsrSession } from "@features/auth/utils/ssrSession";

export default async function ProtectedLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  // El middleware (src/middleware.ts) reenvía `x-jaxon-has-session` al request,
  // así que server components pueden leerlo vía headers(). Lo pasamos al store
  // cliente en el primer render para que `useCurrentUser` no haga `/auth/me`
  // cuando el middleware ya confirmó que no hay cookie de sesión.
  const { hasSession } = await getSsrSession();

  return (
    <>
      <SsrSessionHydrator hasSession={hasSession} />
      <RequireAuth>
        <AppShell header={<Topbar />} sidebar={<Sidebar />}>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </AppShell>
      </RequireAuth>
    </>
  );
}
