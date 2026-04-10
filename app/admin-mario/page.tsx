"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Verifica que este path coincida con tu proyecto

export default function AdminMarioPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [status, setStatus] = useState("");
    const [link, setLink] = useState("");
    
    const [formData, setFormData] = useState({
        slug: "",
        names: "",
        ageMessage: "¡CUMPLE 6 AÑOS!",
        date: "SÁBADO 24 DE MAYO 2026",
        addressLabel: "Salón Estrella, Av. Galaxia Sur 123",
        timeLabel: "16:00 - 20:00 PM",
        targetScore: "50",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.923485642878!2d-103.38885142491517!3d20.67261948088921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b0304f5e7141%3A0x15f79ee89d978a3f!2sGlorieta%20La%20Minerva!5e0!3m2!1sen!2smx!4v1712711018596!5m2!1sen!2smx"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            // Guarda en Firestore en la collection 'invitations' con el doc id = slug
            await setDoc(doc(db, "invitations", formData.slug), {
                type: "mario",
                names: formData.names,
                ageMessage: formData.ageMessage,
                date: formData.date,
                addressLabel: formData.addressLabel,
                timeLabel: formData.timeLabel,
                targetScore: parseInt(formData.targetScore, 10),
                mapEmbed: formData.mapEmbed,
                createdAt: new Date()
            });

            setStatus("¡Éxito! Invitación generada correctamente.");
            setLink(`https://dreamcrafters.lat/${formData.slug}`);
            // if local testing: setLink(`http://localhost:3000/${formData.slug}`);
        } catch (error) {
            console.error("Error saving doc:", error);
            setStatus("Error al guardar en Firebase. Revisa consola.");
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Contraseña provisional hardcoreada para el MVP.
        const masterPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "RufinoAdmin2026";
        if (passwordInput === masterPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Contraseña incorrecta");
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
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-2xl mx-auto bg-gray-900 border border-cyan-500/50 rounded-xl p-8 shadow-[0_0_20px_#48e2ff40]">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 uppercase tracking-wider text-center">
                    DreamCrafters Gestor - Mario Galaxy
                </h1>

                <form onSubmit={handleGenerate} className="flex flex-col gap-5">
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">SLUG (Lo que va en la URL)</label>
                        <input 
                            type="text" 
                            name="slug" 
                            value={formData.slug} 
                            onChange={handleChange} 
                            placeholder="ej: mateo-cumple" 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Nombre del Festejado</label>
                        <input 
                            type="text" 
                            name="names" 
                            value={formData.names} 
                            onChange={handleChange} 
                            placeholder="ej: MATEO" 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Mensaje Corto (Edad)</label>
                        <input 
                            type="text" 
                            name="ageMessage" 
                            value={formData.ageMessage} 
                            onChange={handleChange} 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Fecha del Evento</label>
                        <input 
                            type="text" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange} 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Dirección (Ubicación Corta)</label>
                        <input 
                            type="text" 
                            name="addressLabel" 
                            value={formData.addressLabel} 
                            onChange={handleChange} 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Horario</label>
                        <input 
                            type="text" 
                            name="timeLabel" 
                            value={formData.timeLabel} 
                            onChange={handleChange} 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Score para Ganar (Puntos)</label>
                        <input 
                            type="number" 
                            name="targetScore" 
                            value={formData.targetScore} 
                            onChange={handleChange} 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Iframe Src de Google Maps</label>
                        <input 
                            type="text" 
                            name="mapEmbed" 
                            value={formData.mapEmbed} 
                            onChange={handleChange} 
                            className="bg-black/50 border border-gray-700 rounded p-3 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="mt-6 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold uppercase tracking-widest p-4 rounded hover:scale-[1.02] transition-transform"
                    >
                        Generar Invitación
                    </button>
                    
                </form>

                {status && (
                    <div className="mt-6 p-4 rounded bg-gray-800 border border-gray-600 text-center text-sm">
                        <p>{status}</p>
                        {link && (
                            <a href={link} target="_blank" rel="noreferrer" className="text-cyan-400 font-bold block mt-2 text-lg underline">
                                {link}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
