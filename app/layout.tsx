// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // ⬅️ ganti jadi seperti ini

export const metadata: Metadata = {
  title: "Wina Gea",
  description:
    "Portfolio resmi Wina Gea, mahasiswa D3 Teknik Komputer Institut Teknologi Del yang fokus pada IoT, Cloud Computing, dan Network.",
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}