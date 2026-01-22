"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Componente para las chispas/estrellas flotantes
const Sparks = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generamos particulas aleatorias SOLO en el cliente
    // MAS DRAMATICO: Mas particulas, mas rapidas, mas grandes
    const newParticles = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 120}%`, // Empiezan mas abajo incluso
      animationDuration: `${Math.random() * 4 + 4}s`, // Mas rapidas (4-8s)
      animationDelay: `${Math.random() * 2}s`,
      opacity: Math.random() * 0.8 + 0.2,
      size: Math.random() * 4 + 1, // Hasta 5px
      blur: Math.random() > 0.5 ? 'blur-[1px]' : '', // Algunas desenfocadas para profundidad
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
            boxShadow: `0 0 ${p.size * 3}px rgba(255, 100, 255, 0.9)`, // Brillo rosado
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


// Componente Logo con Glitch
const GlitchLogo = () => {
  return (
    <div className="relative w-full h-auto group">

      {/* Capa 1: Fantasma Rojo/Cian */}
      <img
        src="/landing/logo-text.png"
        alt="Glitch Layer 1"
        className="absolute inset-0 w-full h-auto filter brightness-0 invert opacity-70 animate-glitch-1 mix-blend-hard-light"
        style={{ clipPath: 'inset(10% 0 80% 0)' }}
      />

      {/* Capa 2: Fantasma Azul/Magenta */}
      <img
        src="/landing/logo-text.png"
        alt="Glitch Layer 2"
        className="absolute inset-0 w-full h-auto filter brightness-0 invert opacity-70 animate-glitch-2 mix-blend-hard-light"
        style={{ clipPath: 'inset(80% 0 5% 0)' }}
      />

      {/* Capa Base: Logo Principal */}
      <img
        src="/landing/logo-text.png"
        alt="Artificialmente hechos a mano"
        className="relative w-full h-auto filter brightness-0 invert drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden text-white px-4 selection:bg-fuchsia-500 selection:text-white font-sans">

      {/* 1. FONDO: Gradiente Nebulosa Dramatico */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_#d500f9_0%,_#4a148c_40%,_#000000_90%)] z-0 opacity-80"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#000000_100%)] z-0"></div>

      {/* 2. WIREFRAME: Suelo Digital */}
      <GridFloor />

      {/* 3. EFECTO: Chispas flotando */}
      <Sparks />

      {/* Navbar */}
      <nav className="w-full py-6 flex justify-between items-center z-50 max-w-7xl mx-auto">
        {/* Logo en esquina */}
        <div className="h-8 md:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
          <img
            src="/landing/logo-text.png"
            alt="Dreamcrafters Logo"
            className="h-full w-auto filter brightness-0 invert"
          />
        </div>

        <Link
          href="/form"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold py-2 px-6 rounded-full transition-all text-xs md:text-sm tracking-wider uppercase"
        >
          Contacto
        </Link>
      </nav>

      {/* Contenido Principal */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-6xl mt-4 md:mt-8">

        {/* ROBOT HERO (Al Frente) */}
        <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-square flex items-center justify-center animate-float-slow z-20">

          {/* WIREFRAME: Anillos detras del robot */}
          <HoloRings />

          {/* Un brillo detras del robot para que resalte del fondo oscuro */}
          <div className="absolute w-[60%] h-[60%] bg-purple-600/30 rounded-full blur-[60px] -z-10 animate-pulse"></div>

          <img
            src="/landing/robot-hero.webp"
            alt="Dreamcrafters Robot"
            className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] object-contain"
          />
        </div>


        {/* LOGO CENTRAL CON GLITCH */}
        <div className="relative w-full max-w-[500px] md:max-w-[600px] -mt-16 md:-mt-24 z-30 mb-8 flex flex-col items-center">

          <GlitchLogo />

        </div>

        {/* Boton CTA */}
        <div className="z-30 mb-8 flex flex-col items-center gap-6">
          <a
            href="https://wa.me/529845828658"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full py-4 px-10 transition-all hover:scale-105 duration-300 shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative font-bold text-lg tracking-widest uppercase drop-shadow-md">
              Cotiza tu invitación
            </span>
          </a>

          {/* Nuevo Boton Imagen al Formulario */}
          <Link
            href="/form"
            className="transition-transform duration-300 hover:scale-105 hover:brightness-110"
          >
            <img
              src="https://www.dreamcrafters.lat/sprites/title-fiesta.webp"
              alt="Crear Invitacion Fiesta"
              className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
            />
          </Link>
        </div>

        {/* REDES SOCIALES (NUEVO) */}
        <div className="flex gap-8 z-30 mb-12 opacity-80 items-center">
          {/* Facebook - Visualmente adjusted */}
          <a
            href="https://www.facebook.com/dreamcrafters.ia/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1877F2] transition-colors duration-300 transform hover:scale-110"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-md w-6 h-6">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* WhatsApp - Visualmente adjusted (Slightly larger to match visual weight) */}
          <a
            href="https://wa.me/529845828658"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#25D366] transition-colors duration-300 transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-md w-[28px] h-[28px]">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461 1.993 0 3.866.778 5.275 2.188a7.432 7.432 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.149.224-.579.73-.709.88-.131.149-.261.169-.486.056-.224-.113-.953-.351-1.815-1.12-.669-.595-1.12-1.329-1.252-1.554-.131-.225-.014-.346.099-.458.101-.1.224-.261.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.377-.504-.383-.131-.006-.28-.006-.429-.006-.149 0-.393.056-.599.28-.206.225-.785.767-.785 1.871s.804 2.171.916 2.32c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.206-.15-.43-.262" />
            </svg>
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-[10px] text-white/30 tracking-widest uppercase">
        © 2026 DreamCrafters Inc.
      </footer>

      {/* Estilos Globales para animacion */}
      <style jsx global>{`
        /* GLITCH LOGO ANIMATIONS - INTENSIFIED */
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
        
        /* FREQUENCY increased */
        @keyframes flicker {
            0%, 90% { opacity: 0; }
            91%, 92% { opacity: 1; transform: scale(1.02); }
            93%, 94% { opacity: 0; }
            95%, 100% { opacity: 1; transform: scale(1.05) translateX(5px); }
        }
        
        .animate-glitch-1, .animate-glitch-2 {
            display: block;
            animation: glitch-anim-1 0.4s cubic-bezier(.25, .46, .45, .94) both infinite, flicker 2.5s infinite;
        }
         .animate-glitch-2 {
            animation: glitch-anim-2 0.4s cubic-bezier(.25, .46, .45, .94) both infinite, flicker 2.5s infinite;
            animation-delay: 0.1s; /* Slight Phase shift */
        }

        
        /* OTRAS ANIMACIONES PREVIAS */
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
