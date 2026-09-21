import { motion } from 'framer-motion';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-cream dark:bg-ink">
      {/* Video Background */}
      <video 
        autoPlay loop muted playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
      </video>
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-cream/70 dark:bg-ink/80 transition-colors duration-500" />

      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[18vw] font-light text-stone/20 dark:text-cream/10 leading-none tracking-tight whitespace-nowrap">
          FLICKS
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-xs tracking-widest2 uppercase text-muted dark:text-stone font-body mb-6"
        >
          Photography · Videography · Pre-wedding
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="font-display text-6xl md:text-8xl font-light text-ink dark:text-cream leading-none mb-4 transition-colors"
        >
          shot<br />
          <em className="italic text-muted">Flicks</em>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="font-body text-base text-muted dark:text-stone font-light max-w-md mx-auto mb-12 leading-relaxed"
        >
          Stories told through light and motion — by Kishan Kumar T G, based in Davangere, Karnataka
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={() => scrollTo('portfolio')}
            className="px-8 py-3.5 bg-ink dark:bg-cream text-cream dark:text-ink text-xs tracking-widest uppercase font-body hover:bg-muted dark:hover:bg-stone transition-colors duration-300">
            View Work
          </button>
          <button onClick={() => scrollTo('contact')}
            className="px-8 py-3.5 border border-stone dark:border-cream/50 text-ink dark:text-cream text-xs tracking-widest uppercase font-body hover:border-ink dark:hover:border-cream transition-colors duration-300">
            Book a Shoot
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest uppercase text-stone font-body">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-stone to-transparent" />
      </motion.div>
    </section>
  );
}
