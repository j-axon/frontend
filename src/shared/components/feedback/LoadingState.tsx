import * as React from "react";

type LoadingStateProps = {
  label?: string;
  rows?: number;
};

export function LoadingState({
  label = "Cargando...",
  rows = 3
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-sm text-fg-soft">
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent"
        />
        {label}
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-full animate-pulse rounded-md bg-muted"
          />
        ))}
      </div>
    </div>
  );
}
