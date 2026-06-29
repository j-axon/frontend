"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { hasRole, type Role } from "@/constants/roles";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";
import { ROUTES } from "@/constants/routes";
import { LoadingState } from "@shared/components/feedback/LoadingState";

type RoleGuardProps = {
  roles: Role | Role[];
  fallback?: React.ReactNode;
  redirectTo?: string;
  children: React.ReactNode;
};

export function RoleGuard({
  roles,
  fallback,
  redirectTo = ROUTES.dashboard,
  children
}: RoleGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  const allowed = hasRole(user?.roles, roles);

  React.useEffect(() => {
    if (!isLoading && (!user || !allowed)) {
      router.replace(redirectTo);
    }
  }, [isLoading, user, allowed, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingState label="Cargando permisos..." rows={1} />
      </div>
    );
  }

  if (!allowed) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
