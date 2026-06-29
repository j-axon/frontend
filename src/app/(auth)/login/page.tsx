import Link from "next/link";
import { LoginForm } from "@features/auth/components/LoginForm";

export const metadata = {
  title: "Iniciar sesión · J-AXON"
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-bg-soft/95 p-6 shadow-2xl shadow-black/50 backdrop-blur sm:p-8">
      <header className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-xl font-bold text-white shadow-md shadow-indigo-900/40">
          ⚡
        </div>
        <h1 className="text-2xl font-bold text-fg">Bienvenido a J-AXON</h1>
        <p className="mt-1 text-sm text-fg-soft">
          Ingresa tus credenciales corporativas para continuar.
        </p>
      </header>

      <LoginForm />

      <div className="mt-6 border-t border-border pt-4 text-center text-xs text-fg-soft">
        ¿Problemas para acceder?{" "}
        <Link className="text-accent hover:underline" href="/help">
          Contacta a soporte
        </Link>
      </div>
    </div>
  );
}
