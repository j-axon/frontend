import * as React from "react";
import { QrScanner } from "@features/qr/components/QrScanner";

export const metadata = {
  title: "Escanear QR · J-AXON"
};

export default function QrScanPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold text-fg">Escanear QR del activo</h1>
        <p className="text-sm text-fg-soft">
          Apunta al QR pegado en el activo para crear un ticket precargado.
        </p>
      </header>
      <QrScanner />
    </div>
  );
}
