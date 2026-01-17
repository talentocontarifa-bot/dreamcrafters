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
    const config = DB[slug] || DB['ian-level8']; // Fallback to Ian for demo

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
        <main className="min-h-screen bg-[#111] text-white font-vt323 overflow-x-hidden selection:bg-[#5fb346] selection:text-black">
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
                <div className="animate-in fade-in duration-1000 slide-in-from-bottom-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
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
        setTimeout(() => setHitAnim(false), 150);

        if (hp <= 1) {
            onUnlock();
        } else {
            setHp(h => h - 1);
        }
    };

    return (
        <div className="text-center w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[url('https://images7.alphacoders.com/992/thumb-1920-992383.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60"></div>

            <h1 className="text-4xl md:text-5xl text-yellow-400 mb-10 font-press-start text-mc-shadow z-10 animate-bounce">
                ¡GOLPEA AL CREEPER!
            </h1>

            {/* PENDULUM SYSTEM */}
            <div className="scene-container relative z-20 h-[500px] flex justify-center">
                <div className="origin-top animate-sway flex flex-col items-center">
                    {/* Rope */}
                    <div className="w-2 h-40 bg-[#3e2723] -mb-1 shadow-xl"></div>

                    {/* 3D CUBE - True Size via Globals */}
                    <motion.div
                        className={`cube transform-style-3d cursor-pointer ${hitAnim ? 'brightness-150 scale-95' : ''}`}
                        onClick={handleClick}
                        whileHover={{ scale: 1.05 }}
                        initial={{ rotateY: 25, rotateX: -10 }}
                    >
                        <div className="face front bg-[#0d0] flex items-center justify-center border-4 border-black/10">
                            {/* Creeper Face SVG */}
                            <svg viewBox="0 0 100 100" className="w-[70%] h-[70%] drop-shadow-md">
                                <path d="M20,20 h20 v20 h-20 z M60,20 h20 v20 h-20 z M40,40 h20 v30 h-10 v20 h-10 v-10 h-20 v-20 h10 v-20 M70,70 v20 h-10 v-20 z" fill="#000" />
                            </svg>
                        </div>
                        <div className="face back bg-[#0b0] border-4 border-black/10"></div>
                        <div className="face right bg-[#090] border-4 border-black/10"></div>
                        <div className="face left bg-[#090] border-4 border-black/10"></div>
                        <div className="face top bg-[#0f0] border-4 border-black/10"></div>
                        <div className="face bottom bg-[#070] border-4 border-black/10"></div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-8 w-64 h-8 border-4 border-black bg-gray-800 relative z-10 box-content">
                <div
                    className="h-full bg-mc-green transition-all duration-200"
                    style={{ width: `${(hp / 5) * 100}%` }}
                />
                <p className="absolute -top-10 left-0 w-full text-center text-white font-press-start text-xs text-mc-shadow">BOSS HEALTH</p>
            </div>
        </div>
    );
}

function HeroSection({ config }: { config: PartyConfig }) {
    return (
        <section className="h-[90vh] relative flex flex-col items-center justify-center border-b-8 border-black text-center overflow-hidden">
            {/* Improved Landscape Background */}
            <div className="absolute inset-0 bg-[url('https://images4.alphacoders.com/134/thumb-1920-1341416.png')] bg-cover bg-center grayscale-[0.2]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>

            <div className="relative z-10 p-4">
                <div className="mb-6 inline-block">
                    <div className="bg-[#2a2a2a] border-2 border-white text-yellow-400 px-6 py-2 font-press-start text-xs md:text-sm tracking-widest shadow-[4px_4px_0_#000]">
                        ACHIEVEMENT GET!
                    </div>
                </div>

                <h1 className="text-6xl md:text-9xl font-press-start text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] to-[#CCC] drop-shadow-[8px_8px_0_#000] leading-none mb-4">
                    {config.name}
                </h1>

                <h2 className="text-4xl md:text-6xl text-[#5fb346] font-press-start text-mc-shadow stroke-black mt-4">
                    LEVEL {config.age}
                </h2>
            </div>

            <div className="absolute bottom-10 animate-bounce">
                <p className="text-white font-press-start text-[10px] mb-2">SCROLL DOWN</p>
                <div className="w-8 h-8 border-r-4 border-b-4 border-white rotate-45 transform mx-auto"></div>
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
        <section className="bg-[#111] py-20 flex flex-col items-center border-b-4 border-black relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            <p className="text-[#aaa] mb-10 font-press-start text-xs md:text-sm tracking-widest">SERVER LAUNCH STATUS</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                <TimeBox val={timeLeft.days} label="DIAS" />
                <TimeBox val={timeLeft.hours} label="HRS" />
                <TimeBox val={timeLeft.minutes} label="MINS" />
                <TimeBox val={timeLeft.seconds} label="SECS" isRed />
            </div>
        </section>
    );
}

function TimeBox({ val, label, isRed }: any) {
    return (
        <div className="mc-panel w-24 h-24 md:w-36 md:h-36 flex flex-col items-center justify-center p-2">
            <span className={`text-4xl md:text-5xl font-vt323 leading-none ${isRed ? 'text-[#8b0000]' : 'text-[#222]'}`}>{val < 10 ? `0${val}` : val}</span>
            <span className="text-[10px] md:text-xs text-[#444] font-press-start mt-2">{label}</span>
        </div>
    );
}

function InventorySection({ config }: { config: PartyConfig }) {
    return (
        <section className="max-w-5xl mx-auto px-4 py-20">
            <div className="mc-panel p-2">
                <div className="bg-[#c6c6c6] border-4 border-[#555] p-6 md:p-10">
                    <div className="flex items-center gap-4 mb-8 border-b-4 border-[#7e7e7e] pb-4">
                        <h2 className="text-2xl md:text-3xl text-[#3b3b3b] font-press-start">INVENTORY</h2>
                    </div>

                    <div className="space-y-4">
                        <InventorySlot label="DATE" value={`${config.date} @ ${config.time}`} icon="CLOCK" />
                        <InventorySlot label="SPAWN POINT" value={config.locationName} sub={config.locationAddress} icon="MAP" />
                        <InventorySlot label="LOOT" value="Sobres (Cash Only)" icon="CHEST" />
                        <InventorySlot label="ARMOR" value="Casual / Swimming Gear" icon="ARMOR" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function InventorySlot({ label, value, sub, icon }: any) {
    return (
        <div className="bg-[#8b8b8b] hover:bg-[#9b9b9b] border-2 border-white border-b-[#555] border-r-[#555] p-4 flex items-center gap-6 transition-colors shadow-inner">
            {/* Icon Placeholder */}
            <div className="w-16 h-16 bg-[#3b3b3b] border-2 border-[#777] flex items-center justify-center">
                <span className="text-white text-xs font-press-start">{icon}</span>
            </div>

            <div>
                <p className="text-[#333] font-press-start text-[10px] mb-1 opacity-70">{label}</p>
                <p className="text-white font-press-start text-sm md:text-lg text-mc-shadow-sm leading-snug">{value}</p>
                {sub && <p className="text-[#eee] font-vt323 text-lg">{sub}</p>}
            </div>
        </div>
    );
}

function MapSection({ mapUrl }: { mapUrl: string }) {
    return (
        <section className="py-20 px-4 bg-[#0a0a0a] text-center border-t-8 border-black">
            <h3 className="text-[#aaa] font-press-start text-xl mb-10">TERRITORY MAP</h3>

            <div className="border-[8px] border-[#333] inline-block shadow-2xl bg-[#222] p-1">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661642234024!2d-99.16869368561726!3d19.4270205868875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sEl%20%C3%81ngel%20de%20la%20Independencia!5e0!3m2!1ses!2smx"
                    className="w-[80vw] max-w-4xl h-80 grayscale-[0.8] hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                ></iframe>
            </div>

            <div className="mt-10">
                <a href={mapUrl} target="_blank" className="mc-btn bg-[#7e7e7e] text-white px-8 py-4 font-press-start text-xs border border-black inline-block cursor-pointer select-none">
                    OPEN GLOBAL MAP
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
        <section className="bg-[url('https://images8.alphacoders.com/565/565922.jpg')] bg-cover bg-center py-32 border-t-8 border-black text-center relative">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <div className="relative z-10">
                <h2 className="font-press-start text-yellow-400 text-2xl md:text-4xl mb-12 text-mc-shadow leading-relaxed">
                    JOIN THE PARTY?
                </h2>

                <div className="flex flex-col md:flex-row justify-center gap-8">
                    <button onClick={() => send('si')} className="mc-btn bg-[#5fb346] text-white font-press-start text-sm px-12 py-6 border border-black shadow-lg">
                        ACCEPT QUEST
                    </button>
                    <button onClick={() => send('no')} className="mc-btn bg-[#c6c6c6] text-[#333] font-press-start text-sm px-12 py-6 border border-black shadow-lg">
                        DECLINE
                    </button>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-[#111] py-10 text-center text-gray-700 text-[10px] font-press-start border-t border-[#333]">
            <p>NOT AN OFFICIAL MINECRAFT PRODUCT.</p>
        </footer>
    );
}
