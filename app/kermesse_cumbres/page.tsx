"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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

                {/* Mapa Iframe - Dirección Exacta (Cancún) */}
                <div className="w-full h-[50vh] md:h-[60vh] relative bg-gray-900">
                    <iframe
                        src="https://maps.google.com/maps?q=Monte+Vinson+esquina+Av.+Cumbres+Mza+8%2C+Supermanzana+310%2C+77560+Canc%C3%BAn%2C+Q.R.&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Footer Modal - External Link */}
                <div className="p-4 md:p-6 bg-white/5 border-t border-white/10 flex justify-center">
                    <a
                        href="https://maps.app.goo.gl/MP7adtrdHsAJBtSb9?g_st=com.google.maps.preview.copy"
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

// Componente Grid de Actividades con Scroll Reveal (Pares)
const NeonServicesGrid = () => {
    const activities = [
        { name: "Juegos Mecánicos", icon: "/kermesse_cumbres/juegos.webp", color: "text-cyan-400", glow: "drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]" },
        { name: "Show de Drones", icon: "/kermesse_cumbres/show_drones.webp", color: "text-sky-400", glow: "drop-shadow-[0_0_20px_rgba(56,189,248,0.9)]" },
        { name: "Show LED", icon: "/kermesse_cumbres/show_led.webp", color: "text-pink-500", glow: "drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]" },
        { name: "Banda en vivo", icon: "/kermesse_cumbres/banda_vivo.webp", color: "text-amber-400", glow: "drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" },
        { name: "Zona de Comida", icon: "/kermesse_cumbres/comida.webp", color: "text-green-400", glow: "drop-shadow-[0_0_20px_rgba(74,222,128,0.9)]" },
        { name: "Gran Bazar", icon: "/kermesse_cumbres/bazar.webp", color: "text-yellow-400", glow: "drop-shadow-[0_0_20px_rgba(250,204,21,0.9)]" },
        { name: "Inflables", icon: "/kermesse_cumbres/inflables.webp", color: "text-purple-400", glow: "drop-shadow-[0_0_20px_rgba(192,132,252,0.9)]" },
        { name: "Reunión Alumni", icon: "/kermesse_cumbres/exalumnos.webp", color: "text-indigo-400", glow: "drop-shadow-[0_0_20px_rgba(129,140,248,0.9)]" },
    ];

    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        if (!visibleItems.includes(index)) {
                            // Animar de 2 en 2 (pares e impares juntos o con delay minimo entre bloque)
                            // Bloque 0: items 0,1. Bloque 1: items 2,3...
                            const blockIndex = Math.floor(index / 2);

                            setTimeout(() => {
                                setVisibleItems((prev) => [...prev, index]);
                            }, blockIndex * 150); // Delay por BLOQUE, no por item
                            observer.unobserve(entry.target);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <h3 className="text-center text-cyan-300 uppercase tracking-[0.4em] text-sm md:text-base font-bold mb-12 animate-pulse-slow">
                Tendremos
            </h3>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {activities.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => { itemsRef.current[index] = el; }}
                        data-index={index}
                        className={`
                            flex flex-col items-center gap-4 transition-all duration-700 transform will-change-transform
                            ${visibleItems.includes(index)
                                ? 'opacity-100 translate-y-0 scale-100'
                                : 'opacity-0 translate-y-8 scale-95'}
                        `}
                    >
                        <div className="relative group">
                            {/* Hover Scale Effect */}
                            <div className="transition-transform duration-300 md:group-hover:scale-110">
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    className={`w-28 h-28 md:w-36 md:h-36 object-contain ${item.glow} filter brightness-110`}
                                />
                            </div>
                        </div>
                        <span className={`text-sm md:text-lg font-bold uppercase tracking-widest ${item.color} drop-shadow-md text-center bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5`}>
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>

            <div className="w-full text-center mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-backwards">
                <span className="text-cyan-200/80 font-medium italic text-sm md:text-base tracking-widest uppercase">
                    Y mucho más...
                </span>
            </div>
        </div>
    );
};

// Componente Marquee Doble de Bazar con Efecto Lupa
const SponsorsMarquee = () => {
    const sponsors = [
        "/kermesse_cumbres/logo_gran_puerto.webp",
        "/kermesse_cumbres/logo_boa.webp",
        "/kermesse_cumbres/logo_grandiosa.webp"
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const row1Ref = useRef<(HTMLDivElement | null)[]>([]);
    const row2Ref = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let animationFrameId: number;

        const updateScales = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            const activationRange = 250; // Rango de pixeles donde ocurre el efecto (mas amplio)

            // Helper to update a list of refs
            const updateRow = (refs: React.MutableRefObject<(HTMLDivElement | null)[]>) => {
                refs.current.forEach((item) => {
                    if (!item) return;
                    const rect = item.getBoundingClientRect();

                    // Si el elemento no esta visible en pantalla, saltar calculo (Optimizacion Basica)
                    if (rect.right < 0 || rect.left > window.innerWidth) return;

                    const itemCenter = rect.left + rect.width / 2;
                    const dist = Math.abs(containerCenter - itemCenter);

                    let scale = 1;

                    if (dist < activationRange) {
                        // Curva suave (coseno) para que no sea lineal
                        const ratio = 1 - (dist / activationRange);
                        // Max escala 1.35
                        scale = 1 + (0.35 * Math.pow(ratio, 2));
                    }

                    // Aplicar transformacion directo al DOM para rendimiento
                    // Buscamos la imagen dentro del div ref
                    const img = item.firstChild as HTMLElement;
                    if (img) {
                        img.style.transform = `scale(${scale})`;
                    }
                });
            };

            updateRow(row1Ref);
            updateRow(row2Ref);

            animationFrameId = requestAnimationFrame(updateScales);
        };

        updateScales();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div ref={containerRef} className="w-full max-w-full overflow-hidden mb-20 relative">
            <div className="text-center mb-10">
                <span className="text-white/60 uppercase tracking-[0.5em] text-lg font-bold border-b border-white/20 pb-2">Bazar</span>
            </div>

            {/* Fila 1: Izquierda a Derecha (Slow 80s) */}
            <div className="relative flex overflow-x-hidden mb-8">
                <div className="py-8 animate-marquee whitespace-nowrap flex items-center gap-12">
                    {[...sponsors, ...sponsors].map((src, idx) => (
                        <div
                            key={`row1-${idx}`}
                            ref={(el) => { row1Ref.current[idx] = el; }}
                            className="w-24 h-24 md:w-32 md:h-32 inline-flex items-center justify-center grayscale transition-colors duration-300 hover:grayscale-0 flex-shrink-0"
                        >
                            <img src={src} alt="Patrocinador" className="w-full h-full object-contain opacity-100 will-change-transform transition-transform duration-75" />
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 py-8 animate-marquee2 whitespace-nowrap flex items-center gap-12">
                    {[...sponsors, ...sponsors].map((src, idx) => (
                        <div
                            key={`row1-dup-${idx}`}
                            // Nota: Los duplicados tambien necesitan refs para el efecto visual continuo
                            // Usamos un offset en el array para no sobreescribir los primeros
                            ref={(el) => { row1Ref.current[idx + sponsors.length * 2] = el; }}
                            className="w-24 h-24 md:w-32 md:h-32 inline-flex items-center justify-center grayscale transition-colors duration-300 hover:grayscale-0 flex-shrink-0"
                        >
                            <img src={src} alt="Patrocinador" className="w-full h-full object-contain opacity-100 will-change-transform transition-transform duration-75" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Fila 2: Derecha a Izquierda (Reverse Slow 80s) */}
            <div className="relative flex overflow-x-hidden">
                <div className="py-8 animate-marquee-reverse whitespace-nowrap flex items-center gap-12">
                    {[...sponsors, ...sponsors].map((src, idx) => (
                        <div
                            key={`row2-${idx}`}
                            ref={(el) => { row2Ref.current[idx] = el; }}
                            className="w-24 h-24 md:w-32 md:h-32 inline-flex items-center justify-center grayscale transition-colors duration-300 hover:grayscale-0 flex-shrink-0"
                        >
                            <img src={src} alt="Patrocinador" className="w-full h-full object-contain opacity-100 will-change-transform transition-transform duration-75" />
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 py-8 animate-marquee2-reverse whitespace-nowrap flex items-center gap-12">
                    {[...sponsors, ...sponsors].map((src, idx) => (
                        <div
                            key={`row2-dup-${idx}`}
                            ref={(el) => { row2Ref.current[idx + sponsors.length * 2] = el; }}
                            className="w-24 h-24 md:w-32 md:h-32 inline-flex items-center justify-center grayscale transition-colors duration-300 hover:grayscale-0 flex-shrink-0"
                        >
                            <img src={src} alt="Patrocinador" className="w-full h-full object-contain opacity-100 will-change-transform transition-transform duration-75" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-marquee { animation: marquee 80s linear infinite; }
                .animate-marquee2 { animation: marquee2 80s linear infinite; }
                .animate-marquee-reverse { animation: marquee-reverse 80s linear infinite; }
                .animate-marquee2-reverse { animation: marquee2-reverse 80s linear infinite; }

                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes marquee2 {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(0%); }
                }
                 @keyframes marquee-reverse {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                @keyframes marquee2-reverse {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(100%); }
                }
             `}</style>
        </div>
    );
};

// Componente Reproductor de Musica (Visible con Autoplay táctil)
const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playAudio = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            audio.volume = 0.5;
            await audio.play();
            setIsPlaying(true);
        } catch (error) {
            console.log("Autoplay blocked/failed", error);
            setIsPlaying(false);
        }
    };

    // Intentar reproducir al cargar, al primer clic y al primer toque (movil)
    useEffect(() => {
        // Intento 1: Autoplay directo
        playAudio();

        // Intento 2 y 3: Play en la primera interaccion (clic o toque)
        const handleInteraction = () => {
            if (!isPlaying && audioRef.current && audioRef.current.paused) {
                playAudio();
            }
        };

        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true }); // Para moviles

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-1000">
            <audio ref={audioRef} src="/kermesse_cumbres/avicii_levels.mp3" loop />
            <button
                onClick={togglePlay}
                className={`p-4 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all duration-300 transform hover:scale-110 ${isPlaying ? 'bg-green-500 text-white animate-pulse-slow' : 'bg-black/50 text-white/70 border border-white/20'}`}
                aria-label={isPlaying ? "Pausar Música" : "Reproducir Música"}
            >
                {isPlaying ? (
                    <div className="flex gap-1 h-4 items-end">
                        <div className="w-1 bg-white animate-[music-bar_0.5s_ease-in-out_infinite] h-2"></div>
                        <div className="w-1 bg-white animate-[music-bar_0.5s_ease-in-out_infinite_0.1s] h-4"></div>
                        <div className="w-1 bg-white animate-[music-bar_0.5s_ease-in-out_infinite_0.2s] h-3"></div>
                    </div>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2v20l17-10z" /></svg>
                )}
            </button>
            <style jsx>{`
                @keyframes music-bar {
                    0%, 100% { height: 50%; opacity: 0.8; }
                    50% { height: 100%; opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default function Home() {
    const [showMap, setShowMap] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center relative overflow-hidden text-white px-4 selection:bg-fuchsia-500 selection:text-white font-sans pb-20">

            {/* Reproductor de Musica */}
            <MusicPlayer />

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

                {/* HERO: COCO (El Cocodrilo) - PRIMERO - GIGANTE (+30%) */}
                <div className="relative w-full max-w-[580px] md:max-w-[750px] aspect-square flex items-center justify-center animate-float-slow z-20 pointer-events-none animate-in fade-in zoom-in duration-1000">

                    {/* WIREFRAME: Anillos detras del robot */}
                    <HoloRings />

                    {/* Un brillo detras del cocodrilo */}
                    <div className="absolute w-[60%] h-[60%] bg-green-500/30 rounded-full blur-[60px] -z-10 animate-pulse"></div>

                    <img
                        src="/kermesse_cumbres/coco_v2.webp"
                        alt="Mascota Cumbres"
                        className="w-full h-auto drop-shadow-[0_0_25px_rgba(57,255,20,0.5)] animate-pulse-slow object-contain filter brightness-110 contrast-110"
                    />
                </div>

                {/* TITULO CENTRAL (Imagen con Glow) - DESPUES - PEQUEÑO (-40%) */}
                <div className="relative w-full max-w-[360px] md:max-w-[450px] z-10 mb-8 -mt-8 flex flex-col items-center pointer-events-none animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 fill-mode-backwards">
                    <img
                        src="/kermesse_cumbres/main_title.webp"
                        alt="Kermesse Cumbres 2026"
                        className="w-full h-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] filter brightness-110"
                    />
                </div>

                {/* DIVIDER: NEON SEPARATOR */}
                <div className="w-full max-w-[200px] h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-12 opacity-70 shadow-[0_0_10px_#22d3ee] animate-in zoom-in duration-700 delay-500 fill-mode-backwards"></div>

                {/* SECCION 1A: ACTIVIDADES (Neon Grid con Scroll Reveal) - AHORA PRIMERO */}
                <div className="w-full z-30 mb-12">
                    <NeonServicesGrid />
                </div>

                {/* SECCION 1B: COUNTDOWN - AHORA SEGUNDO */}
                <div className="flex flex-col items-center z-30 mb-8 w-full animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-backwards">
                    <p className="text-cyan-300 uppercase tracking-[0.4em] text-[10px] md:text-sm font-bold mb-6 text-center">
                        La diversión comienza en
                    </p>
                    <CountdownTimer />
                </div>

                {/* SECCION DE PRECIOS */}
                <div className="w-full max-w-lg z-30 mb-20 flex flex-col gap-8 items-center animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-1100 fill-mode-backwards">

                    {/* TARJETA 1: BRAZALETE MAGICO (Premium) */}
                    <div className="relative group cursor-default w-full">
                        {/* Glow Background */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                        <div className="relative bg-black/80 backdrop-blur-xl border border-yellow-500/50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center overflow-hidden">
                            {/* Shine Effect */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>

                            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 text-3xl md:text-4xl font-black uppercase tracking-widest mb-2 drop-shadow-sm">
                                Brazalete Mágico
                            </h3>

                            <div className="my-2 relative">
                                <span className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]">
                                    $500
                                </span>
                                <div className="absolute -right-8 -top-4 rotate-12 bg-red-600 border border-red-400 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                                    VIP
                                </div>
                            </div>

                            <p className="text-xs text-yellow-100/70 mb-2 italic">
                                Preventa (hasta el 12 de febrero)<br />
                                <span className="line-through decoration-red-500/70 opacity-70">Precio regular $600</span>
                            </p>

                            <p className="text-yellow-200/90 text-sm md:text-base font-medium tracking-wide border-t border-yellow-500/20 pt-4 w-full mt-2">
                                Incluye entrada y acceso a<br />
                                <span className="font-bold text-white uppercase">TODOS los juegos</span>
                            </p>

                            {/* IMAGEN DEL BRAZALETE */}
                            <div className="mt-6 w-48 md:w-56 animate-float-slow">
                                <img
                                    src="/kermesse_cumbres/brazalete.webp"
                                    alt="Brazalete Mágico"
                                    className="w-full h-auto drop-shadow-[0_0_20px_rgba(234,179,8,0.6)] filter brightness-110 contrast-110"
                                />
                            </div>
                        </div>
                    </div>

                    {/* TARJETA 2: ENTRADA GENERAL (Secundaria) */}
                    <div className="relative group cursor-default w-full max-w-sm">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="text-left">
                                <h4 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">Entrada General</h4>
                                <p className="text-xs text-white/50 mt-1">Acceso al evento</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-white">$150</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* SECCION DE PATROCINADORES */}
                <SponsorsMarquee />

                {/* SECCION 2: INFO CARDS (Fecha, Hora, Mapa) */}
                <div className="relative z-30 flex flex-col md:flex-row gap-8 items-stretch md:items-center bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-full max-w-4xl justify-center hover:bg-white/10 transition-all duration-500 group mx-auto animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-1200 fill-mode-backwards">

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
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
                <span>Cumbres International School © 2026</span>
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
