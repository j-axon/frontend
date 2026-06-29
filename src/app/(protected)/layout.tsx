import * as React from "react";
import { AppShell } from "@shared/components/layout/AppShell";
import { Sidebar } from "@shared/components/layout/Sidebar";
import { Topbar } from "@shared/components/layout/Topbar";
import { RequireAuth } from "@features/auth/components/RequireAuth";

export default function ProtectedLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RequireAuth>
      <AppShell header={<Topbar />} sidebar={<Sidebar />}>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </AppShell>
    </RequireAuth>
  );
}
