import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 1.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <span className="font-display text-4xl md:text-6xl font-light text-ink tracking-widest uppercase">
          shot<em className="italic text-muted lowercase">Flick</em>
        </span>
      </motion.div>
    </motion.div>
  );
}
