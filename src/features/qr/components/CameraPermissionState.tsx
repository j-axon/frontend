"use client";

import * as React from "react";
import type { CameraPermissionState as State } from "../types/qr.types";

const messages: Record<State, { title: string; description: string }> = {
  IDLE: {
    title: "Listo para escanear",
    description: "Toca el botón para iniciar la cámara."
  },
  PROMPT: {
    title: "Permitir cámara",
    description: "Acepta el permiso del navegador para continuar."
  },
  GRANTED: {
    title: "Cámara activa",
    description: "Encuadra el QR del activo dentro del marco."
  },
  DENIED: {
    title: "Permiso denegado",
    description: "Habilita el permiso de cámara en tu navegador para continuar."
  },
  UNSUPPORTED: {
    title: "Cámara no soportada",
    description: "Tu dispositivo o navegador no permite acceso a la cámara."
  },
  ERROR: {
    title: "Error de cámara",
    description: "Intenta nuevamente o usa otro navegador."
  }
};

export function CameraPermissionStateView({ state }: { state: State }) {
  const m = messages[state];
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-md border border-border bg-bg-soft px-3 py-2 text-sm"
    >
      <p className="font-medium">{m.title}</p>
      <p className="text-xs text-fg-soft">{m.description}</p>
    </div>
  );
}
