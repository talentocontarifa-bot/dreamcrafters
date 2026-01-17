import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Configura tu Invitación - DreamCrafters",
    description: "Estás a unas preguntas de disfrutar tu invitación",
    openGraph: {
        title: "Estás a unas preguntas de disfrutar tu invitación",
        description: "Configura los detalles de tu evento en DreamCrafters.",
        images: ['/sprites/title-fiesta.png?v=3'], // Cache bust
    },
};

export default function FormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
