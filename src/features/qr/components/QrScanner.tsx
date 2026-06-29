"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CameraPermissionStateView } from "./CameraPermissionState";
import { Button } from "@shared/components/ui/Button";
import { useQrScanner } from "../hooks/useQrScanner";
import { parseQrPayload } from "../utils/parseQrPayload";
import { ROUTES } from "@/constants/routes";

export function QrScanner() {
  const router = useRouter();
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const { start, stop, running, permission, containerId } = useQrScanner({
    onResult: (result) => {
      const parsed = parseQrPayload(result.raw);
      if (!parsed) {
        setFeedback(`QR no válido: ${result.raw.slice(0, 40)}`);
        return;
      }
      router.push(ROUTES.newTicketFromQr(parsed.uuid));
    },
    onError: (msg) => setFeedback(msg)
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-black qr-frame">
        <div id={containerId} className="h-full w-full" />
      </div>

      <CameraPermissionStateView state={permission} />

      {feedback && (
        <p role="alert" className="text-sm text-warning">
          {feedback}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {!running ? (
          <Button onClick={start} loading={false}>
            📷 Iniciar cámara
          </Button>
        ) : (
          <Button variant="danger" onClick={stop}>
            Detener cámara
          </Button>
        )}
      </div>

      <p className="text-xs text-fg-soft">
        El QR se lee en el cliente. No es necesario pegar texto manual.
      </p>
    </div>
  );
}
