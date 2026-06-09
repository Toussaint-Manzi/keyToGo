import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KeyTOGO Group Inc. | IT, Transport & Staffing — Canada",
  description:
    "KeyTOGO Group Inc. delivers innovative IT solutions, reliable transport services, and exceptional staffing across Canada.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
