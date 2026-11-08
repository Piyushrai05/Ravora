import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shirt, Sparkles, Wind, Shield, Leaf, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { SplitText } from './motion/SplitText';
import { Reveal } from './motion/Reveal';
import { EASE, VIEWPORT } from '../animations';

const ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Shirt,
  Sparkles,
  Wind,
  Shield,
  Leaf,
};

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE.luxury },
    },
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FFFEFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#075B3B]/10 border border-[#075B3B]/20 text-[#075B3B] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              01 — Services
            </span>
          </Reveal>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26352B] mt-2 mb-4">
            <SplitText text="Our Premium Services" italicWord="Premium" />
          </h2>

          <Reveal delay={0.2}>
            <div className="gold-divider mb-4" />
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-[#77766D] text-base sm:text-lg max-w-xl mx-auto">
              Expert care for every fabric, every occasion — handled with precision, passion, and pride.
            </p>
          </Reveal>
        </div>

        {/* Service cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -8,
                        boxShadow: '0 24px 50px rgba(7,91,59,0.12)',
                        transition: { duration: 0.35, ease: EASE.luxury },
                      }
                }
                data-cursor="view"
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#E8DFC5] shadow-sm transition-colors duration-300 hover:border-[#D4AF37]/60 cursor-pointer flex flex-col justify-between"
                style={{ willChange: 'transform' }}
                onClick={() => onSelectService(service.id)}
              >
                {/* Top Image Container */}
                <div>
                  <div className="relative h-52 overflow-hidden bg-[#06452F]">
                    <motion.img
                      src={service.image}
                      alt={`${service.name} by RAVORA`}
                      width={400}
                      height={208}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06452F]/70 via-[#06452F]/20 to-transparent" />

                    {/* Top Floating Row: Icon & Step Number */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md border border-white/40">
                        {Icon && <Icon size={20} className="text-[#075B3B]" />}
                      </div>

                      {/* Numbered 01-05 Label */}
                      <span className="font-mono text-xs font-bold text-[#D4AF37] px-2.5 py-1 rounded-full bg-[#06452F]/80 backdrop-blur-md border border-[#D4AF37]/30 shadow-sm">
                        {formattedIndex}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-[#26352B] mb-2 group-hover:text-[#075B3B] transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-[#77766D] text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-[#E8DFC5]/50 pt-4">
                  <span className="text-sm font-semibold text-[#075B3B] group-hover:text-[#D4AF37] transition-colors">
                    Book Service
                  </span>

                  {/* Arrow ↗ rotates 45° on hover and turns gold */}
                  <div className="w-9 h-9 rounded-full bg-[#FFF9E9] border border-[#E8DFC5] flex items-center justify-center text-[#075B3B] group-hover:bg-[#075B3B] group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-300">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </div>
                </div>

                {/* Animated gold bottom accent */}
                <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
