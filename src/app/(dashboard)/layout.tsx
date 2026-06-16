export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <section className="border-b p-4">
        <strong>J-AXON Panel</strong>
      </section>
      <section className="p-6">{children}</section>
    </main>
  );
}
