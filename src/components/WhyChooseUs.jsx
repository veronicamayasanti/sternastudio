import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Printer,
  Gem,
  Sparkles,
  PackageCheck,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { whyChooseUs } from '../data/products';

const iconMap = {
  PrinterCheck: Printer,
  Gem,
  Sparkles,
  PackageCheck,
  MessageCircle,
  MapPin,
};

const gradients = [
  'from-purple-500/20 to-violet-500/10',
  'from-pink-500/20 to-rose-500/10',
  'from-indigo-500/20 to-blue-500/10',
  'from-emerald-500/20 to-teal-500/10',
  'from-cyan-500/20 to-sky-500/10',
  'from-amber-500/20 to-orange-500/10',
];

const iconColors = [
  'text-purple-400',
  'text-pink-400',
  'text-indigo-400',
  'text-emerald-400',
  'text-cyan-400',
  'text-amber-400',
];

const borderColors = [
  'hover:border-purple-500/30',
  'hover:border-pink-500/30',
  'hover:border-indigo-500/30',
  'hover:border-emerald-500/30',
  'hover:border-cyan-500/30',
  'hover:border-amber-500/30',
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-surface/50 to-brand-bg" />
      <div className="glow-orb w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600/08" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-light border border-brand-primary/20 mb-5">
            <span className="text-xs font-outfit font-500 text-brand-muted tracking-widest uppercase">Kenapa Kami</span>
          </div>
          <h2 className="section-title text-brand-text font-outfit mb-4">
            Kenapa Pilih <span className="gradient-text">Sterna Studio?</span>
          </h2>
          <p className="text-brand-muted/80 font-dm max-w-xl mx-auto text-base leading-relaxed">
            Kami tidak hanya mencetak objek — kami menciptakan pengalaman yang berkesan
            melalui kualitas, desain, dan layanan terbaik.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                className="relative glass-card rounded-2xl p-7 overflow-hidden group cursor-default"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />

                {/* Icon */}
                <div className="relative z-10 mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    {Icon && <Icon size={22} className={iconColors[i]} />}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-outfit font-600 text-base text-brand-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-dm text-brand-muted/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle shine */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
