import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Portfolio', 'Services', 'About', 'Testimonials', 'Contact'];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left">
          <div className="font-display text-xl font-light tracking-widest2 text-ink uppercase">shot Flicks</div>
          <div className="text-[10px] tracking-widest text-muted font-body uppercase">Kishan Kumar T G</div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className="text-xs tracking-widest uppercase text-muted hover:text-ink transition-colors duration-200 font-body">
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo('Contact')}
            className="text-xs tracking-widest uppercase px-5 py-2.5 border border-ink text-ink hover:bg-ink hover:text-cream transition-all duration-300 font-body">
            Book Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-stone/30 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className="text-sm tracking-widest uppercase text-muted hover:text-ink text-left font-body">
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
