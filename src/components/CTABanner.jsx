import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const handleWA = () => {
    window.open(
      'https://wa.me/6285770651904?text=Halo%20Sterna%20Studio%2C%20saya%20ingin%20melihat%20katalog%20produk%20kalian',
      '_blank'
    );
  };

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="section-container">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-[#1a0e2e] to-pink-900/60" />
          
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 -translate-y-1/2 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 translate-y-1/2 bg-pink-500/20 rounded-full blur-3xl" />
          
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10" />

          {/* Content */}
          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={12} className="text-brand-soft" />
              <span className="text-xs font-outfit font-500 text-brand-soft tracking-widest uppercase">
                Pesan Sekarang
              </span>
            </motion.div>

            <motion.h2
              className="font-outfit font-800 text-3xl md:text-5xl text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Tertarik dengan produk kami?
              <br />
              <span className="gradient-text">Chat kami sekarang!</span>
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-white/60 font-dm max-w-xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Semua transaksi dilakukan via WhatsApp. Tim kami siap membantu dan 
              merespon dengan cepat. Tidak ada minimum order!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <button
                id="cta-wa-btn"
                onClick={handleWA}
                className="btn-whatsapp text-base px-10 py-4 mx-auto sm:mx-0"
              >
                <MessageCircle size={20} />
                Chat WhatsApp Sekarang
              </button>
              <a
                href="#catalog"
                className="btn-outline flex items-center gap-2 justify-center"
              >
                Lihat Katalog
                <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
            >
              {[
                { emoji: '📦', text: 'Packing Aman' },
                { emoji: '⚡', text: 'Fast Response' },
                { emoji: '🚚', text: 'Kirim ke Seluruh Indonesia' },
                { emoji: '✨', text: 'Kualitas Premium' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-white/50 font-dm">
                  <span>{item.emoji}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
