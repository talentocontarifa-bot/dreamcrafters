import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamCrafters - Invitaciones Digitales Épicas",
  description: "Transforma tu evento en una memoria inolvidable con invitaciones web personalizadas.",
  openGraph: {
    title: 'Invitaciones Web - Dreamcrafters',
    description: '¡Descubre nuestras invitaciones digitales personalizadas!',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/icons/favicon-purple.png?v=99',
    shortcut: '/icons/favicon-purple.png?v=99',
    apple: '/icons/favicon-purple.png?v=99',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${bebasNeue.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
