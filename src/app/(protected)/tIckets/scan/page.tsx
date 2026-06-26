"use client";

import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { assetQrService } from "../../../../features/assets/services/asset-qr.service";
import { useQrScanner } from "@/components/qr/hooks/useQrScanner";
import { useRouter } from "next/router";
import { LoadingState } from "@/shared/components/feedback/LoadingState";
import { QrScanner } from "@/components/qr/components/QrScanner";

export default function orScanPage () {
    const router = useRouter();
    const [isLoadingAsset, setIsloadingAsset] = useState<boolean>(false) ;
    const [fetchError,  setFetchError] = useState<String | null> (null) ; 

    const  handleAssetFound = async (assesId : string) =>{
        setIsloadingAsset(true);
        setFetchError(null);

        try{
            const asset = await assetQrService.getAssetByUuid(assesId);
            router.push(`/tickets/new?assetId=${asset.id}&code=${asset.code}`)
        }catch(error: any){
            setFetchError(error?.message || "El activo no existe o no tienes permiso.");
            setIsloadingAsset(false)
        }
    };
    return(
        <div className="container mx-auto max-w-md py-6  px-4 space-y-6"> 
        <div className="text-center space-y-1">
            <h1 className="text-xl text-gray-500">Apertura rápida de Tickets</h1>
            <p className="text-xs text-gray-500"> Apertura rapida de Tickets</p>
        </div>
        {isLoadingAsset ? (
            <div className="py-12">
                <LoadingState/>
                <p className="text-center text-xs text-blue-600 font-medium -mt-4">
                    Buscando activo en el sistema...
                </p>
            </div>
       ) : ( <QrScanner onAssetFound={handleAssetFound}/> )
        } {fetchError &&(
            <div className="p-4 bg-red-50 rounde-xl border border-red-200 text-center">
                <p className="text-xs font-semibold text-red-900">{fetchError}</p>
                <button
                onClick={() => window.location.reload()}
                className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
                >
                Reintentar escaneo
                </button>
            </div>
        )}
        </div>
    )

}