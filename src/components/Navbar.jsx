import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/95 dark:bg-ink/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left">
          <div className="font-display text-xl font-light tracking-widest2 text-ink dark:text-cream uppercase">shot Flick</div>
          <div className="text-[10px] tracking-widest text-muted dark:text-stone font-body uppercase">Kishu</div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className="text-xs tracking-widest uppercase text-muted dark:text-stone hover:text-ink dark:hover:text-cream transition-colors duration-200 font-body">
              {l}
            </button>
          ))}
          <button onClick={toggleTheme} className="text-muted dark:text-stone hover:text-ink dark:hover:text-cream transition-colors">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => scrollTo('Contact')}
            className="text-xs tracking-widest uppercase px-5 py-2.5 border border-ink dark:border-cream text-ink dark:text-cream hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink transition-all duration-300 font-body">
            Book Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-muted dark:text-stone">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-5 h-px bg-ink dark:bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-ink dark:bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-ink dark:bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream dark:bg-ink border-t border-stone/30 dark:border-stone/10 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className="text-sm tracking-widest uppercase text-muted dark:text-stone hover:text-ink dark:hover:text-cream text-left font-body">
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
