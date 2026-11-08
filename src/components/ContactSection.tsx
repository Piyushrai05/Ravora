import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Truck, ArrowRight } from 'lucide-react';
import { BUSINESS, WHATSAPP_URL } from '../constants';
import { viewport } from '../animations/variants';

const CONTACT_CARDS = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    primary: '+91 9452709726',
    secondary: 'Chat for instant booking',
    href: WHATSAPP_URL,
    cta: 'Chat Now',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
  },
  {
    icon: Phone,
    title: 'Call Us',
    primary: '+91 9452709726',
    secondary: 'Mon–Sun, 8 AM – 8 PM',
    href: 'tel:+919452709726',
    cta: 'Call Now',
    iconColor: 'text-[#075B3B]',
    iconBg: 'bg-[#075B3B]/8',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    primary: 'Sector 67A, Gurugram',
    secondary: 'Haryana 122101, India',
    href: BUSINESS.mapsUrl,
    cta: 'Get Directions',
    iconColor: 'text-[#D4AF37]',
    iconBg: 'bg-[#D4AF37]/10',
  },
];

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FFFEFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            className="text-[#D4AF37] text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26352B] mt-2 mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="gold-divider mb-4"
            style={{ transformOrigin: 'center' }}
          />
        </div>

        {/* Contact cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {CONTACT_CARDS.map(({ icon: Icon, title, primary, secondary, href, cta, iconColor, iconBg }) => (
            <motion.a
              key={title}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : {
                y: -8,
                boxShadow: '0 24px 48px rgba(7,91,59,0.12)',
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="group flex flex-col items-center text-center p-7 bg-white rounded-2xl border border-[#E8DFC5] shadow-sm"
              style={{ willChange: 'transform' }}
            >
              {/* Animated icon container */}
              <motion.div
                className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center ${iconBg}`}
                whileHover={shouldReduceMotion ? {} : { scale: 1.12, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon size={24} className={iconColor} />
              </motion.div>

              <h3 className="font-serif font-bold text-[#26352B] text-lg mb-1">{title}</h3>
              <p className="font-semibold text-[#26352B] text-sm mb-0.5">{primary}</p>
              <p className="text-[#77766D] text-xs mb-5">{secondary}</p>

              {/* CTA button with animated arrow */}
              <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#075B3B] text-white text-sm font-semibold group-hover:bg-[#06452F] transition-colors">
                {cta}
                <motion.span
                  animate={shouldReduceMotion ? {} : { x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={13} />
                </motion.span>
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Pickup info banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 max-w-4xl mx-auto bg-gradient-to-r from-[#075B3B] to-[#06452F] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 text-center md:text-left overflow-hidden relative"
        >
          {/* Subtle decorative circle */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full border border-white/8 pointer-events-none" />

          <motion.div
            className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0"
            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Truck size={26} className="text-[#D4AF37]" />
          </motion.div>

          <div className="flex-1">
            <h3 className="font-serif font-bold text-white text-xl mb-1">
              Doorstep Pickup &amp; Delivery
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We come to you. Schedule a convenient pickup via WhatsApp and receive your freshly
              cleaned garments delivered back to your doorstep.
            </p>
          </div>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : {
              scale: 1.05,
              y: -2,
              boxShadow: '0 10px 28px rgba(212,175,55,0.3)',
            }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#06452F] font-bold text-sm transition-colors hover:bg-[#E8C84A]"
          >
            <MessageCircle size={16} />
            Book on WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
