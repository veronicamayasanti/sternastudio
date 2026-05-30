import { motion } from 'framer-motion';
import { MessageCircle, Heart, MapPin } from 'lucide-react';

// Inline Instagram SVG (not available in this lucide-react version)
const InstagramIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'Katalog', href: '#catalog' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
];

const categories = [
  'Home Decor',
  'Desk Accessories',
  'Keychain',
  'Miniature',
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleWA = () => {
    window.open('https://wa.me/6285770651904?text=Halo%20Sterna%20Studio', '_blank');
  };

  return (
    <footer className="relative overflow-hidden border-t border-brand-border/30">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-surface/80 to-brand-bg" />
      <div className="glow-orb w-[400px] h-[400px] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-purple-600/10" />

      <div className="section-container relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-5 group w-fit">
              <picture>
                <source srcSet="/logo-sterna.webp" type="image/webp" />
                <img
                  src="/logo-sterna.png"
                  alt="Sterna Studio – Jasa 3D Printing Custom Indonesia"
                  className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  width="56"
                  height="41"
                  loading="lazy"
                />
              </picture>
            </a>
            <p className="text-sm font-dm text-brand-muted/80 leading-relaxed mb-6 max-w-xs">
              Studio 3D printing kreatif dari Bogor yang memproduksi dekorasi, aksesori, keychain,
              dan kolektibel berkualitas premium.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-dm text-brand-muted">
                <MapPin size={14} className="text-brand-primary flex-shrink-0" />
                <span>Bogor, Jawa Barat, Indonesia</span>
              </div>
              <button
                id="footer-wa-btn"
                onClick={handleWA}
                className="flex items-center gap-3 text-sm font-dm text-brand-muted hover:text-emerald-400 transition-colors duration-300"
              >
                <MessageCircle size={14} className="text-emerald-400 flex-shrink-0" />
                <span>085770651904</span>
              </button>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <motion.button
                id="footer-wa-social-btn"
                onClick={handleWA}
                className="w-10 h-10 rounded-xl glass-card-light border border-brand-border hover:border-emerald-500/50 hover:bg-emerald-500/10 flex items-center justify-center text-brand-muted hover:text-emerald-400 transition-all duration-300"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.button>
              <motion.button
                id="footer-ig-btn"
                onClick={() => window.open('https://instagram.com/sterna_studio', '_blank')}
                className="w-10 h-10 rounded-xl glass-card-light border border-brand-border hover:border-pink-500/50 hover:bg-pink-500/10 flex items-center justify-center text-brand-muted hover:text-pink-400 transition-all duration-300"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </motion.button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-outfit font-600 text-sm text-brand-text mb-5 tracking-wide">Navigasi</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-dm text-brand-muted/80 hover:text-brand-soft transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-primary/40 group-hover:bg-brand-primary transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-outfit font-600 text-sm text-brand-text mb-5 tracking-wide">Kategori</h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#catalog"
                    className="text-sm font-dm text-brand-muted/80 hover:text-brand-soft transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-secondary/40 group-hover:bg-brand-secondary transition-colors duration-300" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA card */}
            <div className="mt-8 glass-card-light border border-brand-primary/15 rounded-2xl p-4">
              <p className="text-xs font-dm text-brand-muted/80 mb-3 leading-relaxed">
                Mau pesan sekarang? Chat kami langsung via WhatsApp!
              </p>
              <button
                onClick={handleWA}
                className="w-full btn-whatsapp justify-center text-xs py-2.5"
              >
                <MessageCircle size={13} />
                Chat Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-dm text-brand-muted/50 text-center sm:text-left">
            © {year} Sterna Studio. All rights reserved. Made with{' '}
            <Heart size={10} className="inline text-brand-secondary" fill="currentColor" />{' '}
            in Bogor.
          </p>
          <p className="text-xs font-dm text-brand-muted/40">
            3D Printed Decor & Collectibles
          </p>
        </div>
      </div>
    </footer>
  );
}
