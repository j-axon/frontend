"use client";

import { QueryProvider } from "@/components/common/query-provider";

export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <main className="min-h-screen">
        <section className="border-b p-4">
          <strong>J-AXON Panel</strong>
        </section>
        <section className="p-6">{children}</section>
      </main>
    </QueryProvider>
  );
}