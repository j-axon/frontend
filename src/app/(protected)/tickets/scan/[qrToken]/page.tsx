import { redirect } from "next/navigation";

type QrDeepLinkPageProps = {
  params: Promise<{
    qrToken: string;
  }>;
};

export default async function QrDeepLinkPage({ params }: QrDeepLinkPageProps) {
  const { qrToken } = await params;
  redirect(`/tickets/new?assetId=${encodeURIComponent(qrToken)}`);
}
