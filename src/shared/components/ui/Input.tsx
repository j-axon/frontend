"use client";

import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leftAddon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftAddon, id, className = "", ...rest },
  ref
) {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const describedBy: string[] = [];
  if (hint) describedBy.push(`${inputId}-hint`);
  if (error) describedBy.push(`${inputId}-error`);

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-fg-soft">
          {label}
        </label>
      )}
      <div
        className={`flex items-center rounded-lg border bg-muted px-3 transition-colors ${
          error ? "border-danger" : "border-border focus-within:border-accent"
        }`}
      >
        {leftAddon && <span className="mr-2 text-fg-soft">{leftAddon}</span>}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={describedBy.join(" ") || undefined}
          className={`h-11 w-full bg-transparent text-fg outline-none placeholder:text-slate-500 ${className}`}
          {...rest}
        />
      </div>
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-fg-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
});
