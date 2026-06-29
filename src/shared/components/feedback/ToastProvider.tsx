"use client";

import * as React from "react";
import { create } from "zustand";

type ToastVariant = "success" | "error" | "warning" | "info";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastStore = {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
};

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (toast) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
}));

export function useToast() {
  return useToastStore((state) => ({
    push: state.push,
    dismiss: state.dismiss
  }));
}

const variantStyles: Record<ToastVariant, string> = {
  success: "border-emerald-700 bg-emerald-900/80 text-emerald-50",
  error: "border-red-700 bg-red-900/80 text-red-50",
  warning: "border-amber-700 bg-amber-900/80 text-amber-50",
  info: "border-cyan-700 bg-cyan-900/80 text-cyan-50"
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  return (
    <>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 top-3 z-50 mx-auto flex max-w-md flex-col gap-2 px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto rounded-lg border px-4 py-3 shadow-lg shadow-black/40 ${variantStyles[t.variant]}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-xs opacity-90">{t.description}</p>
                )}
              </div>
              <button
                aria-label="Cerrar notificación"
                onClick={() => dismiss(t.id)}
                className="rounded p-1 text-current hover:bg-black/20"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
