import { notFound } from "next/navigation";

// Mock Data (Simulando Firebase por ahora)
const MOCK_INVITATIONS: Record<string, any> = {
    "juan-y-ana": {
        names: "Juan & Ana",
        type: "Boda Civil",
        date: "10 de Octubre 2026",
        time: "4:00 PM",
        location: "Hacienda Los Arcángeles",
        color: "from-brand-pink to-brand-yellow",
        message: "¡Nos casamos! Y queremos que seas parte de este momento tan especial.",
    },
    "mis-xv-sofia": {
        names: "Sofía",
        type: "Mis XV Años",
        date: "14 de Noviembre 2026",
        time: "8:00 PM",
        location: "Salón Cristal",
        color: "from-purple-500 to-brand-cyan",
        message: "15 años de sueños, risas y momentos inolvidables. ¡Festeja conmigo!",
    },
};

export default async function InvitationPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const data = MOCK_INVITATIONS[slug];

    if (!data) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-brand-blue text-white font-outfit overflow-x-hidden">
            {/* Hero Invitation */}
            <div className="h-screen relative flex flex-col items-center justify-center p-4 text-center">
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-20 blur-3xl`} />

                <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/20 p-12 rounded-[3rem] shadow-2xl max-w-lg w-full">
                    <p className="text-brand-yellow uppercase tracking-[0.5em] mb-4 text-sm font-bold">
                        {data.type}
                    </p>

                    <h1 className="font-bebas text-8xl md:text-9xl leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 drop-shadow-lg">
                        {data.names}
                    </h1>

                    <div className="flex flex-col gap-2 mb-12 text-xl font-light">
                        <p className="flex items-center justify-center gap-2">
                            📅 <span className="font-bold">{data.date}</span>
                        </p>
                        <p className="flex items-center justify-center gap-2">
                            ⏰ {data.time}
                        </p>
                        <p className="flex items-center justify-center gap-2">
                            📍 {data.location}
                        </p>
                    </div>

                    <p className="italic text-gray-300 mb-12 px-4">
                        "{data.message}"
                    </p>

                    <button className="w-full bg-brand-cyan text-brand-blue font-bebas text-3xl py-4 rounded-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                        Confirmar Asistencia
                    </button>
                </div>
            </div>

            <footer className="py-8 text-center text-gray-500 text-xs">
                Invitación creada con <span className="text-brand-yellow font-bold">DreamCrafters</span>
            </footer>
        </div>
    );
}
