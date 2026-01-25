"use client";

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';

export default function WeddingInvitation() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

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
        reveal(); // Trigger once on load
        return () => window.removeEventListener("scroll", reveal);
    }, []);

    // Countdown Logic
    useEffect(() => {
        // Set date 48 days from now as per demo logic, or fixed date
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
            <Script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" strategy="beforeInteractive" />
            <Script id="tailwind-config" strategy="beforeInteractive">
                {`
          tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                colors: {
                  "primary": "#c5a059",
                  "accent": "#e5e7eb",
                  "background-dark": "#0a1128",
                  "burgundy": "#4a0404",
                },
                fontFamily: {
                  "display": ["Cinzel", "serif"],
                  "serif": ["Playfair Display", "serif"],
                  "body": ["Cormorant Garamond", "serif"]
                },
              },
            },
          }
        `}
            </Script>

            {/* Font Links manually injected here or via next/font */}
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;400;600&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <style jsx global>{`
        /* Custom Styles applied via styled-jsx to ensure they invoke after tailwind processing or work alongside */
        .ornamental-border {
            border: 1px solid rgba(197, 160, 89, 0.4);
            outline: 4px solid transparent;
            outline-offset: -8px;
            border-image: none;
        }
        .classic-frame {
            border: 2px solid #c5a059;
            padding: 2px;
            position: relative;
        }
        .classic-frame::after {
            content: '';
            position: absolute;
            inset: 8px;
            border: 1px solid rgba(197, 160, 89, 0.3);
            pointer-events: none;
        }
        .hero-gradient {
            background: linear-gradient(to bottom, rgba(10, 17, 40, 0.3) 0%, rgba(10, 17, 40, 0.8) 50%, rgba(10, 17, 40, 1) 100%);
        }
        
        html { scroll-behavior: smooth; }

        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 1s ease-out;
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Force Tailwind classes application if needed, but CDN should handle classes in markup */
        body {
            background-color: #0a1128; /* Fallback */
            color: #e5e7eb;
        }
      `}</style>

            {/* Page Content Wrapper to simulate body class */}
            <div className="bg-background-dark text-accent font-body min-h-[100dvh] overflow-x-hidden selection:bg-primary/30">

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-background-dark/80 backdrop-blur-md border-b border-primary/10 transition-all duration-300" id="navbar">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
                        <span className="text-[10px] tracking-[0.4em] uppercase font-display text-primary">M &amp; E</span>
                    </div>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`size-10 flex items-center justify-center border border-primary/40 rounded-full hover:bg-primary/10 active:scale-95 transition-all group ${isPlaying ? 'bg-primary/20' : ''}`}
                    >
                        <span className="material-symbols-outlined text-primary group-hover:animate-pulse" style={{ fontSize: '18px' }}>
                            {isPlaying ? 'volume_up' : 'music_note'}
                        </span>
                    </button>
                </nav>

                {/* Header / Hero */}
                <header className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 text-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 hero-gradient z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop"
                            alt="Wedding Background"
                            className="w-full h-full object-cover opacity-50 animate-[pulse_10s_ease-in-out_infinite]"
                        />
                    </div>

                    <div className="relative z-20 space-y-8 w-full max-w-sm reveal active">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-[1px] bg-primary mb-6"></div>
                            <p className="text-primary tracking-[0.6em] text-[10px] uppercase font-display mb-8">The Wedding of</p>
                            <h1 className="text-5xl md:text-7xl font-display text-primary leading-tight mb-2 tracking-wide">MATEO</h1>
                            <span className="text-3xl font-serif italic text-accent/60 my-4">&amp;</span>
                            <h1 className="text-5xl md:text-7xl font-display text-primary leading-tight tracking-wide">ELENA</h1>
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
                        <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-accent relative z-10">
                            En un rincón del alma, el amor encontró su hogar eterno.
                        </p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-primary/20 text-6xl font-serif rotate-180">“</div>
                    </div>
                </section>

                {/* Countdown Section */}
                <section className="py-16 px-6 relative">
                    <div className="border border-primary/30 p-8 max-w-2xl mx-auto bg-background-dark/50 backdrop-blur-sm relative z-10 reveal">
                        <h3 className="text-center text-[10px] tracking-[0.5em] uppercase font-display text-primary mb-10">Cuenta Regresiva</h3>
                        <div className="grid grid-cols-3 gap-4" id="countdown">
                            <div className="text-center border-r border-primary/20">
                                <p className="text-3xl md:text-4xl font-serif text-primary" id="days">
                                    {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                                </p>
                                <p className="text-[9px] uppercase tracking-widest text-accent/50 mt-2">Días</p>
                            </div>
                            <div className="text-center border-r border-primary/20">
                                <p className="text-3xl md:text-4xl font-serif text-primary" id="hours">
                                    {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                                </p>
                                <p className="text-[9px] uppercase tracking-widest text-accent/50 mt-2">Horas</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-serif text-primary" id="minutes">
                                    {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
                                </p>
                                <p className="text-[9px] uppercase tracking-widest text-accent/50 mt-2">Minutos</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Details Section */}
                <section className="py-20 px-6 space-y-32 max-w-4xl mx-auto">

                    {/* Ceremony */}
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
                                <p className="flex items-center justify-center md:justify-start gap-2">
                                    <span className="material-symbols-outlined text-primary/60 text-base">calendar_month</span>
                                    Sábado, 14 de Septiembre
                                </p>
                                <p className="flex items-center justify-center md:justify-start gap-2">
                                    <span className="material-symbols-outlined text-primary/60 text-base">schedule</span>
                                    Ocho de la Noche
                                </p>
                                <p className="flex items-center justify-center md:justify-start gap-2">
                                    <span className="material-symbols-outlined text-primary/60 text-base">location_city</span>
                                    Ciudad de México
                                </p>
                            </div>

                            <div className="pt-4 flex justify-center md:justify-start">
                                <button className="group flex items-center gap-3 border border-primary/60 px-8 py-3 text-[10px] tracking-[0.3em] uppercase font-display text-primary hover:bg-primary hover:text-background-dark transition-all duration-300">
                                    <span className="material-symbols-outlined text-sm group-hover:animate-bounce">location_on</span>
                                    Ubicar Sede
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Reception / Location Visual */}
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] border border-primary/20 overflow-hidden group reveal">
                        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop" alt="Reception" className="w-full h-full object-cover grayscale contrast-125 opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-background-dark/40 group-hover:bg-background-dark/20 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-background-dark/80 backdrop-blur-sm border border-primary/40 p-8 text-center transform group-hover:-translate-y-2 transition-transform duration-500">
                                <p className="font-display text-[10px] tracking-widest text-primary mb-3 uppercase">Recepción</p>
                                <p className="font-serif text-2xl md:text-3xl">Lomas de Chapultepec</p>
                            </div>
                        </div>
                    </div>

                    {/* Dress Code */}
                    <div className="flex flex-col items-center text-center space-y-6 reveal">
                        <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-2">
                            <span className="material-symbols-outlined text-primary text-3xl">apparel</span>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-primary text-[10px] tracking-[0.4em] uppercase font-display">Código de Vestimenta</h4>
                            <p className="text-3xl md:text-4xl font-serif text-accent uppercase tracking-tighter">Rigurosa Etiqueta</p>
                        </div>
                        <p className="font-body text-lg italic text-accent/70 max-w-md mx-auto leading-relaxed">
                            Agradecemos su asistencia portando traje formal oscuro o smoking para caballeros, y vestido largo para damas.
                        </p>
                    </div>

                </section>

                {/* RSVP Section */}
                <section className="py-24 px-6 border-y border-primary/20 bg-white/[0.03]">
                    <div className="text-center max-w-md mx-auto space-y-10 reveal">
                        <div className="inline-block p-4 border border-primary/40 rotate-45 mb-4">
                            <div className="-rotate-45">
                                <span className="material-symbols-outlined text-primary text-4xl">mail_outline</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-display text-primary uppercase tracking-tight">R.S.V.P.</h2>
                            <div className="h-px w-20 bg-primary/40 mx-auto"></div>
                            <p className="font-serif italic text-accent/80 text-lg">Favor de confirmar su grata compañía antes del día 15 de Agosto.</p>
                        </div>

                        <div className="space-y-4 pt-4 flex flex-col gap-4">
                            <button onClick={toggleModal} className="w-full bg-primary text-background-dark font-display text-[11px] tracking-[0.3em] py-5 uppercase font-bold hover:bg-white hover:text-background-dark transition-all duration-300 shadow-[0_0_20px_rgba(197,160,89,0.2)] hover:shadow-[0_0_30px_rgba(197,160,89,0.4)]">
                                Confirmar Asistencia
                            </button>
                            <button onClick={() => alert('Funcionalidad de mesa de regalos próximamente.')} className="w-full bg-transparent border border-primary/50 text-primary font-display text-[11px] tracking-[0.3em] py-5 uppercase font-bold hover:bg-primary/10 transition-all duration-300">
                                Mesa de Regalos
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-24 px-6 text-center bg-background-dark border-t border-primary/10">
                    <div className="mb-16">
                        <p className="text-primary tracking-[0.8em] text-[10px] uppercase font-display mb-10 opacity-70">#MateoyElena2024</p>
                        <div className="flex justify-center gap-12">
                            <a href="#" className="group flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">camera_alt</span>
                                <span className="text-[8px] uppercase tracking-widest text-primary/0 group-hover:text-primary/40 transition-all -translate-y-2 group-hover:translate-y-0">Fotos</span>
                            </a>
                            <a href="#" className="group flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">auto_awesome</span>
                                <span className="text-[8px] uppercase tracking-widest text-primary/0 group-hover:text-primary/40 transition-all -translate-y-2 group-hover:translate-y-0">Magia</span>
                            </a>
                            <a href="#" className="group flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">favorite</span>
                                <span className="text-[8px] uppercase tracking-widest text-primary/0 group-hover:text-primary/40 transition-all -translate-y-2 group-hover:translate-y-0">Amor</span>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="h-px w-16 bg-primary/20 mx-auto"></div>
                        <p className="text-[9px] font-display text-primary/30 uppercase tracking-[0.3em]">
                            Una Celebración de Amor Eterno &copy; 2024
                        </p>
                    </div>
                </footer>

                {/* RSVP Modal */}
                {isModalOpen && (
                    <div id="rsvp-modal" className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-sm" onClick={toggleModal}></div>
                        <div className="relative bg-background-dark border border-primary/40 p-8 md:p-12 max-w-lg w-full shadow-2xl">
                            <button className="absolute top-4 right-4 text-primary/50 hover:text-primary" onClick={toggleModal}>
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="text-center mb-8">
                                <h3 className="font-display text-primary text-2xl uppercase tracking-widest mb-2">Confirmar</h3>
                                <p className="font-serif text-accent/60 italic">Nos encantaría verte ahí</p>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por confirmar! Nos vemos pronto.'); toggleModal(); }}>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-primary/70 mb-2">Nombre Completo</label>
                                    <input type="text" className="w-full bg-white/5 border border-primary/30 text-accent p-3 focus:outline-none focus:border-primary transition-colors font-serif" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-primary/70 mb-2">Número de Asistentes</label>
                                    <select className="w-full bg-white/5 border border-primary/30 text-accent p-3 focus:outline-none focus:border-primary transition-colors font-serif">
                                        <option className="bg-background-dark">1 Persona</option>
                                        <option className="bg-background-dark">2 Personas</option>
                                        <option className="bg-background-dark">3 Personas</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-primary text-background-dark font-display text-[11px] tracking-[0.3em] py-4 uppercase font-bold hover:brightness-110 transition-all mt-4">
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
