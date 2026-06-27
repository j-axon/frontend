export type AssetQrPrefillData = {
  assetUuid: string;
  assetCode: string;
  assetName: string;
  technicalType?: string;
  model?: string;
  serialNumber?: string;
  location?: string;
};

export type SearchParamValue = string | string[] | undefined;

function toSingleValue(value: SearchParamValue): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export function getAssetFromSearchParams(
  searchParams: Record<string, SearchParamValue>
): AssetQrPrefillData {
  return {
    assetUuid: toSingleValue(searchParams.assetUuid),
    assetCode: toSingleValue(searchParams.assetCode),
    assetName: toSingleValue(searchParams.assetName),
    technicalType: toSingleValue(searchParams.technicalType),
    model: toSingleValue(searchParams.model),
    serialNumber: toSingleValue(searchParams.serialNumber),
    location: toSingleValue(searchParams.location)
  };
}

export function hasRequiredAssetData(asset: AssetQrPrefillData): boolean {
  return Boolean(asset.assetUuid && asset.assetCode && asset.assetName);
}
