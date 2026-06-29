"use client";

import React, { useState } from "react";
import { assetQrService } from "@/features/assets/services/asset-qr.service";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/shared/components/feedback/LoadingState";
import { QrScanner } from "@/components/qr/components/QrScanner";

export default function TicketScanPage() {
  const router = useRouter();
    const [isLoadingAsset, setIsloadingAsset] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const handleAssetFound = async (assetId: string) => {
        setIsloadingAsset(true);
        setFetchError(null);

    try {
            const asset = await assetQrService.getAssetByUuid(assetId);
            router.push(`/tickets/new?assetId=${asset.id}&code=${asset.code}`);
        } catch (error: any) {
            setFetchError(error?.message || "El activo no existe o no tienes permiso.");
            setIsloadingAsset(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Apertura rápida de Tickets
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Escanea el código QR del activo o ingresa su identificador para
            continuar al formulario.
          </p>
        </div>

        <form onSubmit={handleContinue} className="space-y-4">
          <div>
            <label htmlFor="assetId" className="block text-sm font-medium">
              Identificador del activo (UUID)
            </label>
            <input
              id="assetId"
              type="text"
              value={assetId}
              onChange={(event) => setAssetId(event.target.value)}
              disabled={isLoading}
              placeholder="Ej: 550e8400-e29b-41d4-a716-446655440000"
              className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
              data-testid="scan-asset-id-input"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert" data-testid="scan-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            data-testid="scan-continue-button"
          >
            {isLoading ? "Validando activo..." : "Continuar al formulario"}
          </button>
        </form>
      </div>
    </div>
  );
}
