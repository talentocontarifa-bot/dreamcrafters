"use client";

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';

import { DB, PartyConfig } from '../data';

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
    const [enderPos, setEnderPos] = useState({ x: 50, y: 50 });

    // Wander around automatically
    useEffect(() => {
        if (isBreaking) return;
        const interval = setInterval(() => {
            setEnderPos(prev => ({
                x: Math.max(15, Math.min(85, prev.x + (Math.random() * 20 - 10))),
                y: Math.max(20, Math.min(60, prev.y + (Math.random() * 10 - 5)))
            }));
        }, 1500);
        return () => clearInterval(interval);
    }, [isBreaking]);

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
        // We do classic hurt + Enderman teleport generic sound
        const audio = new Audio('https://www.myinstants.com/media/sounds/classic_hurt.mp3');
        audio.currentTime = 0;
        audio.volume = 0.6;
        audio.play().catch(() => { });

        // Enderman TP sound proxy
        const tp = new Audio('https://www.myinstants.com/media/sounds/enderman-teleport.mp3');
        tp.volume = 0.4;
        tp.play().catch(() => { });
    };

    const spawnParticles = (x: number, y: number, amount: number, isExplosion: boolean = false, customColors?: string[]) => {
        const colors = customColors || ['#facc15', '#ef4444', '#3b82f6', '#22c55e', '#ffffff'];
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

        spawnParticles(clientX, clientY, 15, false, ['#a811cf', '#d63dd6', '#111111']);

        if (hp <= 1) {
            setIsBreaking(true); // Lock interactions
            spawnParticles(window.innerWidth / 2, window.innerHeight / 2, 80, true, ['#a811cf', '#d63dd6', '#111111', '#ffffff']);
            // The handleUnlock (in parent) plays the TNT explosion
            setTimeout(onUnlock, 800);
        } else {
            setHp(h => h - 1);
            // Teleport the Enderman to dodge
            setEnderPos({
                x: Math.random() * 70 + 15, // 15% to 85%
                y: Math.random() * 40 + 20  // 20% to 60%
            });
        }
    };

    return (
        <div className="text-center w-full h-full flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm cursor-none">
            <style jsx global>{`
                @keyframes enderSwing {
                    0% { transform: rotate(-15deg); }
                    100% { transform: rotate(15deg); }
                }
                @keyframes enderWalk {
                    0% { opacity: 1; }
                    49% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 0; }
                }
                @keyframes enderWalkAlt {
                    0% { opacity: 0; }
                    49% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 1; }
                }
            `}</style>
            
            <div
                className={`sword-cursor ${isSwinging ? 'sword-swing' : ''}`}
                style={{ left: cursorPos.x, top: cursorPos.y, display: cursorPos.x < 0 ? 'none' : 'block' }}
            />

            <div className="fixed top-0 left-0 w-full text-center pt-8 pointer-events-none z-40">
                <img
                    src="/sprites/title-fiesta.webp"
                    alt="Fiesta Minecraft"
                    className="h-32 md:h-48 mx-auto drop-shadow-lg image-pixelated mb-4"
                />
            </div>

            {/* ENDERMAN COMPONENT */}
            {!isBreaking && (
                <div 
                    className="absolute z-30 transition-all duration-300 ease-out"
                    style={{ 
                        left: `${enderPos.x}%`, 
                        top: `${enderPos.y}%`, 
                        transform: `translate(-50%, -50%) ${hitAnim ? 'scale(0.9) rotate(-5deg)' : ''}` 
                    }}
                >
                    <div
                        className="cursor-none relative pt-10" 
                        onMouseDown={handleClick}
                        onTouchStart={handleClick}
                    >
                        {/* Spritesheet based Enderman Body */}
                        <div className={`relative ${hitAnim ? 'filter drop-shadow-[0_0_20px_#ff0000] brightness-200 sepia-[100%] hue-rotate-[-50deg] saturate-200' : 'hover:brightness-125 transition-all'}`}>
                            {/* Sprite Animation Tick Logic via CSS Steps or Inline State */}
                            <div className="w-48 md:w-64 h-72 md:h-96 relative">
                                {/* Frame 1 */}
                                <img 
                                    src="/sprites/enderman_1.webp" 
                                    className="absolute inset-0 w-full h-full object-contain image-pixelated" 
                                    style={{ animation: 'enderWalk 0.8s infinite' }}
                                    alt="Enderman Frame 1"
                                />
                                {/* Frame 2 */}
                                <img 
                                    src="/sprites/enderman_2.webp" 
                                    className="absolute inset-0 w-full h-full object-contain image-pixelated" 
                                    style={{ animation: 'enderWalkAlt 0.8s infinite' }}
                                    alt="Enderman Frame 2"
                                />
                            </div>
                            
                            {/* Ambient Particles around the Sprite */}
                            <div className="absolute inset-0 overflow-visible pointer-events-none">
                                <div className="absolute w-2 h-2 bg-[#d87fdf] blur-[1px] left-0 top-10 animate-ping"></div>
                                <div className="absolute w-1 h-1 bg-[#ffb6ff] blur-[1px] right-0 top-0 animate-ping" style={{animationDelay: '0.5s'}}></div>
                                <div className="absolute w-2 h-2 bg-[#a811cf] blur-[1px] top-32 left-8 animate-ping" style={{animationDelay: '1s'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hearts */}
            <div className="fixed bottom-36 md:bottom-32 z-40 text-center w-full pointer-events-none transform scale-125 md:scale-150">
                {Array.from({ length: 5 }).map((_, i) => (
                    <PixelHeart key={i} filled={i < Math.ceil(hp / 2)} />
                ))}
            </div>

            {/* AVISO DEL ENDERMAN (MOVIDO DEBAJO DE LOS CORAZONES) */}
            <div className="fixed bottom-12 md:bottom-16 z-40 w-full text-center pointer-events-none animate-pulse px-4">
                <p className="bg-black/80 text-[#a811cf] font-vt323 text-2xl md:text-4xl border-2 border-[#a811cf] px-6 py-2 inline-block shadow-[0_0_15px_rgba(168,17,207,0.5)]">
                    💥 ¡CAZA AL ENDERMAN! 💥
                </p>
            </div>

        </div>
    );
}

function CreeperComponent() {
    const [hit, setHit] = useState(false);
    const [hp, setHp] = useState(5);
    const [respawnCount, setRespawnCount] = useState(0);
    const [isExploding, setIsExploding] = useState(false);

    // Randomly face left or right
    const [facingRight, setFacingRight] = useState(false);

    // Initial random facing
    useEffect(() => {
        setFacingRight(Math.random() > 0.5);
    }, []);

    const handleClick = () => {
        if (isExploding) return; // Prevent hits while exploding

        if (hp <= 1) {
            // Trigger explosion
            setIsExploding(true);
            
            const explosion = new Audio('https://www.myinstants.com/media/sounds/minecraft-tnt-explosion.mp3');
            explosion.volume = 0.8;
            explosion.play().catch(() => { });

            // Spawn localized particles/confetti
            confetti({ particleCount: 100, spread: 100, origin: { y: 0.9, x: 0.5 }, colors: ['#5fb346', '#000000', '#ffffff', '#ff0000'] });

            // Respawn logic
            setTimeout(() => {
                setHp(5);
                setRespawnCount(prev => prev + 1);
                setFacingRight(Math.random() > 0.5); // Randomize direction again
                setIsExploding(false);
            }, 3000); // Wait 3 seconds to respawn
        } else {
            // Normal hit
            setHp(h => h - 1);
            
            const audio = new Audio('https://www.myinstants.com/media/sounds/classic_hurt.mp3');
            audio.currentTime = 0;
            audio.volume = 0.6;
            audio.play().catch(() => { });

            const fuse = new Audio('https://www.myinstants.com/media/sounds/creeper-fuse.mp3');
            fuse.volume = 0.4;
            fuse.play().catch(() => { });

            setHit(true);
            setTimeout(() => setHit(false), 200);
        }
    };

    if (isExploding) return null; // Hide while respawning

    // Every respawn adds 60 degrees of hue rotation
    const hueShift = respawnCount * 60;
    // Combine hue rotation and mirroring/facing right
    const transformStyle = facingRight ? `scaleX(-1) hue-rotate(${hueShift}deg)` : `hue-rotate(${hueShift}deg)`;

    return (
        <div
            onClick={handleClick}
            className={`creeper-walker creeper-interactive ${hit ? 'creeper-hit scale-110 drop-shadow-[0_0_15px_#ff0000]' : ''}`}
            style={{ filter: transformStyle }}
        >
        </div>
    );
}

function HeroSection({ config }: { config: PartyConfig }) {
    return (
        <section className="min-h-[85vh] h-auto py-20 relative flex flex-col items-center justify-center border-b-8 border-[#3e2723] text-center overflow-visible">
            <div className="absolute inset-0 bg-[url('/backgrounds/minecraft-day.jpg')] bg-cover bg-center"></div>

            <div className="relative z-10 p-4 flex flex-col items-center w-full">

                {/* CONTAINER FOR STEVE & NAME OVERLAP */}
                <div className="relative w-full flex flex-col items-center justify-center pt-24 mb-6">
                    <style jsx global>{`
                        @keyframes danyDance {
                            0%, 49.99% { opacity: 1; }
                            50%, 100% { opacity: 0; }
                        }
                        @keyframes danyDanceAlt {
                            0%, 49.99% { opacity: 0; }
                            50%, 100% { opacity: 1; }
                        }
                    `}</style>

                    {/* 1. Dany Sprite (Background Layer - Behind Name) */}
                    <div className="absolute top-4 z-0 opacity-100 scale-100 md:scale-125 origin-bottom">
                        <div className="w-48 h-64 md:w-56 md:h-80 relative">
                            <img 
                                src="/sprites/Dany_1.webp" 
                                className="absolute inset-0 w-full h-full object-contain image-pixelated drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
                                style={{ animation: 'danyDance 0.8s infinite' }}
                                alt="Dany Frame 1"
                            />
                            <img 
                                src="/sprites/Daniel_2.webp" 
                                className="absolute inset-0 w-full h-full object-contain image-pixelated drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
                                style={{ animation: 'danyDanceAlt 0.8s infinite' }}
                                alt="Dany Frame 2"
                            />
                        </div>
                    </div>

                    {/* 2. Name (Foreground Layer - On top of Dany) */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10 w-full px-4 mt-24 md:mt-32"
                    >
                        <motion.h1 
                            animate={{ scale: [1, 1.03, 1], y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-5xl md:text-8xl text-white text-center font-bold tracking-wider relative break-words"
                            style={{ 
                                fontFamily: 'var(--font-press-start)',
                                WebkitTextStroke: '2px black',
                                textShadow: '4px 4px 0 #777, 6px 6px 0 #444, 8px 8px 0 #222, 10px 10px 0 #000, 15px 15px 20px rgba(0,0,0,0.8)'
                            }}
                        >
                            {config.name}
                        </motion.h1>
                    </motion.div>
                </div>

                {/* 3. Age Label */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-block bg-[#000]/70 backdrop-blur-md px-8 py-6 md:px-12 md:py-10 border-4 border-white transform -skew-x-12 z-20 shadow-[0_0_20px_rgba(95,179,70,0.8)] min-w-[300px] flex items-center justify-center -mt-4"
                >
                    <motion.h2 
                        animate={{ rotate: [-2, 2, -2], scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-4xl md:text-7xl text-[#5fb346] drop-shadow-[4px_4px_0_#000] stroke-black transform skew-x-12 font-bold tracking-widest leading-none mt-2 whitespace-nowrap" 
                        style={{ fontFamily: 'var(--font-press-start)' }}
                    >
                        CUMPLE {config.age}
                    </motion.h2>
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
                <img
                    src="/sprites/item-clock-final.png"
                    alt="Reloj Minecraft"
                    className="w-24 md:w-32 drop-shadow-xl image-pixelated block mx-auto"
                />
                <div id="clock-fallback" className="hidden bg-[#222] border-4 border-[#fff] text-white p-2 font-vt323 text-xl">
                    ⏱️
                </div>
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

                <div className="bg-[#373737] p-6 md:p-8 flex justify-center border-2 border-[#555] border-b-[#222] border-r-[#222]">

                    <div className="flex flex-col gap-3 w-full max-w-lg">
                        <div className="bg-[#388e3c] text-[#ddd] text-sm md:text-base px-3 py-2 inline-block w-fit border border-[#1b5e20] font-bold tracking-widest mb-1 shadow-md mx-auto">FECHA Y HORA</div>
                        <div className="p-4 md:p-6 bg-[#444] border-[3px] border-[#222] border-b-[#555] border-r-[#555] shadow-inner space-y-6 flex flex-col justify-center w-full">
                            <InventoryItem icon="📅" top="DÍA Y MES" bottom={config.date} highlight={true} />
                            <InventoryItem icon="⏰" top="HORA DE LLEGADA" bottom={config.time} highlight={true} />
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* AVISO IMPORTANTE (ALBERCADA, ETC) */}
            {config.customMessage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 p-3 md:p-4 text-center max-w-3xl mx-auto transform -rotate-1 relative overflow-hidden group cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                >
                    {/* Enchanted Glint Effect (Moves on hover) */}
                    <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[#b829ff]/60 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-[1200ms] pointer-events-none z-30 mix-blend-screen"></div>

                    {/* Obsidian/Bedrock texture wrapper */}
                    <div className="absolute inset-0 bg-[#2a2a2a] border-[6px] border-[#111] z-0">
                         {/* Subtle noise/texture */}
                         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:12px_12px]"></div>
                    </div>

                    <div className="relative z-10 p-3 md:p-6 border-[4px] border-[#444] border-t-[#666] border-l-[#666] bg-[#222]/90 flex flex-col items-center">
                        <p className="text-lg md:text-3xl text-[#ffaa00] drop-shadow-[2px_2px_0_#000] mb-4 mt-2 font-bold tracking-widest flex items-center gap-2 md:gap-3" style={{ fontFamily: 'var(--font-press-start)' }}>
                            <span className="animate-pulse text-xl md:text-2xl">⚡</span> 
                            AVISO IMPORTANTE 
                            <span className="animate-pulse text-xl md:text-2xl">⚡</span>
                        </p>
                        <div className="bg-[#111] w-full border-[4px] border-[#000] border-b-[#333] border-r-[#333] py-4 px-3 md:py-5 md:px-6 shadow-inner text-center">
                            <p className="font-vt323 text-2xl md:text-5xl leading-relaxed text-[#a8ff52] drop-shadow-[1px_1px_0_#000] tracking-wide break-words">{config.customMessage}</p>
                        </div>
                    </div>
                </motion.div>
            )}

        </section>
    );
}

function InventoryItem({ icon, top, bottom, highlight }: any) {
    return (
        <div className={`flex items-center gap-3 md:gap-4 group w-full ${highlight ? 'transform md:scale-105 origin-left' : ''}`}>
            {/* Ícono Izquierdo */}
            <div className={`shrink-0 bg-[#1a1a1a] border-2 border-[#555] border-t-[#000] border-l-[#000] flex items-center justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.8)] transition-colors ${highlight ? 'w-16 h-16 md:w-20 md:h-20 group-hover:bg-[#ffb300]/20' : 'w-12 h-12 md:w-14 md:h-14 group-hover:bg-[#222]'}`}>
                <span className={`filter drop-shadow-sm grayscale-[0.1] ${highlight ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{icon}</span>
            </div>
            
            {/* Contenedor de Texto */}
            <div className={`flex-1 min-w-0 bg-[#1a1a1a] border-2 border-[#555] border-t-[#000] border-l-[#000] px-3 md:px-4 py-2 flex flex-col justify-center shadow-[inset_0_0_5px_rgba(0,0,0,0.8)] ${highlight ? 'border-l-[#ffb300] bg-gradient-to-r from-[#282828] to-[#1a1a1a]' : ''}`}>
                <p className={`${highlight ? 'text-[#ffb300]' : 'text-[#a7a7a7]'} text-[10px] md:text-xs truncate leading-tight tracking-wider font-bold mb-1`} style={{ fontFamily: 'var(--font-press-start)' }}>{top}</p>
                <p className={`text-[#eee] font-vt323 ${highlight ? 'text-2xl md:text-4xl text-[#fff]' : 'text-lg md:text-xl'} break-words whitespace-normal leading-tight`}>{bottom}</p>
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

            <div
                className="inline-block relative group cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {/* 3D Map Sprite */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img
                        src="/sprites/item-map-final.png"
                        alt="Mapa 3D"
                        className="w-64 md:w-80 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] image-pixelated hover:brightness-110 transition-all block mx-auto"
                    />
                    <div id="map-fallback-v2" className="hidden w-64 h-64 mx-auto bg-[#f0e68c] border-8 border-[#8b4513] relative shadow-xl flex items-center justify-center">
                        <span className="text-[#8b4513] text-6xl transform rotate-45">❌</span>
                        <span className="absolute bottom-2 text-[#8b4513] font-bold text-xs" style={{ fontFamily: 'var(--font-press-start)' }}>MAPA</span>
                    </div>
                </motion.div>

                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#5d4037] text-white px-4 py-2 text-xs md:text-sm border-2 border-[#3e2723] shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ fontFamily: 'var(--font-press-start)' }}>
                    CLICK PARA VER EL MAPA
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="MAPA DEL TESORO">
                {mapUrl.includes("embed") ? (
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
                ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="mb-6 opacity-80">
                            {/* Fallback Graphic */}
                            <img
                                src="/sprites/item-map-final.png"
                                alt="Mapa Externo"
                                className="w-24 h-24 image-pixelated animate-bounce"
                            />
                        </div>
                        <p className="mb-6 text-gray-300 font-vt323 text-xl">
                            El mapa no se puede desplegar aquí. <br /> ¡Ábrelo en tu App!
                        </p>
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#388e3c] text-white py-4 px-6 border-b-4 border-[#1b5e20] hover:bg-[#4caf50] active:border-b-0 inline-flex items-center gap-2 group transition-all"
                            style={{ fontFamily: 'var(--font-press-start)', fontSize: '12px' }}
                        >
                            <span>🗺️</span> ABRIR UBICACIÓN GPS
                        </a>
                    </div>
                )}

                {mapUrl.includes("embed") && (
                    <p className="mt-4 text-sm text-gray-400">Si no carga, intenta abrirlo externamente.</p>
                )}
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
