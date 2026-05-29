import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import { galleryImages } from '../data/products';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-surface/30 to-brand-bg" />
      <div className="glow-orb w-[500px] h-[500px] top-1/4 right-0 translate-x-1/2 bg-pink-500/10" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-light border border-brand-primary/20 mb-5">
            <span className="text-xs font-outfit font-500 text-brand-muted tracking-widest uppercase">Gallery</span>
          </div>
          <h2 className="section-title text-brand-text font-outfit mb-4">
            Showcase <span className="gradient-text">Karya Kami</span>
          </h2>
          <p className="text-brand-muted/80 font-dm max-w-xl mx-auto text-base leading-relaxed">
            Setiap foto adalah bukti kualitas dan keindahan produk 3D printing kami.
            Klik untuk melihat lebih detail.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.alt || img.label}
                loading="lazy"
                className="w-full h-auto"
                width="400"
                height="400"
              />
              <div className="gallery-overlay">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-outfit font-500 text-white">{img.label}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                    <ZoomIn size={14} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
            <motion.div
              className="relative max-w-2xl w-full"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt || lightbox.label}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 rounded-b-2xl bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-outfit font-600">{lightbox.label}</p>
                <p className="text-white/60 text-xs font-dm mt-0.5">Sterna Studio</p>
              </div>
              <button
                className="absolute -top-4 -right-4 w-10 h-10 bg-brand-card border border-brand-border rounded-full flex items-center justify-center text-brand-text hover:text-brand-primary transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
