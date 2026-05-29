import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageCircle, Layers } from 'lucide-react';

// Floating particle component
function Particle({ style }) {
  return <div className="particle" style={style} />;
}

// Animated 3D geometric shapes
function FloatingShape({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function Hero() {
  const particlesRef = useRef([]);

  // Generate particles
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 12,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  const handleCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWA = () => {
    window.open('https://wa.me/6285770651904?text=Halo%20Sterna%20Studio%2C%20saya%20ingin%20bertanya%20tentang%20produk%20kalian', '_blank');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center hero-mesh overflow-hidden">
      {/* Glow orbs */}
      <div className="glow-orb w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 bg-purple-600/20" />
      <div className="glow-orb w-[400px] h-[400px] bottom-20 -left-20 bg-pink-500/15" />
      <div className="glow-orb w-[300px] h-[300px] top-1/3 -right-20 bg-indigo-500/15" />

      {/* Particles */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: '-10px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,132,252,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,132,252,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating geometric decorations */}
      <FloatingShape
        delay={0}
        className="absolute top-32 right-[15%] w-20 h-20 rounded-2xl border border-purple-500/30 bg-purple-600/5 backdrop-blur-sm rotate-12"
      />
      <FloatingShape
        delay={2}
        className="absolute top-[45%] left-[8%] w-14 h-14 rounded-xl border border-pink-500/25 bg-pink-500/5 -rotate-6"
      />
      <FloatingShape
        delay={1}
        className="absolute bottom-[25%] right-[10%] w-12 h-12 rounded-full border border-indigo-400/30 bg-indigo-500/5"
      />
      <FloatingShape
        delay={3}
        className="absolute top-[20%] left-[20%] w-8 h-8 rounded-lg border border-purple-400/20 bg-purple-500/5 rotate-45"
      />

      {/* Main content */}
      <div className="section-container relative z-10 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light border border-brand-primary/20 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-xs font-outfit font-500 text-brand-muted tracking-widest uppercase">
            3D Printing Studio · Bogor
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary/30 to-brand-secondary/20 blur-3xl scale-150" />
            <img
              src="/logo.png"
              alt="Sterna Studio – Jasa 3D Printing Custom Indonesia"
              className="relative h-44 md:h-56 w-auto object-contain drop-shadow-[0_0_30px_rgba(192,132,252,0.4)] animate-float"
              width="224"
              height="224"
              fetchpriority="high"
            />
          </div>
        </motion.div>

        {/* Brand name – visual only, logo already establishes brand */}
        <motion.p
          className="section-title gradient-text mb-2 font-outfit font-800"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          aria-hidden="true"
        >
          Sterna Studio
        </motion.p>

        {/* SEO H1 – keyword-rich, styled as subtitle */}
        <motion.h1
          className="text-lg md:text-xl text-brand-muted font-outfit font-400 tracking-wide mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          Jasa 3D Printing Custom untuk Decor &amp; Collectibles di Indonesia
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-brand-muted/70 font-dm max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          Sterna Studio menghadirkan custom 3D printed decor, desk setup accessories, miniatur,
          collectible, dan personalized products berkualitas premium — dicetak presisi dari Bogor.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
        >
          <button
            id="hero-catalog-btn"
            onClick={handleCatalog}
            className="btn-primary flex items-center gap-2.5 group"
          >
            <Layers size={17} className="transition-transform duration-300 group-hover:scale-110" />
            Lihat Katalog
          </button>
          <button
            id="hero-wa-btn"
            onClick={handleWA}
            className="btn-whatsapp"
          >
            <MessageCircle size={17} />
            Chat WhatsApp
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-16 pt-10 border-t border-brand-border/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {[
            { value: '12+', label: 'Produk Tersedia' },
            { value: '4', label: 'Kategori' },
            { value: '⚡', label: 'Fast Response' },
            { value: '📦', label: 'Packing Aman' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-outfit font-700 gradient-text">{stat.value}</div>
              <div className="text-xs font-dm text-brand-muted mt-0.5 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] text-brand-muted/50 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-brand-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
