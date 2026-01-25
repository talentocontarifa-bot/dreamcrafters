"use client";

import { useState, useEffect } from 'react';

// Theme Definitions for Fail-Safe Switching
const themes = {
    midnight: {
        '--inv-bg': '#1B1F3B',
        '--inv-primary': '#D4AF37',
        '--inv-accent': '#F5F5DC',
        '--inv-text': '#e0e0e0',
    },
    botanical: {
        '--inv-bg': '#FAF9F6',
        '--inv-primary': '#8A9A5B',
        '--inv-accent': '#DCAE96',
        '--inv-text': '#5F7161',
    },
    modern: {
        '--inv-bg': '#121212',
        '--inv-primary': '#E2725B',
        '--inv-accent': '#FFFFFF',
        '--inv-text': '#D3D3D3',
    }
};

export default function WeddingInvitation() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
    const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('midnight');

    // Scroll Reveal Animation
    useEffect(() => {
        const reveal = () => {
            const reveals = document.querySelectorAll(".reveal");
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                }
            }
        };
        window.addEventListener("scroll", reveal);
        reveal();
        return () => window.removeEventListener("scroll", reveal);
    }, []);

    // Countdown Logic
    useEffect(() => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 48);
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = futureDate.getTime() - now;
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft({ days: d, hours: h, minutes: m });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
            {/* Force load fonts directly */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;400;600&family=Fleur+De+Leah&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <style jsx global>{`
                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px;
                    display: inline-block;
                    line-height: 1;
                    text-transform: none;
                    letter-spacing: normal;
                    word-wrap: normal;
                    white-space: nowrap;
                    direction: ltr;
                }
                .font-names { font-family: 'Fleur De Leah', cursive; }
                .font-display { font-family: 'Cinzel', serif; }
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-body { font-family: 'Cormorant Garamond', serif; }

                .ornamental-border {
                    border: 1px solid rgba(197, 160, 89, 0.4);
                    outline: 4px solid transparent;
                    outline-offset: -8px;
                    border-image: none;
                }
                .classic-frame {
                    border: 2px solid var(--inv-primary);
                    padding: 2px;
                    position: relative;
                }
                .classic-frame::after {
                    content: '';
                    position: absolute;
                    inset: 8px;
                    border: 1px solid var(--inv-primary);
                    opacity: 0.3;
                    pointer-events: none;
                }
                /* Use CSS Variables directly */
                .theme-wrapper {
                    background-color: var(--inv-bg);
                    color: var(--inv-text);
                }
                .text-primary { color: var(--inv-primary) !important; }
                .border-primary { border-color: var(--inv-primary) !important; }
                .bg-primary { background-color: var(--inv-primary) !important; }
                
                .text-accent { color: var(--inv-accent) !important; }
                
                html { scroll-behavior: smooth; }
                .reveal { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; }
                .reveal.active { opacity: 1; transform: translateY(0); }
            `}</style>

            {/* Page Wrapper with Dynamic inline styles for 100% reliability */}
            <div
                className="theme-wrapper font-body min-h-[100dvh] overflow-x-hidden selection:bg-purple-500/30 transition-colors duration-700"
                style={themes[currentTheme] as React.CSSProperties}
            >

                {/* Theme Selector Widget */}
                <div className="fixed top-1/2 right-4 z-[60] flex flex-col gap-3 -translate-y-1/2 bg-black/20 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-2xl">
                    <button
                        onClick={() => setCurrentTheme('midnight')}
                        className={`w-6 h-6 rounded-full bg-[#1B1F3B] border-2 transition-all ${currentTheme === 'midnight' ? 'border-[#D4AF37] scale-125 ring-2 ring-white/50' : 'border-transparent hover:scale-110'}`}
                        title="Midnight Classic"
                    />
                    <button
                        onClick={() => setCurrentTheme('botanical')}
                        className={`w-6 h-6 rounded-full bg-[#8A9A5B] border-2 transition-all ${currentTheme === 'botanical' ? 'border-[#DCAE96] scale-125 ring-2 ring-white/50' : 'border-transparent hover:scale-110'}`}
                        title="Botanical Fresh"
                    />
                    <button
                        onClick={() => setCurrentTheme('modern')}
                        className={`w-6 h-6 rounded-full bg-[#E2725B] border-2 transition-all ${currentTheme === 'modern' ? 'border-white scale-125 ring-2 ring-white/50' : 'border-transparent hover:scale-110'}`}
                        title="Modern Minimal"
                    />
                </div>

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-black/10 backdrop-blur-md border-b border-white/5 transition-all duration-300" id="navbar">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-2xl">volunteer_activism</span>
                        <span className="text-[12px] tracking-[0.4em] uppercase font-display text-primary font-bold">M &amp; E</span>
                    </div>
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`size-10 flex items-center justify-center border border-primary/40 rounded-full hover:bg-white/10 active:scale-95 transition-all group ${isPlaying ? 'bg-primary/20' : ''}`}>
                        <span className="material-symbols-outlined text-primary group-hover:animate-pulse" style={{ fontSize: '20px' }}>{isPlaying ? 'volume_up' : 'music_note'}</span>
                    </button>
                </nav>

                {/* Hero */}
                <header className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 text-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-black/40 z-10"></div>
                        <img
                            src="/landing/boda_fondo.webp"
                            onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop"}
                            alt="Wedding Background"
                            className="w-full h-full object-cover animate-[pulse_10s_ease-in-out_infinite]"
                        />
                    </div>

                    <div className="relative z-20 space-y-8 w-full max-w-sm reveal active">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-[1px] bg-primary mb-6"></div>
                            <p className="text-primary tracking-[0.6em] text-[10px] uppercase font-display mb-8">The Wedding of</p>

                            {/* Updated Font for Names */}
                            <h1 className="text-6xl md:text-8xl font-names text-primary leading-tight mb-2 tracking-wide block">Mateo</h1>
                            <span className="text-3xl font-serif italic text-accent/60 my-4">&amp;</span>
                            <h1 className="text-6xl md:text-8xl font-names text-primary leading-tight tracking-wide block">Elena</h1>
                        </div>

                        <div className="w-full flex justify-center items-center gap-4 py-6">
                            <div className="h-[1px] flex-1 bg-primary/30"></div>
                            <p className="text-sm font-serif italic tracking-widest text-accent uppercase">Septiembre 14, 2024</p>
                            <div className="h-[1px] flex-1 bg-primary/30"></div>
                        </div>

                        <p className="text-xl font-body italic opacity-80 leading-relaxed max-w-[300px] mx-auto text-accent/90">
                            Nos complace invitarles a la celebración de nuestra unión matrimonial.
                        </p>

                        <div className="pt-8">
                            <span className="material-symbols-outlined text-primary/50 animate-bounce text-2xl">keyboard_arrow_down</span>
                        </div>
                    </div>
                </header>

                {/* Quote Section */}
                <section className="py-24 px-8 text-center bg-white/[0.02] border-y border-primary/10">
                    <div className="max-w-md mx-auto relative py-12 px-6 reveal">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-primary/20 text-6xl font-serif">“</div>
                        <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-accent relative z-10">En un rincón del alma, el amor encontró su hogar eterno.</p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-primary/20 text-6xl font-serif rotate-180">“</div>
                    </div>
                </section>

                {/* Countdown */}
                <section className="py-16 px-6 relative">
                    <div className="border border-primary/30 p-8 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm relative z-10 reveal">
                        <h3 className="text-center text-[10px] tracking-[0.5em] uppercase font-display text-primary mb-10">Cuenta Regresiva</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center border-r border-primary/20">
                                <p className="text-3xl md:text-4xl font-serif text-primary">{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</p>
                                <p className="text-[9px] uppercase tracking-widest text-accent/50 mt-2">Días</p>
                            </div>
                            <div className="text-center border-r border-primary/20">
                                <p className="text-3xl md:text-4xl font-serif text-primary">{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</p>
                                <p className="text-[9px] uppercase tracking-widest text-accent/50 mt-2">Horas</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-serif text-primary">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</p>
                                <p className="text-[9px] uppercase tracking-widest text-accent/50 mt-2">Minutos</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Details */}
                <section className="py-20 px-6 space-y-32 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left reveal">
                        <div className="classic-frame w-72 h-96 md:w-80 md:h-[28rem] shrink-0 transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
                            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" alt="Ceremonia" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="space-y-6 flex-1">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="material-symbols-outlined text-primary text-3xl mb-4">church</span>
                                <h4 className="text-primary text-[10px] tracking-[0.4em] uppercase font-display mb-2">La Ceremonia</h4>
                                <div className="h-px w-12 bg-primary/40 mb-6"></div>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-serif text-accent uppercase tracking-tight">Jardín de Luces</h3>
                            <div className="font-body text-lg space-y-2 text-accent/80 italic">
                                <p className="flex items-center justify-center md:justify-start gap-2">Sábado, 14 de Septiembre</p>
                                <p className="flex items-center justify-center md:justify-start gap-2">Ocho de la Noche</p>
                                <p className="flex items-center justify-center md:justify-start gap-2">Ciudad de México</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Color Palette Section */}
                <section className="py-20 px-6 bg-primary/5">
                    <div className="max-w-4xl mx-auto text-center reveal">
                        <h4 className="text-primary text-[10px] tracking-[0.4em] uppercase font-display mb-10">Paleta de Color</h4>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-20 h-20 rounded-full shadow-xl border-4 border-white/10" style={{ backgroundColor: 'var(--inv-bg)' }}></div>
                                <span className="text-[10px] uppercase tracking-widest text-accent">Fondo</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-20 h-20 rounded-full shadow-xl border-4 border-white/10" style={{ backgroundColor: 'var(--inv-primary)' }}></div>
                                <span className="text-[10px] uppercase tracking-widest text-accent">Principal</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-20 h-20 rounded-full shadow-xl border-4 border-white/10" style={{ backgroundColor: 'var(--inv-accent)' }}></div>
                                <span className="text-[10px] uppercase tracking-widest text-accent">Acento</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto reveal">
                        <h4 className="text-center text-primary text-[10px] tracking-[0.4em] uppercase font-display mb-16">Nuestra Historia</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="aspect-[3/4] overflow-hidden classic-frame group">
                                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" alt="Momento 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                            </div>
                            <div className="aspect-[3/4] overflow-hidden classic-frame group lg:translate-y-12">
                                <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop" alt="Momento 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                            </div>
                            <div className="aspect-[3/4] overflow-hidden classic-frame group">
                                <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop" alt="Momento 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-24 px-6 text-center border-t border-primary/10" style={{ backgroundColor: 'var(--inv-bg)' }}>
                    <div className="mb-16">
                        <p className="text-primary tracking-[0.8em] text-[10px] uppercase font-display mb-10 opacity-70">#MateoyElena2024</p>
                    </div>
                    <p className="text-sm text-accent/50">Diseñado con ❤️ por DreamCrafters</p>
                </footer>

                {/* RSVP Modal */}
                {isModalOpen && (
                    <div id="rsvp-modal" className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={toggleModal}></div>
                        <div className="relative bg-[#1B1F3B] border border-primary/40 p-8 md:p-12 max-w-lg w-full shadow-2xl" style={{ backgroundColor: 'var(--inv-bg)' }}>
                            <button className="absolute top-4 right-4 text-primary/50 hover:text-primary" onClick={toggleModal}>
                                <span className="material-symbols-outlined w-6 h-6">close</span>
                            </button>
                            <h3 className="font-display text-primary text-2xl uppercase tracking-widest mb-2 text-center">Confirmar</h3>
                            <p className="font-serif text-accent/60 italic text-center mb-8">Nos encantaría verte ahí</p>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por confirmar! Nos vemos pronto.'); toggleModal(); }}>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-primary/70 mb-2">Nombre Completo</label>
                                    <input type="text" className="w-full bg-white/5 border border-primary/30 text-accent p-3 focus:outline-none focus:border-primary transition-colors font-serif" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-primary/70 mb-2">Número de Asistentes</label>
                                    <select className="w-full bg-white/5 border border-primary/30 text-accent p-3 focus:outline-none focus:border-primary transition-colors font-serif">
                                        <option className="bg-black">1 Persona</option>
                                        <option className="bg-black">2 Personas</option>
                                        <option className="bg-black">3 Personas</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-primary text-[#1B1F3B] font-display text-[11px] tracking-[0.3em] py-4 uppercase font-bold hover:brightness-110 transition-all mt-4">
                                    Enviar Confirmación
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
