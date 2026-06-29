import * as React from "react";
import { Button } from "@shared/components/ui/Button";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Algo salió mal",
  message = "No pudimos completar la operación. Inténtalo nuevamente.",
  onRetry
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-danger/40 bg-red-950/30 px-4 py-6 text-center"
    >
      <span aria-hidden className="text-2xl">⚠️</span>
      <p className="font-semibold text-fg">{title}</p>
      <p className="max-w-md text-sm text-fg-soft">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
