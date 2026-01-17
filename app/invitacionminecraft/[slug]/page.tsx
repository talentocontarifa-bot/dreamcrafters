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
    targetDate: string;
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
    }
};

export default function InvitationPage() {
    const params = useParams();
    const slug = (params.slug as string) || 'demo';
    const config = DB[slug] || DB['ian-level8']; // Fallback

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
            audioRef.current.play().catch(() => { });
        }
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        setUnlocked(true);
    };

    return (
        <main className="min-h-screen bg-[#3b3b3b] text-white font-vt323 overflow-x-hidden selection:bg-[#5fb346] selection:text-black">
            <audio ref={audioRef} src={config.musicUrl} loop />

            <AnimatePresence>
                {!unlocked && (
                    <motion.div
                        exit={{ opacity: 0, scale: 1.1, pointerEvents: "none" }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    >
                        {/* BRIGHT DAYTIME BACKGROUND FOR INTRO */}
                        <div className="absolute inset-0 bg-[url('https://c4.wallpaperflare.com/wallpaper/457/61/523/minecraft-shaders-video-games-wallpaper-preview.jpg')] bg-cover bg-center"></div>
                        <LockScreen onUnlock={handleUnlock} onHit={playHit} />
                    </motion.div>
                )}
            </AnimatePresence>

            {unlocked && (
                <div className="animate-in fade-in duration-1000 slide-in-from-bottom-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-[#222]">
                    <HeroSection config={config} />

                    {/* Dirt/Grass Divider */}
                    <div className="h-6 bg-[#4a3225] border-t-4 border-[#2e2010]"></div>
                    <div className="h-4 bg-[#689f38] border-b-4 border-[#33691e]"></div>

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
        setTimeout(() => setHitAnim(false), 150);

        if (hp <= 1) {
            onUnlock();
        } else {
            setHp(h => h - 1);
        }
    };

    return (
        <div className="text-center w-full h-full flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-[2px]">
            <div className="bg-black/40 p-6 rounded-xl backdrop-blur-md border-4 border-[#3e2723] shadow-2xl z-10">
                <h1 className="text-3xl md:text-5xl text-white mb-2 font-press-start drop-shadow-[4px_4px_0_#000]">
                    HAPPY BIRTHDAY!
                </h1>
                <p className="text-[#facc15] font-press-start text-xs tracking-widest animate-pulse">LEVEL 10 REACHED — UNLOCK THE LOOT BELOW</p>
            </div>

            {/* PENDULUM SYSTEM */}
            <div className="scene-container relative z-20 h-[450px] flex justify-center mt-10">
                <div className="origin-top animate-sway flex flex-col items-center">
                    {/* Rope */}
                    <div className="w-1.5 h-32 bg-[#3e2723] -mb-1 shadow-lg"></div>

                    {/* 3D CUBE - CREEPER */}
                    <motion.div
                        className={`cube transform-style-3d cursor-pointer ${hitAnim ? 'brightness-150 scale-95' : ''}`}
                        onClick={handleClick}
                        whileHover={{ scale: 1.05 }}
                        initial={{ rotateY: 25, rotateX: -10 }}
                    >
                        {/* Front Face: Creeper */}
                        <div className="face front bg-[#0d0] border-[6px] border-[rgba(0,0,0,0.2)] flex items-center justify-center">
                            <svg viewBox="0 0 8 8" className="w-[80%] h-[80%] image-pixelated opacity-90">
                                <path d="M1,1 h1 v1 h-1 z M5,1 h1 v1 h-1 z  M2,3 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" fill="#000" />
                                {/* Simple pixel creeper face approximation for SVG path */}
                                <rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#000" />
                                <rect x="5" y="1.5" width="1.5" height="1.5" fill="#000" />
                                <path d="M3.5,3.5 h1 v1.5 h1 v2 h-1 v-1 h-1 v1 h-1 v-2 h1 z" fill="#000" />
                            </svg>
                        </div>
                        <div className="face back bg-[#0b0] border-[6px] border-black/10"></div>
                        <div className="face right bg-[#090] border-[6px] border-black/10"></div>
                        <div className="face left bg-[#090] border-[6px] border-black/10"></div>
                        <div className="face top bg-[#0f0] border-[6px] border-black/10"></div>
                        <div className="face bottom bg-[#070] border-[6px] border-black/10"></div>
                    </motion.div>
                </div>
            </div>

            {/* Health Bar */}
            <div className="mt-4 w-72 h-6 border-4 border-[#222] bg-[#111] relative z-10 shadow-xl">
                <div
                    className="h-full bg-[#5fb346] transition-all duration-200"
                    style={{ width: `${(hp / 5) * 100}%` }}
                />
            </div>

            {/* Main Action Button - Wooden Style */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleClick(e)}
                className="mt-8 bg-[#8d6e63] text-white font-press-start text-sm px-8 py-4 border-b-[6px] border-[#3e2723] border-r-[6px] border-t-2 border-l-2 border-t-[#d7ccc8] border-l-[#d7ccc8] shadow-[0_10px_0_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-2 transition-all z-20"
            >
                ⚔️ HIT PIÑATA!
            </motion.button>
        </div>
    );
}

function HeroSection({ config }: { config: PartyConfig }) {
    return (
        <section className="h-[85vh] relative flex flex-col items-center justify-center border-b-8 border-[#3e2723] text-center overflow-hidden">
            {/* BRIGHT SKY BACKGROUND */}
            <div className="absolute inset-0 bg-[url('https://c4.wallpaperflare.com/wallpaper/457/61/523/minecraft-shaders-video-games-wallpaper-preview.jpg')] bg-cover bg-center"></div>

            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000]/20 via-transparent to-[#000]/10"></div>

            <div className="relative z-10 p-4 pt-10">
                <div className="inline-block animate-bounce mb-8">
                    {/* Floating Character Head or Icon could go here */}
                    <div className="w-20 h-20 mx-auto bg-white p-1 shadow-xl rotate-3">
                        <img src={`https://api.mineatar.io/face/${config.name}/scale=8`} alt="Avatar" className="w-full h-full image-pixelated" onError={(e) => e.currentTarget.src = 'https://api.mineatar.io/face/Steve/scale=8'} />
                    </div>
                </div>

                <h1 className="text-6xl md:text-[9rem] font-press-start text-white drop-shadow-[8px_8px_0_#222] leading-none mb-4 stroke-black tracking-tight">
                    {config.name}
                </h1>

                <div className="inline-block bg-[#000]/60 backdrop-blur-md px-8 py-4 border-2 border-[#fff]/30 skew-x-[-10deg]">
                    <h2 className="text-3xl md:text-5xl text-[#5fb346] font-press-start drop-shadow-[4px_4px_0_#000] stroke-black skew-x-[10deg]">
                        LEVEL {config.age}
                    </h2>
                </div>
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
            if (dist < 0) { clearInterval(interval); return; }
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
        <section className="bg-[#2a2a2a] py-16 flex flex-col items-center border-b-[6px] border-[#1a1a1a] relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            <div className="mc-panel p-1 mb-8">
                <p className="bg-[#8b8b8b] text-[#333] px-4 py-1 font-press-start text-xs border border-[#555]">TIME UNTIL LAUNCH</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-4">
                <TimeBox val={timeLeft.days} label="DAYS" />
                <TimeBox val={timeLeft.hours} label="HRS" />
                <TimeBox val={timeLeft.minutes} label="MINS" />
                <TimeBox val={timeLeft.seconds} label="SECS" isRed />
            </div>
        </section>
    );
}

function TimeBox({ val, label, isRed }: any) {
    return (
        <div className="w-20 md:w-32 bg-[#333] border-[3px] border-[#555] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] p-2 text-center rounded-sm">
            <span className={`block text-3xl md:text-5xl font-vt323 leading-none ${isRed ? 'text-[#ff5555]' : 'text-[#e0e0e0]'} drop-shadow-md`}>{val < 10 ? `0${val}` : val}</span>
            <span className="text-[10px] md:text-xs text-[#888] font-press-start uppercase mt-1 block">{label}</span>
        </div>
    );
}

function InventorySection({ config }: { config: PartyConfig }) {
    return (
        <section className="max-w-5xl mx-auto px-4 py-20">
            {/* Header for Inventory */}
            <div className="text-center mb-8">
                <h2 className="text-[#a7a7a7] font-press-start text-xl md:text-2xl drop-shadow-[2px_2px_0_#000]">PARTY INVENTORY MANAGEMENT</h2>
            </div>

            <div className="mc-panel p-[4px] bg-[#333] border-[4px] border-[#111] rounded-sm shadow-2xl">
                <div className="bg-[#c6c6c6] p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Column 1: Location */}
                    <div className="bg-[#8b8b8b] p-1 border-[2px] border-[#373737] shadow-[inset_2px_2px_0_rgba(0,0,0,0.2)]">
                        <div className="bg-[#3b3b3b]/10 p-2 mb-2 border-b border-[#666]">
                            <h3 className="text-[#333] font-press-start text-[10px]">LOCATION</h3>
                        </div>
                        <div className="space-y-2">
                            <InventoryItem icon="🗺️" top="Map" bottom="World Data" />
                            <InventoryItem icon="📍" top={config.locationName} bottom={config.locationAddress} />
                        </div>
                    </div>

                    {/* Column 2: Time */}
                    <div className="bg-[#8b8b8b] p-1 border-[2px] border-[#373737] shadow-[inset_2px_2px_0_rgba(0,0,0,0.2)]">
                        <div className="bg-[#3b3b3b]/10 p-2 mb-2 border-b border-[#666]">
                            <h3 className="text-[#367023] font-press-start text-[10px]">TIME</h3>
                        </div>
                        <div className="space-y-2">
                            <InventoryItem icon="📅" top={config.date} bottom="Save Data" />
                            <InventoryItem icon="⏰" top={config.time} bottom="Server Start" />
                        </div>
                    </div>

                    {/* Column 3: Loot */}
                    <div className="bg-[#8b8b8b] p-1 border-[2px] border-[#373737] shadow-[inset_2px_2px_0_rgba(0,0,0,0.2)]">
                        <div className="bg-[#3b3b3b]/10 p-2 mb-2 border-b border-[#666]">
                            <h3 className="text-[#5b3eb5] font-press-start text-[10px]">LOOT</h3>
                        </div>
                        <div className="space-y-2">
                            <InventoryItem icon="🍰" top="Food & Drinks" bottom="Potions incl." />
                            <InventoryItem icon="🎁" top="No Chests" bottom="Envelope Only" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function InventoryItem({ icon, top, bottom }: any) {
    return (
        <div className="bg-[#8b8b8b] hover:bg-[#9b9b9b] border-[2px] border-[#fff]/20 border-b-[#333]/40 border-r-[#333]/40 p-2 flex items-center gap-3 transition-colors cursor-help">
            <div className="w-10 h-10 bg-[#8b8b8b] border-[2px] border-[#333] flex items-center justify-center shadow-inner">
                <span className="text-lg filter drop-shadow-sm grayscale-[0.2]">{icon}</span>
            </div>
            <div className="overflow-hidden">
                <p className="text-white font-press-start text-[10px] truncate leading-tight shadow-black drop-shadow-md">{top}</p>
                <p className="text-[#333] font-vt323 text-sm truncate leading-none mt-1">{bottom}</p>
            </div>
        </div>
    );
}

function MapSection({ mapUrl }: { mapUrl: string }) {
    return (
        <section className="py-16 px-4 bg-[#111] text-center border-t border-[#333] relative">
            <h3 className="text-[#777] font-press-start text-sm mb-6 uppercase tracking-widest">Terrain Data</h3>
            <div className="border-[6px] border-[#444] inline-block shadow-lg bg-[#222]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661642234024!2d-99.16869368561726!3d19.4270205868875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx"
                    className="w-[85vw] max-w-3xl h-64 grayscale-[0.3]"
                    loading="lazy"
                ></iframe>
            </div>
            <div className="mt-8">
                <a href={mapUrl} target="_blank" className="bg-[#999] text-[#222] font-press-start text-xs px-6 py-3 border-b-4 border-[#555] active:border-b-0 active:translate-y-1 inline-block hover:bg-white transition-all">
                    OPEN MAP
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
        <section className="bg-[url('https://www.transparenttextures.com/patterns/dirt.png')] bg-[#2e2010] py-20 border-t-[8px] border-[#1d130a] text-center shadow-inner relative">
            <div className="relative z-10 max-w-2xl mx-auto px-4">
                <FooterButton label="JOIN SERVER" onClick={() => send('si')} color="green" />
                <div className="h-4"></div>
                <FooterButton label="DISCONNECT" onClick={() => send('no')} color="gray" />
            </div>
        </section>
    );
}

function FooterButton({ label, onClick, color }: any) {
    const styles = color === 'green'
        ? "bg-[#388e3c] border-[#1b5e20] text-white hover:bg-[#4caf50]"
        : "bg-[#757575] border-[#424242] text-[#e0e0e0] hover:bg-[#9e9e9e]";

    return (
        <button onClick={onClick} className={`w-full max-w-sm ${styles} border-b-[6px] border-r-[2px] border-l-[2px] border-t-[2px] border-l-white/20 border-t-white/20 font-press-start py-4 text-sm shadow-xl active:shadow-none active:translate-y-1 transition-all`}>
            {label}
        </button>
    );
}

function Footer() {
    return (
        <footer className="bg-[#1a1a1a] py-8 text-center" >
            <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 bg-[#5fb346]"></div>
                <span className="text-white font-press-start text-[10px]">MINECRAFT B-DAY</span>
            </div>
            <p className="text-[#555] font-press-start text-[8px]">NOT AN OFFICIAL MINECRAFT PRODUCT.</p>
        </footer>
    );
}
