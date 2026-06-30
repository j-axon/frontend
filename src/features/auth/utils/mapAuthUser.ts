import type { Role } from "@/constants/roles";
import type { AuthUser } from "@/types/auth";

type AuthUserPayload = {
  id: string;
  email: string;
  nombre?: string;
  fullName?: string;
  username?: string;
  activo?: boolean;
  active?: boolean;
  roles?: Role[] | string[];
};

export function mapAuthUser(raw: AuthUserPayload): AuthUser {
  const fullName =
    raw.fullName?.trim() ||
    raw.nombre?.trim() ||
    raw.username?.trim() ||
    raw.email.split("@")[0] ||
    "Usuario";
  const username = raw.username?.trim() || raw.email.split("@")[0] || "user";

  return {
    id: String(raw.id),
    username,
    email: raw.email,
    fullName,
    roles: (raw.roles ?? []) as Role[],
    active: raw.active ?? raw.activo ?? true
  };
}

export function userInitials(name: string | undefined | null): string {
  const safe = (name ?? "").trim();
  if (!safe) return "?";

  return safe
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
