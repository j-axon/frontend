"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAssetByUuid } from "@/features/assets/services/asset-qr.service";
import { isForbiddenError, isHttpError } from "@/lib/api/http-error";

export default function TicketScanPage() {
  const router = useRouter();
  const [assetId, setAssetId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedId = assetId.trim();

    if (!trimmedId) {
      setError("Ingresa el identificador del activo escaneado.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const asset = await getAssetByUuid(trimmedId);
      router.push(
        `/tickets/new?assetId=${encodeURIComponent(asset.id)}&code=${encodeURIComponent(asset.code)}`
      );
    } catch (err) {
      if (isForbiddenError(err)) {
        setError(
          "No tienes permisos para acceder a este activo. Contacta al administrador."
        );
      } else if (isHttpError(err) && err.status === 404) {
        setError("El activo no existe o el código QR no es válido.");
      } else {
        setError("No se pudo validar el activo. Intenta nuevamente.");
      }
      setIsLoading(false);
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
