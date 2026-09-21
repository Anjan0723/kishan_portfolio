import { motion } from 'framer-motion';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-cream dark:bg-ink">
      {/* Animated Floating Background Texts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {[
          { top: '10%', left: '-5%', size: '15vw', delay: 0 },
          { top: '60%', left: '80%', size: '10vw', delay: 2 },
          { top: '80%', left: '10%', size: '20vw', delay: 1 },
          { top: '30%', left: '60%', size: '12vw', delay: 3 },
          { top: '50%', left: '-10%', size: '25vw', delay: 4 },
        ].map((pos, i) => (
          <motion.span
            key={i}
            animate={{ 
              y: [0, -30, 0], 
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              delay: pos.delay,
              ease: "easeInOut"
            }}
            className="absolute font-display font-light text-stone/50 dark:text-cream/20 leading-none tracking-tight whitespace-nowrap"
            style={{ top: pos.top, left: pos.left, fontSize: pos.size }}
          >
            FLICK
          </motion.span>
        ))}
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
          <em className="italic text-muted">Flick</em>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="font-body text-base text-muted dark:text-stone font-light max-w-md mx-auto mb-12 leading-relaxed"
        >
          Stories told through light and motion — by Kishu, based in Davangere, Karnataka
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
