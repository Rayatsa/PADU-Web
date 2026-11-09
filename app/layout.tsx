
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "P.A.D.U. | Aduan Digital Terpadu",
  description: "Platform Aduan Digital Terpadu",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
