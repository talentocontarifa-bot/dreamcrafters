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
        mapUrl: '',
        whatsappNumber: ''
    });

    const [isPaid, setIsPaid] = useState(false);

    // Placeholder for when PayPal is ready
    const PAYPAL_LINK = "#";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        return formData.name && formData.date && formData.locationName && formData.whatsappNumber;
    };

    const generateMessage = () => {
        return `🎮 *NUEVO PEDIDO DREAMCRAFTERS* 🎮%0A%0A` +
            `*Temática:* Minecraft%0A` +
            `*Festejado/a:* ${formData.name}%0A` +
            `*Cumple:* ${formData.age} años%0A` +
            `*Fecha:* ${formData.date}%0A` +
            `*Hora:* ${formData.time}%0A` +
            `*WhatsApp Cliente:* ${formData.whatsappNumber}%0A` +
            `*Lugar:* ${formData.locationName}%0A` +
            `*Dirección:* ${formData.locationAddress}%0A` +
            `*Mapa:* ${formData.mapUrl}%0A%0A` +
            `_Enviado desde el formulario web_`;
    };

    const handleWhatsApp = () => {
        if (!isFormValid()) {
            alert("Por favor completa todos los campos obligatorios antes de enviar (Nombre, Fecha, Lugar, Tu WhatsApp).");
            return;
        }
        const text = generateMessage();
        window.open(`https://wa.me/529845828658?text=${text}`, '_blank');
    };

    const handleEmail = () => {
        if (!isFormValid()) {
            alert("Por favor completa todos los campos antes de enviar.");
            return;
        }
        const subject = `Nuevo Pedido DreamCrafters: ${formData.name}`;
        const body = generateMessage().replace(/%0A/g, '\n').replace(/\*/g, '');
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
                        Completa tu misión en 3 pasos: Datos, Pago y Confirmación.
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
                                <User size={16} /> 1. Datos del Jugador
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 relative group">
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Nombre del Cumpleañero/a</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Escribe el nombre aquí..."
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Edad a cumplir</label>
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="#"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Contacto */}
                        <div className="space-y-4">
                            <h3 className="text-pink-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                                <Send size={16} /> Contacto para Entrega
                            </h3>
                            <div className="relative group">
                                <label className="text-xs text-gray-400 ml-2 mb-1 block">Tu Número de WhatsApp</label>
                                <input
                                    type="tel"
                                    name="whatsappNumber"
                                    placeholder="Ej: 55 1234 5678"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all placeholder:text-gray-500"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Section: Cuándo */}
                        <div className="space-y-4">
                            <h3 className="text-green-400 font-bold tracking-wider text-sm uppercase mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                                <Calendar size={16} /> Fecha de Misión
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group">
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Día del Evento</label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-white scheme-dark"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Hora de Inicio</label>
                                    <input
                                        type="time"
                                        name="time"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-white scheme-dark"
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
                                <div>
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Nombre del Lugar</label>
                                    <input
                                        type="text"
                                        name="locationName"
                                        placeholder="Ej: Salón 'El Castillo'"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Dirección</label>
                                    <input
                                        type="text"
                                        name="locationAddress"
                                        placeholder="Calle, Número, Colonia, Ciudad"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs text-gray-400 ml-2 block">Link de Google Maps</label>
                                        <a href="https://www.google.com.mx/maps" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 underline flex items-center gap-1">
                                            <MapPin size={10} /> Buscar Link en Maps
                                        </a>
                                    </div>
                                    <input
                                        type="text"
                                        name="mapUrl"
                                        placeholder="Pega aquí el link (https://maps.app.goo.gl/...)"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500 text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Payment Section - Step 2 */}
                        <div className="mt-8 pt-6 border-t border-white/10 bg-white/5 p-6 rounded-2xl border border-yellow-500/30">
                            <h3 className="text-yellow-400 font-bold tracking-wider text-lg uppercase mb-4 flex items-center gap-2">
                                <CreditCard size={20} /> 2. Realizar Pago
                            </h3>
                            <p className="text-sm text-gray-300 mb-4">
                                Para activar tu pedido, es necesario realizar el pago del anticipo o total.
                            </p>

                            <div className="flex flex-col items-center gap-4">
                                {/* MercadoPago Integration */}
                                <div className="w-full flex justify-center bg-[#009ee3]/10 py-2 rounded-xl border border-[#009ee3]/30">
                                    <MercadoPagoButton />
                                </div>

                                {/* PayPal Placeholder */}
                                <a
                                    href={PAYPAL_LINK}
                                    className="text-xs text-gray-500 hover:text-white transition-colors"
                                >
                                    Pagar con PayPal (Próximamente)
                                </a>
                            </div>
                        </div>

                        {/* Actions - Step 3 */}
                        <div className="pt-6">
                            <h3 className="text-green-400 font-bold tracking-wider text-sm uppercase mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                                <Send size={16} /> 3. Confirmar Pedido
                            </h3>
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleWhatsApp}
                                    className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-black font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                                >
                                    <Send size={24} />
                                    ENVIAR DATOS POR WHATSAPP
                                </button>

                                <button
                                    onClick={handleEmail}
                                    className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 rounded-xl border border-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <Mail size={18} />
                                    Enviar copia por Correo
                                </button>
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

// Separate Component for the Script Injection
function MercadoPagoButton() {
    React.useEffect(() => {
        // Clear previous buttons to avoid duplication if re-rendered
        const container = document.getElementById('mp-button-container');
        if (container) container.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js';
        script.setAttribute('data-preference-id', '47667883-242f635d-1e44-4b1a-bb2e-33cbe2fc6c50');
        script.setAttribute('data-source', 'button');

        if (container) {
            container.appendChild(script);
        }
    }, []);

    return (
        <div id="mp-button-container" className="mercadopago-button-wrapper" />
    );
}
