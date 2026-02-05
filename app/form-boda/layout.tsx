import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tu Boda Hecha a la Medida | Formulario DreamCrafters',
    description: 'Inicia la magia. Completa los detalles de tu evento y déjanos crear la invitación digital perfecta para tus invitados.',
    openGraph: {
        title: 'Tu Boda Hecha a la Medida | Formulario DreamCrafters',
        description: 'Inicia la magia. Completa los detalles de tu evento y déjanos crear la invitación digital perfecta para tus invitados.',
        url: 'https://dreamcrafter.lat/form-boda',
        siteName: 'DreamCrafters',
        images: [
            {
                url: '/link_preview_bodas.webp', // La imagen que acabamos de copiar
                width: 1200,
                height: 630,
                alt: 'Formulario de Boda DreamCrafters',
            },
        ],
        locale: 'es_MX',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Tu Boda Hecha a la Medida | Formulario DreamCrafters',
        description: 'Inicia la magia. Completa los detalles de tu evento para tu invitación digital.',
        images: ['/link_preview_bodas.webp'],
    },
};

export default function WeddingFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
