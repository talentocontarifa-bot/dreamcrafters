"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Calendar, Clock, User, Hash, CreditCard } from 'lucide-react';

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

    const [showPayment, setShowPayment] = useState(false);

    // PLACEHOLDERS - REPLACE WITH REAL LINKS
    const MP_LINK = "#"; // E.g., https://mpago.la/xyz
    const PAYPAL_LINK = "#"; // E.g., https://paypal.me/dreamcrafters/250

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        return formData.name && formData.date && formData.locationName;
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
        if (!isFormValid()) {
            alert("Por favor completa al menos Nombre, Fecha y Lugar antes de enviar.");
            return;
        }
        const text = generateMessage();
        window.open(`https://wa.me/529845828658?text=${text}`, '_blank');
        setShowPayment(true); // Show payment options after sending
    };

    const handleEmail = () => {
        if (!isFormValid()) {
            alert("Por favor completa al menos Nombre, Fecha y Lugar antes de enviar.");
            return;
        }
        const subject = `Nuevo Pedido DreamCrafters: ${formData.name}`;
        const body = generateMessage().replace(/%0A/g, '\n').replace(/\*/g, '');
        window.location.href = `mailto:somos.dreamcrafters@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setShowPayment(true);
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
                        Llena los datos, envía tu pedido y realiza el pago para activar tu invitación.
                    </p>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="grid gap-6 relative z-10">

                        {/* Section: Festejado */}
                        <div className="space-y-4">
                            <h3 className="text-purple-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                                <User size={16} /> Datos del Jugador
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 relative group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre del Festejado/a"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Edad"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Cuándo */}
                        <div className="space-y-4">
                            <h3 className="text-green-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                                <Calendar size={16} /> Fecha de Misión
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="date"
                                        placeholder="Eje: Sábado 25 de Octubre"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="time"
                                        placeholder="Eje: 5:00 PM"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Dónde */}
                        <div className="space-y-4">
                            <h3 className="text-blue-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                                <MapPin size={16} /> Coordenadas
                            </h3>
                            <div className="relative group space-y-3">
                                <input
                                    type="text"
                                    name="locationName"
                                    placeholder="Nombre del Lugar (Eje: Salón 'El Castillo')"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="locationAddress"
                                    placeholder="Dirección Completa (Calle, Número, Colonia)"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="mapUrl"
                                    placeholder="Link de Google Maps (Opcional)"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500 text-sm"
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
                                1. ENVIAR PEDIDO
                            </button>

                            <button
                                onClick={handleEmail}
                                className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <Mail size={18} />
                                O enviar por Correo
                            </button>
                        </div>

                        {/* Payment Section (Revealed or always visible) */}
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h3 className="text-yellow-400 font-bold tracking-wider text-sm uppercase mb-4 flex items-center gap-2">
                                <CreditCard size={16} /> Métodos de Pago
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Una vez enviado tu pedido, puedes completar el pago seguro para iniciar el diseño.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a
                                    href={MP_LINK}
                                    target="_blank"
                                    className="group flex items-center justify-center gap-3 bg-[#009ee3] hover:bg-[#008bc7] text-white py-4 rounded-xl transition-all shadow-[0_4px_0_#0073a1] active:shadow-none active:translate-y-1"
                                >
                                    <span className="font-bold">Mercado Pago</span>
                                    <div className="bg-white/20 p-1 rounded">🤝</div>
                                </a>

                                <a
                                    href={PAYPAL_LINK}
                                    target="_blank"
                                    className="group flex items-center justify-center gap-3 bg-[#003087] hover:bg-[#002569] text-white py-4 rounded-xl transition-all shadow-[0_4px_0_#001c52] active:shadow-none active:translate-y-1"
                                >
                                    <span className="font-bold">PayPal</span>
                                    <div className="bg-white/20 p-1 rounded">💳</div>
                                </a>
                            </div>
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
