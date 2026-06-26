import { useState, useCallback } from "react";
import { validateQrPayload } from "../utils/validateQrPayload";
import { QrScanResult } from "../../../features/assets/types/asset-qr.types";

export const useQrScanner = (onScanSuccess : (assetId : string) => void ) => {
    const [permissionError , setPermissionError] = useState<boolean> (false);
    const[validationError , setValidationError] = useState<string  | null > (null) ; 
    const [isScanning,  setIsScanning ] = useState<boolean> (true)

    const handleScan = useCallback((decodedText: string) => {
    setValidationError(null);
    const validation: QrScanResult = validateQrPayload(decodedText);

    if (!validation.isValid) {
      setValidationError(validation.error || "Código inválido");
      return;
    }   
    setIsScanning(false);
    onScanSuccess(validation.assetId);
}, [onScanSuccess]);

return{
    permissionError,
    setPermissionError,
    validationError,
    isScanning,
    handleScan,
};
};