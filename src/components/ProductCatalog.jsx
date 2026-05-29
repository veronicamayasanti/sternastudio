import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="catalog" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-surface/30 to-brand-bg" />
      <div className="glow-orb w-[600px] h-[600px] top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-pink-500/08" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card-light border border-brand-primary/20 mb-5">
            <span className="text-xs font-outfit font-500 text-brand-muted tracking-widest uppercase">Katalog Produk</span>
          </div>
          <h2 className="section-title text-brand-text font-outfit mb-4">
            Katalog <span className="gradient-text">3D Printing Custom</span>
          </h2>
          <p className="text-brand-muted/80 font-dm max-w-xl mx-auto text-base leading-relaxed">
            Koleksi produk 3D printing Indonesia — keychain custom, desk setup accessories, dekorasi rumah, miniatur, dan collectibles estetik berkualitas premium.
          </p>
        </motion.div>

        {/* Filter + Search */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill ${activeCategory === cat ? 'active' : 'inactive'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              id="catalog-search"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-5 py-2.5 text-sm font-dm rounded-full glass-card-light border border-brand-border focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/30 bg-transparent text-brand-text placeholder-brand-muted/40 w-48 transition-all duration-300 focus:w-56"
            />
          </div>
        </motion.div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-brand-muted font-outfit font-500">Produk tidak ditemukan</p>
            <p className="text-brand-muted/50 text-sm mt-1">Coba kata kunci lain</p>
          </motion.div>
        )}

        {/* Bottom note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 glass-card-light border border-brand-border rounded-2xl px-6 py-4">
            <span className="text-2xl">💬</span>
            <p className="text-sm font-dm text-brand-muted">
              Semua pembelian melalui{' '}
              <span className="text-emerald-400 font-500">WhatsApp</span>. Klik tombol "Pesan" pada produk yang kamu inginkan.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
