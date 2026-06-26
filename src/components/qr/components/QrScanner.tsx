"use client";

import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useQrScanner } from "../hooks/useQrScanner";
import { error } from "node:console";

interface QrScannerProps {
  onAssetFound: (assetId: string) => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onAssetFound }) => {
  const {
    permissionError,
    setPermissionError,
    validationError,
    isScanning,
    handleScan,
  } = useQrScanner(onAssetFound);

  useEffect(() => {
    if(!isScanning) return;
    const scanner = new Html5QrcodeScanner(
        "qr-reader-target",
        {
            fps:10 ,
            qrbox:{ width: 250,  height: 250},
            rememberLastUsedCamera : true,
            supportedScanTypes: [0]
        }, 
        false
    );
    scanner.render(
        (decoredText) =>{
            handleScan(decoredText);
            scanner.clear().catch((err) => console.error("Erro al limpiar" , err));
        },
        (error) =>{
            if(error?.includes("Camera permission") ||  error?.includes("Permission denied")){
                setPermissionError(true);
            }
        }
    );
    return () => {
        scanner.clear().catch((err) => console.error("Error en cleanup de cámara", err));
    };
  },[isScanning,handleScan,setPermissionError]);

if (permissionError) {
    return (
      <div className="p-6 text-center bg-amber-50 rounded-xl border border-amber-200">
        <h3 className="text-base font-semibold text-amber-900">Permiso de cámara denegado</h3>
        <p className="text-xs text-amber-700 mt-2">
          J-AXON necesita acceso a la cámara para escanear los QR de los equipos. Por favor, habilítalos en tu navegador móvil.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-black border border-gray-800 aspect-square">
        <div id="qr-reader-target" className="w-full h-full"></div>
      </div>

      {validationError && (
        <div className="p-3 bg-red-50 text-red-800 text-xs rounded-lg border border-red-200" role="alert">
          {validationError}
        </div>
      )}

      <p className="text-center text-xs text-gray-500">
        Apunta la cámara directamente al código QR del equipo físico.
      </p>
    </div>
  );
};