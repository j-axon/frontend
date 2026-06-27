import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="border-b bg-white p-4">
        <strong>J-AXON Panel</strong>
      </section>

      <section className="mx-auto flex min-h-[calc(100vh-65px)] max-w-7xl flex-col md:flex-row">
        <Sidebar />
        <section className="flex-1 p-4 md:p-6">{children}</section>
      </section>
    </main>
  );
}
