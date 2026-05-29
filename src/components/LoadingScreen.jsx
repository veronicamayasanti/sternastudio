import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background glow */}
          <div className="absolute inset-0">
            <div className="glow-orb w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600/30" />
          </div>

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(192,132,252,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(192,132,252,1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-brand-primary/20 blur-3xl scale-150 animate-pulse-glow" />
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Sterna Studio"
                  className="h-32 w-auto object-contain relative z-10 animate-float"
                  width="128"
                  height="94"
                />
              </picture>
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="font-outfit font-700 text-2xl gradient-text mb-1">Sterna Studio</h1>
              <p className="text-brand-muted/60 text-xs font-outfit tracking-widest uppercase">
                3D Printed Decor & Collectibles
              </p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-48 h-0.5 rounded-full bg-brand-border overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
