import { Press_Start_2P, VT323 } from "next/font/google";

const pressStart2P = Press_Start_2P({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-press-start",
});

const vt323 = VT323({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-vt323",
});

export default function MinecraftLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${pressStart2P.variable} ${vt323.variable}`}>
            {children}
        </div>
    );
}
