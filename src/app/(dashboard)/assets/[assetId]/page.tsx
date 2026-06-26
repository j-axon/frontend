type AssetDetailPageProps = {
  params: Promise<{
    assetId: string;
  }>;
};

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { assetId } = await params;

  return <h1 className="text-3xl font-bold tracking-tight text-gray-900">Activo {assetId}</h1>;
}
