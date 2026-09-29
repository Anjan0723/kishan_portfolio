import { useState, useEffect } from 'react';

export default function StickyContactBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // scroll-past-400px pattern
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`hidden md:flex fixed bottom-0 left-0 w-full z-50 bg-ink border-t border-accent/20 px-6 py-3 items-center justify-between transition-all duration-500 ease-in-out motion-reduce:transition-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      style={{
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
      }}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <span className="font-display text-cream text-lg italic tracking-wide">
          Ready to tell your story?
        </span>
        <div className="flex gap-6 items-center">
          <a
            href="https://wa.me/919113579050"
            target="_blank"
            rel="noreferrer"
            className="font-body text-xs tracking-widest uppercase text-accent hover:text-cream transition-colors duration-300"
          >
            WhatsApp
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-body text-xs tracking-widest uppercase bg-accent text-ink px-4 py-2 hover:bg-cream transition-colors duration-300"
          >
            Book a Shoot
          </button>
        </div>
      </div>
    </div>
  );
}
