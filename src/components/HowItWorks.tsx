import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ClipboardList, CalendarCheck, Sparkles, PackageCheck } from 'lucide-react';
import { HOW_IT_WORKS } from '../constants';
import { Reveal } from './motion/Reveal';
import { SplitText } from './motion/SplitText';
import { EASE } from '../animations';

const ICONS = { ClipboardList, CalendarCheck, Sparkles, PackageCheck };

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const stepVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: i * 0.15,
        ease: EASE.luxury,
      },
    }),
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#FFF9E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#075B3B]/10 border border-[#075B3B]/20 text-[#075B3B] text-xs font-bold tracking-[0.22em] uppercase mb-3">
              03 — How It Works
            </span>
          </Reveal>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26352B] mt-2 mb-4">
            <SplitText text="Effortless Doorstep Care" italicWord="Effortless" />
          </h2>

          <Reveal delay={0.2}>
            <div className="gold-divider mb-4" />
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-[#55544D] text-base sm:text-lg max-w-xl mx-auto">
              From instant booking to sanitized doorstep delivery — luxury laundry simplified into four seamless steps.
            </p>
          </Reveal>
        </div>

        {/* Steps container */}
        <div ref={containerRef} className="relative">
          {/* Animated drawing connecting progress line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-[3px] bg-[#E8DFC5] z-0 overflow-hidden rounded-full">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 1.6,
                delay: 0.3,
                ease: EASE.luxury,
              }}
              className="h-full bg-gradient-to-r from-[#075B3B] via-[#D4AF37] to-[#075B3B]"
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = ICONS[step.icon as keyof typeof ICONS];
              const stepNumber = String(step.step).padStart(2, '0');

              return (
                <motion.div
                  key={step.step}
                  custom={i}
                  variants={stepVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step Icon Circle */}
                  <div className="relative z-10 mb-6">
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: 1.08,
                              y: -4,
                              boxShadow: '0 16px 36px rgba(7,91,59,0.15)',
                              borderColor: '#D4AF37',
                            }
                      }
                      transition={{ duration: 0.3 }}
                      className="w-32 h-32 rounded-3xl bg-white border-2 border-[#E8DFC5] shadow-md flex flex-col items-center justify-center p-3 transition-colors duration-300"
                    >
                      {/* Step Number Badge */}
                      <span className="font-mono text-xs font-bold text-[#D4AF37] tracking-wider mb-2 px-2 py-0.5 rounded-full bg-[#FFF9E9] border border-[#E8DFC5]">
                        {stepNumber}
                      </span>

                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-[#075B3B]/10 group-hover:bg-[#075B3B] flex items-center justify-center transition-colors duration-300">
                        {Icon && (
                          <Icon
                            size={22}
                            className="text-[#075B3B] group-hover:text-[#D4AF37] transition-colors duration-300"
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Ripple ring on view */}
                    {!shouldReduceMotion && inView && (
                      <motion.div
                        initial={{ opacity: 0.6, scale: 0.9 }}
                        animate={{ opacity: 0, scale: 1.4 }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.2 + 0.3,
                          ease: 'easeOut',
                        }}
                        className="absolute inset-0 rounded-3xl border border-[#D4AF37]/50 pointer-events-none"
                      />
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl font-bold text-[#26352B] mb-2 group-hover:text-[#075B3B] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#55544D] text-sm leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
