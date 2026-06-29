import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "J-AXON · Help Desk Inteligente",
  description:
    "Help Desk, inventario inteligente, escaneo QR y diagnóstico asistido por IA."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
