import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, MapPin, Phone, ArrowUp } from 'lucide-react';
import { BUSINESS, SERVICES, WHATSAPP_URL } from '../constants';
import { EASE, VIEWPORT } from '../animations';

interface FooterProps {
  onBookPickup: () => void;
}

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Festive Offers', id: 'offers' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Location', id: 'location' },
  { label: 'Contact', id: 'contact' },
];

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onBookPickup }) => {
  const shouldReduceMotion = useReducedMotion();

  const colVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: EASE.luxury },
    }),
  };

  return (
    <footer className="bg-[#06452F] text-white/80 relative overflow-hidden">
      {/* Animated gold top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE.luxury }}
        className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
        style={{ transformOrigin: 'left' }}
      />

      {/* Giant "Let's clean. ✦" Slide-in Typography Banner */}
      <div className="pt-16 pb-6 border-b border-white/10 overflow-hidden select-none pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ x: '-15%', opacity: 0 }}
            whileInView={{ x: '0%', opacity: 0.15 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.4, ease: EASE.luxury }}
            className="font-serif italic font-normal text-6xl sm:text-8xl md:text-9xl text-[#D4AF37] tracking-tight whitespace-nowrap"
          >
            Let&apos;s clean. ✦
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <motion.div
            custom={0}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#06452F] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C9 2 6.5 4 6.5 4L4 6l2 1-1 2 3-1 1 2-1 2 3-1 1 3h2l1-3 3 1-1-2 1-2 3 1-1-2 2-1-2.5-2S15 2 12 2Z"
                    fill="#D4AF37"
                  />
                  <path d="M8 14c0 3 1.5 6 4 7 2.5-1 4-4 4-7H8Z" fill="#D4AF37" opacity="0.85" />
                </svg>
              </div>
              <div>
                <div className="font-serif font-bold text-2xl text-[#D4AF37] tracking-wider">
                  RAVORA
                </div>
                <div className="text-[9px] tracking-[0.18em] uppercase text-[#D4AF37] font-semibold opacity-90">
                  Clothes &amp; Dry Clean
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/80 mb-4 max-w-xs">
              {BUSINESS.tagline}
            </p>
            <p className="text-xs text-[#D4AF37] italic mb-6">
              Premium garment care with doorstep pickup &amp; delivery in Gurugram.
            </p>

            {/* WhatsApp quick-link */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#06452F] transition-all duration-200"
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Navigate column */}
          <motion.div
            custom={1}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <h4 className="font-semibold text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors text-left relative group cursor-pointer flex items-center"
                  >
                    <span className="w-0 group-hover:w-2.5 h-[1.5px] bg-[#D4AF37] mr-0 group-hover:mr-2 transition-all duration-200" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onBookPickup}
                  className="text-sm text-[#D4AF37] font-bold hover:text-[#E8C84A] transition-colors text-left flex items-center gap-1.5 cursor-pointer mt-1"
                >
                  <span>→ Book a Pickup</span>
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Services column */}
          <motion.div
            custom={2}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <h4 className="font-semibold text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors text-left relative group cursor-pointer flex items-center"
                  >
                    <span className="w-0 group-hover:w-2.5 h-[1.5px] bg-[#D4AF37] mr-0 group-hover:mr-2 transition-all duration-200" />
                    <span>{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div
            custom={3}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <h4 className="font-semibold text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-5">
              Contact &amp; Location
            </h4>
            <div className="space-y-4">
              {[
                {
                  Icon: MessageCircle,
                  text: BUSINESS.phone,
                  href: WHATSAPP_URL,
                  label: 'WhatsApp',
                },
                {
                  Icon: Phone,
                  text: BUSINESS.phone,
                  href: 'tel:+919452709726',
                  label: 'Call Us',
                },
                {
                  Icon: MapPin,
                  text: 'Vaishnav Enclave, NKV Colony,\nSector 67A, Gurugram 122101',
                  href: BUSINESS.mapsUrl,
                  label: 'Directions',
                },
              ].map(({ Icon, text, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Icon size={15} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-[#D4AF37] transition-colors leading-relaxed whitespace-pre-line">
                    {text}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60 text-center sm:text-left">
            © {CURRENT_YEAR} RAVORA Clothes &amp; Dry Clean. All rights reserved. &bull; Designed for luxury clothing care.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-[#D4AF37] transition-colors group cursor-pointer"
          >
            <motion.span
              animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp size={14} />
            </motion.span>
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
