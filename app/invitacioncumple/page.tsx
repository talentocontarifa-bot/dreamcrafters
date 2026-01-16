"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin, Calendar, Clock, Music, Gift, ChevronDown, CheckCircle, Flag, Trophy, Ticket, Users, AlertCircle } from 'lucide-react';

// --- CONFIGURACIÓN DEL CUMPLEAÑOS ---
const PARTY_DATA = {
    name: "JUAN PEREZ",
    age: "35",
    season: "SEASON 35", // O "VUELTA 35"
    date: "12 OCT 2025",
    fullDate: "Domingo, 12 de Octubre de 2025",
    location: "Salón Grand Prix",
    city: "Toluca, México",
    accessTime: "14:00 HRS",
    partyTime: "16:00 HRS",
    targetDate: "2025-10-12T14:00:00"
};

// Helper para cuenta regresiva
function calculateTimeLeft() {
    const difference = +new Date(PARTY_DATA.targetDate) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
        timeLeft = {
            días: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
            min: Math.floor((difference / 1000 / 60) % 60),
            seg: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
}

const App = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [scrolled, setScrolled] = useState(false);
    const [rsvpOpen, setRsvpOpen] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsMusicPlaying(!isMusicPlaying);
        }
    };

    return (
        <div className="font-sans text-gray-100 bg-[#0a0a0a] min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Racing+Sans+One&family=Montserrat:ital,wght@0,300;0,400;0,600;0,800;1,400;1,800&display=swap');
        
        .font-racing { font-family: 'Racing Sans One', cursive; }
        .font-body { font-family: 'Montserrat', sans-serif; }
        
        .bg-carbon {
          background-color: #111;
          background-image: 
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000),
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        .clip-ticket {
          clip-path: polygon(
            0% 0%, 
            100% 0%, 
            100% 100%, 
            0% 100%
          );
        }
        
        @media (min-width: 768px) {
          .clip-ticket {
            clip-path: polygon(
              0% 0%, 
              75% 0%, 
              80% 10%, 
              100% 10%, 
              100% 100%, 
              0% 100%
            );
          }
        }

        .racing-stripe {
          background: repeating-linear-gradient(
            45deg,
            #cc0000,
            #cc0000 10px,
            #ffffff 10px,
            #ffffff 20px
          );
        }
        
        .light-bg {
            background: radial-gradient(circle at center, #ff0000 0%, #300000 100%);
            box-shadow: 0 0 20px #ff0000;
        }
        .light-off {
            background: #330000;
            box-shadow: inset 0 0 10px #000;
        }
      `}</style>

            {/* Audio Player */}
            <audio ref={audioRef} loop src="/music/f1_theme.mp3" />
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={toggleMusic}
                    className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300 animate-pulse border-2 border-white"
                    title="Play F1 Theme"
                >
                    <Music className={`w-6 h-6 ${isMusicPlaying ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Navigation Bar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur border-b-2 border-red-600 py-2' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {/* F1 Logo Placeholder */}
                        <div className="font-extrabold italic text-2xl tracking-tighter text-red-600">F1<span className="text-white text-xs align-top">®</span></div>
                        <span className="text-xl font-body font-bold tracking-widest text-white uppercase hidden md:block ml-4">
                            {PARTY_DATA.name}
                        </span>
                    </div>
                    <div className="flex gap-6 uppercase text-xs font-bold tracking-wider items-center">
                        <a href="#" className="hidden md:block hover:text-red-500 transition">Home</a>
                        <a href="#" className="hidden md:block hover:text-red-500 transition">Our Story</a>
                        <a href="#" className="hidden md:block hover:text-red-500 transition">Details</a>
                        <button
                            onClick={() => scrollToSection('rsvp')}
                            className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-black italic py-2 px-6 rounded text-sm uppercase tracking-widest transition-all"
                        >
                            RSVP
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section: Redesigned F1 Style */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-carbon">
                {/* Speed blur effect */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

                {/* Main Content */}
                <div className="relative z-10 w-full max-w-6xl px-4 mt-16 md:mt-0 text-center">

                    <h1 className="font-racing text-5xl md:text-7xl lg:text-8xl italic uppercase text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-2">
                        {PARTY_DATA.name} GP: <span className="text-red-600">The 35th Lap</span>
                    </h1>

                    <div className="flex justify-center items-center gap-4 text-xl md:text-2xl font-body font-bold italic text-gray-300 mb-12 uppercase tracking-wider">
                        <span>{PARTY_DATA.city}</span>
                        <span className="text-red-600">•</span>
                        <span>{PARTY_DATA.date}</span>
                    </div>

                    {/* Lights Out Countdown Graphic */}
                    <div className="bg-black/80 inline-block p-6 rounded-3xl border-4 border-neutral-800 shadow-2xl backdrop-blur-md relative group hover:border-red-600 transition-colors duration-500">
                        {/* The 5 Lights */}
                        <div className="flex gap-3 md:gap-6 justify-center mb-6 bg-black p-4 rounded-xl border border-neutral-800 shadow-[inset_0_0_20px_black]">
                            {[1, 2, 3, 4, 5].map((light) => (
                                <div key={light} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-black relative bg-[#300]">
                                    <div className="absolute inset-0 rounded-full light-off"></div>
                                    {/* Simulate lights turning on based on seconds?? Just make them pulse red for effect */}
                                    <div className="absolute inset-0 rounded-full bg-red-600 opacity-0 animate-ping" style={{ animationDuration: '2s', animationDelay: `${light * 0.2}s` }}></div>
                                    <div className="absolute inset-0 rounded-full bg-red-600 opacity-80 animate-pulse"></div>
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-400 font-bold italic tracking-widest uppercase text-sm mb-2">Lights Out In</p>

                        <div className="flex justify-center gap-4 md:gap-8 font-racing text-white">
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl">{String(timeLeft.días || 0).padStart(2, '0')}</div>
                                <div className="text-xs text-gray-500 uppercase">Days</div>
                            </div>
                            <div className="text-3xl md:text-5xl">:</div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl">{String(timeLeft.hrs || 0).padStart(2, '0')}</div>
                                <div className="text-xs text-gray-500 uppercase">Hrs</div>
                            </div>
                            <div className="text-3xl md:text-5xl">:</div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl">{String(timeLeft.min || 0).padStart(2, '0')}</div>
                                <div className="text-xs text-gray-500 uppercase">Min</div>
                            </div>
                            <div className="text-3xl md:text-5xl">:</div>
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl text-red-600 min-w-[80px]">{String(timeLeft.seg || 0).padStart(2, '0')}</div>
                                <div className="text-xs text-gray-500 uppercase">Sec</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button onClick={() => scrollToSection('rsvp')} className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-red-600 to-orange-600 group-hover:from-red-600 group-hover:to-orange-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-800">
                            <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-black rounded-full group-hover:bg-opacity-0 font-racing text-2xl uppercase tracking-widest italic flex items-center gap-2">
                                <Flag className="w-6 h-6" /> Save The Date
                            </span>
                        </button>
                    </div>

                </div>
            </header>

            {/* ... (Previous Ticket Section could go here or be replaced, keeping it for now as "Details") ... */}

            {/* Embedded Map Section */}
            <section className="py-20 bg-neutral-900 border-t border-neutral-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-racing text-4xl text-white uppercase italic mb-8">
                        Circuit <span className="text-red-600">Location</span>
                    </h2>
                    <div className="max-w-4xl mx-auto border-4 border-red-600 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.2)] bg-black">
                        {/* Embed Google Maps */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119760.3662057922!2d-99.70479708915594!3d19.29221568297771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd890334800049%3A0x86915b2256722d3b!2sToluca%20de%20Lerdo%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1705389000000!5m2!1ses-419!2smx"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa Ubicación"
                            className="grayscale hover:grayscale-0 transition-all duration-500 filter sepia-[0.3]"
                        ></iframe>
                        <div className="bg-neutral-800 p-4 flex justify-between items-center">
                            <div className="text-left">
                                <p className="text-red-600 font-bold uppercase text-xs">Venue</p>
                                <p className="font-racing text-xl text-white">{PARTY_DATA.location}</p>
                            </div>
                            <a href="https://maps.google.com/maps?q=Toluca,+Edo.+Mex" target="_blank" rel="noopener noreferrer" className="bg-white text-black font-bold uppercase text-xs px-4 py-2 rounded hover:bg-red-600 hover:text-white transition">
                                Open in Maps
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* RSVP Form (Existing form logic) */}
            <section id="rsvp" className="py-24 relative bg-red-700 overflow-hidden">
                {/* ... (Existing RSVP content kept same, just ensuring styles match) ... */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute -left-20 top-20 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto bg-white text-black rounded-xl shadow-2xl overflow-hidden">
                        <div className="bg-black text-white p-6 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-full bg-red-600 transform skew-x-[-20deg] translate-x-10"></div>
                            <h2 className="font-racing text-3xl relative z-10">REGISTRO DE ESCUDERÍA</h2>
                            <p className="text-xs text-gray-400 uppercase tracking-widest relative z-10">RSVP - {PARTY_DATA.name}</p>
                        </div>

                        <div className="p-8 md:p-12">
                            {!rsvpOpen ? (
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-2 text-gray-500">Nombre del Piloto</label>
                                            <input type="text" className="w-full bg-gray-100 border-b-2 border-gray-300 px-4 py-3 focus:outline-none focus:border-red-600 transition-colors font-bold" placeholder="Tu Nombre" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase mb-2 text-gray-500">Número de Acompañantes</label>
                                            <select className="w-full bg-gray-100 border-b-2 border-gray-300 px-4 py-3 focus:outline-none focus:border-red-600 transition-colors font-bold">
                                                <option>Solo yo (1)</option>
                                                <option>Yo + 1 (2)</option>
                                                <option>Escudería Completa (4)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase mb-2 text-gray-500">Status</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-400 group-hover:border-red-600 flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                                <span className="font-bold">Confirmado</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                <div className="w-5 h-5 rounded-full border-2 border-gray-400 group-hover:border-black flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                                <span className="font-bold text-gray-500">DNF (No Asistiré)</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase mb-2 text-gray-500">Mensaje para el Cumpleañero</label>
                                        <textarea className="w-full bg-gray-100 border-b-2 border-gray-300 px-4 py-3 focus:outline-none focus:border-red-600 transition-colors text-sm" rows={3} placeholder="¡Feliz Vuelta 35!"></textarea>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setRsvpOpen(true)}
                                        className="w-full bg-black text-white font-racing text-xl py-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        CONFIRMAR ASISTENCIA <CheckCircle size={20} />
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-12 animate-fade-in-up">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="font-racing text-3xl mb-2">¡LUGAR ASEGURADO!</h3>
                                    <p className="text-gray-600 mb-6">Nos vemos en la parrilla de salida.</p>
                                    <button onClick={() => setRsvpOpen(false)} className="text-sm font-bold underline">Volver al formulario</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 border-t-4 border-red-600">
                <div className="container mx-auto px-4 text-center">
                    <Ticket className="w-8 h-8 mx-auto mb-4 text-red-600 opacity-50" />
                    <h2 className="font-racing text-2xl mb-2">{PARTY_DATA.name}</h2>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">Official Birthday Event</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
