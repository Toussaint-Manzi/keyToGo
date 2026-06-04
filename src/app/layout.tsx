import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KeyTOGO Group Inc. | TI, Transport et Placement — Canada",
  description:
    "KeyTOGO Group Inc. offre des solutions TI innovantes, des services de transport fiables et du placement de personnel d'exception partout au Canada.",
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
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
