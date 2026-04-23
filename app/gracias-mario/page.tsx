"use client";

import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function GraciasMarioPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [paymentId, setPaymentId] = useState<string>("");
    const [showMapHelp, setShowMapHelp] = useState(false);

    const [formData, setFormData] = useState({
        names: "",
        ageMessage: "¡CUMPLE 6 AÑOS!",
        eventDate: "",
        eventTime: "",
        addressLabel: "",
        mapEmbed: "",
        whatsappNumber: "",
        directivesTitle: "TRAJE ESPACIAL",
        directivesText: "¡Festejaremos al puro estilo cósmico! ¡Por favor no olvides traer tu traje de baño!"
    });

    useEffect(() => {
        // Leemos las variables que Mercado Pago inyecta en la URL
        const params = new URLSearchParams(window.location.search);
        const pid = params.get("payment_id") || params.get("collection_id") || params.get("test_id");
        const status = params.get("status") || params.get("collection_status");
        
        // Bypass para pruebas de administrador: si pones ?admin=test
        const isAdmin = params.get("admin") === "test";

        if (isAdmin || (pid && (status === "approved" || status === "successful"))) {
            setPaymentId(pid || "MODO_PRUEBA");
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppSubmit = async () => {
        if (!formData.names || !formData.eventDate || !formData.eventTime) {
            alert("Por favor llena al menos el nombre y la fecha/hora del evento.");
            return;
        }

        if (localStorage.getItem(`mp_used_${paymentId}`)) {
            alert("⚠️ Este pago ya fue utilizado para generar una invitación. Si necesitas corregir algo, contacta a soporte.");
            return;
        }

        setIsSubmitting(true);
        try {
            const eventDateTime = `${formData.eventDate}T${formData.eventTime}`;
            // Formatear fechas y generar slug único
            const d = new Date(eventDateTime);
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            
            const generatedDate = `${days[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`.toUpperCase();
            const generatedTime = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} hrs`;
            
            // 1. Generar un slug súper limpio: ej. ruben_feliz_cumple_6
            const ageMatch = formData.ageMessage.match(/\d+/);
            const ageNum = ageMatch ? ageMatch[0] : "";
            
            const cleanName = formData.names.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
            
            const orderId = ageNum ? `${cleanName}_feliz_cumple_${ageNum}` : `${cleanName}_feliz_cumple`;

            // 2. Guardar en Firebase con el slug amigable y el ID de pago
            await setDoc(doc(db, "invitations", orderId), {
                ...formData,
                targetScore: "50",
                date: generatedDate,
                timeLabel: generatedTime,
                countdownDate: eventDateTime,
                type: "mario",
                status: "pending",
                paymentId: paymentId,
                createdAt: new Date().toISOString()
            });

            // Registrar que este pago ya se usó
            localStorage.setItem(`mp_used_${paymentId}`, "true");

            // 3. Enviar WhatsApp corto con la referencia del pago
            const adminPhone = "529845828658"; 
            const text = `¡Hola! Acabo de pagar mi invitación web de Mario Galaxy.\n\nMi código de orden es: *${orderId}*\n*(Pago MP: #${paymentId})*\n\n¡Quedo a la espera de mi enlace final!`;
            const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
            
            window.open(url, "_blank");
        } catch (error) {
            console.error("Error saving to Firebase:", error);
            alert("Hubo un error al guardar tus datos. Por favor inténtalo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Mostrar pantalla de carga mientras valida la URL
    if (isAuthorized === null) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400">Verificando transacción...</div>;
    }

    // Pantalla de bloqueo si la URL está limpia o el pago fue rechazado
    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">ACCESO DENEGADO 🛑</h1>
                <p className="text-gray-400 max-w-md">No se detectó un pago válido. Para crear tu invitación, por favor realiza el proceso de compra primero.</p>
                <a href="https://mpago.la/2QmNo6M" className="mt-8 bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-500">
                    Ir a Comprar Invitación
                </a>
            </div>
        );
    }

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
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">FECHA DEL EVENTO</label>
                                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all [color-scheme:dark]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">HORA DEL EVENTO</label>
                                <input type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all [color-scheme:dark]" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">DIRECCIÓN / SALÓN</label>
                                <input name="addressLabel" value={formData.addressLabel} onChange={handleChange} placeholder="Ej. Salón Estrella, Av. Galaxia Sur 123" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-cyan-300 tracking-wider">LINK DE GOOGLE MAPS</label>
                                    <button type="button" onClick={() => setShowMapHelp(true)} className="text-xs text-cyan-400 underline hover:text-cyan-300">
                                        ¿Cómo obtener mi link?
                                    </button>
                                </div>
                                <input name="mapEmbed" value={formData.mapEmbed} onChange={handleChange} placeholder="https://maps.app.goo.gl/..." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">WHATSAPP (CONFIRMACIÓN)</label>
                                <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="Ej. 529845828658" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">TÍTULO</label>
                                <input name="directivesTitle" value={formData.directivesTitle} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-cyan-300 tracking-wider">TEXTO</label>
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

            {/* Modal de Ayuda Maps */}
            {showMapHelp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
                        <button onClick={() => setShowMapHelp(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">¿Cómo obtener el link?</h3>
                        <div className="space-y-4 text-gray-300 text-sm">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
                                <p>Busca tu salón o dirección en la app de <strong>Google Maps</strong>.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">2</div>
                                <p>Toca el botón <strong>"Compartir"</strong> que aparece debajo del nombre.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">3</div>
                                <p>Selecciona <strong>"Copiar enlace"</strong> y pégalo aquí.</p>
                            </div>
                            <div className="mt-4 p-3 bg-black/50 rounded-lg border border-white/5">
                                <p className="text-xs text-gray-400 mb-1">Ejemplo de link válido:</p>
                                <p className="text-xs text-cyan-300 break-all">https://maps.app.goo.gl/abcdef123456</p>
                            </div>
                        </div>
                        <button onClick={() => setShowMapHelp(false)} className="mt-6 w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-colors">
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
