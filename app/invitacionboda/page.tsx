"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function WeddingInvitation() {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Placeholder logic
    const [showBankDetails, setShowBankDetails] = useState(false);

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 100,
            duration: 1000,
        });

        const navbar = document.getElementById("navbar");
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar?.classList.add("bg-wedding-dark", "shadow-lg", "py-2");
                navbar?.classList.remove("bg-transparent", "py-4");
            } else {
                navbar?.classList.remove("bg-wedding-dark", "shadow-lg", "py-2");
                navbar?.classList.add("bg-transparent", "py-4");
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Countdown Logic
        const weddingDate = new Date("October 25, 2025 16:30:00").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                setIsFinished(true);
                clearInterval(interval);
            } else {
                setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
                setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
            }
        }, 1000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="bg-wedding-light text-wedding-dark font-wedding-sans overflow-x-hidden">
            {/* FontAwesome integration via CDN for simplicity in this demo page */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            {/* Audio Player (Optional music) */}
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                    className="bg-wedding-gold text-white p-3 rounded-full shadow-lg hover:bg-yellow-700 transition duration-300"
                >
                    <i className={`fas ${isMusicPlaying ? 'fa-volume-up' : 'fa-music'}`}></i>
                </button>
            </div>

            {/* Navigation */}
            <nav className="fixed w-full z-40 transition-all duration-300 bg-transparent py-4" id="navbar">
                <div className="container mx-auto px-6 flex justify-center md:justify-between items-center">
                    <div className="text-white text-2xl font-script font-bold hidden md:block">S & M</div>
                    <div className="hidden md:flex space-x-8 text-white uppercase text-xs tracking-widest font-classic">
                        <a href="#historia" className="hover:text-wedding-gold transition">Nuestra Historia</a>
                        <a href="#eventos" className="hover:text-wedding-gold transition">Eventos</a>
                        <a href="#rsvp" className="hover:text-wedding-gold transition">Confirmar</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="h-screen relative flex items-center justify-center text-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
                <div className="text-white px-4" data-aos="fade-up" data-aos-duration="1500">
                    <p className="uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-wedding-sans">¡Nos Casamos!</p>
                    <h1 className="font-script text-7xl md:text-9xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c]">Sofía & Mateo</h1>
                    <div className="w-24 h-px bg-white mx-auto my-6 opacity-70"></div>
                    <p className="font-classic text-xl md:text-2xl tracking-widest uppercase">25 . Octubre . 2025</p>
                    <p className="mt-2 font-serif italic text-lg opacity-90">Hacienda Santa Cruz, México</p>

                    <div className="mt-12 animate-bounce">
                        <a href="#monograma" className="text-white opacity-70 hover:opacity-100 transition">
                            <i className="fas fa-chevron-down text-2xl"></i>
                        </a>
                    </div>
                </div>
            </header>

            {/* Monogram & Intro Section */}
            <section id="monograma" className="py-20 md:py-32 bg-white relative">
                <div className="container mx-auto px-4 text-center">
                    {/* Monogram Logo */}
                    <div className="mb-12 relative h-40 flex items-center justify-center" data-aos="zoom-in">
                        <div className="absolute text-[150px] font-script text-wedding-gold opacity-10 top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 select-none">S&M</div>
                        <div className="border-2 border-wedding-gold p-8 inline-block relative z-10">
                            <span className="font-classic text-3xl tracking-widest text-wedding-dark">S</span>
                            <span className="mx-3 text-wedding-gold text-xl italic font-serif">&</span>
                            <span className="font-classic text-3xl tracking-widest text-wedding-dark">M</span>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto" data-aos="fade-up">
                        <p className="font-serif text-2xl md:text-3xl italic text-wedding-gold mb-6">"El amor no se mira, se siente, y aún más cuando ella está junto a ti."</p>
                        <p className="text-wedding-gray leading-relaxed font-light">
                            Querida familia y amigos, estamos emocionados de invitarlos a celebrar el comienzo de nuestra nueva vida juntos. Hemos preparado este día con mucho amor y no sería lo mismo sin ustedes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Photo Banner */}
            <div className="w-full h-64 md:h-96 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}></div>

            {/* Countdown Section */}
            <section className="py-16 bg-wedding-dark text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-classic text-2xl tracking-widest mb-10 text-wedding-gold">Faltan</h2>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12" id="countdown">
                        {isFinished ? (
                            <div className="text-3xl font-serif text-wedding-gold">¡Llegó el gran día!</div>
                        ) : (
                            <>
                                <div className="flex flex-col items-center"><span className="text-4xl md:text-6xl font-serif">{days}</span><span className="text-xs uppercase tracking-widest mt-2 text-gray-400">Días</span></div>
                                <div className="flex flex-col items-center"><span className="text-4xl md:text-6xl font-serif">{hours}</span><span className="text-xs uppercase tracking-widest mt-2 text-gray-400">Hs</span></div>
                                <div className="flex flex-col items-center"><span className="text-4xl md:text-6xl font-serif">{minutes}</span><span className="text-xs uppercase tracking-widest mt-2 text-gray-400">Min</span></div>
                                <div className="flex flex-col items-center"><span className="text-4xl md:text-6xl font-serif">{seconds}</span><span className="text-xs uppercase tracking-widest mt-2 text-gray-400">Seg</span></div>
                            </>
                        )}
                    </div>
                    <div className="mt-10">
                        <button className="border border-wedding-gold text-wedding-gold px-8 py-3 uppercase tracking-widest text-xs hover:bg-wedding-gold hover:text-white transition duration-300">
                            Agendar en Google Calendar
                        </button>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="eventos" className="py-24 bg-wedding-light">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="font-script text-6xl text-wedding-gold mb-4">Itinerario</h2>
                        <p class="uppercase tracking-widest text-sm text-wedding-dark font-bold">Detalles del Gran Día</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Ceremony Card */}
                        <div className="bg-white p-10 shadow-xl text-center border-t-4 border-wedding-gold transform hover:-translate-y-2 transition duration-500" data-aos="fade-right">
                            <div className="text-wedding-gold text-4xl mb-4"><i className="fas fa-church"></i></div>
                            <h3 class="font-serif text-3xl mb-2">Ceremonia Religiosa</h3>
                            <p class="font-classic text-sm text-gray-400 mb-6 uppercase tracking-widest">4:30 PM</p>
                            <p className="text-wedding-dark mb-6 leading-relaxed">Capilla de San Gabriel<br />Antigua Hacienda Santa Cruz</p>
                            <a href="#" className="inline-block text-xs uppercase tracking-widest border-b border-wedding-gold pb-1 hover:text-wedding-gold transition">Ver Ubicación</a>
                        </div>

                        {/* Reception Card */}
                        <div className="bg-white p-10 shadow-xl text-center border-t-4 border-wedding-gold transform hover:-translate-y-2 transition duration-500" data-aos="fade-left">
                            <div className="text-wedding-gold text-4xl mb-4"><i className="fas fa-glass-cheers"></i></div>
                            <h3 class="font-serif text-3xl mb-2">Recepción y Fiesta</h3>
                            <p class="font-classic text-sm text-gray-400 mb-6 uppercase tracking-widest">6:00 PM - 2:00 AM</p>
                            <p className="text-wedding-dark mb-6 leading-relaxed">Jardín Principal<br />Hacienda Santa Cruz</p>
                            <a href="#" className="inline-block text-xs uppercase tracking-widest border-b border-wedding-gold pb-1 hover:text-wedding-gold transition">Ver Ubicación</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dress Code & Details */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">

                        {/* Dress Code */}
                        <div className="p-6" data-aos="fade-up" data-aos-delay="100">
                            <i className="fas fa-user-tie text-3xl text-wedding-gold mb-4"></i>
                            <h4 class="font-classic text-lg uppercase tracking-widest mb-3">Código de Vestimenta</h4>
                            <p class="font-serif text-xl italic text-gray-600">Formal Riguroso</p>
                            <p class="text-xs text-gray-400 mt-2">Ellos: Traje o Tuxedo | Ellas: Vestido Largo</p>
                        </div>

                        {/* No Kids */}
                        <div className="p-6" data-aos="fade-up" data-aos-delay="200">
                            <i className="fas fa-child text-3xl text-wedding-gold mb-4"></i>
                            <h4 class="font-classic text-lg uppercase tracking-widest mb-3">Solo Adultos</h4>
                            <p class="text-sm text-gray-500 leading-relaxed">Amamos a sus pequeños, pero queremos que disfruten esta noche con nosotros. Recepción exclusiva para adultos.</p>
                        </div>

                        {/* Gifts */}
                        <div className="p-6" data-aos="fade-up" data-aos-delay="300">
                            <i className="fas fa-envelope-open-text text-3xl text-wedding-gold mb-4"></i>
                            <h4 class="font-classic text-lg uppercase tracking-widest mb-3">Mesa de Regalos</h4>
                            <p class="text-sm text-gray-500 leading-relaxed mb-3">Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros:</p>
                            <button onClick={() => setShowBankDetails(!showBankDetails)} className="text-wedding-gold font-bold text-xs uppercase underline cursor-pointer hover:text-wedding-dark">
                                Ver datos bancarios / Sobre
                            </button>
                            <div className={`${showBankDetails ? 'block' : 'hidden'} mt-4 bg-gray-50 p-3 rounded text-xs text-left`}>
                                <p><strong>Banco:</strong> BBVA</p>
                                <p><strong>Cuenta:</strong> 1234 5678 9012</p>
                                <p><strong>Nombre:</strong> Mateo & Sofia</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} data-aos="fade-in"></div>
                    <div className="h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522673607200-1645062cd958?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} data-aos="fade-in" data-aos-delay="100"></div>
                    <div className="h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225448526-0c857948a60e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} data-aos="fade-in" data-aos-delay="200"></div>
                    <div className="h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} data-aos="fade-in" data-aos-delay="300"></div>
                </div>
            </section>

            {/* RSVP Section */}
            <section id="rsvp" className="py-24 bg-wedding-light relative">
                {/* Decoration element */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-wedding-gold opacity-20 m-10 hidden md:block"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-wedding-gold opacity-20 m-10 hidden md:block"></div>

                <div className="container mx-auto px-4 max-w-2xl relative z-10">
                    <div className="text-center mb-12">
                        <span className="font-script text-5xl text-wedding-gold block mb-2">Confirmación</span>
                        <h2 class="font-classic text-2xl uppercase tracking-widest">R.S.V.P</h2>
                        <p class="mt-4 text-gray-500 italic">Por favor confirmar antes del 1 de Octubre</p>
                    </div>

                    <form className="bg-white p-8 md:p-12 shadow-2xl space-y-6 border border-gray-100" onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por confirmar! (Esto es una demo)'); }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Nombre Completo</label>
                                <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold transition bg-transparent" placeholder="Tu Nombre" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Teléfono</label>
                                <input type="tel" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold transition bg-transparent" placeholder="55 1234 5678" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">¿Asistirás?</label>
                            <div className="flex space-x-6 mt-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="attendance" className="accent-wedding-gold" />
                                    <span className="text-sm font-light">Sí, con gusto asistiré</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="attendance" className="accent-wedding-gold" />
                                    <span className="text-sm font-light">Lo siento, no podré asistir</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Número de Asientos</label>
                            <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent">
                                <option>1 Adulto</option>
                                <option>2 Adultos</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Mensaje para los novios</label>
                            <textarea rows={3} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-wedding-gold bg-transparent resize-none" placeholder="Escribe tus buenos deseos..."></textarea>
                        </div>

                        <div className="text-center pt-6">
                            <button type="submit" className="bg-wedding-dark text-white px-10 py-4 uppercase tracking-[0.2em] text-xs hover:bg-wedding-gold transition duration-500 w-full md:w-auto">
                                Enviar Confirmación
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-wedding-dark text-white py-12 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="font-script text-5xl mb-6 text-wedding-gold">S & M</h2>
                    <p class="font-classic text-sm tracking-widest uppercase mb-4">#BodaSofiaYMateo</p>
                    <p class="text-gray-500 text-xs mt-8">
                        Diseñado con amor para nuestra boda.<br />
                        &copy; 2025. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
