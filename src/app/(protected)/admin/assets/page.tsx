"use client";

import * as React from "react";
import Link from "next/link";
import { useAssets } from "@/hooks/use-assets";
import { AssetsTable } from "@features/assets/components/AssetsTable";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { Button } from "@shared/components/ui/Button";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export default function AdminAssetsPage() {
  return (
    <RoleGuard roles={ROLES.ADMIN}>
      <Content />
    </RoleGuard>
  );
}

function Content() {
  const q = useAssets();
  const assets = q.data?.content ?? [];
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-fg">Activos</h1>
          <p className="text-sm text-fg-soft">
            Inventario general de activos y sus códigos QR.
          </p>
        </div>
        <Link href={ROUTES.adminAssetNew}>
          <Button>➕ Nuevo activo</Button>
        </Link>
      </header>
      {q.isLoading && <LoadingState label="Cargando inventario..." />}
      {q.isError && (
        <ErrorState onRetry={() => q.refetch()} message="No se pudo cargar el inventario." />
      )}
      {q.data && <AssetsTable assets={assets} />}
    </div>
  );
}
