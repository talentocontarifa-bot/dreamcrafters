import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-black text-white px-4">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing/background-space.jpg"
          alt="Space Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
      </div>

      {/* Navbar (Minimal) */}
      <nav className="w-full py-6 flex justify-between items-center z-50 max-w-7xl mx-auto px-4">
        {/* Placeholder for small logo if needed, sticking to minimal text for now */}
        <div className="font-bebas text-2xl tracking-widest opacity-80">DREAMCRAFTERS</div>
        <Link
          href="/form"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold py-2 px-6 rounded-full transition-all font-outfit text-sm"
        >
          CONTACTER
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-5xl -mt-10">

        {/* Robot Hero Image */}
        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center animate-float-slow">
          <img
            src="/landing/robot-hero.png"
            alt="Dreamcrafters Robot"
            className="w-full h-auto drop-shadow-[0_0_50px_rgba(100,200,255,0.4)]"
          />
        </div>

        {/* Logo Text Image - Slightly overlapping the robot or just below */}
        <div className="relative w-full max-w-[800px] -mt-20 md:-mt-32">
          <img
            src="/landing/logo-text.png"
            alt="Artificialmente hechos a mano"
            className="w-full h-auto drop-shadow-lg filter brightness-110 contrast-125"
          />
        </div>

        {/* Call to Action */}
        <div className="mt-12 flex gap-6">
          <Link
            href="/form"
            className="bg-brand-cyan text-brand-blue font-bold text-xl py-4 px-12 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,188,212,0.6)] font-outfit"
          >
            CREAR INVITACIÓN
          </Link>
        </div>

      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-gray-400 font-outfit opacity-60">
        © 2026 DreamCrafters Inc.
      </footer>

    </div>
  );
}
