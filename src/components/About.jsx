import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Printer, Star, Sparkles, Box, Layers } from 'lucide-react';

const features = [
  { icon: Printer, label: 'Printer 3D Presisi Tinggi' },
  { icon: Star, label: 'Kualitas Premium' },
  { icon: Sparkles, label: 'Desain Estetik & Unik' },
  { icon: Box, label: 'Kolektibel & Dekorasi' },
  { icon: Layers, label: 'Multi Kategori Produk' },
];

const categories = [
  {
    emoji: '🏡',
    name: 'Home Decor',
    desc: 'Percantik ruangan dengan dekorasi 3D printing yang estetik dan unik.',
  },
  {
    emoji: '🖥️',
    name: 'Desk Accessories',
    desc: 'Lengkapi desk setup-mu dengan aksesori fungsional dan keren.',
  },
  {
    emoji: '🔑',
    name: 'Keychain',
    desc: 'Gantungan kunci custom bertema game, karakter, dan nama.',
  },
  {
    emoji: '🎀',
    name: 'Miniature',
    desc: 'Figurin dan miniatur 3D printing lucu untuk koleksi dan hadiah.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-surface/40 to-brand-bg" />
      <div className="glow-orb w-[500px] h-[500px] top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-purple-600/10" />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-light border border-brand-primary/20 mb-5">
              <span className="text-xs font-outfit font-500 text-brand-muted tracking-widest uppercase">Tentang Kami</span>
            </div>
            <h2 className="section-title gradient-text-soft mb-4 font-outfit">
              Kreativitas Dicetak <br className="hidden md:block" />
              Dalam 3 Dimensi
            </h2>
            <p className="text-brand-muted/80 font-dm max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Sterna Studio adalah studio 3D printing yang lahir dari kecintaan terhadap desain,
              teknologi, dan estetika. Kami percaya setiap detail kecil bisa menjadi karya seni.
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
            {/* Left — story */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card rounded-3xl p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-secondary/20 flex items-center justify-center">
                    <Printer size={20} className="text-brand-primary" />
                  </div>
                  <h3 className="font-outfit font-600 text-lg text-brand-text">Siapa Kami</h3>
                </div>
                <p className="font-dm text-brand-muted leading-relaxed text-sm md:text-base">
                  Sterna Studio adalah usaha 3D printing yang berfokus pada pembuatan produk
                  <span className="text-brand-soft font-500"> dekorasi rumah</span>,
                  <span className="text-brand-soft font-500"> desk setup accessories</span>,
                  <span className="text-brand-soft font-500"> keychain</span>,
                  <span className="text-brand-soft font-500"> miniatur</span>, dan
                  <span className="text-brand-soft font-500"> collectible</span>.
                </p>
                <p className="font-dm text-brand-muted leading-relaxed text-sm md:text-base">
                  Semua produk kami dibuat menggunakan printer 3D berkualitas tinggi dengan
                  filament premium, menghasilkan detail yang presisi dan tahan lama.
                </p>
                <p className="font-dm text-brand-muted leading-relaxed text-sm md:text-base">
                  Kami fokus pada desain yang unik, estetik, dan tidak pasaran — cocok untuk kamu
                  yang menghargai detail dan keunikan.
                </p>
              </div>

              {/* Features pills */}
              <div className="flex flex-wrap gap-2.5">
                {features.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass-card-light border border-brand-border text-xs font-outfit font-500 text-brand-muted"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(192,132,252,0.4)' }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon size={13} className="text-brand-primary" />
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — categories */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  className="glass-card rounded-2xl p-5 hover-lift group cursor-default"
                  whileHover={{
                    borderColor: 'rgba(192,132,252,0.3)',
                    boxShadow: '0 16px 48px rgba(192,132,252,0.15)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 origin-left">
                    {cat.emoji}
                  </div>
                  <h4 className="font-outfit font-600 text-sm text-brand-text mb-1.5">{cat.name}</h4>
                  <p className="text-xs font-dm text-brand-muted/70 leading-relaxed">{cat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom — brand values strip */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-3xl p-8 text-center"
          >
            <div className="shimmer absolute inset-0 rounded-3xl pointer-events-none" />
            <p className="text-base md:text-xl font-outfit font-300 text-brand-muted leading-relaxed max-w-3xl mx-auto">
              "Kami percaya bahwa setiap produk adalah sebuah karya —
              <span className="gradient-text font-600"> dicetak dengan presisi</span>, 
              dirancang dengan cinta, dan dikirim dengan penuh perhatian."
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-brand-primary fill-brand-primary" />
              ))}
            </div>
            <p className="text-xs text-brand-muted/50 mt-2 font-dm">— Sterna Studio, Bogor</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
