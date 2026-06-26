// src/shared/components/layout/AppShell.tsx
"use client";

import React from "react";
import { Sidebar } from "../navigation/Sidebar";
import { MobileMenu } from "../navigation/MobileMenu";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 antialiased">
      <MobileMenu />

      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col pt-16 md:pt-0 md:pl-64 transition-all duration-300">
        
        <header className="hidden md:flex h-16 items-center justify-end border-b border-gray-200 bg-white px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
            <span className="font-mono text-xs text-gray-400">J-AXON ENGINE</span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </header>

        {/* Dashboard Views Renderer */}
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};