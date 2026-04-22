import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web to APK Converter",
  description: "Turn any website into a standalone Android APK in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
