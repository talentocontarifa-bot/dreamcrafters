"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {

  // Script para el Toast y Glitch
  const showToast = () => {
    const t = document.getElementById('toast');
    if (t) {
      t.style.display = 'block';
      setTimeout(() => {
        t.style.display = 'none';
      }, 3000);
    }
  };

  useEffect(() => {
    // Año dinámico en footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

    // Glitch effect random para galería
    const images = document.querySelectorAll<HTMLImageElement>('.gallery-img');
    const interval = setInterval(() => {
      const randomImg = images[Math.floor(Math.random() * images.length)];
      if (randomImg) {
        randomImg.style.filter = 'hue-rotate(90deg) contrast(1.5)';
        setTimeout(() => {
          randomImg.style.filter = ''; // Reset
        }, 200);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Styles Injected Locally to match the raw HTML request */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=VT323&display=swap');

        :root{
          --bg: #050510;
          --text: #e0e0e0;
          --neon-pink: #ff00ff;
          --neon-cyan: #00ffff;
          --neon-yellow: #ffff00;
          --grid-color: rgba(255, 0, 255, 0.2);
          
          --glass-bg: rgba(10, 10, 20, 0.7);
          --border-glow: 0 0 10px rgba(0, 255, 255, 0.5);
          
          --max-w: 1200px;
        }

        /* Base Reset */
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: 'VT323', monospace; /* Retro styling */
          font-size: 20px;
          color: var(--text);
          background-color: var(--bg);
          overflow-x: hidden;
          line-height: 1.4;
        }

        /* Retro Grid Background */
        .retro-grid {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: -1;
          background: 
            linear-gradient(transparent 65%, rgba(0,0,0,1) 95%), /* Fade out horizon */
            linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px);
          background-size: 100% 100%, 40px 40px, 40px 40px;
          background-position: center bottom;
          transform: perspective(500px) rotateX(60deg) translateY(-100px) scale(3);
          animation: gridMove 4s linear infinite;
          opacity: 0.4;
          pointer-events: none;
        }
        
        .scanline {
          position: fixed; top:0; left:0; width:100%; height:100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
          background-size: 100% 4px;
          z-index: 999;
          pointer-events: none;
          opacity: 0.3;
        }

        @keyframes gridMove {
          0% { background-position: center 0, 0 0, 0 0; }
          100% { background-position: center 0, 0 40px, 0 40px; }
        }

        h1, h2, h3, h4 {
          margin: 0;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        h1 { 
          font-size: clamp(40px, 6vw, 70px); 
          text-shadow: 2px 2px 0px var(--neon-pink), -2px -2px 0px var(--neon-cyan);
          margin-bottom: 20px;
        }
        h2 { 
          font-size: clamp(28px, 4vw, 40px); margin-bottom: 12px; 
          color: var(--neon-yellow);
          text-shadow: 0 0 10px var(--neon-yellow);
        }
        
        a { text-decoration: none; color: inherit; transition: all 0.2s; }
        img { max-width: 100%; display: block; }
        
        .container {
          width: min(var(--max-w), calc(100% - 40px));
          margin: 0 auto;
        }

        /* UI Components: Cyberpunk Style */
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 12px 28px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.2s;
          position: relative;
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        .btn-primary {
          background: var(--neon-cyan);
          color: #000;
          border: none;
          box-shadow: 0 0 15px var(--neon-cyan);
        }
        .btn-primary:hover {
          background: white;
          box-shadow: 0 0 25px white;
          transform: translateY(-2px);
        }
        .btn-outline {
          background: transparent;
          border: 2px solid var(--neon-pink);
          color: var(--neon-pink);
          box-shadow: 0 0 10px var(--neon-pink);
        }
        .btn-outline:hover {
          background: var(--neon-pink);
          color: #000;
        }

        /* Cyber Panels */
        .cyber-panel {
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid var(--neon-cyan);
          padding: 20px;
          position: relative;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
        }
        /* Decorative corners */
        .cyber-panel::before {
          content: ''; position: absolute; top: -1px; left: -1px; width: 20px; height: 20px;
          border-top: 2px solid var(--neon-cyan); border-left: 2px solid var(--neon-cyan);
        }
        .cyber-panel::after {
          content: ''; position: absolute; bottom: -1px; right: -1px; width: 20px; height: 20px;
          border-bottom: 2px solid var(--neon-cyan); border-right: 2px solid var(--neon-cyan);
        }

        /* Header */
        header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 0;
          background: rgba(5, 5, 16, 0.9);
          border-bottom: 1px solid rgba(255, 0, 255, 0.3);
          backdrop-filter: blur(5px);
        }
        .nav-wrap { display: flex; justify-content: space-between; align-items: center; }
        
        .logo {
          font-family: 'Orbitron', sans-serif;
          font-size: 24px;
          font-weight: 900;
          color: white;
          text-transform: uppercase;
          letter-spacing: 3px;
          display: flex; align-items: center; gap: 10px;
        }
        .logo span { color: var(--neon-pink); }

        .nav-links { display: flex; gap: 32px; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; }
        .nav-links a:hover { color: var(--neon-cyan); text-shadow: 0 0 8px var(--neon-cyan); }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex; align-items: center;
          padding-top: 100px;
          position: relative;
        }
        .hero-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
        }
        
        .glitch-text {
          position: relative;
        }
        /* Simple glitch effect using text-shadow shift */
        .glitch-text:hover {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .hero-content p {
          font-size: 22px; color: #b0b0b0; margin-bottom: 32px; max-width: 500px;
          border-left: 3px solid var(--neon-yellow);
          padding-left: 20px;
        }

        /* Hologram Card */
        .holo-card-container {
          perspective: 1000px;
        }
        .holo-card {
          background: rgba(20, 20, 40, 0.6);
          border: 2px solid var(--neon-pink);
          border-radius: 20px;
          padding: 20px;
          transform: rotateY(-15deg) rotateX(10deg);
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.4), inset 0 0 20px rgba(255, 0, 255, 0.2);
          transition: transform 0.5s;
          position: relative;
        }
        .holo-card:hover {
          transform: rotateY(0deg) rotateX(0deg) scale(1.02);
        }
        .holo-screen {
          background: linear-gradient(180deg, #1a0525, #000);
          border: 1px solid #333;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 9/16;
          position: relative;
        }
        .holo-content {
          padding: 30px 20px;
          text-align: center;
          height: 100%;
          display: flex; flex-direction: column; justify-content: space-between;
          background-image: 
            radial-gradient(circle at 50% 20%, rgba(255,0,255,0.2), transparent 50%),
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .05) 25%, rgba(0, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .05) 75%, rgba(0, 255, 255, .05) 76%, transparent 77%, transparent);
          background-size: 100% 100%, 100% 30px;
        }

        /* Features Grid */
        section { padding: 100px 0; }
        .feature-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 50px;
        }
        .feature-card {
          transition: transform 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
          background: rgba(0, 20, 20, 0.8);
        }
        .icon-box {
          font-size: 40px; margin-bottom: 20px;
          text-shadow: 0 0 10px var(--neon-cyan);
        }

        /* Gallery */
        .gallery-filter {
          display: flex; gap: 15px; justify-content: center; margin-bottom: 40px; flex-wrap: wrap;
        }
        .filter-btn {
          padding: 10px 25px;
          background: #000;
          border: 1px solid #555;
          color: #888;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s;
        }
        .filter-btn.active, .filter-btn:hover {
          border-color: var(--neon-yellow);
          color: var(--neon-yellow);
          box-shadow: 0 0 10px var(--neon-yellow);
        }

        .gallery-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .gallery-item {
          aspect-ratio: 1/1;
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
          transition: all 0.3s;
        }
        .gallery-item:hover {
          border-color: var(--neon-pink);
          box-shadow: 0 0 20px var(--neon-pink);
        }
        .gallery-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(100%) contrast(1.2);
          transition: all 0.3s;
        }
        .gallery-item:hover .gallery-img {
          filter: grayscale(0%) contrast(1.1);
          transform: scale(1.1);
        }

        /* Contact Form */
        .form-input {
          width: 100%; padding: 18px; margin-bottom: 15px;
          background: rgba(0,0,0,0.8);
          border: 1px solid #333;
          border-left: 4px solid var(--neon-cyan);
          color: var(--neon-cyan);
          font-family: 'VT323', monospace;
          font-size: 22px;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--neon-pink);
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.2);
        }
        ::placeholder { color: #555; }

        /* Footer */
        footer { 
          border-top: 2px solid var(--neon-cyan); 
          background: black;
          padding: 40px 0; 
          margin-top: 50px;
          text-align: center;
          color: #666;
        }

        /* Utilities */
        .text-pink { color: var(--neon-pink); text-shadow: 0 0 5px var(--neon-pink); }
        .text-cyan { color: var(--neon-cyan); text-shadow: 0 0 5px var(--neon-cyan); }
        
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .hero-content p { margin: 0 auto 30px auto; border: none; }
          .nav-links { display: none; }
          .hero-logo { margin: 0 auto 30px auto !important; }
        }

        .hero-logo {
          width: 300px; max-width: 80%;
          margin-bottom: 30px;
          filter: brightness(0) invert(1);
          display: block;
        }
        
        .glitch-logo {
          animation: glitch 5s infinite;
        }
        
        /* Toast */
        .toast {
          position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
          background: black; border: 2px solid var(--neon-yellow); color: var(--neon-yellow);
          padding: 15px 30px; font-family: 'VT323', monospace; font-size: 24px;
          box-shadow: 0 0 15px var(--neon-yellow);
          display: none; z-index: 2000;
        }
      `}</style>

      {/* Retro Moving Grid */}
      <div className="retro-grid"></div>
      {/* CRT Scanline Effect */}
      <div className="scanline"></div>

      <header>
        <div className="container nav-wrap">
          <div className="logo">
            <img src="/landing/d-icon.svg" alt="DreamCrafters Icon" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />

          </div>
          <nav className="nav-links">
            <a href="#services">Servicios</a>
            <a href="#gallery">Galería</a>
            <a href="#contact">Start_Project</a>
          </nav>
          <a href="#contact" className="btn btn-primary">Crear_Invitación</a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <img
                src="/landing/logo-white.svg"
                alt="DreamCrafters"
                style={{ width: '300px', maxWidth: '80%', marginBottom: '30px', filter: 'brightness(0) invert(1)', display: 'block', margin: '0 auto 30px auto' }}
              />
              <h1 className="glitch-text" style={{ fontWeight: 900 }}>Tus Eventos <br /><span className="text-cyan">Suben de Nivel</span></h1>
              <p>
                &gt; Inicializando protocolo de fiesta...<br />
                Invitaciones digitales interactivas, mapas en tiempo real y confirmación instantánea. El futuro de tu evento empieza aquí.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <a href="#contact" className="btn btn-primary">INSERT COIN TO START</a>
                <a href="#services" className="btn btn-outline">TUTORIAL</a>
              </div>
            </div>

            <div className="hero-visual holo-card-container" style={{ position: 'relative' }}>
              {/* ROBOT HERO (Al Frente) */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                left: '-20px',
                width: '110%',
                zIndex: 50,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
              }}>
                <img
                  src="/landing/hero-robot.webp"
                  alt="DreamCrafters Robot"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div className="holo-card">
                <div className="holo-screen">
                  <div className="holo-content">
                    <div style={{ borderBottom: '2px dashed var(--neon-cyan)', paddingBottom: '10px' }}>
                      <small style={{ color: 'var(--neon-pink)' }}>NEW_EVENT DETECTED</small>
                      <h2 style={{ fontSize: '32px', margin: '10px 0' }}>ISABELLA & MATEO</h2>
                      <div style={{ fontSize: '18px', color: 'var(--neon-cyan)' }}>&gt;&gt; TULUM_BEACH_CLUB &lt;&lt;</div>
                    </div>

                    <div style={{ fontSize: '60px', lineHeight: 1 }}>👾</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ border: '1px solid #333', padding: '5px', fontSize: '16px' }}>
                        DATE<br /><span style={{ color: 'white' }}>OCT 14</span>
                      </div>
                      <div style={{ border: '1px solid #333', padding: '5px', fontSize: '16px' }}>
                        TIME<br /><span style={{ color: 'white' }}>18:00</span>
                      </div>
                    </div>

                    <div style={{ background: 'var(--neon-pink)', color: 'black', padding: '10px', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer' }}>
                      [ PRESS TO RSVP ]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 className="text-pink">Módulos de Sistema</h2>
              <p>Potenciadores instalados para asegurar el éxito de la misión.</p>
            </div>

            <div className="feature-grid">
              <div className="cyber-panel feature-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
                <div style={{ fontSize: '30px' }}>⏳</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'var(--neon-yellow)' }}>Countdown</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>Cuenta regresiva al segundo.</p>
                </div>
              </div>

              <div className="cyber-panel feature-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
                <div style={{ fontSize: '30px' }}>📍</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'var(--neon-yellow)' }}>Ubicación GPS</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>Google Maps & Waze directo.</p>
                </div>
              </div>

              <div className="cyber-panel feature-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
                <div style={{ fontSize: '30px' }}>💬</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'var(--neon-yellow)' }}>WhatsApp RSVP</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>Confirmación en un click.</p>
                </div>
              </div>

              <div className="cyber-panel feature-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
                <div style={{ fontSize: '30px' }}>📅</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'var(--neon-yellow)' }}>Agendar</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>“Add to Calendar” automático.</p>
                </div>
              </div>

              <div className="cyber-panel feature-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
                <div style={{ fontSize: '30px' }}>✉️</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'var(--neon-yellow)' }}>Mensajes</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>Libro de firmas digital.</p>
                </div>
              </div>

              <div className="cyber-panel feature-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
                <div style={{ fontSize: '30px' }}>✨</div>
                <div>
                  <h3 style={{ fontSize: '20px', marginBottom: '5px', color: 'var(--neon-yellow)' }}>Y Mucho Más</h3>
                  <p style={{ fontSize: '16px', margin: 0 }}>Spotify, Dresscode, Hoteles...</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery">
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Archivo de Misiones</h2>

            <div className="gallery-filter">
              <button className="filter-btn active">ALL</button>
            </div>

            <div className="gallery-grid">
              {/* Minecraft Invitation */}
              <a
                href="https://www.dreamcrafters.lat/invitacionminecraft/ian-level8"
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-item"
                style={{ display: 'block' }}
              >
                <img
                  src="https://www.dreamcrafters.lat/sprites/title-fiesta.webp"
                  alt="Minecraft Party Invitation"
                  className="gallery-img"
                  style={{ objectFit: 'contain', background: 'rgba(0,0,0,0.5)' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '10px', background: 'rgba(0,0,0,0.8)', color: 'white', textAlign: 'center', fontSize: '14px' }}>
                  IAN LEVEL 8 - VER DEMO
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="cyber-panel" style={{ textAlign: 'center', padding: '60px' }}>
              <h2 className="text-cyan">¿Listo para Iniciar?</h2>
              <p style={{ marginBottom: '30px' }}>Ingresa tus datos para generar el código de tu invitación.</p>

              <form onSubmit={(e) => {
                e.preventDefault();
                const nameEl = document.getElementById('userName') as HTMLInputElement;
                const modeEl = document.getElementById('userMode') as HTMLSelectElement;
                if (nameEl && modeEl) {
                  const msg = `Hola, soy ${nameEl.value}. Me interesa: ${modeEl.value}.`;
                  window.open(`https://wa.me/529845828658?text=${encodeURIComponent(msg)}`, '_blank');
                }
              }}>
                <input id="userName" type="text" className="form-input" placeholder="> Nombre_Usuario" required />
                <select id="userMode" className="form-input" style={{ color: '#aaa' }}>
                  <option value="">&gt; Seleccionar_Modo...</option>
                  <option value="Invitación Minecraft">Invitación Minecraft</option>
                  <option value="Cotizar diseño personalizado">Cotizar diseño personalizado</option>
                </select>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '18px' }}>
                  [ EJECUTAR ]
                </button>
              </form>
              <option>Fiesta_Retro</option>
              <option>Evento_Privado</option>
            </select>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '18px' }}>
              [ EJECUTAR ]
            </button>
          </form>
        </div>
      </div>
    </section >

      {/* Footer */ }
      < footer >
      <div className="container">
        <b style={{ fontFamily: "'Orbitron', sans-serif", color: 'white', fontSize: '24px' }}>DREAMCRAFTERS</b>
        <div style={{ marginTop: '10px' }}>© <span id="year"></span> SYSTEM_VER_2.0</div>
        <div style={{ marginTop: '20px', fontSize: '16px' }}>
          <a href="https://www.facebook.com/dreamcrafters.ia/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>[ FACEBOOK ]</a>
          <a href="https://www.tiktok.com/@dreamcrafters_mx" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>[ TIKTOK ]</a>
        </div>
      </div>
        </footer >

      </main >

    <div id="toast" className="toast">
      &gt; MENSAJE TRANSMITIDO CON ÉXITO_
    </div>
    </>
  );
}
