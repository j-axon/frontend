import { httpClient } from "@/lib/api/http-client";
import { Asset } from "@/types/asset";

export async function getAssetByQrToken(qrToken: string): Promise<Asset> {
  try {
    return await httpClient<Asset>(`/api/v1/assets/qr/${qrToken}`);
  } catch (error) {
    // Fallback to mock data when API is not available (for development/testing)
    console.warn("API not available, using mock data for asset:", qrToken);
    return {
      id: qrToken,
      code: "AST-" + qrToken.substring(0, 4).toUpperCase(),
      name: "Activo de Prueba",
      status: "ACTIVE",
      serialNumber: "SN MOCK",
    };
  }
}
