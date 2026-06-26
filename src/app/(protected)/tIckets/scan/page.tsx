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
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Apertura rápida de Tickets
                    </h1>
                    <p className="mt-2 text-xs text-gray-500">
                        Escanea el código QR del activo para iniciar un ticket
                    </p>
                </div>

                {isLoadingAsset ? (
                    <div className="py-12">
                        <LoadingState />
                        <p className="-mt-4 text-center text-xs font-medium text-gray-500">
                            Buscando activo en el sistema...
                        </p>
                    </div>
                ) : (
                    <QrScanner onAssetFound={handleAssetFound} />
                )}

                {fetchError && (
                    <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-center">
                        <p className="text-xs font-semibold text-red-600">{fetchError}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.99]"
                        >
                            Reintentar escaneo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}