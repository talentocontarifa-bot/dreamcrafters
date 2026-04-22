"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GraciasMarioPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        names: "",
        ageMessage: "¡CUMPLE 6 AÑOS!",
        eventDateTime: "",
        addressLabel: "",
        mapEmbed: "",
        targetScore: "50",
        whatsappNumber: "",
        directivesTitle: "TRAJE ESPACIAL",
        directivesText: "¡Festejaremos al puro estilo cósmico! ¡Por favor no olvides traer tu traje de baño!"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppSubmit = async () => {
        if (!formData.names || !formData.eventDateTime) {
            alert("Por favor llena al menos el nombre y la fecha del evento.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Formatear fechas y generar slug único
            const d = new Date(formData.eventDateTime);
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            
            const generatedDate = `${days[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]} ${d.getFullYear()}`;
            const generatedTime = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} hrs`;
            
            // 1. Generar un slug súper limpio: ej. ruben_feliz_cumple_6
            const ageMatch = formData.ageMessage.match(/\d+/);
            const ageNum = ageMatch ? ageMatch[0] : "";
            
            const cleanName = formData.names.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
            
            const orderId = ageNum ? `${cleanName}_feliz_cumple_${ageNum}` : `${cleanName}_feliz_cumple`;

            // 2. Guardar en Firebase con el slug amigable
            await setDoc(doc(db, "invitations", orderId), {
                ...formData,
                date: generatedDate,
                timeLabel: generatedTime,
                countdownDate: formData.eventDateTime,
                type: "mario",
                status: "pending",
                createdAt: new Date().toISOString()
            });

            // 3. Enviar WhatsApp corto
            const adminPhone = "529845828658"; 
            const text = `¡Hola! Acabo de pagar mi invitación web de Mario Galaxy.\n\nMi código de orden es: *${orderId}*\n\n¡Quedo a la espera de mi enlace final!`;
            const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
            
            window.open(url, "_blank");
        } catch (error) {
            console.error("Error saving to Firebase:", error);
            alert("Hubo un error al guardar tus datos. Por favor inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-brand-cyan selection:text-black">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 opacity-40" style={{ background: "radial-gradient(circle at center, #1a1a3a 0%, #000000 100%)" }}></div>
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px] z-0"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] z-0"></div>

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tight">¡PAGO EXITOSO! 🚀</h1>
                    <p className="text-gray-300 text-lg">Tu compra está confirmada. Ahora, llena los datos de tu evento y envíanoslos por WhatsApp para que armemos tu invitación mágica.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">NOMBRE DEL FESTEJADO</label>
                                <input name="names" value={formData.names} onChange={handleChange} placeholder="Ej. DARIO" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">MENSAJE DE EDAD</label>
                                <input name="ageMessage" value={formData.ageMessage} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">FECHA Y HORA DEL EVENTO</label>
                                <input type="datetime-local" name="eventDateTime" value={formData.eventDateTime} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all [color-scheme:dark]" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">DIRECCIÓN / SALÓN</label>
                                <input name="addressLabel" value={formData.addressLabel} onChange={handleChange} placeholder="Ej. Salón Estrella, Av. Galaxia Sur 123" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">URL MAPS (EMBED LINK)</label>
                                <input name="mapEmbed" value={formData.mapEmbed} onChange={handleChange} placeholder="https://www.google.com/maps/embed?..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">WHATSAPP (CONFIRMACIÓN)</label>
                                <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="Ej. 529845828658" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">PUNTOS DEL JUEGO</label>
                                <input type="number" name="targetScore" value={formData.targetScore} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">TÍTULO DE REGLAS/CÓDIGO DE VESTIMENTA</label>
                                <input name="directivesTitle" value={formData.directivesTitle} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">TEXTO DE REGLAS</label>
                                <textarea name="directivesText" rows={3} value={formData.directivesText} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"></textarea>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="button" onClick={handleWhatsAppSubmit} disabled={isSubmitting} className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <span>{isSubmitting ? "Guardando en el sistema..." : "Guardar y Notificar por WhatsApp"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
