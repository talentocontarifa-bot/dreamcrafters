"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Componente Countdown para Kermesse
const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const targetDate = new Date('2026-02-13T16:30:00'); // 13 Febrero 2026, 4:30 PM

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4 animate-float-up" style={{ animationDelay: Math.random() + 's' }}>
            <div className="bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3 md:p-5 w-16 md:w-24 text-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <span className="text-2xl md:text-4xl font-bold font-mono text-white drop-shadow-md">
                    {isClient ? value.toString().padStart(2, '0') : '00'}
                </span>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] mt-3 text-cyan-300/80 font-bold">{label}</span>
        </div>
    );

    return (
        <div className="flex justify-center flex-wrap mt-2 mb-12 relative z-30">
            <TimeUnit value={timeLeft.days} label="Días" />
            <TimeUnit value={timeLeft.hours} label="Hrs" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>
    );
};

// Componente para las chispas/estrellas flotantes
const Sparks = () => {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        // Generamos particulas aleatorias SOLO en el cliente
        const newParticles = Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 120}%`,
            animationDuration: `${Math.random() * 4 + 4}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.8 + 0.2,
            size: Math.random() * 4 + 1,
            blur: Math.random() > 0.5 ? 'blur-[1px]' : '',
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={`absolute bg-white rounded-full animate-float-up ${p.blur}`}
                    style={{
                        left: p.left,
                        top: p.top,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity,
                        animation: `floatUp ${p.animationDuration} linear infinite`,
                        animationDelay: p.animationDelay,
                        boxShadow: `0 0 ${p.size * 3}px rgba(255, 100, 255, 0.9)`,
                    }}
                />
            ))}
        </div>
    );
};

// Efecto de Suelo Digital (Grid Wireframe)
const GridFloor = () => {
    return (
        <div className="absolute inset-0 z-0 flex items-end justify-center overflow-hidden opacity-60 pointer-events-none">
            <div className="w-[200vw] h-[50vh] bg-transparent border-t border-fuchsia-500/50 relative perspective-grid">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000000_100%)] z-10"></div>
            </div>
        </div>
    );
};

// Efecto de Anillos Holograficos detras del robot
const HoloRings = () => {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 pointer-events-none opacity-80">
            {/* Ring 1 - Dashed Slow (Thicker & Brighter) */}
            <div className="absolute inset-0 border-2 border-dashed border-cyan-400 rounded-full animate-spin-slow shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
            {/* Ring 2 - Solid Reverse */}
            <div className="absolute inset-4 border-2 border-fuchsia-500 rounded-full animate-spin-reverse-slower opacity-70"></div>
            {/* Ring 3 - Tech Ticks */}
            <div className="absolute inset-[-20px] border-2 border-dotted border-white/30 rounded-full animate-pulse-slow"></div>
        </div>
    );
};

// Componente Modal del Mapa
const MapModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Overlay click to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative bg-[#0f0f1f] border border-cyan-500/50 rounded-3xl w-full max-w-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.3)] animate-in zoom-in-95 duration-300 flex flex-col">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-4 md:p-6 border-b border-white/10 bg-white/5">
                    <h3 className="text-xl md:text-2xl font-bold text-cyan-300">Ubicación</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Mapa Iframe */}
                <div className="w-full h-[50vh] md:h-[60vh] relative bg-gray-900">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.761661644788!2d-88.2916666851062!3d18.5847222873715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5bb7df8f8c6b6b%3A0x6b6b6b6b6b6b6b6b!2sInstituto%20Cumbres%20Chetumal!5e0!3m2!1ses-419!2smx!4v1642636800000!5m2!1ses-419!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                        allowFullScreen={true}
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Footer Modal - External Link */}
                <div className="p-4 md:p-6 bg-white/5 border-t border-white/10 flex justify-center">
                    <a
                        href="https://maps.app.goo.gl/y1wVVkCPcCZTg7YeA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg shadow-cyan-500/30"
                    >
                        <span>Abrir en Google Maps</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const [showMap, setShowMap] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center relative overflow-hidden text-white px-4 selection:bg-fuchsia-500 selection:text-white font-sans pb-20">

            {/* Modal de Mapa */}
            <MapModal isOpen={showMap} onClose={() => setShowMap(false)} />

            {/* 1. FONDO: Gradiente Nebulosa Dramatico */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_#d500f9_0%,_#4a148c_40%,_#000000_90%)] z-0 opacity-80"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#000000_100%)] z-0"></div>

            {/* 2. WIREFRAME: Suelo Digital */}
            <GridFloor />

            {/* 3. EFECTO: Chispas flotando */}
            <Sparks />

            {/* Navbar Minimalista (Sin boton contacto) */}
            <nav className="w-full py-6 flex justify-center md:justify-start items-center z-50 max-w-7xl mx-auto px-6">
                <div className="h-12 md:h-16 w-auto opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                    <img
                        src="/kermesse_cumbres/logo.webp"
                        alt="Instituto Cumbres Logo"
                        className="h-full w-auto object-contain"
                    />
                </div>
            </nav>

            {/* Contenido Principal */}
            <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-4xl mt-4 md:mt-8">

                {/* HERO: COCO (El Cocodrilo) - AL FRENTE (z-40) y MAS GRANDE (+20%) */}
                <div className="relative w-full max-w-[385px] md:max-w-[480px] aspect-square flex items-center justify-center animate-float-slow z-40 pointer-events-none">

                    {/* WIREFRAME: Anillos detras del robot */}
                    <HoloRings />

                    {/* Un brillo detras del robot para que resalte del fondo oscuro */}
                    <div className="absolute w-[60%] h-[60%] bg-green-500/30 rounded-full blur-[60px] -z-10 animate-pulse"></div>

                    <img
                        src="/kermesse_cumbres/coco.webp"
                        alt="Mascota Cumbres"
                        className="w-full h-auto drop-shadow-[0_0_15px_rgba(57,255,20,0.6)] animate-pulse-slow object-contain filter brightness-110 contrast-110"
                    />
                </div>

                {/* TITULO CENTRAL (Imagen con Glow) - ATRAS (z-0) para efecto de profundidad */}
                <div className="relative w-full max-w-[600px] -mt-24 md:-mt-32 z-0 mb-8 flex flex-col items-center pointer-events-none">
                    <img
                        src="/kermesse_cumbres/main_title.webp"
                        alt="Kermesse Cumbres 2026"
                        className="w-full h-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] filter brightness-110"
                    />
                </div>

                {/* DIVIDER: NEON SEPARATOR */}
                <div className="w-full max-w-[200px] h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-12 opacity-70 shadow-[0_0_10px_#22d3ee]"></div>

                {/* SECCION 1: COUNTDOWN */}
                <div className="flex flex-col items-center z-30 mb-16 w-full animate-float-up delay-100">
                    <p className="text-cyan-300 uppercase tracking-[0.4em] text-[10px] md:text-sm font-bold mb-6 text-center">
                        La diversión comienza en
                    </p>
                    <CountdownTimer />
                </div>

                {/* SECCION 2: INFO CARDS (Fecha, Hora, Mapa) */}
                <div className="relative z-30 flex flex-col md:flex-row gap-8 items-stretch md:items-center bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full max-w-4xl justify-center hover:bg-white/10 transition-all duration-500 group mx-auto">

                    {/* Fecha */}
                    <div className="flex flex-col items-center gap-3 text-center flex-1">
                        <div className="p-4 rounded-full bg-fuchsia-500/20 text-fuchsia-300 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        </div>
                        <div>
                            {/* Mobile: Blanco Solido / Desktop: Gradiente */}
                            <span className="block text-2xl md:text-3xl font-bold text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-white md:to-fuchsia-200">13 de Febrero</span>
                            <span className="text-white/60 text-sm uppercase tracking-wider">Viernes</span>
                        </div>
                    </div>

                    {/* Separador Vertical (Desktop) */}
                    <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                    {/* Hora */}
                    <div className="flex flex-col items-center gap-3 text-center flex-1">
                        <div className="p-4 rounded-full bg-cyan-500/20 text-cyan-300 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div>
                            {/* Mobile: Blanco Solido / Desktop: Gradiente */}
                            <span className="block text-2xl md:text-3xl font-bold text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-white md:to-cyan-200">4:30 PM</span>
                            <span className="text-white/60 text-sm uppercase tracking-wider">Hora de inicio</span>
                        </div>
                    </div>

                    {/* Separador Vertical (Desktop) */}
                    <div className="hidden md:block w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                    {/* Ubicacion (Boton Mapa) */}
                    <div className="flex flex-col items-center gap-3 text-center flex-1 cursor-pointer" onClick={() => setShowMap(true)}>
                        <div className="p-4 rounded-full bg-green-500/20 text-green-300 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:bg-green-500 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <div>
                            {/* Mobile: Blanco Solido / Desktop: Gradiente */}
                            <span className="block text-xl md:text-3xl font-bold text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-white md:to-green-200 relative">
                                Mapa
                            </span>
                            <span className="text-white/60 text-sm uppercase tracking-wider">Ver ubicación</span>
                        </div>
                    </div>

                </div>

            </main>

            {/* Footer Powered By */}
            <footer className="relative z-10 py-8 text-center text-[10px] text-white/30 tracking-[0.2em] uppercase mt-12 w-full border-t border-white/5 flex flex-col gap-2">
                <span>Instituto Cumbres © 2026</span>
                <a href="https://dreamcrafters.lat" className="hover:text-cyan-400 transition-colors duration-300 font-bold opacity-60 hover:opacity-100">
                    Powered by DreamCrafters
                </a>
            </footer>

            {/* Estilos Globales para animacion */}
            <style jsx global>{`
        /* Animaciones para Sparks */
        @keyframes floatUp {
            0% { transform: translateY(110vh) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-20px) translateX(20px); opacity: 0; }
        }
        .animate-float-up {
            will-change: transform, opacity;
        }

        /* Animacion Robot/Coco */
        @keyframes subtleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
            animation: subtleFloat 6s ease-in-out infinite;
        }

        /* Animaciones Holo Rings */
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 100% { transform: rotate(-360deg); } }
        
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .animate-spin-reverse-slower { animation: spinReverse 15s linear infinite; }
        .animate-pulse-slow { animation: pulse 4s ease-in-out infinite; }

        /* Grid Floor Perspective */
        .perspective-grid {
            transform: perspective(500px) rotateX(60deg);
            background-image: linear-gradient(to right, rgba(213, 0, 249, 0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(213, 0, 249, 0.2) 1px, transparent 1px);
            background-size: 40px 40px;
            animation: gridMove 20s linear infinite;
        }
        @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 400px; }
        }
      `}</style>

        </div>
    );
}
