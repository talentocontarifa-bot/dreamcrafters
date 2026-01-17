"use client";

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';

// --- TYPES ---
type PartyConfig = {
    name: string;
    age: number;
    date: string;
    time: string;
    locationName: string;
    locationAddress: string;
    mapUrl: string;
    musicUrl: string;
    targetDate: string; // YYYY-MM-DDTHH:MM:SS
    whatsappPhone: string;
};

// --- MOCK DATABASE ---
const DB: Record<string, PartyConfig> = {
    'ian-level8': {
        name: 'IAN', age: 8, date: '25 OCT', time: '4:00 PM',
        locationName: "Salón 'El Bloque'", locationAddress: 'Av. Siempre Viva 742',
        mapUrl: 'https://maps.google.com',
        musicUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        targetDate: '2025-10-25T16:00:00', whatsappPhone: '5555555555'
    },
    'juanito8': {
        name: 'JUANITO', age: 8, date: '12 OCT', time: '5:00 PM',
        locationName: 'Jardín Real', locationAddress: 'Calle Falsa 123',
        mapUrl: 'https://maps.google.com',
        musicUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        targetDate: '2025-10-12T17:00:00', whatsappPhone: '5555555555'
    },
    'demo': {
        name: 'STEVE', age: 10, date: '01 NOV', time: '3:00 PM',
        locationName: 'Minecraft World', locationAddress: 'Server IP: 127.0.0.1',
        mapUrl: 'https://maps.google.com',
        musicUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        targetDate: '2025-11-01T15:00:00', whatsappPhone: '5555555555'
    }
};

export default function InvitationPage() {
    const params = useParams();
    const slug = (params.slug as string) || 'demo';
    const config = DB[slug] || DB['demo'];

    const [unlocked, setUnlocked] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const playHit = () => {
        const audio = new Audio('https://www.myinstants.com/media/sounds/classic_hurt.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => { });
    };

    const playExplosion = () => {
        const audio = new Audio('https://www.myinstants.com/media/sounds/minecraft-tnt-explosion.mp3');
        audio.volume = 0.6;
        audio.play().catch(() => { });
    };

    const handleUnlock = () => {
        playExplosion();
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
        }
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        setUnlocked(true);
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white font-vt323 overflow-x-hidden selection:bg-mc-green selection:text-black">
            <audio ref={audioRef} src={config.musicUrl} loop />

            <AnimatePresence>
                {!unlocked && (
                    <motion.div
                        exit={{ opacity: 0, scale: 1.1, pointerEvents: "none" }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#2a2a2a,_#000)]"
                    >
                        <LockScreen onUnlock={handleUnlock} onHit={playHit} />
                    </motion.div>
                )}
            </AnimatePresence>

            {unlocked && (
                <div className="animate-in fade-in duration-1000 slide-in-from-bottom-10">
                    <HeroSection config={config} />
                    <CountdownSection targetDate={config.targetDate} />
                    <InventorySection config={config} />
                    <MapSection mapUrl={config.mapUrl} />
                    <RSVPSection phone={config.whatsappPhone} name={config.name} />
                    <Footer />
                </div>
            )}
        </main>
    );
}

// --- COMPONENTS ---

function LockScreen({ onUnlock, onHit }: { onUnlock: () => void, onHit: () => void }) {
    const [hp, setHp] = useState(5);
    const [hitAnim, setHitAnim] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        onHit();
        setHitAnim(true);
        setTimeout(() => setHitAnim(false), 200);

        if (hp <= 1) {
            onUnlock();
        } else {
            setHp(h => h - 1);
            spawnParticles(e.clientX, e.clientY);
        }
    };

    return (
        <div className="text-center w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/11c7UUfN4eoHF6/giphy.gif')] opacity-20 bg-cover pointer-events-none"></div>

            <h1 className="text-4xl md:text-5xl text-yellow-400 mb-20 font-press-start animate-bounce text-shadow-lg z-10 relative">
                ¡ROMPELA!
            </h1>

            {/* PENDULUM SYSTEM */}
            <div className="scene-container relative z-20" style={{ perspective: '800px' }}>
                <div className="pivot origin-top animate-sway">
                    {/* Rope */}
                    <div className="w-1 h-32 bg-[#4e342e] mx-auto -mb-1"></div>

                    {/* 3D CUBE */}
                    <motion.div
                        className={`cube w-48 h-48 relative transform-style-3d cursor-pointer mx-auto ${hitAnim ? 'brightness-150 scale-95' : ''}`}
                        onClick={handleClick}
                        whileHover={{ scale: 1.05 }}
                        initial={{ rotateY: 25, rotateX: -10 }}
                    >
                        {/* Creeper Faces */}
                        <div className="face front absolute w-full h-full bg-[#0d0] border-2 border-black/20 flex items-center justify-center transform translate-z-24">
                            {/* Face Overlay */}
                            <div className="w-[70%] h-[70%] bg-black opacity-80" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 80% 20%, 100% 20%, 100% 100%, 80% 100%, 80% 60%, 60% 60%, 60% 80%, 40% 80%, 40% 60%, 20% 60%, 20% 100%, 0% 100%, 0% 20%, 20% 20%)' }}></div>
                        </div>
                        <div className="face back absolute w-full h-full bg-[#0b0] border-2 border-black/20 transform rotate-y-180 translate-z-24 flex items-center justify-center text-xs text-black/30 font-press-start">TNT</div>
                        <div className="face right absolute w-full h-full bg-[#0a0] border-2 border-black/20 transform rotate-y-90 translate-z-24"></div>
                        <div className="face left absolute w-full h-full bg-[#0a0] border-2 border-black/20 transform rotate-y-n90 translate-z-24"></div>
                        <div className="face top absolute w-full h-full bg-[#0c0] border-2 border-black/20 transform rotate-x-90 translate-z-24"></div>
                        <div className="face bottom absolute w-full h-full bg-[#080] border-2 border-black/20 transform rotate-x-n90 translate-z-24"></div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-20 w-64 h-8 border-4 border-black bg-gray-700 relative z-10 shadow-xl">
                <div
                    className="h-full bg-mc-green transition-all duration-200 border-r-4 border-white/50"
                    style={{ width: `${(hp / 5) * 100}%` }}
                />
                <p className="absolute -top-8 left-0 text-xs text-white bg-black/50 px-2 py-1 font-press-start">BOSS HEALTH</p>
            </div>
        </div>
    );
}

function HeroSection({ config }: { config: PartyConfig }) {
    return (
        <section className="h-[80vh] relative flex items-center justify-center border-b-8 border-black overflow-hidden group">
            {/* Rich Background */}
            <div className="absolute inset-0 bg-[url('https://images7.alphacoders.com/596/596328.jpg')] bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>

            {/* Floating Particles Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="inline-block bg-black/80 backdrop-blur px-6 py-3 mb-8 border-2 border-mc-green rounded-sm shadow-[0_0_20px_rgba(95,179,70,0.5)]"
                >
                    <span className="text-mc-green font-press-start text-xs md:text-sm tracking-widest">✨ ACHIEVEMENT UNLOCKED!</span>
                </motion.div>

                <h1 className="text-7xl md:text-[9rem] font-press-start text-transparent bg-clip-text bg-gradient-to-b from-[#facc15] to-[#a16207] drop-shadow-[6px_6px_0_rgba(0,0,0,1)] leading-tight tracking-tight">
                    {config.name}
                </h1>

                <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="h-2 w-16 bg-white hidden md:block"></div>
                    <h2 className="text-3xl md:text-6xl text-white font-press-start text-shadow-xl stroke-black">
                        LEVEL {config.age}
                    </h2>
                    <div className="h-2 w-16 bg-white hidden md:block"></div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-16 text-white/50"
                >
                    <i className="fas fa-chevron-down text-4xl"></i>
                </motion.div>
            </div>
        </section>
    );
}

function CountdownSection({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const dist = target - now;

            if (dist < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(dist / (1000 * 60 * 60 * 24)),
                hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((dist % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="bg-[#1a1a1a] py-16 flex flex-col items-center border-b-4 border-[#333] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#111_10px,#111_20px)]"></div>

            <p className="text-mc-green mb-8 font-press-start text-sm z-10 tracking-widest bg-black/50 px-4 py-1">SERVER LAUNCH STATUS</p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-press-start z-10">
                <TimeBox val={timeLeft.days} label="DIAS" />
                <TimeBox val={timeLeft.hours} label="HRS" />
                <TimeBox val={timeLeft.minutes} label="MIN" />
                <TimeBox val={timeLeft.seconds} label="SEG" isRed />
            </div>
        </div>
    );
}

function TimeBox({ val, label, isRed }: any) {
    return (
        <div className="flex flex-col items-center">
            <div className={`bg-[#222] w-20 md:w-32 h-20 md:h-32 flex items-center justify-center border-4 border-[#444] shadow-[0_8px_0_black,inset_0_4px_0_rgba(255,255,255,0.1)] mb-3 ${isRed ? 'text-red-500' : 'text-white'}`}>
                <span className="text-3xl md:text-5xl">{val < 10 ? `0${val}` : val}</span>
            </div>
            <span className="text-[10px] md:text-xs text-gray-500 font-vt323 tracking-[0.2em]">{label}</span>
        </div>
    );
}

function InventorySection({ config }: { config: PartyConfig }) {
    return (
        <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 mb-20">
            <div className="bg-[#5c4a33] border-[6px] border-black p-1 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                {/* Panel Screw details */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-[#3e2723] shadow-sm"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#3e2723] shadow-sm"></div>

                <div className="bg-[#8b7158]/10 border-4 border-[#3e2723] p-6 md:p-10 image-pixelated bg-[url('https://wallpapers.com/images/hd/minecraft-wood-planks-texture-y4c9a8w0j2q0j2q0.jpg')]">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-12 border-b-4 border-[#3e2723] pb-6">
                        <div className="w-16 h-16 bg-black/40 flex items-center justify-center border-2 border-white/20 shadow-inner">
                            <span className="text-4xl animate-pulse">📦</span>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl text-[#ecdbb8] font-press-start text-shadow-lg leading-tight">CHEST INVENTORY</h2>
                            <p className="text-[#3e2723] font-bold opacity-70">Loot assigned to: {config.name}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InventoryItem icon="📅" label="Save the Date" value={config.date} sub={config.time} color="text-yellow-400" />
                        <InventoryItem icon="📍" label="Spawn Point" value={config.locationName} sub={config.locationAddress} color="text-green-400" />
                        <InventoryItem icon="💎" label="Loot Table" value="Lluvia de Sobres" sub="No chests accepted" color="text-cyan-400" />
                        <InventoryItem icon="🛡️" label="Armor" value="Casual / Gamer" sub="Trae tu traje de baño" color="text-white" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function InventoryItem({ icon, label, value, sub, color }: any) {
    return (
        <div className="bg-black/40 border-l-4 border-b-4 border-black border-t border-r border-white/10 p-4 flex gap-6 items-center hover:bg-black/60 transition-colors group cursor-default">
            <div className="w-20 h-20 shrink-0 bg-[#8b8b8b] border-4 border-white/20 border-r-black border-b-black shadow-inner flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                {icon}
            </div>
            <div>
                <p className="text-[#bfbfa5] uppercase text-[10px] font-press-start mb-2 tracking-wider">{label}</p>
                <h3 className={`text-2xl md:text-3xl font-bold leading-none ${color} text-shadow`}>{value}</h3>
                <p className="text-gray-400 text-lg mt-1 font-vt323">{sub}</p>
            </div>
        </div>
    );
}

function MapSection({ mapUrl }: { mapUrl: string }) {
    return (
        <section className="py-20 px-4 bg-[#111] border-t-8 border-black relative">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block border-4 border-white/20 p-4 mb-8 bg-black/50 backdrop-blur">
                    <h3 className="text-white font-press-start text-xl md:text-3xl text-shadow">🗺️ MAP ROOM</h3>
                </div>

                <div className="border-[12px] border-[#222] bg-black shadow-2xl relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661642234024!2d-99.16869368561726!3d19.4270205868875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx"
                        className="w-full h-96 grayscale-[0.5] contrast-125 invert-[0.1] hover:grayscale-0 hover:invert-0 transition-all duration-700"
                        loading="lazy"
                    ></iframe>

                    {/* Compass Overlay */}
                    <div className="absolute top-4 right-4 text-4xl animate-pulse cursor-help" title="Norte">🧭</div>
                </div>

                <a href={mapUrl} target="_blank" className="inline-block mt-8 bg-gray-200 hover:bg-white text-black font-press-start text-xs px-8 py-4 border-b-[6px] border-gray-600 active:border-b-0 active:translate-y-1 transition-all">
                    ABRIR EN GOOGLE MAPS ↗
                </a>
            </div>
        </section>
    );
}

function RSVPSection({ phone, name }: { phone: string, name: string }) {
    const send = (ans: string) => {
        const msg = ans === 'si' ? `¡Sí voy a la fiesta de ${name}!` : `No podré ir a la fiesta de ${name}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <section className="bg-white py-24 border-t-8 border-black text-black text-center relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-green-500 via-green-400 to-green-500"></div>

            <h2 className="font-press-start text-2xl md:text-4xl mb-4 relative z-10">CONFIRMAR ASISTENCIA</h2>
            <p className="font-vt323 text-2xl text-gray-600 mb-10">¡No dejes que los Zombis ocupen tu lugar!</p>

            <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10 px-4">
                <button onClick={() => send('si')} className="bg-[#5fb346] text-white font-press-start text-sm md:text-lg px-10 py-5 border-b-[6px] border-[#367023] hover:brightness-110 active:border-b-0 active:translate-y-2 transition-all shadow-xl">
                    ¡SI, VOY!
                </button>
                <button onClick={() => send('no')} className="bg-gray-300 text-black font-press-start text-sm md:text-lg px-10 py-5 border-b-[6px] border-gray-500 hover:brightness-110 active:border-b-0 active:translate-y-2 transition-all shadow-xl">
                    NO PUEDO
                </button>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-[#050505] py-12 text-center text-gray-600 text-[10px] font-press-start border-t border-gray-900">
            <p className="mb-2">NOT AN OFFICIAL MINECRAFT PRODUCT.</p>
            <p>Crafted with ❤️ by DreamCrafters</p>
        </footer>
    );
}

function spawnParticles(x: number, y: number) {
    // Logic for particles kept simple/empty for React performance in this demo
}

