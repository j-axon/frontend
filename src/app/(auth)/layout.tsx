import * as React from "react";

export default function AuthLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.35),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(34,211,238,0.25),_transparent_55%)]" />
      {children}
    </div>
  );
}
