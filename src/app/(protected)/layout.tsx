import { RoleGuard } from "@/shared/components/guards/role-guard";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <RoleGuard>
      <main className="min-h-screen">
        <section className="border-b p-4">
          <strong>J-AXON Panel</strong>
        </section>
        <section className="p-6">{children}</section>
      </main>
    </RoleGuard>
  );
}