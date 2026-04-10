import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Asegúrate de que este import funciona con tu estructura

export default async function InvitationPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    
    // Fetch from Firebase
    let data = null;
    try {
        const docRef = doc(db, "invitations", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            data = docSnap.data();
        }
    } catch (e) {
        console.error("Firebase fetch error", e);
    }

    if (!data) {
        return notFound();
    }

    // Si el tipo es Mario Galaxy, cargamos el iframe con los datos inyectados por URL
    if (data.type === "mario") {
        const queryParams = new URLSearchParams();
        if (data.names) queryParams.set("name", data.names);
        if (data.ageMessage) queryParams.set("ageMessage", data.ageMessage);
        if (data.date) queryParams.set("date", data.date);
        if (data.addressLabel) queryParams.set("addressLabel", data.addressLabel);
        if (data.timeLabel) queryParams.set("timeLabel", data.timeLabel);
        if (data.mapEmbed) queryParams.set("mapEmbed", data.mapEmbed);
        if (data.targetScore) queryParams.set("targetScore", data.targetScore.toString());

        const iframeUrl = `/invitacionmario/index.html?${queryParams.toString()}`;

        return (
            <div className="w-full h-screen overflow-hidden bg-black">
                <iframe 
                    src={iframeUrl} 
                    className="w-full h-full border-none outline-none" 
                    allowFullScreen 
                />
            </div>
        );
    }

    // Fallback genérico mockeado para otras plantillas si era boda civil, etc.
    const color = data.color || "from-brand-pink to-brand-yellow";
    return (
        <div className="min-h-screen bg-brand-blue text-white font-outfit overflow-x-hidden">
            <div className="h-screen relative flex flex-col items-center justify-center p-4 text-center">
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-3xl`} />
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
        </div>
    );
}
