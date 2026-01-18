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

        {/* LOGO CENTRAL */}
        <div className="relative w-full max-w-[500px] md:max-w-[600px] -mt-16 md:-mt-24 z-30 mb-8 flex flex-col items-center">
          <img
            src="/landing/logo-text.png"
            alt="Artificialmente hechos a mano"
            className="w-full h-auto filter brightness-0 invert drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Boton CTA */}
        <div className="z-30 mb-20">
          <Link
            href="/form"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full py-4 px-10 transition-all hover:scale-105 duration-300 shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative font-bold text-lg tracking-widest uppercase drop-shadow-md">
              Crear Invitación
            </span>
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-[10px] text-white/30 tracking-widest uppercase">
        © 2026 DreamCrafters Inc.
      </footer>

      {/* Estilos Globales para animacion */}
      <style jsx global>{`
        /* Animaciones para Sparks */
        @keyframes floatUp {
            0% { transform: translateY(110vh) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-20px) translateX(20px); opacity: 0; }
        }
        .animate-float-up {
            will-change: transform, opacity;
        }
        
        /* Animacion Robot */
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
