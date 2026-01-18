"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Componente para las chispas/estrellas flotantes
const Sparks = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generamos particulas aleatorias SOLO en el cliente para evitar error de hidratacion
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 8}s`, // Flotan lento entre 8 y 13 seg
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.6 + 0.2,
      size: Math.random() * 3 + 1, // Tamaño variable
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
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.8)`
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden text-white px-4 selection:bg-cyan-500 selection:text-black font-sans">

      {/* 1. FONDO: Gradiente Espacial (Sin imagen) */}
      {/* Imitando el vibe neon/espacial: Morado oscuro -> Negro */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4a148c] via-[#1a0b2e] to-[#000000] z-0"></div>

      {/* Capa extra para oscurecer abajo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

      {/* 2. EFECTO: Chispas flotando */}
      <Sparks />

      {/* Navbar */}
      <nav className="w-full py-6 flex justify-between items-center z-50 max-w-7xl mx-auto">
        {/* Logo en esquina (Blanco Puro con filtro) */}
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
        <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center animate-float-slow z-20">
          {/* Un brillo detras del robot para que resalte del fondo oscuro */}
          <div className="absolute w-[60%] h-[60%] bg-purple-600/30 rounded-full blur-[60px] -z-10 animate-pulse"></div>

          <img
            src="/landing/robot-hero.png"
            alt="Dreamcrafters Robot"
            className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] object-contain"
          />
        </div>

        {/* LOGO CENTRAL (Blanco, debajo del robot) */}
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
            {/* Gradiente del boton */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>

            {/* Texto */}
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
      `}</style>

    </div>
  );
}
