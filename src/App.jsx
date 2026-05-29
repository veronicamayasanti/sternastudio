import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const About = lazy(() => import('./components/About'));
const ProductCatalog = lazy(() => import('./components/ProductCatalog'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Gallery = lazy(() => import('./components/Gallery'));
const CTABanner = lazy(() => import('./components/CTABanner'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // No artificial delay — loading screen hides as soon as React mounts
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFloatingWA = () => {
    window.open(
      'https://wa.me/6285770651904?text=Halo%20Sterna%20Studio%2C%20saya%20ingin%20bertanya%20tentang%20produk%20kalian',
      '_blank'
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar />
            <main>
              <Hero />
              <Suspense fallback={<div className="py-24" />}>
                <About />
                <ProductCatalog />
                <WhyChooseUs />
                <Gallery />
                <CTABanner />
                <FAQ />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>

            {/* Floating WhatsApp Button */}
            <motion.button
              id="floating-wa-btn"
              onClick={handleFloatingWA}
              className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 8px 32px rgba(37,211,102,0.45)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Chat WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.button>

            {/* Pulse ring */}
            <motion.div
              className="fixed bottom-6 right-6 z-39 w-14 h-14 rounded-full pointer-events-none"
              style={{ background: 'rgba(37, 211, 102, 0.25)' }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            {/* Back to top button */}
            <AnimatePresence>
              {showTopBtn && (
                <motion.button
                  id="back-to-top-btn"
                  onClick={scrollToTop}
                  className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full glass-card border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-primary hover:border-brand-primary/50 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Back to top"
                >
                  <ChevronUp size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
