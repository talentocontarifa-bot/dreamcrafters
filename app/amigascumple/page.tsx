"use client";

import { useEffect, useState } from "react";

export default function BirthdayInvitation() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Force Light Mode for this specific "Picnic" look as per reference which is very bright/airy
        document.documentElement.classList.remove("dark");

        const targetDate = new Date("February 14, 2026 17:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-wood-pattern font-body text-zinc-800 overflow-x-hidden pb-12 relative">

            {/* Top Bunting - Small Triangles */}
            <div className="absolute top-0 left-0 w-full flex justify-center gap-4 pt-2 z-10">
                {["P", "I", "C", "N", "I", "C"].map((letter, i) => (
                    <div key={i} className="relative group">
                        <div className="w-8 h-10 md:w-10 md:h-12 bg-white flex items-center justify-center shadow-sm bunting-triangle text-primary font-bold text-sm md:text-base transform origin-top hover:rotate-12 transition-transform duration-300">
                            {letter}
                        </div>
                        {/* String segment mock - visible only if connected, simplified here */}
                    </div>
                ))}
            </div>

            <div className="max-w-xl mx-auto px-4 pt-20 space-y-16 relative z-0">


                {/* Main Invitation Card */}
                <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden relative animate-pop-in" style={{ animationDelay: '0.2s' }}>
                    {/* Gingham Header */}
                    <div className="h-16 bg-gingham-red relative w-full border-b border-rose-100">
                        {/* Balloons */}
                        <div className="absolute -left-2 -bottom-8 animate-float" style={{ animationDelay: '0s' }}>
                            <div className="w-10 h-12 bg-rose-300 balloon-shape shadow-sm transform -rotate-12"></div>
                            <div className="balloon-string transform -rotate-12 origin-top"></div>
                        </div>
                        <div className="absolute -right-2 -bottom-6 animate-float" style={{ animationDelay: '1s' }}>
                            <div className="w-10 h-12 bg-primary balloon-shape shadow-sm transform rotate-12"></div>
                            <div className="balloon-string transform rotate-12 origin-top"></div>
                        </div>
                    </div>

                    <div className="px-6 pt-10 pb-12 text-center space-y-6">
                        <h3 className="text-primary tracking-[0.2em] text-xs font-bold uppercase animate-pop-in" style={{ animationDelay: '0.4s' }}>
                            ¡Acompáñanos!
                        </h3>

                        {/* Main Title */}
                        <h1 className="font-display text-5xl md:text-7xl text-primary leading-tight transform -rotate-2 animate-pop-in" style={{ animationDelay: '0.6s' }}>
                            Vamos a<br />
                            celebrar juntas
                        </h1>

                        {/* Main Photo Polaroid */}
                        <div className="relative mx-auto w-64 md:w-72 bg-white p-3 pt-4 pb-12 shadow-md transform rotate-2 hover:rotate-0 transition-transform duration-500 animate-pop-in" style={{ animationDelay: '0.8s' }}>
                            <div className="aspect-[4/5] bg-zinc-100 overflow-hidden shadow-inner">
                                <img src="/main-photo.jpeg" alt="Cumpleañera" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-rose-200/30 -rotate-1 z-10"></div> {/* Tape effect */}
                        </div>

                        {/* Date Time Row */}
                        <div className="flex justify-center items-center gap-6 mt-8 animate-pop-in" style={{ animationDelay: '1s' }}>
                            {/* Date Box */}
                            <div className="bg-primary text-white rounded-2xl p-3 w-20 h-20 flex flex-col items-center justify-center shadow-md transform -rotate-3 hover:rotate-0 transition-transform hover:scale-110 duration-300">
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">FEB</span>
                                <span className="text-3xl font-bold leading-none">14</span>
                            </div>

                            {/* Basket Icon */}
                            <span className="material-symbols-outlined text-amber-600 text-4xl transform hover:scale-110 transition-transform cursor-pointer animate-bounce">
                                shopping_basket
                            </span>

                            {/* Time Box */}
                            <div className="bg-primary text-white rounded-2xl p-3 w-20 h-20 flex flex-col items-center justify-center shadow-md transform rotate-3 hover:rotate-0 transition-transform hover:scale-110 duration-300">
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">HORA:</span>
                                <span className="text-xl font-bold leading-none mt-1">5:00</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">P.M.</span>
                            </div>
                        </div>

                        <p className="text-sm font-semibold text-zinc-500 mt-2">14 de Febrero</p>
                    </div>
                </div>

                {/* Countdown - Floating Overlay Style */}
                <div className="relative -mt-24 z-10 animate-pop-in" style={{ animationDelay: '1.2s' }}>
                    <div className="bg-white rounded-full shadow-lg py-4 px-8 flex items-center justify-between max-w-sm mx-auto relative border border-rose-50">
                        {/* Days */}
                        <div className="text-center w-16">
                            <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-wide">Días:</span>
                            <span className="block text-3xl font-bold text-primary">{timeLeft.days.toString().padStart(2, '0')}</span>
                        </div>

                        {/* Center Circle Wrapper */}
                        <div className="relative -my-12">
                            <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center border-[6px] border-primary/10 shadow-xl relative z-20">
                                {/* Progress Ring approximation */}
                                <div className="absolute inset-0 rounded-full border-[4px] border-primary border-t-transparent animate-spin-slow"></div>

                                <div className="text-center z-10 bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-primary">{timeLeft.hours.toString().padStart(2, '0')}</span>
                                        <span className="text-xl font-bold text-primary">:</span>
                                        <span className="text-3xl font-bold text-primary">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-[10px] uppercase text-zinc-400 font-bold flex gap-4 mt-1">
                                        <span>Horas</span>
                                        <span>Mins</span>
                                    </span>
                                </div>
                            </div>

                            {/* Label below circle */}
                            <div className="absolute -bottom-8 left-0 right-0 text-center animate-pulse">
                                <p className="font-display text-primary text-sm transform -rotate-2">Falta muy poco...</p>
                                <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">¡Es el gran día!</p>
                            </div>
                        </div>

                        {/* Seconds */}
                        <div className="text-center w-16">
                            <span className="text-[10px] uppercase text-zinc-400 font-bold tracking-wide">Secs:</span>
                            <span className="block text-3xl font-bold text-primary">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>


                {/* Gallery Section - Carousel Style */}
                <div className="relative bg-[#fdfaf5] border-2 border-[#e6dcc3] rounded-[2rem] p-6 shadow-lg animate-pop-in" style={{ animationDelay: '1.4s' }}>
                    {/* Corner Swirls (CSS Shapes) */}
                    <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary/20 rounded-tl-3xl"></div>
                    <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-primary/20 rounded-tr-3xl"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary/20 rounded-bl-3xl"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary/20 rounded-br-3xl"></div>

                    <div className="text-center mb-8 relative">
                        <h2 className="font-display text-3xl text-zinc-700">Mis Momentos</h2>
                        <div className="w-16 h-1 bg-primary/20 mx-auto mt-2 rounded-full"></div>
                        <p className="text-xs text-zinc-400 mt-2 italic">(Desliza para ver más)</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex-1 flex gap-4 overflow-x-auto no-scrollbar py-6 px-4 snap-x snap-mandatory scroll-smooth">
                            {[
                                "/WhatsApp Image 2026-02-07 at 8.06.13 PM.jpeg",
                                "/WhatsApp Image 2026-02-07 at 8.06.13 PM (1).jpeg",
                                "/WhatsApp Image 2026-02-07 at 8.06.13 PM (2).jpeg",
                                "/WhatsApp Image 2026-02-07 at 8.06.14 PM.jpeg",
                                "/WhatsApp Image 2026-02-07 at 8.06.15 PM.jpeg",
                            ].map((src, idx) => {
                                return (
                                    <div key={idx} className="min-w-[200px] aspect-[4/5] bg-white p-3 pb-8 shadow-lg transform hover:-translate-y-2 transition-transform duration-300 snap-center rounded-sm shrink-0 rotate-1 focus:rotate-0">
                                        <div className="w-full h-full bg-zinc-100 overflow-hidden relative group">
                                            <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors duration-300"></div>
                                        </div>
                                        {/* Cute Tape */}
                                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-200/40 transform ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Location Section - Wood Sign Style */}
                <div className="relative bg-[#fdfaf5] border-2 border-[#e6dcc3] rounded-[2rem] p-6 shadow-lg mb-20 text-center animate-pop-in" style={{ animationDelay: '1.6s' }}>
                    {/* Corner Swirls (CSS Shapes) */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl"></div>

                    <div className="border border-dashed border-primary/20 rounded-xl p-8 bg-wood-pattern/30">
                        <div className="flex items-center justify-center gap-2 mb-2 text-primary animate-bounce">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Ubicación</span>
                        </div>

                        <p className="font-display text-xl md:text-2xl text-zinc-700 leading-relaxed max-w-xs mx-auto mb-6">
                            Mza. 23, Lt. 22, Calle Jaguar 02,<br />
                            Casa #18, Jardines 6
                        </p>

                        <a href="https://maps.google.com" target="_blank" className="inline-block bg-primary hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">map</span>
                                Ver en Google Maps
                            </div>
                        </a>
                    </div>

                    <div className="mt-8 space-y-4">
                        <p className="font-handwriting text-xs md:text-sm text-zinc-500 italic px-8">
                            ¡Prepárate para una tarde llena de juegos, comida deliciosa y mucha diversión al aire libre!
                        </p>

                        <div className="h-px w-1/2 bg-primary/10 mx-auto"></div>

                        <p className="text-[10px] uppercase font-bold text-zinc-400">
                            Por favor, confirma tu asistencia antes del 10 de Febrero
                        </p>

                        {/* WhatsApp Button with new Number */}
                        <a
                            href="https://wa.me/5219984058694?text=¡Hola!%20Confirmo%20mi%20asistencia%20al%20cumpleaños%20🎂"
                            target="_blank"
                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3 rounded-full font-bold text-sm shadow-md transition-colors hover:shadow-xl transform hover:-translate-y-1 duration-300"
                        >
                            <span className="material-symbols-outlined text-lg">chat</span>
                            Confirmar Asistencia
                        </a>
                    </div>
                </div>

            </div>

            {/* Footer Gingham Strip */}
            <div className="fixed bottom-0 left-0 w-full h-4 bg-gingham-red z-50 border-t border-rose-200"></div>
        </main>
    );
}
