import * as React from "react";

type AppShellProps = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

export function AppShell({ header, sidebar, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-white"
      >
        Saltar al contenido principal
      </a>
      {header}
      <div className="flex">
        {sidebar}
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
