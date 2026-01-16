import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Boda de Sofía & Mateo | 25.Oct.2025',
    description: 'Estás invitado a celebrar nuestro gran día en la Hacienda Santa Cruz. ¡Acompáñanos en nuestra nueva etapa!',
    openGraph: {
        title: 'Boda de Sofía & Mateo | 25.Oct.2025',
        description: 'Estás invitado a celebrar nuestro gran día en la Hacienda Santa Cruz. ¡Acompáñanos en nuestra nueva etapa!',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                width: 1200,
                height: 630,
                alt: 'Boda Sofía y Mateo',
            },
        ],
    },
};

export default function WeddingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
