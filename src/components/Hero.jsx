export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-cream">
      {/* Background texture / subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#1A1814 0,#1A1814 1px,transparent 0,transparent 60px),repeating-linear-gradient(90deg,#1A1814 0,#1A1814 1px,transparent 0,transparent 60px)' }} />

      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[18vw] font-light text-stone/10 leading-none tracking-tight whitespace-nowrap">
          FLICKS
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="animate-fade-up animate-delay-1 text-xs tracking-widest2 uppercase text-muted font-body mb-6">
          Photography · Videography · Pre-wedding
        </p>

        <h1 className="animate-fade-up animate-delay-2 font-display text-6xl md:text-8xl font-light text-ink leading-none mb-4">
          shot<br />
          <em className="italic text-muted">Flicks</em>
        </h1>

        <p className="animate-fade-up animate-delay-3 font-body text-base text-muted font-light max-w-md mx-auto mb-12 leading-relaxed">
          Stories told through light and motion — by Kishan Kumar T G, based in Davangere, Karnataka
        </p>

        <div className="animate-fade-up animate-delay-4 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo('portfolio')}
            className="px-8 py-3.5 bg-ink text-cream text-xs tracking-widest uppercase font-body hover:bg-muted transition-colors duration-300">
            View Work
          </button>
          <button onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 border border-stone text-ink text-xs tracking-widest uppercase font-body hover:border-ink transition-colors duration-300">
            Book a Shoot
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animate-delay-4">
        <span className="text-[10px] tracking-widest uppercase text-stone font-body">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-stone to-transparent" />
      </div>
    </section>
  );
}
