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

    // Placeholder for payment link logic if needed
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

    const openMapPopup = () => {
        // Open Google Maps in a centered popup window
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            'https://www.google.com.mx/maps',
            'GoogleMapsPopup',
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
        );
    };

    const handleWhatsApp = () => {
        if (!isFormValid()) {
            alert("Por favor completa los campos obligatorios: Nombre, Fecha, Lugar y Tu WhatsApp.");
            return;
        }
        const text = generateMessage();
        window.open(`https://wa.me/529845828658?text=${text}`, '_blank');
    };

    const handleEmail = () => {
        if (!isFormValid()) {
            alert("Por favor completa los campos obligatorios antes de enviar.");
            return;
        }
        const subject = `Nuevo Pedido DreamCrafters: ${formData.name}`;
        const body = generateMessage().replace(/%0A/g, '\n').replace(/\*/g, '');
        window.location.href = `mailto:somos.dreamcrafters@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <main className="min-h-screen relative text-white p-2 md:p-8 font-outfit overflow-x-hidden">
            {/* Background Image & Overlay */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/backgrounds/minecraft-day.jpg')] bg-cover bg-center"></div>
                {/* Dark overlay for form readability */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <header className="text-center mb-6 pt-6">
                    <div className="mb-4 flex justify-center transform hover:scale-105 transition-transform duration-300">
                        {/* Fiesta Minecraft Logo */}
                        <img
                            src="/sprites/title-fiesta.png"
                            alt="Fiesta Minecraft"
                            className="h-24 md:h-36 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] image-pixelated user-select-none"
                        />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400" style={{ fontFamily: 'var(--font-bebas)' }}>
                        CONFIGURA TU INVITACIÓN
                    </h1>
                    <p className="text-gray-300 text-sm md:text-lg px-4">
                        Completa tu misión en 3 pasos: Datos, Pago y Confirmación.
                    </p>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden mx-1 md:mx-0"
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
                                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Edad a cumplir</label>
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="#"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-gray-500"
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
                                    className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all placeholder:text-gray-500"
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
                                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-white scheme-dark"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative group">
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Hora de Inicio</label>
                                    <input
                                        type="time"
                                        name="time"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all text-white scheme-dark"
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
                                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 ml-2 mb-1 block">Dirección</label>
                                    <input
                                        type="text"
                                        name="locationAddress"
                                        placeholder="Calle, Número, Colonia, Ciudad"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-xs text-gray-400 ml-2 block">Link de Google Maps</label>
                                        <button
                                            onClick={openMapPopup}
                                            type="button"
                                            className="text-xs text-blue-400 hover:text-blue-300 underline flex items-center gap-1 cursor-pointer"
                                        >
                                            <MapPin size={12} /> Buscar y Copiar Link en Maps
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        name="mapUrl"
                                        placeholder="Pega aquí el link (https://maps.app.goo.gl/...)"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder:text-gray-500 text-sm"
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

                {/* Disclaimer/Footer */}
                <div className="mt-12 mb-8 text-center px-4">
                    <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest mb-2 font-bold">
                        Términos y Condiciones del Servicio
                    </p>
                    <div className="text-[10px] text-gray-500 leading-relaxed max-w-xl mx-auto border-t border-white/5 pt-4 space-y-2 text-justify md:text-center opacity-70">
                        <p>
                            La elaboración de la invitación digital tendrá un tiempo de entrega de 24 horas, el cual comenzará a contar una vez recibida toda la información necesaria por parte del cliente y confirmado el pago correspondiente.
                        </p>
                        <p>
                            La invitación digital estará disponible desde el momento de su activación, con un máximo de 60 días previos al evento y hasta 15 días posteriores a su realización.
                        </p>
                        <p>
                            El diseño de la invitación se limita exclusivamente a la plantilla previamente seleccionada, incluyendo únicamente las secciones, funciones y características mostradas en dicha plantilla. No se contemplan modificaciones fuera de este alcance.
                        </p>
                        <p>
                            DreamCrafters no será responsable por fallas, interrupciones o limitaciones en el funcionamiento de la invitación derivadas de factores ajenos a su operación, incluyendo, de manera enunciativa más no limitativa: fallas en el servicio de internet, incompatibilidades entre dispositivos o navegadores, así como el funcionamiento de servicios de terceros como Facebook, WhatsApp, Google Maps u otros similares.
                        </p>
                    </div>
                    <p className="text-gray-600 mt-6 text-xs font-bold">
                        DreamCrafters © 2026. Todos los derechos reservados.
                    </p>
                </div>
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
