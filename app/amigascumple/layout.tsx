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
        <div className={`picnic-scope ${pacifico.variable} ${quicksand.variable} ${playfair.variable} antialiased bg-wood-pattern font-body min-h-screen text-zinc-800`}>
            {children}
        </div>
    );
}
