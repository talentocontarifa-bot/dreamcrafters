import type { Metadata } from "next";
import { Pacifico, Quicksand, Playfair_Display } from "next/font/google";
import "../wedding.css";

const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-pacifico",
});

const quicksand = Quicksand({
    subsets: ["latin"],
    variable: "--font-quicksand",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "Picnic Birthday Invitation",
    description: "Te invito a mi cumpleaños!",
};

export default function BirthdayLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${pacifico.variable} ${quicksand.variable} ${playfair.variable} antialiased bg-wood-pattern font-body min-h-screen`}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
            </head>
            {children}
        </div>
    );
}
