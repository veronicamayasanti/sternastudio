import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/products';

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <button
        id={`faq-${faq.id}`}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <div className="mt-0.5 w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
            <HelpCircle size={14} className="text-brand-primary" />
          </div>
          <span className="font-outfit font-500 text-sm md:text-base text-brand-text group-hover:text-brand-soft transition-colors duration-300">
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className={`transition-colors duration-300 ${open ? 'text-brand-primary' : 'text-brand-muted'}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-11 pr-8">
              <p className="text-sm font-dm text-brand-muted/80 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-surface/40 to-brand-bg" />
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-indigo-500/10" />

      <div className="section-container relative z-10" ref={ref}>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-light border border-brand-primary/20 mb-5">
              <span className="text-xs font-outfit font-500 text-brand-muted tracking-widest uppercase">FAQ</span>
            </div>
            <h2 className="section-title text-brand-text font-outfit mb-4">
              Pertanyaan yang <span className="gradient-text">Sering Ditanya</span>
            </h2>
            <p className="text-brand-muted/80 font-dm text-base leading-relaxed">
              Ada pertanyaan? Mungkin sudah terjawab di sini. Kalau belum, langsung tanya via WhatsApp ya!
            </p>
          </motion.div>

          {/* FAQ list */}
          <motion.div
            className="glass-card rounded-3xl px-6 md:px-10 py-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={faq.id} faq={faq} index={i} />
            ))}
          </motion.div>

          {/* Still have questions */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <p className="text-brand-muted text-sm font-dm mb-4">
              Masih ada pertanyaan lain?
            </p>
            <button
              id="faq-wa-btn"
              onClick={() => window.open('https://wa.me/6285770651904?text=Halo%20Sterna%20Studio%2C%20saya%20ingin%20bertanya', '_blank')}
              className="btn-whatsapp mx-auto"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Tanya via WhatsApp
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
