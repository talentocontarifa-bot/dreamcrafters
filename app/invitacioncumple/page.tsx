"use client";

import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, Clock, Music, Gift, ChevronDown, CheckCircle, Flag, Trophy, Ticket, Users, AlertCircle } from 'lucide-react';

// --- CONFIGURACIÓN DEL CUMPLEAÑOS ---
const PARTY_DATA = {
    name: "JUAN PEREZ",
    age: "35",
    season: "SEASON 35", // O "VUELTA 35"
    date: "15 NOV 2025",
    fullDate: "Sábado, 15 de Noviembre de 2025",
    location: "Salón Grand Prix",
    city: "Toluca, Edo. Méx",
    accessTime: "14:00 HRS",
    partyTime: "16:00 HRS",
    targetDate: "2025-11-15T14:00:00"
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

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

    return (
        <div className="font-sans text-gray-100 bg-[#0a0a0a] min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Racing+Sans+One&family=Montserrat:ital,wght@0,300;0,400;0,600;0,800;1,400;1,800&display=swap');
        
        .font-racing { font-family: 'Racing Sans One', cursive; }
        .font-body { font-family: 'Montserrat', sans-serif; }
        
        .bg-asphalt {
          background-color: #1a1a1a;
          background-image: url("https://www.transparenttextures.com/patterns/asfalt-dark.png");
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
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
      `}</style>

            {/* Navigation Bar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur border-b-2 border-red-600 py-2' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Flag className="text-red-600 w-6 h-6" />
                        <span className="text-xl font-racing tracking-widest text-white uppercase hidden md:block">
                            Gran Premio <span className="text-red-600">{PARTY_DATA.name.split(' ')[0]}</span>
                        </span>
                    </div>
                    <button
                        onClick={() => scrollToSection('rsvp')}
                        className="bg-white text-black hover:bg-red-600 hover:text-white font-black italic py-2 px-6 rounded text-sm uppercase tracking-widest transition-all skew-x-[-10deg] shadow-[4px_4px_0px_rgba(200,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        <span className="block skew-x-[10deg]">RSVP - Paddock</span>
                    </button>
                </div>
            </nav>

            {/* Hero Section: F1 Broadcast Style */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-asphalt">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] animate-pulse"></div>

                {/* Main Content */}
                <div className="relative z-10 w-full max-w-4xl px-4 mt-16 md:mt-0">

                    {/* F1 Header Bar */}
                    <div className="flex items-center gap-4 mb-8 animate-fade-in-down">
                        <div className="h-12 w-2 bg-red-600"></div>
                        <div>
                            <p className="text-red-600 font-bold tracking-[0.3em] text-sm uppercase">Official Birthday Race</p>
                            <h2 className="text-white font-racing text-3xl uppercase">{PARTY_DATA.season}</h2>
                        </div>
                    </div>

                    {/* Main Title Block */}
                    <div className="border-t-4 border-b-4 border-white/10 py-10 backdrop-blur-sm bg-black/30">
                        <h1 className="text-5xl md:text-8xl font-black italic text-white leading-none tracking-tighter text-center md:text-left drop-shadow-xl uppercase">
                            {PARTY_DATA.name.split(' ')[0]} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 text-6xl md:text-9xl">{PARTY_DATA.name.split(' ')[1]}</span>
                        </h1>
                        <div className="mt-4 flex items-center gap-4 md:justify-start justify-center">
                            <div className="bg-white text-black font-racing text-xl px-4 py-1 transform -skew-x-12 inline-block">
                                #{PARTY_DATA.age}
                            </div>
                            <span className="font-body text-xl tracking-widest uppercase">Años a toda velocidad</span>
                        </div>
                    </div>

                    {/* Race Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-neutral-900/80 border-l-4 border-red-600 p-4">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Race Date</p>
                            <p className="text-xl font-racing text-white">{PARTY_DATA.date}</p>
                        </div>
                        <div className="bg-neutral-900/80 border-l-4 border-white p-4">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Circuit</p>
                            <p className="text-xl font-racing text-white">{PARTY_DATA.city}</p>
                        </div>
                        <div className="bg-neutral-900/80 border-l-4 border-red-600 p-4">
                            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Lights Out</p>
                            <p className="text-xl font-racing text-white">{PARTY_DATA.accessTime}</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center md:text-left">
                        <div className="inline-flex flex-col items-center">
                            <ChevronDown className="w-8 h-8 text-red-600 animate-bounce" />
                            <span className="text-xs tracking-widest uppercase">Start Engine</span>
                        </div>
                    </div>
                </div>

                {/* Background Graphic */}
                <div className="absolute right-0 bottom-0 opacity-20 hidden md:block pointer-events-none">
                    <Trophy size={400} className="text-neutral-800 transform rotate-12 translate-x-20 translate-y-20" />
                </div>
            </header>

            {/* The Ticket / Invitation Card */}
            <section className="py-20 bg-neutral-900 flex justify-center px-4">
                <div className="w-full max-w-4xl bg-white text-black rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.3)] flex flex-col md:flex-row clip-ticket relative">

                    {/* Left Side: Visual */}
                    <div className="md:w-2/3 p-8 relative overflow-hidden bg-neutral-100">
                        <div className="absolute top-0 left-0 w-full h-2 racing-stripe"></div>

                        <div className="flex justify-between items-start mb-8">
                            <div className="bg-black text-white px-4 py-1 font-bold italic uppercase transform -skew-x-12 text-sm">
                                Paddock Club VIP
                            </div>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/1200px-F1.svg.png"
                                alt="F1 Logo Style"
                                className="h-6 opacity-50 grayscale"
                            />
                        </div>

                        <div className="mb-8 text-center relative z-10">
                            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-red-600 overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                                {/* Placeholder for Birthday Boy Photo */}
                                <Users className="w-16 h-16 text-gray-400" />
                            </div>
                            <h2 className="font-racing text-4xl mb-2 text-red-600">35 GRAND PRIX</h2>
                            <p className="font-body text-gray-800 uppercase tracking-widest font-bold">Juan Perez's Birthday Bash</p>
                        </div>

                        <div className="space-y-4 border-t-2 border-dashed border-gray-300 pt-6">
                            <div className="flex items-center gap-4">
                                <Calendar className="text-red-600" />
                                <div>
                                    <p className="font-bold text-sm uppercase text-gray-500">Fecha</p>
                                    <p className="font-racing text-xl">{PARTY_DATA.fullDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="text-red-600" />
                                <div>
                                    <p className="font-bold text-sm uppercase text-gray-500">Ubicación</p>
                                    <p className="font-racing text-xl">{PARTY_DATA.location}</p>
                                    <p className="text-sm font-bold">{PARTY_DATA.city}</p>
                                </div>
                            </div>
                        </div>

                        {/* Watermark */}
                        <div className="absolute bottom-[-20px] left-[-20px] text-gray-200 font-racing text-9xl select-none pointer-events-none z-0">
                            35
                        </div>
                    </div>

                    {/* Right Side: Tear-off stub */}
                    <div className="md:w-1/3 bg-black text-white p-8 relative flex flex-col justify-between md:border-l-4 md:border-dashed md:border-gray-800">
                        {/* Holes for "perforation" effect on mobile */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 md:hidden"></div>

                        <div className="text-center">
                            <h3 className="text-red-600 font-racing text-2xl mb-2">ADMIT ONE</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Non-Transferable</p>
                        </div>

                        <div className="my-8 text-center">
                            <div className="bg-white p-2 inline-block rounded">
                                {/* Fake QR Code */}
                                <div className="w-24 h-24 bg-neutral-900 flex items-center justify-center flex-col">
                                    <span className="font-racing text-white text-xs text-center">SCAN FOR<br />LOCATION</span>
                                    <MapPin className="text-white w-6 h-6 mt-1" />
                                </div>
                            </div>
                        </div>

                        <div className="text-center space-y-2">
                            <div className="bg-neutral-800 rounded p-2">
                                <p className="text-xs text-gray-400 uppercase">Class</p>
                                <p className="font-bold text-red-500">VIP GUEST</p>
                            </div>
                            <div className="bg-neutral-800 rounded p-2">
                                <p className="text-xs text-gray-400 uppercase">Age</p>
                                <p className="font-bold text-white">35 YEARS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Countdown - Telemetry Style */}
            <section className="py-16 bg-black border-y border-neutral-800">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-red-600 font-bold tracking-[0.5em] text-sm uppercase mb-8">Race Start In</h3>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {Object.entries(timeLeft).length > 0 ? (
                            Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="bg-neutral-900 border border-neutral-700 w-24 h-24 md:w-32 md:h-32 flex flex-col justify-center items-center rounded-lg relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
                                    <span className="text-3xl md:text-5xl font-racing text-white group-hover:scale-110 transition-transform duration-300">{value}</span>
                                    <span className="text-xs text-gray-500 uppercase font-bold mt-1">{unit}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-4xl font-racing text-red-500 animate-pulse">IT'S RACE DAY!</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Itinerary - Track Layout Style */}
            <section className="py-20 bg-neutral-900 relative overflow-hidden">
                {/* Track Line Background */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M10,0 Q50,50 90,100" stroke="white" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="font-racing text-4xl text-white uppercase italic">
                            Race <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Strategy</span>
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto grid gap-8">
                        {/* Item 1 */}
                        <div className="flex flex-col md:flex-row bg-neutral-800/50 rounded-xl overflow-hidden border border-neutral-700 hover:border-red-600 transition-colors group">
                            <div className="bg-neutral-800 p-6 flex flex-col justify-center items-center md:w-48 border-b md:border-b-0 md:border-r border-neutral-700 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <Clock className="w-8 h-8 mb-2" />
                                <span className="font-racing text-2xl">{PARTY_DATA.accessTime}</span>
                            </div>
                            <div className="p-6 flex-1">
                                <h3 className="text-xl font-bold text-white uppercase mb-2 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    Warm Up & Access
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Llegada de escuderías y registro en Paddock.
                                    Recepción con bebidas de bienvenida.
                                </p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col md:flex-row bg-neutral-800/50 rounded-xl overflow-hidden border border-neutral-700 hover:border-red-600 transition-colors group">
                            <div className="bg-neutral-800 p-6 flex flex-col justify-center items-center md:w-48 border-b md:border-b-0 md:border-r border-neutral-700 group-hover:bg-white group-hover:text-black transition-colors">
                                <Flag className="w-8 h-8 mb-2" />
                                <span className="font-racing text-2xl">{PARTY_DATA.partyTime}</span>
                            </div>
                            <div className="p-6 flex-1">
                                <h3 className="text-xl font-bold text-white uppercase mb-2">Lights Out! (Comida)</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Inicio de la carrera. Se servirá comida estilo buffet internacional.
                                </p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-col md:flex-row bg-neutral-800/50 rounded-xl overflow-hidden border border-neutral-700 hover:border-red-600 transition-colors group">
                            <div className="bg-neutral-800 p-6 flex flex-col justify-center items-center md:w-48 border-b md:border-b-0 md:border-r border-neutral-700 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <Music className="w-8 h-8 mb-2" />
                                <span className="font-racing text-2xl">18:00 HRS</span>
                            </div>
                            <div className="p-6 flex-1">
                                <h3 className="text-xl font-bold text-white uppercase mb-2">Podium Celebration</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Pastel, brindis por las 35 vueltas y fiesta hasta ver la bandera a cuadros.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dress Code & Info */}
            <section className="py-20 bg-asphalt text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                        {/* Dress Code */}
                        <div className="bg-black/50 p-8 border-t-4 border-red-600 backdrop-blur-sm">
                            <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                            <h3 className="font-racing text-xl mb-4">Dress Code</h3>
                            <p className="text-gray-300 font-bold mb-2">CASUAL RACING / SMART CASUAL</p>
                            <p className="text-sm text-gray-500">
                                Ven cómodo pero con estilo.<br />
                                <span className="text-red-500 text-xs uppercase mt-2 block font-bold">Sugerencia: Usa algo rojo o negro.</span>
                            </p>
                        </div>

                        {/* Gift Table */}
                        <div className="bg-black/50 p-8 border-t-4 border-white backdrop-blur-sm">
                            <Gift className="w-12 h-12 text-white mx-auto mb-4" />
                            <h3 className="font-racing text-xl mb-4">Regalos</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                El mejor regalo es tu asistencia en este pit stop.<br />
                                Si deseas traer algo más:
                            </p>
                            <div className="flex flex-col gap-2">
                                <button className="bg-transparent border border-white text-white text-xs font-black py-2 uppercase hover:bg-white hover:text-black transition">Lluvia de Sobres</button>
                                <button className="bg-transparent border border-white text-white text-xs font-black py-2 uppercase hover:bg-white hover:text-black transition">Bebidas para el After</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* RSVP Form */}
            <section id="rsvp" className="py-24 relative bg-red-700 overflow-hidden">
                {/* Background Texture */}
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
