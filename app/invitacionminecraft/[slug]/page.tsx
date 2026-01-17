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
    fullDate: string; // ISO or human readable for calendar
    time: string;
    locationName: string;
    locationAddress: string;
    mapUrl: string; // Embed URL or Link
    musicUrl: string;
    targetDate: string;
    whatsappPhone: string;
};

// --- MOCK DATABASE ---
const DB: Record<string, PartyConfig> = {
    'ian-level8': {
        name: 'IAN', age: 9, date: '25 OCT',
        fullDate: '2026-10-25',
        time: '4:00 PM',
        locationName: "Salón 'El Bloque'", locationAddress: 'Av. Siempre Viva 742',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661601053058!2d-99.16782292411933!3d19.42702058185368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2003d18c!2sEl%20Angel%20of%20Independence!5e0!3m2!1sen!2smx!4v1700000000000!5m2!1sen!2smx', // Mock Embed
        musicUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        targetDate: '2026-10-25T16:00:00',
        whatsappPhone: '5555555555'
    },
    'juanito8': {
        name: 'JUANITO', age: 9, date: '12 OCT',
        fullDate: '2026-10-12',
        time: '5:00 PM',
        locationName: 'Jardín Real', locationAddress: 'Calle Falsa 123',
        mapUrl: 'https://maps.google.com',
        musicUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
        targetDate: '2026-10-12T17:00:00',
        whatsappPhone: '5555555555'
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
                    <CalendarSection config={config} />
                    <MapSection mapUrl={config.mapUrl} />
                    <RSVPSection phone={config.whatsappPhone} name={config.name} />
                    <Footer />

                    {/* INTERACTIVE CREEPER */}
                    <CreeperComponent />
                </div>
            )}
        </main>
    );
}

// --- SHARED MODAL COMPONENT ---
function Modal({ isOpen, onClose, title, children }: any) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-[#c6c6c6] border-4 border-black p-1 w-full max-w-md relative" onClick={e => e.stopPropagation()}>
                {/* Minecraft Window Header */}
                <div className="bg-[#8b8b8b] border-2 border-[#fff] border-b-[#555] border-r-[#555] p-2 flex justify-between items-center mb-1">
                    <span className="text-[#333] font-bold tracking-wider ml-1" style={{ fontFamily: 'var(--font-press-start)' }}>{title}</span>
                    <button onClick={onClose} className="w-6 h-6 bg-[#c6c6c6] border-2 border-white border-b-[#555] border-r-[#555] text-black font-bold leading-none flex items-center justify-center hover:bg-[#ddd]">X</button>
                </div>
                {/* Content */}
                <div className="bg-[#222] border-2 border-[#555] border-t-[#000] border-l-[#000] p-6 text-center text-white">
                    {children}
                </div>
            </div>
        </div>
    );
}

// --- PIXEL HEART COMPONENT ---
function PixelHeart({ filled }: { filled: boolean }) {
    // 9x9 Pixel Heart
    // Colors
    const border = "#000000";
    const fill = filled ? "#FF0000" : "#222"; // Red or Dark Gray
    const highlight = filled ? "#FF8888" : "#444";

    return (
        <svg width="32" height="32" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mx-1 drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
            {/* Outline (Black) */}
            <path d="M2,2 h2 v-1 h-2 z M5,2 h2 v-1 h-2 z M1,3 h1 v2 h-1 z M7,3 h1 v2 h-1 z M2,5 h1 v1 h-1 z M6,5 h1 v1 h-1 z M3,6 h1 v1 h-1 z M5,6 h1 v1 h-1 z M4,7 h1 v1 h-1 z" fill={border} />

            {/* Fill */}
            <path d="M2,2 h2 v1 h-2 z M5,2 h2 v1 h-2 z M1,3 h1 v2 h-1 z M7,3 h1 v2 h-1 z M2,3 h5 v2 h-5 z M2,5 h5 v1 h-5 z M3,6 h3 v1 h-3 z M4,7 h1 v1 h-1 z" fill={fill} />

            {/* Shine/Highlight (Optional for filled) */}
            {filled && <rect x="2" y="3" width="1" height="1" fill={highlight} />}
        </svg>
    );
}

// --- SUB-COMPONENTS ---

function LockScreen({ onUnlock }: { onUnlock: () => void }) {
    const [hp, setHp] = useState(10);
    const [hitAnim, setHitAnim] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [isSwinging, setIsSwinging] = useState(false);
    const [isBreaking, setIsBreaking] = useState(false); // Guard against spam clicks

    useEffect(() => {
        const move = (e: MouseEvent | TouchEvent) => {
            let cx, cy;
            if ('touches' in e) {
                cx = e.touches[0].clientX;
                cy = e.touches[0].clientY;
            } else {
                cx = (e as MouseEvent).clientX;
                cy = (e as MouseEvent).clientY;
            }
            setCursorPos({ x: cx, y: cy });
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move);
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('touchmove', move);
        };
    }, []);

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
        if (isBreaking) return; // Prevent interaction if already breaking

        setIsSwinging(true);
        setTimeout(() => setIsSwinging(false), 200);

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
            setIsBreaking(true); // Lock interactions
            spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 60, true);
            setTimeout(onUnlock, 800);
        } else {
            setHp(h => h - 1);
        }
    };

    return (
        <div className="text-center w-full h-full flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm cursor-none">
            <div
                className={`sword-cursor ${isSwinging ? 'sword-swing' : ''}`}
                style={{ left: cursorPos.x, top: cursorPos.y, display: cursorPos.x < 0 ? 'none' : 'block' }}
            />

            <div className="fixed top-0 left-0 w-full text-center pt-8 pointer-events-none z-40">
                <img
                    src="/sprites/title-fiesta.png"
                    alt="Fiesta Minecraft"
                    className="h-32 md:h-48 mx-auto drop-shadow-lg image-pixelated mb-4"
                />
            </div>

            {/* <div className="fixed top-24 text-2xl z-40"> MOVED BELOW </div> */}

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

            {/* Hearts moved here - scaled up and positioned */}
            <div className="fixed bottom-32 z-40 text-center w-full pointer-events-none transform scale-125 md:scale-150">
                {Array.from({ length: 5 }).map((_, i) => (
                    <PixelHeart key={i} filled={i < Math.ceil(hp / 2)} />
                ))}
            </div>

            <div className="fixed bottom-12 z-40 animate-pulse w-full px-4">
                <button
                    onClick={(e) => handleClick(e as any)}
                    className="active:scale-95 transition-transform w-full max-w-sm mx-auto block cursor-none focus:outline-none"
                >
                    <img
                        src="/sprites/btn-break-pinata.jpg"
                        alt="¡ROMPE LA PIÑATA!"
                        className="w-full drop-shadow-[0_4px_0_#000] border-4 border-black rounded-lg image-pixelated"
                    />
                </button>
            </div>
        </div>
    );
}

function CreeperComponent() {
    const [hit, setHit] = useState(false);

    const handleClick = () => {
        // Play hit sound
        const audio = new Audio('https://www.myinstants.com/media/sounds/classic_hurt.mp3');
        audio.currentTime = 0;
        audio.volume = 0.6;
        audio.play().catch(() => { });

        // Play Fuse sound? maybe
        const fuse = new Audio('https://www.myinstants.com/media/sounds/creeper-fuse.mp3');
        fuse.volume = 0.4;
        fuse.play().catch(() => { });

        setHit(true);
        setTimeout(() => setHit(false), 200);
    };

    return (
        <div
            onClick={handleClick}
            className={`creeper-walker creeper-interactive ${hit ? 'creeper-hit' : ''}`}
        ></div>
    );
}

function HeroSection({ config }: { config: PartyConfig }) {
    return (
        <section className="h-[85vh] relative flex flex-col items-center justify-center border-b-8 border-[#3e2723] text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/backgrounds/minecraft-day.jpg')] bg-cover bg-center"></div>

            <div className="relative z-10 p-4 pt-10">
                <div className="steve-dancer"></div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <img
                        src="/sprites/name-lucas.png"
                        alt={config.name}
                        className="w-full max-w-sm md:max-w-xl mx-auto image-pixelated drop-shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
                    />
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-block bg-[#000]/40 backdrop-blur-md px-8 py-4 border-2 border-white/40 transform -skew-x-12"
                >
                    <h2 className="text-3xl md:text-5xl text-[#5fb346] drop-shadow-[4px_4px_0_#000] stroke-black transform skew-x-12" style={{ fontFamily: 'var(--font-press-start)' }}>
                        CUMPLE {config.age}
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
                <p className="text-[#eee] px-4 py-2 text-lg md:text-xl border-2 border-[#111] bg-[#222] tracking-wider" style={{ fontFamily: 'var(--font-press-start)' }}>TIEMPO FALTANTE PARA LA FIESTA</p>
            </motion.div>

            {/* 3D Clock Decoration */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8"
            >
                <img src="/sprites/clock-icon-3d.png" alt="Reloj Minecraft" className="w-24 md:w-32 drop-shadow-xl image-pixelated" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-4 z-10 text-white">
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
            className="w-24 md:w-40 bg-[#222] border-[4px] border-[#444] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] p-4 text-center"
        >
            <span className={`block text-4xl md:text-6xl font-vt323 leading-none ${isRed ? 'text-[#ff5555]' : 'text-[#e0e0e0]'} drop-shadow-md`}>{val < 10 ? `0${val}` : val}</span>
            <span className="text-xs md:text-sm text-[#888] uppercase mt-2 block tracking-widest" style={{ fontFamily: 'var(--font-press-start)' }}>{label}</span>
        </motion.div>
    );
}

function InventorySection({ config }: { config: PartyConfig }) {
    return (
        <section className="max-w-7xl mx-auto px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <div className="inline-block bg-[#5c4033] border-4 border-[#3e2723] px-8 py-4 shadow-lg transform -skew-y-2">
                    <h2 className="text-white text-2xl md:text-4xl drop-shadow-[2px_2px_0_#000]" style={{ fontFamily: 'var(--font-press-start)' }}>DETALLES AVENTURA</h2>
                </div>
            </motion.div>

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

                <div className="bg-[#373737] p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-2 border-[#555] border-b-[#222] border-r-[#222]">

                    <div className="flex flex-col gap-3">
                        <div className="bg-[#5c4033] text-[#ddd] text-sm md:text-base px-3 py-2 inline-block w-fit border border-[#3e2723] font-bold tracking-widest mb-1 shadow-md">UBICACIÓN</div>
                        <div className="p-4 bg-[#444] border-[3px] border-[#222] border-b-[#555] border-r-[#555] shadow-inner space-y-4">
                            <InventoryItem icon="🗺️" top="ZONA" bottom="Mapa del Mundo" />
                            <InventoryItem icon="📍" top="LUGAR" bottom={config.locationName} />
                            <InventoryItem icon="🏡" top="DIRECCIÓN" bottom={config.locationAddress} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="bg-[#388e3c] text-[#ddd] text-sm md:text-base px-3 py-2 inline-block w-fit border border-[#1b5e20] font-bold tracking-widest mb-1 shadow-md">TIEMPO</div>
                        <div className="p-4 bg-[#444] border-[3px] border-[#222] border-b-[#555] border-r-[#555] shadow-inner space-y-4">
                            <InventoryItem icon="📅" top="FECHA" bottom={config.date} />
                            <InventoryItem icon="⏰" top="HORA DE INICIO" bottom={config.time} />
                            <InventoryItem icon="⏱️" top="DURACIÓN" bottom="Hasta el anochecer" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="bg-[#6a1b9a] text-[#ddd] text-sm md:text-base px-3 py-2 inline-block w-fit border border-[#4a148c] font-bold tracking-widest mb-1 shadow-md">LOOT</div>
                        <div className="p-4 bg-[#444] border-[3px] border-[#222] border-b-[#555] border-r-[#555] shadow-inner space-y-4">
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
        <div className="flex items-center gap-4 group">
            <div className="w-14 h-14 min-w-[3.5rem] bg-[#1a1a1a] border-2 border-[#555] border-t-[#000] border-l-[#000] flex items-center justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.8)] group-hover:bg-[#222] transition-colors">
                <span className="text-2xl filter drop-shadow-sm grayscale-[0.1]">{icon}</span>
            </div>
            <div className="flex-1 bg-[#1a1a1a] h-14 border-2 border-[#555] border-t-[#000] border-l-[#000] px-4 flex flex-col justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.8)]">
                <p className="text-[#a7a7a7] text-xs truncate leading-tight tracking-wider" style={{ fontFamily: 'var(--font-press-start)' }}>{top}</p>
                <p className="text-[#eee] font-vt323 text-xl truncate leading-none mt-1">{bottom}</p>
            </div>
        </div>
    );
}

function CalendarSection({ config }: { config: PartyConfig }) {
    const [isOpen, setIsOpen] = useState(false);

    // Google Calendar Link Generator (Simple version)
    // Dates need to be YYYYMMDDTHHMMSSZ format.
    // For demo, we just alert. In production, parse config.date/time properly.
    const createEventUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Fiesta de ${config.name}`)}&details=${encodeURIComponent('¡Fiesta estilo Minecraft!')}&location=${encodeURIComponent(config.locationAddress)}`;

    return (
        <section className="py-10 text-center">
            <button
                onClick={() => setIsOpen(true)}
                className="mc-btn bg-[#546e7a] text-white py-4 px-8 text-xl border-2 border-[#263238] shadow-lg hover:brightness-110 active:scale-95 transition-all"
                style={{ fontFamily: 'var(--font-press-start)' }}
            >
                📅 AGENDAR EN CALENDARIO
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="CALENDARIO">
                <h3 className="text-xl mb-4 text-[#ffd700]" style={{ fontFamily: 'var(--font-press-start)' }}>¡NO OLVIDES LA FECHA!</h3>
                <p className="text-gray-300 font-vt323 text-2xl mb-8 leading-relaxed">
                    Aquí podrás agendar el evento en tu calendario personal para no perder el spawn.
                </p>
                <div className="flex flex-col gap-4">
                    <a
                        href={createEventUrl}
                        target="_blank"
                        className="bg-[#388e3c] text-white py-3 px-4 border-b-4 border-[#1b5e20] hover:bg-[#4caf50] active:border-b-0"
                        style={{ fontFamily: 'var(--font-press-start)', fontSize: '10px' }}
                    >
                        AGREGAR A GOOGLE CALENDAR
                    </a>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 text-sm hover:text-white underline"
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </section>
    );
}

function MapSection({ mapUrl }: { mapUrl: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-16 px-4 bg-[#111] text-center border-t border-[#333] relative">
            <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#999] text-xl mb-8 uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-press-start)' }}
            >
                MAPA DE LA ZONA
            </motion.h3>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block relative group cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <motion.img
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    src="/sprites/map-icon-3d.png"
                    alt="Mapa 3D"
                    className="w-64 md:w-80 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] image-pixelated hover:brightness-110 transition-all"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#5d4037] text-white px-4 py-2 text-xs md:text-sm border-2 border-[#3e2723] shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ fontFamily: 'var(--font-press-start)' }}>
                    CLICK PARA VER EL MAPA
                </div>
            </motion.div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="MAPA DEL TESORO">
                <div className="w-full h-64 md:h-96 bg-gray-200">
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <p className="mt-4 text-sm text-gray-400">Si no carga, intenta abrirlo externamente.</p>
            </Modal>
        </section>
    );
}

function RSVPSection({ phone, name }: { phone: string, name: string }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [declineOpen, setDeclineOpen] = useState(false);

    const send = (ans: string) => {
        const msg = ans === 'si' ? `¡Sí, asistiré a la fiesta de ${name}! 🎂` : `Lo siento, no podré ir a la fiesta de ${name} 😢`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
        setConfirmOpen(false);
        setDeclineOpen(false);
    };

    return (
        <section className="tex-wood-dark py-24 text-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhQwWgwYgKE0kE0bDgAAwAA//8wI58KAAAAAElFTkSuQmCC')]"></div>

            <div className="relative z-10 max-w-3xl mx-auto px-4">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-white mb-12 text-3xl md:text-5xl drop-shadow-md"
                    style={{ fontFamily: 'var(--font-press-start)' }}
                >
                    CONFIRMAR ASISTENCIA
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    <FooterButton label="SÍ, ASISTIRÉ" onClick={() => setConfirmOpen(true)} color="green" />
                    <FooterButton label="NO, NO PUEDO" onClick={() => setDeclineOpen(true)} color="gray" />
                </div>
            </div>

            {/* CONFIRM MODAL */}
            <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="CONFIRMACIÓN">
                <p className="text-gray-300 font-vt323 text-2xl mb-6">
                    Aquí podrás enviar tu mensaje de confirmación de asistencia por WhatsApp.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={() => send('si')}
                        className="bg-[#25D366] text-white py-3 px-6 border-b-4 border-[#128C7E] hover:brightness-110 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-press-start)', fontSize: '12px' }}
                    >
                        <span>ENVIAR MENSAJE</span>
                    </button>
                </div>
            </Modal>

            {/* DECLINE MODAL */}
            <Modal isOpen={declineOpen} onClose={() => setDeclineOpen(false)} title="CANCELACIÓN">
                <p className="text-gray-300 font-vt323 text-2xl mb-6">
                    Aquí podrás enviar tu mensaje indicando que no podrás asistir. ¡Te extrañaremos!
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={() => send('no')}
                        className="bg-[#555] text-white py-3 px-6 border-b-4 border-[#333] hover:brightness-110 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-press-start)', fontSize: '12px' }}
                    >
                        <span>ENVIAR MENSAJE</span>
                    </button>
                </div>
            </Modal>
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
            className={`w-full md:w-auto px-12 ${styles} border-b-[8px] border-r-[4px] border-l-[4px] border-t-[4px] border-l-white/20 border-t-white/20 py-6 text-xl shadow-2xl transition-all`}
            style={{ fontFamily: 'var(--font-press-start)' }}
        >
            {label}
        </motion.button>
    );
}

function Footer() {
    return (
        <footer className="bg-black py-16 text-center border-t-8 border-[#222]" >
            {/* SALES CTA */}
            <div className="mb-12">
                <a
                    href="https://wa.me/529845828658?text=%C2%A1Hola!%20Me%20encant%C3%B3%20la%20invitaci%C3%B3n%20de%20Minecraft%20y%20quiero%20la%20m%C3%ADa%20ya!"
                    target="_blank"
                    className="inline-block bg-gradient-to-b from-[#fcd34d] to-[#f59e0b] border-b-4 border-r-4 border-[#78350f] text-[#3e2723] text-lg md:text-xl py-4 px-8 shadow-[0_0_15px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all animate-bounce"
                    style={{ fontFamily: 'var(--font-press-start)' }}
                >
                    ¡QUIERO LA MÍA YA! 💎
                </a>
            </div>

            <a href="https://www.dreamcrafters.lat" target="_blank" className="flex items-center justify-center gap-3 mb-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer group">
                {/* Click icon */}
                <svg className="w-5 h-5 text-[#5fb346] animate-pulse group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span className="text-[#888] text-xs tracking-widest group-hover:text-white" style={{ fontFamily: 'var(--font-press-start)' }}>POWERED BY DREAMCRAFTERS</span>
            </a>
        </footer>
    );
}
