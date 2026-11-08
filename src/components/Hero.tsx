import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle, Truck, Shield, Sparkles, Star } from 'lucide-react';
import { WHATSAPP_URL } from '../constants';
import { EASE_IN_OUT, EASE_OUT, SPRINGS } from '../lib/motion';
import { Magnetic } from './motion/Magnetic';

const TRUST_BADGES = [
  { icon: Truck, label: 'Doorstep Pickup & Delivery' },
  { icon: Shield, label: 'Hygienic & Safe Process' },
  { icon: Sparkles, label: 'Professional Care' },
];

interface HeroProps {
  onBookPickup: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookPickup, onExploreServices }) => {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 45]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -15]);

  return (
    <section
      ref={ref}
      id="home"
      style={{
        background:
          'radial-gradient(ellipse at 85% 25%, rgba(217, 178, 60, 0.12) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(11, 93, 59, 0.35) 0%, transparent 50%), linear-gradient(135deg, #06301F 0%, #0B5D3B 60%, #08492E 100%)',
      }}
      className="relative min-h-[100svh] flex items-center pt-[calc(var(--header-h,80px)+2rem)] pb-20 md:pb-28 overflow-x-clip"
    >
      {/* Background grain texture and subtle grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          y: bgY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D9B23C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient floating gold circles */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#D9B23C]/20 opacity-30 pointer-events-none"
          />
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-[#D9B23C]/15 opacity-25 pointer-events-none"
          />
        </>
      )}

      <motion.div
        style={{ y: contentY }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (7 cols): Content & Headline */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Numbered Pill Badge ("00 — PREMIER GARMENT CARE") */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
              className="section-pill mb-6 inline-flex"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-[#D9B23C]"
              />
              <span>00 — Premier Garment Care</span>
            </motion.div>

            {/* Masked Headline with clamp(2.75rem, 6vw, 5.5rem), line-height 1.02, tight tracking -0.02em */}
            <h1 className="font-serif font-bold text-[#FAF6EA] tracking-[-0.02em] text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] mb-6">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '115%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.85, delay: 0.2, ease: EASE_IN_OUT }}
                  className="block"
                >
                  Your Clothes
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: '115%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.85, delay: 0.35, ease: EASE_IN_OUT }}
                  className="inline-flex items-center flex-wrap"
                >
                  <span>Deserve&nbsp;</span>
                  <span className="gold-shimmer font-serif italic font-normal inline-flex items-center gap-2">
                    Premium Care.
                    <motion.span
                      animate={shouldReduceMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      className="inline-block text-[#D9B23C] text-[0.6em] not-italic ml-1"
                    >
                      ✦
                    </motion.span>
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45, ease: EASE_OUT }}
              className="text-[#FAF6EA]/85 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-normal"
            >
              Professional laundry, artisanal dry cleaning, and steam pressing with effortless doorstep pickup and delivery in Sector 67A, Gurugram.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Magnetic strength={0.25} range={70}>
                <motion.button
                  onClick={onBookPickup}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { scale: 1.03, y: -2, boxShadow: '0 16px 36px rgba(217,178,60,0.35)' }
                  }
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D9B23C] text-[#06301F] font-bold text-base shadow-lg shadow-[#D9B23C]/20 transition-all hover:bg-[#E7C65A] cursor-pointer"
                >
                  <span>Book a Pickup</span>
                  <span className="w-7 h-7 rounded-full bg-[#06301F]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={15} className="text-[#06301F]" />
                  </span>
                </motion.button>
              </Magnetic>

              <Magnetic strength={0.2} range={60}>
                <motion.button
                  onClick={onExploreServices}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { scale: 1.02, backgroundColor: 'rgba(250,246,234,0.12)', borderColor: 'rgba(217,178,60,0.5)' }
                  }
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#FAF6EA]/30 text-[#FAF6EA] font-semibold text-base transition-all cursor-pointer backdrop-blur-sm"
                >
                  Explore Services
                </motion.button>
              </Magnetic>
            </motion.div>

            {/* 3 Trust Badges: Clean flex-wrap row (gap-x-6 gap-y-3) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: EASE_OUT }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-2"
            >
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-[#FAF6EA]/90 text-xs sm:text-sm font-medium tracking-wide"
                >
                  <div className="w-7 h-7 rounded-full bg-[#D9B23C]/15 border border-[#D9B23C]/35 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-[#D9B23C]" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column (5 cols): Photography with Explicit Z-Indices & Aspect Ratio */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none pt-4 sm:pt-6">
            {/* Relative wrapper holding Main image (z-0), Caption (z-10), and Floating cards (z-20) */}
            <div data-cursor="view" className="relative w-full">
              {/* Main Image with Scale & Clip-Path Reveal (z-0) */}
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.15 }}
                animate={{ clipPath: 'inset(0 0% 0 0)', scale: 1 }}
                transition={{ duration: 1.1, delay: 0.35, ease: EASE_IN_OUT }}
                className="relative z-0 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D9B23C]/25 aspect-[4/5] max-h-[520px] bg-[#06301F]"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=85&auto=format&fit=crop"
                  alt="Premium laundry and dry cleaning garment care"
                  width={700}
                  height={540}
                  loading="eager"
                  decoding="async"
                  style={{ y: imageY }}
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06301F]/80 via-transparent to-transparent pointer-events-none" />

                {/* Caption Card (z-10): Bottom anchored with ample space and no overlap */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.85, ease: EASE_OUT }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10"
                >
                  <div className="bg-[#FAF6EA]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#E5DEC9]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0B5D3B] border border-[#D9B23C]/40 flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-[#D9B23C]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif font-bold text-[#0F1A14] text-sm truncate sm:whitespace-normal">
                          Premium quality, every garment.
                        </p>
                        <p className="text-[#667066] text-xs mt-0.5 font-sans">
                          Doorstep delivery at your convenience
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Small Floating Image Card (z-20): Top-Left Corner, NEVER overlaps caption card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: shouldReduceMotion ? 0 : [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.75 },
                  scale: { duration: 0.6, delay: 0.75 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  },
                }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: -2 }}
                className="absolute -top-5 -left-4 sm:-top-7 sm:-left-7 z-20 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-[#06301F] shadow-2xl bg-[#06301F] cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=350&q=80&auto=format&fit=crop"
                  alt="Expert laundry machines and fabric care"
                  width={176}
                  height={176}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Glass Rating Chip ("4.9★ · 10K+ happy customers") (z-20): Top-Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...SPRINGS.smooth, delay: 1.0 }}
                className="absolute -top-4 -right-3 sm:-top-6 sm:-right-5 z-20 flex items-center gap-2 bg-[#06301F]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#D9B23C]/40 shadow-xl"
              >
                <div className="flex items-center gap-1 text-[#D9B23C]">
                  <Star size={13} fill="#D9B23C" />
                  <span className="font-mono text-xs font-bold text-[#FAF6EA]">4.9★</span>
                </div>
                <span className="text-[10px] text-[#FAF6EA]/80 font-mono tracking-wide uppercase">
                  10K+ happy
                </span>
              </motion.div>

              {/* Floating WhatsApp Quick Action Button (z-20): Positioned gracefully */}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRINGS.smooth, delay: 1.15 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex absolute -bottom-4 right-6 z-20 items-center gap-2 bg-[#FAF6EA] px-4 py-2 rounded-full shadow-2xl border border-[#E5DEC9] cursor-pointer"
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MessageCircle size={16} className="text-[#0B5D3B]" />
                </motion.div>
                <span className="text-xs font-bold text-[#0F1A14]">WhatsApp Us</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative hairline bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D9B23C]/40 to-transparent pointer-events-none" />
    </section>
  );
};
