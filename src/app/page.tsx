import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.25),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(34,211,238,0.18),_transparent_55%)]" />
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft/70 px-3 py-1 text-xs uppercase tracking-widest text-fg-soft">
        <span className="h-2 w-2 rounded-full bg-success" /> J-AXON v6
      </span>
      <h1 className="bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-5xl font-bold leading-tight text-transparent sm:text-6xl">
        Help Desk inteligente con QR y diagnóstico IA
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-fg-soft">
        Escanea el QR del activo, crea tickets, recibe notificaciones en tiempo
        real y deja que la IA sugiera el diagnóstico con nivel de confianza.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={ROUTES.login}
          className="rounded-lg bg-brand px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500"
        >
          Iniciar sesión
        </Link>
        <a
          href="#features"
          className="rounded-lg border border-border bg-bg-soft px-5 py-3 font-medium text-fg hover:bg-muted"
        >
          Ver características
        </a>
      </div>

      <section id="features" className="mt-16 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon="📷"
          title="QR móvil"
          description="Escaneo desde la cámara del celular y precarga del activo."
        />
        <FeatureCard
          icon="🎫"
          title="Tickets"
          description="Creación, seguimiento y notificaciones de estado."
        />
        <FeatureCard
          icon="🤖"
          title="Diagnóstico IA"
          description="Sugerencias automáticas con nivel de confianza visible."
        />
        <FeatureCard
          icon="🔔"
          title="Tiempo real"
          description="WebSocket STOMP para técnicos y administradores."
        />
      </section>

      <footer className="mt-16 text-xs text-fg-soft">
        © {new Date().getFullYear()} J-AXON · Frontend Demo
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-bg-soft/80 p-5 text-left">
      <div className="mb-2 text-2xl" aria-hidden>
        {icon}
      </div>
      <h3 className="text-base font-semibold text-fg">{title}</h3>
      <p className="mt-1 text-sm text-fg-soft">{description}</p>
    </article>
  );
}
