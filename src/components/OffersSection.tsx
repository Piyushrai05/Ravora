import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { Tag, AlertCircle } from 'lucide-react';
import { OFFERS } from '../constants';
import { Counter } from './motion/Counter';
import { Reveal } from './motion/Reveal';
import { SplitText } from './motion/SplitText';
import { EASE, VIEWPORT } from '../animations';

interface TiltCardProps {
  offer: (typeof OFFERS)[number];
  index: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ offer, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  // Smooth springs for 3D tilt rotation (max 6deg)
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize -1 to 1
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    // Max 6 degrees rotation
    rotateX.set(-normY * 6);
    rotateY.set(normX * 6);

    // Percentage for glare
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const isBestValue = offer.discount === 20;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: EASE.luxury,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={shouldReduceMotion ? {} : { y: -6 }}
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 text-center border transition-all duration-300 ${
          isBestValue
            ? 'bg-[#D4AF37] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20 text-[#06452F]'
            : 'bg-white/10 border-white/20 hover:border-[#D4AF37]/60 hover:bg-white/15 backdrop-blur-md text-white'
        }`}
      >
        {/* Dynamic Glare Overlay */}
        {!shouldReduceMotion && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
            }}
          />
        )}

        {/* Best Value Ribbon */}
        {isBestValue && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#991F32] border border-[#D4AF37] text-white text-[11px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
            Best Value
          </div>
        )}

        {/* Bill amount */}
        <div
          className={`text-xs uppercase tracking-wider font-semibold mb-1 ${
            isBestValue ? 'text-[#06452F]/80' : 'text-white/80'
          }`}
        >
          Bill above
        </div>
        <div
          className={`font-serif text-2xl sm:text-3xl font-bold mb-2 ${
            isBestValue ? 'text-[#06452F]' : 'text-white'
          }`}
        >
          ₹{offer.minBill.toLocaleString('en-IN')}
        </div>

        {/* Divider */}
        <div
          className={`w-10 h-0.5 mx-auto my-3 rounded-full ${
            isBestValue ? 'bg-[#06452F]/30' : 'bg-[#D4AF37]/50'
          }`}
        />

        {/* Discount Percentage */}
        <div
          className={`text-xs uppercase tracking-wider font-semibold mb-0.5 ${
            isBestValue ? 'text-[#06452F]/80' : 'text-white/80'
          }`}
        >
          Get Flat
        </div>
        <div
          className={`font-serif text-4xl sm:text-5xl font-bold tracking-tight ${
            isBestValue ? 'text-[#06452F]' : 'text-[#D4AF37]'
          }`}
        >
          <Counter value={offer.discount} suffix="%" duration={1800} />
        </div>
        <div
          className={`text-sm font-bold tracking-wide mt-1 ${
            isBestValue ? 'text-[#06452F]' : 'text-white'
          }`}
        >
          Off Bill
        </div>
      </motion.div>
    </motion.div>
  );
};

export const OffersSection: React.FC = () => {
  return (
    <section
      id="offers"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #991F32 0%, #7a1828 100%)' }}
    >
      {/* Top & bottom subtle gold divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 mb-4">
              <Tag size={13} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.22em] uppercase">
                02 — Offers
              </span>
            </div>
          </Reveal>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            <SplitText text="Save More, Look Better" italicWord="Better" />
          </h2>

          <Reveal delay={0.2}>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto">
              Exclusive festive discounts on your garment care — the more you clean, the more you save.
            </p>
          </Reveal>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {OFFERS.map((offer, index) => (
            <TiltCard key={offer.minBill} offer={offer} index={index} />
          ))}
        </div>

        {/* Disclaimer Card */}
        <Reveal delay={0.4}>
          <div className="flex items-start gap-3 max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4">
            <AlertCircle size={18} className="text-[#D4AF37] mt-0.5 shrink-0" />
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
              Offers are subject to confirmation by RAVORA. Please mention your offer when booking via WhatsApp. Discounts apply on eligible laundry and dry cleaning services.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
