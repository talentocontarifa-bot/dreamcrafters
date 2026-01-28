"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

// --- COMPONENTS ---

const NebulaBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
    <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] bg-cyan-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
    <div className="absolute top-[20%] right-[20%] w-[50vw] h-[50vw] bg-indigo-600/20 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
  </div>
);

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// --- MAIN PAGE ---

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-white font-sans bg-[#050505] selection:bg-cyan-500/30">

      <NebulaBackground />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-black/50 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="h-8 w-auto cursor-pointer group">
            <img src="/landing/d-icon.svg" alt="Dreamcrafters" className="h-full w-auto filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <a href="https://wa.me/529845828658" target="_blank" className="bg-white text-black hover:bg-cyan-300 font-bold py-2 px-6 rounded-full text-xs tracking-widest uppercase transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Iniciar Proyecto
          </a>
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col items-center">

        {/* HERO SECTION - CINEMATIC */}
        <section className="w-full min-h-screen flex flex-col justify-center items-center px-4 pt-20 relative">

          {/* Floating Robot - More subtle/integrated */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-10 pointer-events-none">
            <img src="/landing/hero-robot.webp" alt="Background Guardian" className="w-full h-full object-contain animate-float-slow" />
          </div>

          <div className="z-10 text-center flex flex-col items-center gap-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/20 backdrop-blur-md mb-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-300 text-[10px] uppercase tracking-[0.2em] font-bold">DreamCrafters v2.0 Online</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-2xl">
              EVENTOS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">FUERA DE SERIE</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed font-light mt-4">
              Creamos invitaciones digitales y experiencias web que tus invitados <span className="text-white font-medium">realmente querrán ver</span>. Sin plantillas aburridas. Solo magia.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
              <a href="https://wa.me/529845828658" className="group relative px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-full overflow-hidden transition-transform hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Cotizar Ahora <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
                <div className="absolute inset-0 bg-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </a>
              <Link href="#showcase" className="text-sm text-white/60 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                Explorar Galería <span className="opacity-50">↓</span>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>

        {/* BENTO GRID SERVICES */}
        <section className="w-full max-w-7xl px-6 py-32 relative z-20">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">El Estándar DreamCrafters</h2>
            <div className="h-[1px] flex-grow bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

            {/* Card 1: Large Feature */}
            <SpotlightCard className="md:col-span-2 p-8 md:p-12 flex flex-col justify-between group">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mb-6 text-indigo-300 border border-white/5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Arquitectura Digital a Medida</h3>
                <p className="text-white/50 text-lg max-w-md">No usamos constructores genéricos. Codificamos tu evento desde cero para lograr efectos visuales, interactividad 3D y fluidez que ninguna plantilla puede igualar.</p>
              </div>
              <div className="absolute right-[-50px] bottom-[-50px] w-[300px] h-[300px] bg-indigo-600/20 blur-[80px] group-hover:bg-indigo-500/30 transition-colors"></div>
            </SpotlightCard>

            {/* Card 2: Interactive */}
            <SpotlightCard className="p-8 flex flex-col justify-center items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.1)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Efectos WoW</h3>
              <p className="text-white/40 text-sm">Partículas, Parallax, Glitch, Neon. Hacemos que la pantalla cobre vida.</p>
            </SpotlightCard>

            {/* Card 3: Mobile First */}
            <SpotlightCard className="p-8 flex flex-col justify-end group">
              <div className="mb-auto w-full flex justify-end">
                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase font-bold text-white/70">Responsive</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Diseño Móvil Nativo</h3>
              <p className="text-white/40 text-sm">El 95% de tus invitados abrirá la invitación en su celular. Diseñamos pensando en esa pantalla primero.</p>
            </SpotlightCard>

            {/* Card 4: RSVP */}
            <SpotlightCard className="md:col-span-2 p-8 md:p-12 flex flex-row items-center justify-between gap-8 group">
              <div className="max-w-md relative z-10">
                <h3 className="text-2xl font-bold text-green-400 mb-2">RSVP via WhatsApp</h3>
                <p className="text-white/50">El sistema más cómodo para tus invitados. Un clic genera un mensaje pre-llenado con sus datos y preferencias.</p>
              </div>
              <div className="hidden md:flex h-16 w-16 rounded-full bg-green-500 text-black items-center justify-center font-bold text-2xl shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 5.242c-.121-.202-1.201-1.484-1.201-1.484-.337-.33-.507-.379-.657-.054-.161.348-.593 1.144-.725 1.255-.132.11-.264.135-.502.046-.7-.26-2.227-1.439-2.919-2.2-.569-.624-.316-.503-.453-.787-.046-.094.02-.191.077-.282.049-.079.135-.165.192-.262.131-.22.062-.439-.029-.624-.092-.186-.71-1.666-1.025-2.028-.215-.248-.386-.182-.507-.186-.109-.003-.228-.003-.357-.003s-.421.115-.623.332c-.201.218-.755.733-.755 1.789s.781 2.074.887 2.22c.106.145 1.536 2.341 3.718 3.284.519.224.925.358 1.24.457.518.163 1.019.204 1.409.117.439-.098 1.343-.548 1.531-1.078.188-.529.188-.985.133-1.078-.056-.094-.206-.151-.43-.263z" /></svg>
              </div>
            </SpotlightCard>
          </div>
        </section>


        {/* SHOWCASE SECTION */}
        <section id="showcase" className="w-full max-w-7xl px-6 py-20 mb-20">
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">Portafolio Selecto</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">PROYECTOS RECIENTES</h2>
          </div>

          <div className="space-y-32">
            {/* Project 1: Kermesse */}
            <div className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-black">
                <img src="/kermesse_cumbres/coco_v2.webp" alt="Kermesse" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 transform origin-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              </div>

              <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-center items-start">
                <h3 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6 drop-shadow-lg translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">KERMESSE<br />CUMBRES</h3>
                <p className="text-white/80 text-xl max-w-lg mb-8 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  Una plataforma integral para un evento masivo. Mapa GPS, cronograma en vivo y cartelera de actividades.
                </p>
                <Link href="/kermesse_cumbres" className="bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 font-bold py-3 px-8 rounded-full transition-all translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-200">
                  Ver Experiencia →
                </Link>
              </div>

              {/* Idle Title (Visible when NOT hovering) */}
              <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-3xl font-bold text-white tracking-widest uppercase">Kermesse Cumbres</h3>
                <div className="h-1 w-20 bg-cyan-500 mt-2"></div>
              </div>
            </div>

            {/* Project 2: Minecraft */}
            <div className="group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-[#051005]">
                <img src="/sprites/creeper-3d.png" alt="Minecraft" className="absolute right-0 bottom-[-10%] w-[60%] h-auto object-contain opacity-80 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
              </div>

              <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-center items-start">
                <h3 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-6 drop-shadow-lg translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">IAN<br />LEVEL 8</h3>
                <p className="text-white/80 text-xl max-w-lg mb-8 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  Inmersión total en el mundo de los bloques. Un mundo 3D exploratorio que redefine lo que es una "invitación".
                </p>
                <Link href="/invitacionminecraft/ian-level8" className="bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 font-bold py-3 px-8 rounded-full transition-all translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-200">
                  Jugar Demo →
                </Link>
              </div>

              {/* Idle Title */}
              <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-3xl font-bold text-white tracking-widest uppercase">Minecraft Party</h3>
                <div className="h-1 w-20 bg-green-500 mt-2"></div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="w-full py-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">¿TIENES UNA IDEA LOCA?</h2>
            <p className="text-white/60 text-lg mb-10">Nos encantan los retos. Si puedes imaginarlo, probablemente podemos codearlo.</p>
            <a href="https://wa.me/529845828658" className="inline-block bg-white text-black text-xl font-bold py-4 px-12 rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              Hablemos
            </a>
          </div>
        </section>

        {/* FOOTER - TECH */}
        <footer className="w-full border-t border-white/5 bg-black py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>SYSTEMS ONLINE</span>
            </div>
            <div className="tracking-widest uppercase">
              © 2026 DreamCrafters Inc.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-white transition-colors">FACEBOOK</a>
            </div>
          </div>
        </footer>

      </main>

      <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 10s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 4s ease infinite;
                }
                @keyframes gradient-x {
                    0% { background-position: 0% 50% }
                    50% { background-position: 100% 50% }
                    100% { background-position: 0% 50% }
                }
                @keyframes subtleFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-float-slow {
                    animation: subtleFloat 8s ease-in-out infinite;
                }
            `}</style>
    </div>
  );
}
