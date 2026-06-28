import type { Metadata } from "next";
import { QueryProvider } from "@/components/common/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "J-AXON",
  description: "Help Desk e inventario inteligente"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
