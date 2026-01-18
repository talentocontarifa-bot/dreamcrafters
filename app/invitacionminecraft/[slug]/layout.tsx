import type { Metadata, ResolvingMetadata } from 'next';
import { DB } from '../data';

type Props = {
    params: { slug: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug || 'demo';
    // Fallback to Ian if slug not found, just like the page logic
    const config = DB[slug] || DB['ian-level8'];

    return {
        title: `¡Fiesta de ${config.name}! - Minecraft Party`,
        description: `🎂 Estás invitado al cumple #${config.age}. Toca aquí para ver todos los detalles y el mapa secreto.`,
        openGraph: {
            title: `¡Fiesta de ${config.name}! 🎮`,
            description: `Celebrando sus ${config.age} años al estilo Minecraft.`,
            images: ['/sprites/title-fiesta.webp?v=1'], // Static logo for now, could be dynamic per client if we had their specific asset map
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
