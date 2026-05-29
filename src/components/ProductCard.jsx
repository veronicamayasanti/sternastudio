import { motion } from 'framer-motion';
import { MessageCircle, Tag } from 'lucide-react';

const WHATSAPP_NUMBER = '6285770651904';

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const badgeColors = {
  'Best Seller': 'from-amber-500/80 to-orange-500/80',
  'Populer': 'from-pink-500/80 to-rose-500/80',
  'New': 'from-emerald-500/80 to-teal-500/80',
  'Cute': 'from-pink-400/80 to-fuchsia-500/80',
  'Elegan': 'from-purple-500/80 to-violet-500/80',
  'Lucu': 'from-orange-400/80 to-pink-500/80',
  'Kawaii': 'from-pink-300/80 to-purple-400/80',
};

export default function ProductCard({ product, index = 0 }) {
  const handleOrder = () => {
    const message = encodeURIComponent(
      `Halo Sterna Studio, saya ingin memesan produk ${product.name}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col"
      whileHover={{
        y: -8,
        boxShadow: '0 20px 60px rgba(192,132,252,0.2)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Image */}
      <div className="product-img-wrapper relative aspect-square bg-brand-surface">
        <img
          src={product.image}
          alt={`Custom 3D printed ${product.name} by Sterna Studio – ${product.category}`}
          className="w-full h-full object-cover"
          loading="lazy"
          width="400"
          height="400"
        />
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 bg-gradient-to-r ${badgeColors[product.badge] || 'from-brand-primary/80 to-brand-secondary/80'} text-white text-[10px] font-outfit font-600 px-2.5 py-1 rounded-full shadow-lg tracking-wide`}>
            {product.badge}
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Category */}
        <div className="flex items-center gap-1.5 mb-2">
          <Tag size={10} className="text-brand-muted" />
          <span className="text-[10px] font-outfit font-500 text-brand-muted uppercase tracking-widest">
            {product.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-outfit font-600 text-sm md:text-base text-brand-text leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs font-dm text-brand-muted/70 leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
          <div className="price-tag w-fit">
            <span className="text-sm font-outfit font-700 gradient-text">
              {formatPrice(product.price)}
            </span>
          </div>
          <motion.button
            id={`order-btn-${product.id}`}
            onClick={handleOrder}
            className="btn-whatsapp text-xs py-2 px-4 justify-center w-full sm:w-auto"
            whileTap={{ scale: 0.96 }}
          >
            <MessageCircle size={13} />
            Pesan
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
