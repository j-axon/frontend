"use client";

import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-foreground hover:bg-indigo-500 active:bg-indigo-600 shadow-sm shadow-indigo-900/30",
  secondary:
    "bg-muted text-fg hover:bg-slate-700 active:bg-slate-600",
  ghost:
    "bg-transparent text-fg hover:bg-muted",
  danger:
    "bg-danger text-white hover:bg-red-500 active:bg-red-600",
  outline:
    "border border-border bg-transparent text-fg hover:bg-muted"
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-base",
  lg: "h-12 px-5 text-lg"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      ...rest
    },
    ref
  ) {
    const widthClass = fullWidth ? "w-full" : "";
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={`${base} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        {...rest}
      >
        {loading ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!loading && rightIcon}
      </button>
    );
  }
);
