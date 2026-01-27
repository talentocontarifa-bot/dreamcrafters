"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// --- COMPONENTS ---

const Sparks = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 120}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: Math.random() * 0.7 + 0.1,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white rounded-full animate-float-up"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.animationDuration} linear infinite`,
            animationDelay: p.animationDelay,
            boxShadow: `0 0 ${p.size * 2}px white`,
          }}
        />
      ))}
    </div>
  );
};

const GridFloor = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-end justify-center overflow-hidden opacity-40 pointer-events-none">
      <div className="w-[200vw] h-[50vh] bg-transparent border-t border-fuchsia-500/30 relative perspective-grid">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000000_100%)] z-10"></div>
      </div>
    </div>
  );
};

const HoloRings = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 pointer-events-none opacity-60">
      <div className="absolute inset-0 border border-dashed border-cyan-400/50 rounded-full animate-spin-slow"></div>
      <div className="absolute inset-4 border border-fuchsia-500/40 rounded-full animate-spin-reverse-slower"></div>
    </div>
  );
};

const GlitchLogo = () => (
  <div className="relative group w-full max-w-md mx-auto">
    <img
      src="/landing/logo-white.svg"
      alt="DreamCrafters"
      className="relative z-10 w-full h-auto filter brightness-0 invert drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
    />
    <img
      src="/landing/logo-white.svg"
      alt="Glitch Layer 1"
      className="absolute top-0 left-0 -z-10 w-full h-auto filter brightness-0 invert opacity-50 animate-glitch-1 mix-blend-screen"
    />
    <img
      src="/landing/logo-white.svg"
      alt="Glitch Layer 2"
      className="absolute top-0 left-0 -z-10 w-full h-auto filter brightness-0 invert opacity-50 animate-glitch-2 mix-blend-screen"
    />
  </div>
);

// --- MAIN PAGE ---

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden text-white selection:bg-fuchsia-500 selection:text-white font-sans bg-black">

      {/* 1. LAYER: Background Deep Space */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_30%,_#1a0b2e_0%,_#000000_100%)] z-0"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-0 mix-blend-overlay"></div>

      {/* 2. LAYER: Effects */}
      <GridFloor />
      <Sparks />

      {/* NAV: Glass Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="h-6 md:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
            <img src="/landing/d-icon.svg" alt="Dreamcrafters Icon" className="h-full w-auto filter brightness-0 invert" />
          </div>
          <a href="https://wa.me/529845828658" target="_blank" className="hidden md:block bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-2 px-6 rounded-full text-[10px] md:text-xs tracking-widest uppercase transition-all hover:scale-105">
            Contacto
          </a>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20">

        {/* HERO SECTION */}
        <section className="w-full max-w-6xl px-4 flex flex-col items-center text-center mb-32">

          {/* Robot Floating */}
          <div className="relative w-[280px] md:w-[350px] aspect-square flex items-center justify-center animate-float-slow mb-6">
            <HoloRings />
            <div className="absolute w-[60%] h-[60%] bg-fuchsia-600/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
            <img src="/landing/hero-robot.webp" alt="Dreamcrafters Robot" className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] object-contain" />
          </div>

          {/* Headline */}
          <div className="relative mb-8 w-full">
            <GlitchLogo />
          </div>

          <h2 className="text-lg md:text-2xl font-light text-cyan-100/70 tracking-wide max-w-2xl mb-10 leading-relaxed px-4">
            Transformamos tu evento en una <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-bold">experiencia inmersiva</span>.
            <br className="hidden md:block" /> No es solo una invitación, es el inicio de la magia.
          </h2>

          {/* Main CTAs */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <a
              href="https://wa.me/529845828658"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full py-4 px-12 transition-all hover:scale-105 duration-300 shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative font-bold text-lg tracking-[0.2em] uppercase text-white">
                Cotiza tu Proyecto
              </span>
            </a>

            <Link href="/kermesse_cumbres" className="text-xs text-white/50 hover:text-white uppercase tracking-widest border-b border-white/20 hover:border-white transition-all pb-1">
              Ver Demo en Vivo
            </Link>
          </div>
        </section>


        {/* WHY US SECTION (Features) */}
        <section className="w-full max-w-7xl px-4 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 8.5v.01"></path><path d="M12 12.5v.01"></path><path d="M8.5 16.5v.01"></path><path d="M16 16.5v.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">100% Personalizado</h3>
              <p className="text-white/50 text-sm leading-relaxed">Olvídate de las plantillas. Diseñamos cada pixel para tu temática, desde mundos de Minecraft hasta Galas Elegantes.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-fuchsia-500/10 rounded-xl flex items-center justify-center mb-6 text-fuchsia-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(232,121,249,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Interactividad Total</h3>
              <p className="text-white/50 text-sm leading-relaxed">Tus invitados no solo leen, interactúan. Mapas GPS, cuentas regresivas y música de fondo sincronizada.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(74,222,128,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">RSVP Inteligente</h3>
              <p className="text-white/50 text-sm leading-relaxed">Gestiona tu lista sin estrés. Las confirmaciones llegan directo a tu WhatsApp con todos los detalles ordenados.</p>
            </div>
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section className="w-full max-w-6xl px-4 flex flex-col items-center mb-32">
          <h2 className="text-xs md:text-sm font-bold text-indigo-400 tracking-[0.4em] uppercase mb-16 flex items-center gap-4 animate-pulse">
            <span className="w-8 md:w-16 h-[1px] bg-indigo-500/50"></span>
            Nuestras Creaciones
            <span className="w-8 md:w-16 h-[1px] bg-indigo-500/50"></span>
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

            {/* PROJECT 1: KERMESSE */}
            <Link href="/kermesse_cumbres" className="group relative h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-cyan-500/20">
              {/* Background Image */}
              <div className="absolute inset-0 bg-black">
                <img src="/kermesse_cumbres/coco_v2.webp" alt="Kermesse" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-md">
                  <span className="text-cyan-300 text-[10px] font-bold uppercase tracking-wider">Web App Escolar</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase italic tracking-wider">Kermesse Cumbres</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 group-hover:text-gray-200 transition-colors">
                  Una experiencia masiva con mapa interactivo, cronómetro en tiempo real y cartelera de actividades animada.
                </p>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Explorar <span className="text-lg">→</span>
                </div>
              </div>
            </Link>

            {/* PROJECT 2: MINECRAFT */}
            <Link href="/invitacionminecraft/ian-level8" className="group relative h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-green-500/20">
              {/* Background Image */}
              <div className="absolute inset-0 bg-[#0a1a0a]">
                <div className="absolute right-0 bottom-0 w-[80%] h-[80%] opacity-80 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                  <img src="/sprites/creeper-3d.png" alt="Minecraft" className="w-full h-full object-contain object-bottom-right" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(0,0,0,0)_0%,_#000000_100%)]"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-md">
                  <span className="text-green-300 text-[10px] font-bold uppercase tracking-wider">Invitación Gamer</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase italic tracking-wider">Ian Level 8</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 group-hover:text-gray-200 transition-colors">
                  Mundo 3D inmersivo estilo Minecraft. Los invitados exploran el bioma para encontrar los detalles de la fiesta.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Jugar Demo <span className="text-lg">→</span>
                </div>
              </div>
            </Link>

          </div>
        </section>


        {/* FOOTER */}
        <footer className="w-full text-center border-t border-white/5 pt-16 pb-8">
          <div className="flex flex-col items-center gap-6 mb-8">
            <img src="/landing/logo-white.svg" alt="Dreamcrafters" className="h-6 w-auto filter brightness-0 invert opacity-30" />
            <p className="text-white/30 text-xs md:text-sm max-w-sm leading-relaxed">
              Diseñamos el futuro de las celebraciones. <br />CDMX · Cancún · Monterrey
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-8 justify-center mb-12 opacity-40">
            <a href="https://wa.me/529845828658" className="text-white hover:text-white transition-colors hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 5.242c-.121-.202-1.201-1.484-1.201-1.484-.337-.33-.507-.379-.657-.054-.161.348-.593 1.144-.725 1.255-.132.11-.264.135-.502.046-.7-.26-2.227-1.439-2.919-2.2-.569-.624-.316-.503-.453-.787-.046-.094.02-.191.077-.282.049-.079.135-.165.192-.262.131-.22.062-.439-.029-.624-.092-.186-.71-1.666-1.025-2.028-.215-.248-.386-.182-.507-.186-.109-.003-.228-.003-.357-.003s-.421.115-.623.332c-.201.218-.755.733-.755 1.789s.781 2.074.887 2.22c.106.145 1.536 2.341 3.718 3.284.519.224.925.358 1.24.457.518.163 1.019.204 1.409.117.439-.098 1.343-.548 1.531-1.078.188-.529.188-.985.133-1.078-.056-.094-.206-.151-.43-.263z" /></svg></a>
            <a href="https://www.facebook.com/dreamcrafters.ia/" className="text-white hover:text-white transition-colors hover:scale-110"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg></a>
          </div>

          <div className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
            © 2026 DreamCrafters Inc.
          </div>
        </footer>

      </main>

      {/* Global & Animation Styles */}
      <style jsx global>{`
        @keyframes glitch-anim-1 {
            0% { clip-path: inset(20% 0 80% 0); transform: translate(-10px, 5px) skew(5deg); }
            20% { clip-path: inset(60% 0 10% 0); transform: translate(10px, -5px) skew(-5deg); }
            40% { clip-path: inset(40% 0 50% 0); transform: translate(-10px, 10px) skew(10deg); }
            60% { clip-path: inset(80% 0 5% 0); transform: translate(10px, -10px) skew(-10deg); }
            80% { clip-path: inset(10% 0 70% 0); transform: translate(-5px, 5px) skew(5deg); }
            100% { clip-path: inset(30% 0 50% 0); transform: translate(5px, -5px) skew(-5deg); }
        }
        @keyframes glitch-anim-2 {
            0% { clip-path: inset(10% 0 60% 0); transform: translate(10px, -5px) skew(-5deg); }
            20% { clip-path: inset(80% 0 5% 0); transform: translate(-10px, 10px) skew(5deg); }
            40% { clip-path: inset(30% 0 20% 0); transform: translate(10px, 5px) skew(-10deg); }
            60% { clip-path: inset(10% 0 80% 0); transform: translate(-5px, -10px) skew(10deg); }
            80% { clip-path: inset(50% 0 30% 0); transform: translate(5px, 10px) skew(-5deg); }
            100% { clip-path: inset(20% 0 70% 0); transform: translate(-10px, 5px) skew(5deg); }
        }
        
        @keyframes flicker {
            0%, 90% { opacity: 0; }
            91%, 92% { opacity: 1; transform: scale(1.02); }
            93%, 94% { opacity: 0; }
            95%, 100% { opacity: 1; transform: scale(1.05) translateX(5px); }
        }

        .animate-glitch-1, .animate-glitch-2 {
            animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }
         .animate-glitch-2 {
            animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }

          @keyframes floatUp {
              0% { transform: translateY(110vh) translateX(0); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(-20px) translateX(20px); opacity: 0; }
          }
          .animate-float-up {
              will-change: transform, opacity;
          }
  
          @keyframes subtleFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
          }
          .animate-float-slow {
              animation: subtleFloat 6s ease-in-out infinite;
          }
  
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes spinReverse { 100% { transform: rotate(-360deg); } }
          
          .animate-spin-slow { animation: spin 10s linear infinite; }
          .animate-spin-reverse-slower { animation: spinReverse 15s linear infinite; }
          .animate-pulse-slow { animation: pulse 4s ease-in-out infinite; }
  
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
