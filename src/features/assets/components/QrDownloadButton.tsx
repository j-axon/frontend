"use client";

import { useState } from "react";
import { adminAssetsService } from "@/features/assets/services/admin-assets.service";

type QrDownloadButtonProps = {
  assetId: string;
};

export function QrDownloadButton({ assetId }: QrDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const { qrCode } = await adminAssetsService.generateQrCode(assetId);

      const link = document.createElement("a");
      link.href = qrCode;
      link.download = `qr-${assetId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error downloading QR:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:border-slate-400 disabled:opacity-50"
    >
      {isDownloading ? "Descargando..." : "Descargar QR"}
    </button>
  );
}
