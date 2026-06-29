"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CreateTicketForm } from "@features/tickets/components/CreateTicketForm";
import { AssetReadonlyCard } from "@features/assets/components/AssetReadonlyCard";
import { assetsService } from "@features/assets/services/assetsService";
import { LoadingState } from "@shared/components/feedback/LoadingState";
import { ErrorState } from "@shared/components/feedback/ErrorState";
import { RoleGuard } from "@features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function NewTicketFromQrPage() {
  const params = useParams<{ qrUuid: string }>();
  const qrUuid = params?.qrUuid as string;

  return (
    <RoleGuard roles={[ROLES.USUARIO, ROLES.ADMIN]}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <header>
          <h1 className="text-2xl font-bold text-fg">Nuevo ticket desde QR</h1>
          <p className="text-sm text-fg-soft">
            Activo identificado por UUID <span className="font-mono">{qrUuid}</span>
          </p>
        </header>
        <AssetPanel qrUuid={qrUuid} />
        <CreateTicketForm qrUuid={qrUuid} />
      </div>
    </RoleGuard>
  );
}

function AssetPanel({ qrUuid }: { qrUuid: string }) {
  const q = useQuery({
    queryKey: ["assets", "qr", qrUuid],
    queryFn: () => assetsService.getByQrUuid(qrUuid),
    enabled: Boolean(qrUuid)
  });

  if (q.isLoading) return <LoadingState rows={2} label="Cargando activo..." />;
  if (q.isError)
    return (
      <ErrorState
        title="Activo no encontrado"
        message="Verifica que el QR esté registrado en el sistema."
        onRetry={() => q.refetch()}
      />
    );
  if (!q.data) return null;
  return <AssetReadonlyCard asset={q.data} />;
}
