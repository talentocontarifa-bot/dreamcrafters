"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Calendar, Clock, User, Hash } from 'lucide-react';

export default function OrderForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        date: '',
        time: '',
        locationName: '',
        locationAddress: '',
        mapUrl: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateMessage = () => {
        return `🎮 *NUEVO PEDIDO DREAMCRAFTERS* 🎮%0A%0A` +
            `*Temática:* Minecraft%0A` +
            `*Festejado/a:* ${formData.name}%0A` +
            `*Cumple:* ${formData.age} años%0A` +
            `*Fecha:* ${formData.date}%0A` +
            `*Hora:* ${formData.time}%0A` +
            `*Lugar:* ${formData.locationName}%0A` +
            `*Dirección:* ${formData.locationAddress}%0A` +
            `*Mapa:* ${formData.mapUrl}%0A%0A` +
            `_Enviado desde el formulario web_`;
    };

    const handleWhatsApp = () => {
        const text = generateMessage();
        window.open(`https://wa.me/529845828658?text=${text}`, '_blank');
    };

    const handleEmail = () => {
        const subject = `Nuevo Pedido DreamCrafters: ${formData.name}`;
        const body = generateMessage().replace(/%0A/g, '\n').replace(/\*/g, ''); // Clean formatting for email
        window.location.href = `mailto:somos.dreamcrafters@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <main className="min-h-screen bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4 md:p-8 font-outfit">

            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-10 pt-10">
                    <div className="w-20 h-20 bg-gradient-to-tr from-[#5fb346] to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(95,179,70,0.5)] transform rotate-3">
                        <span className="text-4xl">🚀</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400" style={{ fontFamily: 'var(--font-bebas)' }}>
                        CONFIGURA TU INVITACIÓN
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Llena los datos del evento y recibiremos tu pedido al instante.
                    </p>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
                >
                    <div className="grid gap-6">

                        {/* Section: Festejado */}
                        <div className="space-y-4">
                            <h3 className="text-purple-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2">Datos del Jugador</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 relative group">
                                    <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre del Festejado/a"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <Hash className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Edad"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Cuándo */}
                        <div className="space-y-4">
                            <h3 className="text-purple-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2">Fecha de Misión</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                    <Calendar className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-green-400 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        name="date"
                                        placeholder="Eje: Sábado 25 de Octubre"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <Clock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-green-400 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        name="time"
                                        placeholder="Eje: 5:00 PM"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Dónde */}
                        <div className="space-y-4">
                            <h3 className="text-purple-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2">Coordenadas del Checkpoint</h3>
                            <div className="relative group">
                                <MapPin className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    name="locationName"
                                    placeholder="Nombre del Lugar (Eje: Salón 'El Castillo')"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500 mb-3"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="locationAddress"
                                    placeholder="Dirección Completa (Calle, Número, Colonia)"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500 mb-3"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="mapUrl"
                                    placeholder="Google Maps Link (Opcional)"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500 text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 flex flex-col gap-3">
                            <button
                                onClick={handleWhatsApp}
                                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                            >
                                <Send size={24} />
                                ENVIAR POR WHATSAPP
                            </button>

                            <button
                                onClick={handleEmail}
                                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <Mail size={18} />
                                Enviar copia por Correo
                            </button>
                        </div>

                    </div>
                </motion.div>

                <p className="text-center text-gray-500 mt-8 text-sm">
                    DreamCrafters © 2026. Todos los derechos reservados.
                </p>
            </div>
        </main>
    );
}
