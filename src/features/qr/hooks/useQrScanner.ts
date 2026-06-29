"use client";

import * as React from "react";
import { Html5Qrcode } from "html5-qrcode";
import type { CameraPermissionState, QrScanResult } from "../types/qr.types";

type UseQrScannerOptions = {
  onResult: (result: QrScanResult) => void;
  onError?: (error: string) => void;
};

export function useQrScanner({ onResult, onError }: UseQrScannerOptions) {
  const [permission, setPermission] = React.useState<CameraPermissionState>("IDLE");
  const [running, setRunning] = React.useState(false);
  const scannerRef = React.useRef<Html5Qrcode | null>(null);
  const containerId = React.useId();

  React.useEffect(() => {
    return () => {
      scannerRef.current
        ?.stop()
        ?.catch(() => undefined)
        ?.finally(() => {
          try {
            scannerRef.current?.clear();
          } catch {
            // ignore
          }
        });
    };
  }, []);

  const start = React.useCallback(async () => {
    if (typeof window === "undefined") return;
    if (running) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission("UNSUPPORTED");
      onError?.("CÁMARA NO SOPORTADA");
      return;
    }

    try {
      const permissionStatus = await navigator.permissions?.query?.({
        name: "camera" as PermissionName
      });
      if (permissionStatus?.state === "granted") setPermission("GRANTED");
      else if (permissionStatus?.state === "denied") setPermission("DENIED");
      else setPermission("PROMPT");
    } catch {
      setPermission("PROMPT");
    }

    try {
      const scanner = new Html5Qrcode(containerId.replace(/:/g, ""));
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          // callback solo emite la cadena cruda; el llamador decide cómo parsear
          const uuidMatch = decodedText.match(
            /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
          );
          const uuid = uuidMatch ? uuidMatch[0].toLowerCase() : decodedText.trim();
          onResult({ raw: decodedText, uuid, scannedAt: new Date().toISOString() });
        },
        () => undefined
      );
      setRunning(true);
      setPermission("GRANTED");
    } catch (err) {
      setPermission("ERROR");
      onError?.(
        err instanceof Error ? err.message : "No se pudo acceder a la cámara"
      );
    }
  }, [containerId, onError, onResult, running]);

  const stop = React.useCallback(async () => {
    try {
      await scannerRef.current?.stop();
      scannerRef.current?.clear();
    } catch {
      // ignore
    } finally {
      scannerRef.current = null;
      setRunning(false);
    }
  }, []);

  return { start, stop, running, permission, containerId: containerId.replace(/:/g, "") };
}
