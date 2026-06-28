import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/context/AuthProvider";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}