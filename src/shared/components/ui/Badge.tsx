import * as React from "react";

type Tone = "neutral" | "info" | "success" | "warning" | "danger" | "brand";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
};

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-fg-soft border-border",
  info: "bg-cyan-900/40 text-cyan-200 border-cyan-800",
  success: "bg-emerald-900/40 text-emerald-200 border-emerald-800",
  warning: "bg-amber-900/40 text-amber-200 border-amber-800",
  danger: "bg-red-900/40 text-red-200 border-red-800",
  brand: "bg-indigo-900/40 text-indigo-200 border-indigo-800"
};

export function Badge({ tone = "neutral", className = "", children, ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
