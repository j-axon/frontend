"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";
import { navigationFor, type NavItem } from "@shared/config/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useCurrentUser();
  const items = navigationFor(user?.roles);

  return (
    <aside
      aria-label="Navegación principal"
      className="flex w-64 shrink-0 flex-col border-r border-border bg-bg-soft"
    >
      <nav className="flex h-full flex-col gap-1 p-4">
        <p className="px-2 pb-2 text-xs uppercase tracking-wider text-fg-soft">
          Módulos
        </p>
        {items.map((item) => (
          <SidebarItem key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`group flex items-start gap-3 rounded-lg px-3 py-2 transition-colors ${
        active
          ? "bg-brand/15 text-fg ring-1 ring-brand/40"
          : "text-fg-soft hover:bg-muted hover:text-fg"
      }`}
    >
      <span aria-hidden className="text-lg leading-none">
        {item.icon}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium">{item.label}</span>
        {item.description && (
          <span className="text-xs text-fg-soft">{item.description}</span>
        )}
      </span>
    </Link>
  );
}
