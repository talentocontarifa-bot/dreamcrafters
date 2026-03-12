import type { Metadata, ResolvingMetadata } from 'next';
import { DB } from '../data';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug || 'demo';
    // Fallback to Ian if slug not found, just like the page logic
    const config = DB[slug] || DB['ian-level8'];

    return {
        title: `¡Fiesta de ${config.name}! - Minecraft Party`,
        description: `🎂 Estás invitado al cumple #${config.age}. Toca aquí para ver todos los detalles y el mapa secreto.`,
        openGraph: {
            title: `¡Fiesta de ${config.name}! 🎮`,
            description: `Celebrando sus ${config.age} años al estilo Minecraft.`,
            images: [config.ogImage || '/sprites/title-fiesta.webp?v=1'], // Use fallback or specific config image
        },
    };
}

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
