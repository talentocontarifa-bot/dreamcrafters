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
  // icons: {
  //   icon: '/icons/favicon-purple.png', 
  //   shortcut: '/icons/favicon-purple.png',
  //   apple: '/icons/favicon-purple.png',
  //   other: [
  //     {
  //       rel: 'icon',
  //       url: '/icons/favicon-white.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //   ],
  // },
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
