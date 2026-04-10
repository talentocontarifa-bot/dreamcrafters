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
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.923485642878!2d-103.38885142491517!3d20.67261948088921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b0304f5e7141%3A0x15f79ee89d978a3f!2sGlorieta%20La%20Minerva!5e0!3m2!1sen!2smx!4v1712711018596!5m2!1sen!2smx"
    };

    const [formData, setFormData] = useState({...defaultForm});

    const fetchInvitations = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "invitations"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
            mapEmbed: inv.mapEmbed || ""
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
                                    
                                    <div className="grid grid-cols-2 gap-2">
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
