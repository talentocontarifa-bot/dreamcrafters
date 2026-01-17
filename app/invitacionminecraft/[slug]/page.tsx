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

// --- MOCK DATABASE (Spanish defaults) ---
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
    const config = DB[slug] || DB['ian-level8'];

    const [unlocked, setUnlocked] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleUnlock = () => {
        const explosion = new Audio('https://www.myinstants.com/media/sounds/minecraft-tnt-explosion.mp3');
        explosion.volume = 0.8;
        explosion.play().catch(() => { });

        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(() => { });
        }
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
        setUnlocked(true);
    };

    return (
        <main className="min-h-screen bg-[#222] text-white font-vt323 overflow-x-hidden selection:bg-[#5fb346] selection:text-black">
            <audio ref={audioRef} src={config.musicUrl} loop />

            <AnimatePresence>
                {!unlocked && (
                    <motion.div
                        exit={{ opacity: 0, pointerEvents: "none" }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700"
                    >
                        <div className="absolute inset-0 bg-[url('/backgrounds/minecraft-day.jpg')] bg-cover bg-center"></div>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <LockScreen onUnlock={handleUnlock} />
                    </motion.div>
                )}
            </AnimatePresence>

            {unlocked && (
                <div className="animate-in fade-in duration-1000 slide-in-from-bottom-10 bg-[#222]">
                    <HeroSection config={config} />

                    {/* Divider */}
                    <div className="h-8 bg-[#5fb346] border-b-8 border-[#367023] relative">
                        <div className="absolute -top-4 left-[10%] w-4 h-4 bg-[#5fb346]"></div>
                        <div className="absolute -top-4 right-[20%] w-4 h-4 bg-[#5fb346]"></div>
                        <div className="absolute -top-4 left-[40%] w-6 h-4 bg-[#5fb346]"></div>
                    </div>

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

// --- SUB-COMPONENTS ---

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
    const [hp, setHp] = useState(10);
    const [hitAnim, setHitAnim] = useState(false);

    const playHitSound = () => {
        const audio = new Audio('https://www.myinstants.com/media/sounds/classic_hurt.mp3');
        audio.currentTime = 0;
        audio.volume = 0.6;
        audio.play().catch(() => { });
    };

    const spawnParticles = (x: number, y: number, amount: number, isExplosion: boolean = false) => {
        const colors = ['#facc15', '#ef4444', '#3b82f6', '#22c55e', '#ffffff'];
        for (let i = 0; i < amount; i++) {
            const p = document.createElement('div');
            p.style.cssText = `position:fixed; width:${Math.random() * 8 + 4}px; height:${Math.random() * 8 + 4}px; background:${colors[Math.floor(Math.random() * colors.length)]}; left:${x}px; top:${y}px; z-index:100; pointer-events:none;`;
            document.body.appendChild(p);
            const angle = Math.random() * Math.PI * 2;
            const velocity = isExplosion ? Math.random() * 15 + 5 : Math.random() * 5 + 2;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity;
            if (isExplosion) vy -= 5;
            let op = 1;
            const anim = setInterval(() => {
                p.style.left = (parseFloat(p.style.left) + vx) + 'px';
                p.style.top = (parseFloat(p.style.top) + vy) + 'px';
                vy += 0.8; op -= 0.02; p.style.opacity = op.toString();
                if (op <= 0) { clearInterval(anim); p.remove(); }
            }, 16);
        }
    };

    const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        playHitSound();
        setHitAnim(true);
        setTimeout(() => setHitAnim(false), 150);

        const damageOverlay = document.querySelectorAll('.damage-overlay');
        const opacity = (10 - (hp - 1)) / 10;
        damageOverlay.forEach((el) => (el as HTMLElement).style.opacity = opacity.toString());

        spawnParticles(clientX, clientY, 5);

        if (hp <= 1) {
            spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 60, true);
            setTimeout(onUnlock, 800);
        } else {
            setHp(h => h - 1);
        }
    };

    return (
        <div className="text-center w-full h-full flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
            <div className="fixed top-0 left-0 w-full text-center pt-8 pointer-events-none z-40">
                <h1 className="text-4xl text-yellow-400 drop-shadow-[4px_4px_0_#000] font-vt323 stroke-black">¡FIESTA MINECRAFT!</h1>
            </div>

            <div className="fixed top-24 text-2xl z-40">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-red-600 drop-shadow-md">{i < Math.ceil(hp / 2) ? '❤️' : '🖤'}</span>
                ))}
            </div>

            <div className="scene">
                <div className="pivot-group">
                    <div className="rope"></div>
                    <div
                        className={`cube-pinata ${hitAnim ? 'hit-anim flash-red' : ''}`}
                        onMouseDown={handleClick}
                        onTouchStart={handleClick}
                    >
                        <div className="face-pinata top texture-bee-top"></div>
                        <div className="face-pinata bottom texture-bee-bottom">
                            <div className="fringe f1"></div><div className="fringe f2"></div>
                            <div className="fringe f3"></div><div className="fringe f4"></div>
                        </div>
                        <div className="face-pinata front texture-bee-face"><div className="damage-overlay"></div></div>
                        <div className="face-pinata back texture-bee-side"><div className="damage-overlay"></div></div>
                        <div className="face-pinata right texture-bee-side"><div className="damage-overlay"></div></div>
                        <div className="face-pinata left texture-bee-side"><div className="damage-overlay"></div></div>
                        <div className="wing wing-left"></div>
                        <div className="wing wing-right"></div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-12 z-40 animate-pulse w-full px-4">
                <button
                    onClick={(e) => handleClick(e as any)}
                    className="bg-[#8d6e63] text-white font-vt323 text-xl px-6 py-4 border-b-[6px] border-[#3e2723] rounded-sm active:border-b-0 active:translate-y-2 transition-all shadow-xl w-full max-w-xs"
                >
                    ¡GOLPEA LA PIÑATA!
                </button>
            </div>
        </div>
    );
}

function HeroSection({ config }: { config: PartyConfig }) {
    return (
        <section className="h-[85vh] relative flex flex-col items-center justify-center border-b-8 border-[#3e2723] text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/backgrounds/minecraft-day.jpg')] bg-cover bg-center"></div>

            <div className="relative z-10 p-4 pt-10">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="mb-8 inline-block"
                >
                    <div className="w-24 h-24 bg-[#5fb346] border-4 border-black box-content relative shadow-2xl">
                        <div className="w-full h-full bg-[#eebb88] relative">
                            <div className="absolute top-[20%] w-full h-[20%] bg-[#402010]"></div>
                            <div className="absolute top-[45%] left-[20%] w-[15%] h-[15%] bg-white"><div className="w-[50%] h-[50%] bg-[#4a396d] ml-[50%] mt-[50%]"></div></div>
                            <div className="absolute top-[45%] right-[20%] w-[15%] h-[15%] bg-white"><div className="w-[50%] h-[50%] bg-[#4a396d] mt-[50%]"></div></div>
                            <div className="absolute top-[70%] left-[35%] w-[30%] h-[10%] bg-[#814f36]"></div>
                        </div>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-[9rem] text-white drop-shadow-[8px_8px_0_#222] leading-none mb-4 stroke-black tracking-tight"
                    style={{ fontFamily: 'var(--font-press-start)' }}
                >
                    {config.name}
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-block bg-[#000]/40 backdrop-blur-md px-8 py-4 border-2 border-white/40 transform -skew-x-12"
                >
                    <h2 className="text-3xl md:text-5xl text-[#5fb346] drop-shadow-[4px_4px_0_#000] stroke-black transform skew-x-12" style={{ fontFamily: 'var(--font-press-start)' }}>
                        NIVEL {config.age}
                    </h2>
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
        <section className="bg-[#111] py-16 flex flex-col items-center border-b-[6px] border-[#333] relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mc-panel p-2 mb-8 z-10 bg-[#333] border-2 border-[#555]"
            >
                <p className="text-[#a7a7a7] px-4 py-1 text-sm border-2 border-[#111] bg-[#222]" style={{ fontFamily: 'var(--font-press-start)' }}>TIEMPO PARA EL RESPAWN</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 px-4 z-10 text-white">
                <TimeBox val={timeLeft.days} label="DÍAS" />
                <TimeBox val={timeLeft.hours} label="HRS" />
                <TimeBox val={timeLeft.minutes} label="MINS" />
                <TimeBox val={timeLeft.seconds} label="SEGS" isRed />
            </div>
        </section>
    );
}

function TimeBox({ val, label, isRed }: any) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-20 md:w-32 bg-[#222] border-[3px] border-[#444] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] p-2 text-center"
        >
            <span className={`block text-3xl md:text-5xl font-vt323 leading-none ${isRed ? 'text-[#ff5555]' : 'text-[#e0e0e0]'} drop-shadow-md`}>{val < 10 ? `0${val}` : val}</span>
            <span className="text-[10px] md:text-xs text-[#888] uppercase mt-1 block" style={{ fontFamily: 'var(--font-press-start)' }}>{label}</span>
        </motion.div>
    );
}

function InventorySection({ config }: { config: PartyConfig }) {
    return (
        <section className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6"
            >
                <div className="inline-block bg-[#5c4033] border-4 border-[#3e2723] px-6 py-2 shadow-lg">
                    <h2 className="text-white text-xl md:text-2xl drop-shadow-[2px_2px_0_#000]" style={{ fontFamily: 'var(--font-press-start)' }}>QUEST LOG</h2>
                </div>
            </motion.div>

            {/* Main Dark Panel Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#2b2b2b] p-2 border-4 border-[#1a1a1a] shadow-2xl relative"
            >
                {/* Decoration corners */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#555] border-2 border-[#111] z-20"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#555] border-2 border-[#111] z-20"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#555] border-2 border-[#111] z-20"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#555] border-2 border-[#111] z-20"></div>

                <div className="bg-[#373737] p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-2 border-[#555] border-b-[#222] border-r-[#222]">

                    {/* UBICACION Column */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-[#5c4033] text-[#ddd] text-xs px-2 py-1 inline-block w-fit border border-[#3e2723] font-bold tracking-widest mb-1 shadow-md">UBICACIÓN</div>
                        <div className="p-3 bg-[#444] border-[3px] border-[#222] border-b-[#555] border-r-[#555] shadow-inner space-y-3">
                            <InventoryItem icon="🗺️" top="ZONA" bottom="Mapa del Mundo" />
                            <InventoryItem icon="📍" top="LUGAR" bottom={config.locationName} />
                            <InventoryItem icon="🏡" top="DIRECCIÓN" bottom={config.locationAddress} />
                        </div>
                    </div>

                    {/* HORA Column */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-[#388e3c] text-[#ddd] text-xs px-2 py-1 inline-block w-fit border border-[#1b5e20] font-bold tracking-widest mb-1 shadow-md">TIEMPO</div>
                        <div className="p-3 bg-[#444] border-[3px] border-[#222] border-b-[#555] border-r-[#555] shadow-inner space-y-3">
                            <InventoryItem icon="📅" top="FECHA" bottom={config.date} />
                            <InventoryItem icon="⏰" top="HORA DE INICIO" bottom={config.time} />
                            <InventoryItem icon="⏱️" top="DURACIÓN" bottom="Hasta el anochecer" />
                        </div>
                    </div>

                    {/* LOOT Column */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-[#6a1b9a] text-[#ddd] text-xs px-2 py-1 inline-block w-fit border border-[#4a148c] font-bold tracking-widest mb-1 shadow-md">LOOT</div>
                        <div className="p-3 bg-[#444] border-[3px] border-[#222] border-b-[#555] border-r-[#555] shadow-inner space-y-3">
                            <InventoryItem icon="🎂" top="COMIDA" bottom="Pastel y Bloques" />
                            <InventoryItem icon="🎁" top="REGALOS" bottom="Mesa de crafteo" />
                            <InventoryItem icon="👕" top="ARMADURA" bottom="Casual / Steve" />
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}

function InventoryItem({ icon, top, bottom }: any) {
    return (
        <div className="flex items-center gap-3 group">
            {/* Icon Slot */}
            <div className="w-12 h-12 min-w-[3rem] bg-[#1a1a1a] border-2 border-[#555] border-t-[#000] border-l-[#000] flex items-center justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.8)] group-hover:bg-[#222] transition-colors">
                <span className="text-xl filter drop-shadow-sm grayscale-[0.1]">{icon}</span>
            </div>
            {/* Text Slot */}
            <div className="flex-1 bg-[#1a1a1a] h-12 border-2 border-[#555] border-t-[#000] border-l-[#000] px-3 flex flex-col justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.8)]">
                <p className="text-[#a7a7a7] text-[10px] truncate leading-tight tracking-wider" style={{ fontFamily: 'var(--font-press-start)' }}>{top}</p>
                <p className="text-[#eee] font-vt323 text-lg truncate leading-none mt-1">{bottom}</p>
            </div>
        </div>
    );
}

function MapSection({ mapUrl }: { mapUrl: string }) {
    return (
        <section className="py-16 px-4 bg-[#111] text-center border-t border-[#333] relative">
            <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#777] text-sm mb-6 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-press-start)' }}
            >
                MAPA DE LA ZONA
            </motion.h3>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block"
            >
                {/* Custom Map Item Style - Looks like a Minecraft Map Item */}
                <a
                    href={mapUrl}
                    target="_blank"
                    className="block w-64 h-64 mx-auto bg-[#f4eeb1] border-8 border-[#5d4037] relative group hover:scale-105 transition-transform cursor-pointer shadow-2xl"
                >
                    {/* Map Texture Details */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8d6e63_1px,transparent_1px)] [background-size:10px_10px]"></div>
                    <div className="absolute inset-4 border-2 border-[#bcaaa4] opacity-50"></div>

                    {/* Center 'X' marks the spot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-6xl font-bold animate-pulse">+</div>

                    {/* Label */}
                    <div className="absolute bottom-4 left-0 w-full text-center">
                        <span className="bg-[#5d4037] text-white px-2 py-1 text-xs" style={{ fontFamily: 'var(--font-press-start)' }}>VER MAPA REAL</span>
                    </div>
                </a>
            </motion.div>
        </section>
    );
}

function RSVPSection({ phone, name }: { phone: string, name: string }) {
    const send = (ans: string) => {
        const msg = ans === 'si' ? `¡Sí, asistiré a la fiesta de ${name}! 🎂` : `Lo siento, no podré ir a la fiesta de ${name} 😢`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <section className="bg-[#5d4037] py-20 border-t-[8px] border-[#3e2723] text-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhQwWgwYgKE0kE0bDgAAwAA//8wI58KAAAAAElFTkSuQmCC')]"></div>

            <div className="relative z-10 max-w-2xl mx-auto px-4">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-white mb-10 text-xl md:text-2xl drop-shadow-md"
                    style={{ fontFamily: 'var(--font-press-start)' }}
                >
                    CONFIRMAR ASISTENCIA
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <FooterButton label="SÍ, ASISTIRÉ" onClick={() => send('si')} color="green" />
                    <FooterButton label="NO, NO PUEDO" onClick={() => send('no')} color="gray" />
                </div>
            </div>
        </section>
    );
}

function FooterButton({ label, onClick, color }: any) {
    const styles = color === 'green'
        ? "bg-[#388e3c] border-[#1b5e20] text-white hover:bg-[#4caf50]"
        : "bg-[#757575] border-[#424242] text-[#e0e0e0] hover:bg-[#9e9e9e]";

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            onClick={onClick}
            className={`w-full md:w-auto px-10 ${styles} border-b-[6px] border-r-[2px] border-l-[2px] border-t-[2px] border-l-white/20 border-t-white/20 py-4 text-sm shadow-xl transition-all`}
            style={{ fontFamily: 'var(--font-press-start)' }}
        >
            {label}
        </motion.button>
    );
}

function Footer() {
    return (
        <footer className="bg-[#111] py-8 text-center border-t-4 border-[#333]" >
            <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-4 h-4 bg-[#5fb346] animate-bounce"></div>
                <span className="text-[#555] text-[10px]" style={{ fontFamily: 'var(--font-press-start)' }}>MINECRAFT PARTY INVITATION</span>
            </div>
        </footer>
    );
}
