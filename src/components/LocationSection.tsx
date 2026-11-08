import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Navigation, MessageCircle, Info } from 'lucide-react';
import { BUSINESS, SERVICE_AREAS, WHATSAPP_URL } from '../constants';
import { viewport, slideLeft, slideRight } from '../animations/variants';

export const LocationSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const addressLines = [
    'Ground Floor, House No. UA-60',
    'Vaishnav Enclave, NKV Colony',
    'Dhumaspur Road, Near Preetizilla Fashion',
    '& Purvanchal Collections Pvt. Ltd.',
    'Sector 67A, Gurugram, Haryana 122101',
  ];

  return (
    <section id="location" className="py-20 md:py-28 bg-[#FFF9E9]">
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
            Find Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26352B] mt-2 mb-4"
          >
            Our Location
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

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Info panel */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-2 space-y-5"
          >
            {/* Store card */}
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 20px 48px rgba(7,91,59,0.10)' }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-2xl border border-[#E8DFC5] p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-10 h-10 rounded-xl bg-[#075B3B] flex items-center justify-center shrink-0"
                >
                  <MapPin size={18} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="font-serif font-bold text-[#26352B] text-lg">{BUSINESS.fullName}</h3>
                  <p className="text-[#D4AF37] text-sm font-medium">{BUSINESS.tagline}</p>
                </div>
              </div>

              {/* Staggered address lines */}
              <div className="border-t border-[#E8DFC5] pt-4 space-y-0.5">
                {addressLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 + 0.2 }}
                    className="text-[#77766D] text-sm leading-relaxed"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <motion.a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-xl bg-[#075B3B] text-white font-semibold text-sm hover:bg-[#06452F] transition-colors"
                >
                  <Navigation size={15} />
                  Get Directions
                </motion.a>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-xl border border-[#075B3B] text-[#075B3B] font-semibold text-sm hover:bg-[#075B3B] hover:text-white transition-all"
                >
                  <MessageCircle size={15} />
                  WhatsApp Us
                </motion.a>
              </div>
            </motion.div>

            {/* Service areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl border border-[#E8DFC5] p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Info size={15} className="text-[#D4AF37]" />
                <h4 className="font-semibold text-[#26352B] text-sm">Service Areas</h4>
              </div>
              <ul className="space-y-2">
                {SERVICE_AREAS.map((area, i) => (
                  <motion.li
                    key={area}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex items-center gap-2 text-sm text-[#77766D]"
                  >
                    <motion.span
                      animate={shouldReduceMotion ? {} : { scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0"
                    />
                    {area}
                  </motion.li>
                ))}
              </ul>
              <p className="text-[#77766D] text-xs mt-4 pt-3 border-t border-[#E8DFC5]">
                Service availability outside listed areas is subject to confirmation. Please WhatsApp us to check coverage.
              </p>
            </motion.div>
          </motion.div>

          {/* Map panel */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:col-span-3"
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { boxShadow: '0 24px 56px rgba(7,91,59,0.12)' }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl overflow-hidden border border-[#E8DFC5] shadow-sm h-80 md:h-[460px] relative bg-[#FFF9E9]"
            >
              <iframe
                title="RAVORA Clothes & Dry Clean Gurugram Location"
                src="https://maps.google.com/maps?q=Ground+Floor+House+No+UA-60+Vaishnav+Enclave+NKV+Colony+Dhumaspur+Road+Sector+67A+Gurugram+Haryana+122101&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </motion.div>
            <div className="mt-3 text-center">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#075B3B] font-medium hover:text-[#D4AF37] transition-colors hover:underline"
              >
                View larger map on Google Maps →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
