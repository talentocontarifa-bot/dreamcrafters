"use client";

import { useState, useEffect } from 'react';

export default function WeddingInvitation() {
    const [isPlaying, setIsPlaying] = useState(false);

    // Modal States
    const [isCongratsModalOpen, setIsCongratsModalOpen] = useState(false);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);

    // Countdown State
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

    const handleWhatsAppRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        const input = (document.getElementById('clientName') as HTMLInputElement)?.value;
        if (input) {
            window.open(`https://wa.me/529845828658?text=${encodeURIComponent(`Hola, soy ${input} y me gustaría una invitación digital como esta.`)}`, '_blank');
        }
    };

    return (
        <>
            {/* Fonts */}
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

                /* Midnight Theme Hardcoded */
                :root {
                    --inv-bg: #1B1F3B;
                    --inv-primary: #D4AF37;
                    --inv-accent: #F5F5DC;
                    --inv-text: #e0e0e0;
                }

                .classic-btn {
                    background-color: transparent;
                    border: 1px solid var(--inv-primary);
                    color: var(--inv-primary);
                    font-family: 'Cinzel', serif;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-size: 11px;
                    padding: 12px 24px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .classic-btn:hover {
                    background-color: var(--inv-primary);
                    color: var(--inv-bg);
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
                }

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
                
                html { scroll-behavior: smooth; }
                .reveal { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; }
                .reveal.active { opacity: 1; transform: translateY(0); }
            `}</style>

            <div className="bg-[#1B1F3B] text-[#e0e0e0] font-body min-h-[100dvh] overflow-x-hidden selection:bg-[#D4AF37]/30">

                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-[#1B1F3B]/90 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-300" id="navbar">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#D4AF37] text-2xl">volunteer_activism</span>
                        <span className="text-[12px] tracking-[0.4em] uppercase font-display text-[#D4AF37] font-bold">M &amp; E</span>
                    </div>
                    <button onClick={() => setIsPlaying(!isPlaying)} className={`size-10 flex items-center justify-center border border-[#D4AF37]/40 rounded-full hover:bg-white/10 active:scale-95 transition-all group ${isPlaying ? 'bg-[#D4AF37]/20' : ''}`}>
                        <span className="material-symbols-outlined text-[#D4AF37] group-hover:animate-pulse" style={{ fontSize: '20px' }}>{isPlaying ? 'volume_up' : 'music_note'}</span>
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
                            <div className="w-12 h-[1px] bg-[#D4AF37] mb-6"></div>
                            <p className="text-[#D4AF37] tracking-[0.6em] text-[10px] uppercase font-display mb-8">The Wedding of</p>
                            <h1 className="text-6xl md:text-8xl font-names text-[#D4AF37] leading-tight mb-2 tracking-wide block">Mateo</h1>
                            <span className="text-3xl font-serif italic text-white/50 my-4">&amp;</span>
                            <h1 className="text-6xl md:text-8xl font-names text-[#D4AF37] leading-tight tracking-wide block">Elena</h1>
                        </div>

                        <div className="w-full flex justify-center items-center gap-4 py-6">
                            <div className="h-[1px] flex-1 bg-[#D4AF37]/30"></div>
                            <p className="text-sm font-serif italic tracking-widest text-[#F5F5DC] uppercase">Septiembre 14, 2024</p>
                            <div className="h-[1px] flex-1 bg-[#D4AF37]/30"></div>
                        </div>

                        <p className="text-xl font-body italic opacity-80 leading-relaxed max-w-[300px] mx-auto text-[#F5F5DC]/90">
                            Nos complace invitarles a la celebración de nuestra unión matrimonial.
                        </p>

                        <div className="pt-8">
                            <span className="material-symbols-outlined text-[#D4AF37]/50 animate-bounce text-2xl">keyboard_arrow_down</span>
                        </div>
                    </div>
                </header>

                {/* Quote Section & Congratulation Button */}
                <section className="py-24 px-8 text-center bg-white/[0.02] border-y border-[#D4AF37]/10">
                    <div className="max-w-md mx-auto relative py-12 px-6 reveal">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[#D4AF37]/20 text-6xl font-serif">“</div>
                        <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#F5F5DC] relative z-10">En un rincón del alma, el amor encontró su hogar eterno.</p>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#D4AF37]/20 text-6xl font-serif rotate-180">“</div>
                    </div>
                    <div className="reveal pt-6">
                        <button onClick={() => setIsCongratsModalOpen(true)} className="classic-btn">
                            Enviar Felicitación a los Novios
                        </button>
                    </div>
                </section>

                {/* Countdown */}
                <section className="py-16 px-6 relative">
                    <div className="border border-[#D4AF37]/30 p-8 max-w-2xl mx-auto bg-black/20 backdrop-blur-sm relative z-10 reveal">
                        <h3 className="text-center text-[10px] tracking-[0.5em] uppercase font-display text-[#D4AF37] mb-10">Cuenta Regresiva</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center border-r border-[#D4AF37]/20">
                                <p className="text-3xl md:text-4xl font-serif text-[#D4AF37]">{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</p>
                                <p className="text-[9px] uppercase tracking-widest text-white/50 mt-2">Días</p>
                            </div>
                            <div className="text-center border-r border-[#D4AF37]/20">
                                <p className="text-3xl md:text-4xl font-serif text-[#D4AF37]">{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</p>
                                <p className="text-[9px] uppercase tracking-widest text-white/50 mt-2">Horas</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl md:text-4xl font-serif text-[#D4AF37]">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</p>
                                <p className="text-[9px] uppercase tracking-widest text-white/50 mt-2">Minutos</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Details */}
                <section className="py-20 px-6 space-y-32 max-w-4xl mx-auto">
                    {/* Ceremony */}
                    <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left reveal">
                        <div className="classic-frame w-72 h-96 md:w-80 md:h-[28rem] shrink-0 transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
                            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" alt="Ceremonia" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="space-y-6 flex-1">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="material-symbols-outlined text-[#D4AF37] text-3xl mb-4">church</span>
                                <h4 className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-display mb-2">La Ceremonia</h4>
                                <div className="h-px w-12 bg-[#D4AF37]/40 mb-6"></div>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-serif text-[#F5F5DC] uppercase tracking-tight">Jardín de Luces</h3>
                            <div className="font-body text-lg space-y-2 text-[#F5F5DC]/80 italic">
                                <p className="flex items-center justify-center md:justify-start gap-2">Sábado, 14 de Septiembre</p>
                                <p className="flex items-center justify-center md:justify-start gap-2">20:00 HRS</p>
                                <p className="flex items-center justify-center md:justify-start gap-2">Ciudad de México</p>
                            </div>
                            <div className="pt-6 flex justify-center md:justify-start">
                                <button onClick={() => setIsMapModalOpen(true)} className="classic-btn flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">map</span> Ver Mapa
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* New RSVP CTA Section */}
                    <div className="text-center reveal py-10 bg-[#D4AF37]/5 border border-[#D4AF37]/20 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1B1F3B] px-4">
                            <span className="material-symbols-outlined text-[#D4AF37] text-3xl">mark_email_unread</span>
                        </div>
                        <h4 className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-display mt-4 mb-6">Tu presencia es importante</h4>
                        <button onClick={() => setIsRsvpModalOpen(true)} className="classic-btn text-lg py-4 px-10">
                            Confirmar Asistencia
                        </button>
                    </div>

                    {/* Reception / Location Visual */}
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] border border-[#D4AF37]/20 overflow-hidden group reveal">
                        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop" alt="Reception" className="w-full h-full object-cover grayscale contrast-125 opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/80 backdrop-blur-sm border border-[#D4AF37]/40 p-8 text-center transform group-hover:-translate-y-2 transition-transform duration-500">
                                <p className="font-display text-[10px] tracking-widest text-[#D4AF37] mb-3 uppercase">Recepción</p>
                                <p className="font-serif text-2xl md:text-3xl">Lomas de Chapultepec</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto reveal">
                        <h4 className="text-center text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-display mb-16">Nuestra Historia</h4>
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

                {/* "I Want Mine" CTA Section */}
                <section className="py-20 px-6 bg-gradient-to-t from-black to-[#1B1F3B]">
                    <div className="max-w-lg mx-auto text-center reveal border border-[#D4AF37]/30 p-10 bg-black/50 backdrop-blur-md">
                        <div className="flex justify-center mb-6">
                            <span className="material-symbols-outlined text-[#D4AF37] text-4xl animate-pulse">diamond</span>
                        </div>
                        <h3 className="text-2xl font-display text-[#D4AF37] mb-4">¿Te gustaría una invitación así?</h3>
                        <p className="font-serif italic text-white/60 mb-8">Personaliza cada detalle para tu evento soñado.</p>
                        <form onSubmit={handleWhatsAppRedirect} className="flex flex-col gap-4">
                            <input
                                id="clientName"
                                type="text"
                                placeholder="Tu Nombre"
                                className="bg-transparent border-b border-[#D4AF37]/50 p-2 text-center text-[#F5F5DC] focus:outline-none focus:border-[#D4AF37] transition-all font-serif placeholder:text-white/20"
                                required
                            />
                            <button type="submit" className="bg-[#D4AF37] text-[#1B1F3B] font-display text-sm tracking-[0.2em] py-4 uppercase font-bold hover:bg-white transition-all duration-300">
                                Quiero la mía
                            </button>
                        </form>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-24 px-6 text-center border-t border-[#D4AF37]/10 bg-[#1B1F3B]">
                    <div className="mb-16">
                        <p className="text-[#D4AF37] tracking-[0.8em] text-[10px] uppercase font-display mb-10 opacity-70">#MateoyElena2024</p>
                    </div>
                    <p className="text-sm text-white/50">Diseñado con ❤️ por DreamCrafters</p>
                </footer>

                {/* --- MODALS --- */}

                {/* Congrats Modal */}
                {isCongratsModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsCongratsModalOpen(false)}></div>
                        <div className="relative bg-[#1B1F3B] border border-[#D4AF37] p-8 md:p-12 max-w-lg w-full shadow-[0_0_50px_rgba(212,175,55,0.2)] animate-in zoom-in-95 duration-300">
                            <button className="absolute top-4 right-4 text-[#D4AF37]/50 hover:text-[#D4AF37]" onClick={() => setIsCongratsModalOpen(false)}>
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                            <div className="text-center">
                                <span className="material-symbols-outlined text-[#D4AF37] text-4xl mb-6">format_quote</span>
                                <h3 className="font-serif italic text-2xl text-[#F5F5DC] mb-2 leading-relaxed">
                                    "Aquí podrás mandarle un mensaje de felicitación a los novios"
                                </h3>
                                <div className="h-px w-20 bg-[#D4AF37]/30 mx-auto mt-6"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Map Modal */}
                {isMapModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsMapModalOpen(false)}></div>
                        <div className="relative bg-[#1B1F3B] border border-[#D4AF37] p-2 max-w-4xl w-full h-[60vh] shadow-2xl">
                            <button className="absolute -top-10 right-0 text-white hover:text-[#D4AF37] flex items-center gap-2" onClick={() => setIsMapModalOpen(false)}>
                                Cerrar <span className="material-symbols-outlined">close</span>
                            </button>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15050.817290616186!2d-99.2223838!3d19.425126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2021c3274643b%3A0x7d251d2003889f41!2sLomas%20de%20Chapultepec%2C%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1705620000000!5m2!1ses-419!2smx"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                )}

                {/* RSVP Details Modal */}
                {isRsvpModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsRsvpModalOpen(false)}></div>
                        <div className="relative bg-[#1B1F3B] border border-[#D4AF37] p-8 md:p-12 max-w-lg w-full shadow-[0_0_50px_rgba(212,175,55,0.2)] animate-in zoom-in-95 duration-300 text-center">
                            <button className="absolute top-4 right-4 text-[#D4AF37]/50 hover:text-[#D4AF37]" onClick={() => setIsRsvpModalOpen(false)}>
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                            <div className="mb-6">
                                <span className="material-symbols-outlined text-[#D4AF37] text-5xl">mark_email_read</span>
                            </div>
                            <h3 className="font-display text-[#D4AF37] text-xl uppercase tracking-widest mb-6">Confirmación</h3>
                            <p className="font-serif italic text-xl text-[#F5F5DC] leading-relaxed">
                                "Aquí podrás mandar mensaje para confirmar tu asistencia al gran evento"
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
