import * as React from "react";
import { CreateAssetForm } from "@features/assets/components/CreateAssetForm";

export const metadata = { title: "Nuevo activo · J-AXON" };

export default function CreateAssetPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold text-fg">Crear activo</h1>
        <p className="text-sm text-fg-soft">
          Registra un nuevo activo y genera su código QR.
        </p>
      </header>
      <CreateAssetForm />
    </div>
  );
}
