import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full py-6 px-8 flex justify-between items-center z-50 relative">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-yellow tracking-wider font-bebas text-4xl">
          DREAMCRAFTERS
        </div>
        <div className="hidden md:flex space-x-8 text-white font-outfit">
          <a href="#services" className="hover:text-brand-cyan transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-brand-cyan transition-colors">Portfolio</a>
          <a href="#about" className="hover:text-brand-cyan transition-colors">About</a>
        </div>
        <button className="bg-brand-cyan text-brand-blue font-bold py-2 px-6 rounded-full hover:bg-white transition-all shadow-lg hover:shadow-brand-cyan/50">
          Request Quote
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center text-center py-20 px-4 min-h-[80vh]">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl -z-10"></div>

        {/* Main Content */}
        <div className="border-4 border-brand-cyan p-1 rounded-2xl rotate-[-2deg] mb-8 bg-brand-blue/80 backdrop-blur-sm">
          <div className="bg-brand-cyan text-brand-blue px-8 py-2 font-bold text-2xl uppercase tracking-widest">
            Invitations
          </div>
        </div>

        <h1 className="text-8xl md:text-[10rem] leading-none mb-4 tracking-tighter text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          DREAM<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">CRAFTERS</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 font-light">
          Transforming events into unforgettable memories with custom, <span className="text-brand-yellow font-bold">creative invitations</span>.
        </p>

        <div className="flex gap-4">
          <button className="bg-brand-yellow text-brand-blue font-bold text-xl py-4 px-8 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(251,191,36,0.5)]">
            Explore Designs
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-8 bg-brand-blue/50 relative">
        <div className="absolute w-full h-20 -top-10 bg-brand-blue skew-y-2 z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-6xl text-center mb-16 text-brand-cyan">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Weddings", icon: "💍", desc: "Bespoke invitations that capture your unique love story." },
              { title: "Birthdays", icon: "🎂", desc: "Fun and vibrant designs to make every birthday special." },
              { title: "Events", icon: "🎉", desc: "Professional and impactful invitations for business gatherings." },
            ].map((service, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-brand-pink/10 transition-colors hover:border-brand-pink/50">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-3xl mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-20 px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl text-center mb-16 text-white">Portfolio Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue to-transparent opacity-80 z-10"></div>
                <div className="absolute bottom-0 left-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h4 className="text-2xl text-white mb-1">Project {item}</h4>
                  <button className="text-brand-yellow text-sm font-bold uppercase tracking-wider">View Project &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8 bg-brand-pink text-white relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl mb-8">Ready to Start?</h2>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="bg-white/20 border-0 rounded-lg p-4 text-white placeholder-white/70 focus:ring-2 focus:ring-brand-yellow outline-none" />
              <input type="email" placeholder="Email Address" className="bg-white/20 border-0 rounded-lg p-4 text-white placeholder-white/70 focus:ring-2 focus:ring-brand-yellow outline-none" />
              <textarea placeholder="Message" className="col-span-1 md:col-span-2 bg-white/20 border-0 rounded-lg p-4 text-white placeholder-white/70 focus:ring-2 focus:ring-brand-yellow outline-none h-32"></textarea>
              <button className="col-span-1 md:col-span-2 bg-brand-yellow text-brand-blue font-bold text-xl py-4 rounded-lg hover:bg-white transition-colors">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-gray-500 font-outfit">
        © 2026 DreamCrafters. All rights reserved.
      </footer>
    </div>
  );
}
