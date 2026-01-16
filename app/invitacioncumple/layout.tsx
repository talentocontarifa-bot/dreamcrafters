import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gran Premio Juan Pérez | 35 Años',
    description: '¡La carrera del año! Acompáñame a celebrar mi vuelta número 35 en el Salón Grand Prix. Acceso VIP.',
    openGraph: {
        title: 'Gran Premio Juan Pérez | 35 Años',
        description: '¡La carrera del año! Acompáñame a celebrar mi vuelta número 35 en el Salón Grand Prix. Acceso VIP.',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                width: 1200,
                height: 630,
                alt: 'Racing Birthday Party',
            },
        ],
    },
};

export default function BirthdayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
