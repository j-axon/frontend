"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@features/auth/hooks/useCurrentUser";
import { ROUTES } from "@/constants/routes";
import { LoadingState } from "@shared/components/feedback/LoadingState";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useCurrentUser();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.login);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingState label="Verificando sesión..." rows={1} />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}
