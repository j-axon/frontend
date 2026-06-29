import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  padding?: "sm" | "md" | "lg" | "none";
};

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7"
} as const;

export function Card({
  title,
  description,
  actions,
  padding = "md",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <section
      className={`rounded-xl border border-border bg-bg-soft shadow-sm shadow-black/30 ${className}`}
      {...rest}
    >
      {(title || actions) && (
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-3">
          <div>
            {title && <h3 className="text-base font-semibold text-fg">{title}</h3>}
            {description && (
              <p className="mt-0.5 text-sm text-fg-soft">{description}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      <div className={paddingMap[padding]}>{children}</div>
    </section>
  );
}
