import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kermesse Cumbres",
    description: "35 Years Growing Together",
    openGraph: {
        title: "Kermesse Cumbres",
        description: "35 Years Growing Together",
        images: [
            {
                url: "https://dreamcrafters.lat/kermesse_cumbres/link_preview.webp",
                width: 1200,
                height: 630,
                alt: "Kermesse Cumbres - 35 Years Growing Together",
            },
        ],
        locale: "es_MX",
        type: "website",
    },
};

export default function KermesseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
