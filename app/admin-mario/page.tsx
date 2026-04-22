"use client";

import { useState, useEffect } from "react";
import { doc, setDoc, getDocs, deleteDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase"; 

export default function AdminMarioPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [status, setStatus] = useState("");
    const [link, setLink] = useState("");
    const [invitations, setInvitations] = useState<any[]>([]);
    
    // Si isEditing es true, bloqueamos el slide de slug para no crear una copia por accidente
    const [isEditing, setIsEditing] = useState(false);

    const defaultForm = {
        slug: "",
        names: "",
        ageMessage: "¡CUMPLE 6 AÑOS!",
        date: "SÁBADO 24 DE MAYO 2026",
        addressLabel: "Salón Estrella, Av. Galaxia Sur 123",
        timeLabel: "16:00 - 20:00 PM",
        targetScore: "50",
        whatsappNumber: "521234567890",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.923485642878!2d-103.38885142491517!3d20.67261948088921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b0304f5e7141%3A0x15f79ee89d978a3f!2sGlorieta%20La%20Minerva!5e0!3m2!1sen!2smx!4v1712711018596!5m2!1sen!2smx",
        countdownDate: "2026-05-30T16:00",
        directivesTitle: "TRAJE ESPACIAL",
        directivesText: "¡Festejaremos al puro estilo cósmico! ¡Por favor no olvides traer tu traje de baño, toalla y bloqueador! Porque nos espera una increíble y divertida Piscina Intergaláctica (albercada).\n\n¡Habrá power-ups acuáticos para todos!"
    };

    const [formData, setFormData] = useState({...defaultForm});

    const fetchInvitations = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "invitations"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
            // Filtrar solo las de mario
            setInvitations(data.filter(inv => inv.type === "mario"));
        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    // Al autenticar, cargamos la lista
    useEffect(() => {
        if (isAuthenticated) {
            fetchInvitations();
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const masterPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "RufinoAdmin2026";
        if (passwordInput === masterPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Contraseña incorrecta");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancelEdit = () => {
        setFormData({...defaultForm});
        setIsEditing(false);
        setStatus("Edición cancelada.");
        setLink("");
    };

    const handleEdit = (inv: any) => {
        setFormData({
            slug: inv.id,
            names: inv.names || "",
            ageMessage: inv.ageMessage || "",
            date: inv.date || "",
            addressLabel: inv.addressLabel || "",
            timeLabel: inv.timeLabel || "",
            targetScore: inv.targetScore ? String(inv.targetScore) : "50",
            whatsappNumber: inv.whatsappNumber || "",
            mapEmbed: inv.mapEmbed || "",
            countdownDate: inv.countdownDate || "2026-05-30T16:00",
            directivesTitle: inv.directivesTitle || "TRAJE ESPACIAL",
            directivesText: inv.directivesText || ""
        });
        setIsEditing(true);
        setStatus("Modo edición activo. Modifica los campos y presiona 'Actualizar Invitación'");
        setLink("");
        // Hacemos scroll arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string, name: string) => {
        if(!window.confirm(`¿Estás seguro que deseas eliminar permanentemente la invitación de ${name || id}? Esto romperá el link para tu cliente.`)) {
            return;
        }
        try {
            await deleteDoc(doc(db, "invitations", id));
            setStatus(`Invitación '${id}' eliminada.`);
            if (isEditing && formData.slug === id) {
                handleCancelEdit();
            }
            fetchInvitations();
        } catch (error) {
            console.error("Delete error", error);
            alert("Hubo un error al eliminar.");
        }
    };

    const handleSendWhatsApp = (inv: any) => {
        if (!inv.whatsappNumber) {
            alert("El cliente no dejó un número de WhatsApp registrado.");
            return;
        }
        const text = `¡Hola! Muchas gracias por tu compra. Tu invitación mágica de Mario Galaxy para ${inv.names} está lista.\n\nPuedes compartirla con todos tus invitados usando este link oficial:\nhttps://dreamcrafters.lat/${inv.id}\n\nCualquier duda quedamos a tus órdenes. ¡Que disfruten mucho la fiesta!`;
        const url = `https://wa.me/${inv.whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Guardando...");
        setLink("");

        if (!formData.slug) {
            setStatus("Error: El slug (URL) es requerido.");
            return;
        }

        try {
            await setDoc(doc(db, "invitations", formData.slug), {
                type: "mario",
                names: formData.names,
                ageMessage: formData.ageMessage,
                date: formData.date,
                addressLabel: formData.addressLabel,
                timeLabel: formData.timeLabel,
                targetScore: parseInt(formData.targetScore, 10),
                whatsappNumber: formData.whatsappNumber,
                mapEmbed: formData.mapEmbed,
                countdownDate: formData.countdownDate,
                directivesTitle: formData.directivesTitle,
                directivesText: formData.directivesText,
                updatedAt: new Date()
            });

            setStatus(isEditing ? "¡Actualización exitosa!" : "¡Éxito! Invitación generada correctamente.");
            setLink(`https://dreamcrafters.lat/${formData.slug}`);
            fetchInvitations();
            
            if(!isEditing) {
                // Return to clean state if we were creating a NEW one
                setFormData({...defaultForm});
            }
        } catch (error) {
            console.error("Error saving doc:", error);
            setStatus("Error al guardar en Firebase. Revisa consola.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <div className="bg-gray-900 border border-cyan-500/50 rounded-xl p-8 shadow-[0_0_20px_#48e2ff40] max-w-sm w-full">
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 uppercase text-center">
                        Acceso Restringido
                    </h1>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400 text-center"
                            required
                        />
                        <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold p-3 rounded">
                            ENTRAR
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans">
            
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
                
                {/* LADO IZQUIERDO: FORMULARIO */}
                <div className="flex-1 bg-gray-900 border border-cyan-500/50 rounded-xl p-6 shadow-[0_0_20px_#48e2ff40] self-start">
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 uppercase tracking-wider text-center">
                        {isEditing ? "Modificando Invitación" : "Crear Invitación Mario"}
                    </h1>

                    <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
                                SLUG (Identificador URL)
                            </label>
                            <input 
                                type="text" 
                                name="slug" 
                                value={formData.slug} 
                                onChange={handleChange} 
                                disabled={isEditing}
                                placeholder="ej: mateo-cumple" 
                                className={`bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Nombre del Festejado</label>
                            <input type="text" name="names" value={formData.names} onChange={handleChange} placeholder="ej: MATEO" className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Mensaje Corto (Edad)</label>
                            <input type="text" name="ageMessage" value={formData.ageMessage} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Fecha del Evento</label>
                            <input type="text" name="date" value={formData.date} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1 items-start">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Fecha Exacta Contador (AÑO-MES-DIA y HORA)</label>
                            <input type="datetime-local" name="countdownDate" value={formData.countdownDate} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Dirección Corta</label>
                            <input type="text" name="addressLabel" value={formData.addressLabel} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Horario</label>
                            <input type="text" name="timeLabel" value={formData.timeLabel} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Score Ganador (Puntos)</label>
                            <input type="number" name="targetScore" value={formData.targetScore} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">WhatsApp Reservas (Sin signos)</label>
                            <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Google Maps Embed Src</label>
                            <input type="text" name="mapEmbed" value={formData.mapEmbed} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white text-xs focus:outline-none focus:border-cyan-400" />
                        </div>

                        <hr className="border-gray-700 my-4" />

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Título Directivas (Opcional)</label>
                            <input type="text" name="directivesTitle" value={formData.directivesTitle} onChange={handleChange} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Texto Directivas (Código de Vestimenta/Avisos)</label>
                            <textarea name="directivesText" value={formData.directivesText} onChange={(e) => setFormData({...formData, directivesText: e.target.value})} rows={4} className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400 resize-none" />
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button type="submit" className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold uppercase tracking-widest p-4 rounded hover:scale-[1.02] transition-transform text-sm">
                                {isEditing ? "Actualizar" : "Generar URL"}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={handleCancelEdit} className="flex-1 bg-gray-700 text-white font-bold uppercase tracking-widest p-4 rounded hover:bg-gray-600 transition-colors text-sm">
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>

                    {status && (
                        <div className="mt-6 p-4 rounded bg-gray-800 border border-gray-600 text-center text-sm">
                            <p>{status}</p>
                            {link && (
                                <a href={link} target="_blank" rel="noreferrer" className="text-cyan-400 font-bold block mt-2 text-lg underline break-all">
                                    {link}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {/* LADO DERECHO: LISTA DE EXISTENTES */}
                <div className="flex-1 bg-gray-900 border border-cyan-500/50 rounded-xl p-6 shadow-[0_0_20px_#48e2ff40] self-start max-h-[85vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-widest border-b border-gray-700 pb-2">
                        Invitaciones Activas
                    </h2>
                    
                    {invitations.length === 0 ? (
                        <p className="text-gray-500 italic">No hay invitaciones creadas todavía.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {invitations.map((inv) => (
                                <div key={inv.id} className="bg-black/50 border border-gray-700 p-4 rounded flex flex-col gap-3">
                                    <div>
                                        <h3 className="font-bold text-lg text-cyan-400 truncate">{inv.names || 'Sin Nombre'}</h3>
                                        <p className="text-xs text-gray-400">/{inv.id}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <button 
                                            onClick={() => handleEdit(inv)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 rounded transition-colors"
                                        >
                                            EDITAR
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(inv.id, inv.names)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2 rounded transition-colors"
                                        >
                                            ELIMINAR
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => handleSendWhatsApp(inv)}
                                        className="w-full bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 rounded transition-colors flex items-center justify-center gap-2 mb-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                        </svg>
                                        ENVIAR INVITACIÓN
                                    </button>
                                    <a 
                                        href={`https://dreamcrafters.lat/${inv.id}`} 
                                        target="_blank" 
                                        className="text-center w-full block mt-1 text-xs text-brand-yellow hover:underline"
                                    >
                                        [ Abrir Link ]
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
