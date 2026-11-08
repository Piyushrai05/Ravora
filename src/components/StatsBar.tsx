import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Counter } from './motion/Counter';
import { EASE, VIEWPORT } from '../animations';
import { Sparkles, Clock, Star, ShieldCheck } from 'lucide-react';

const STATS = [
  {
    icon: Sparkles,
    value: 10000,
    suffix: '+',
    decimals: 0,
    label: 'Clothes Cleaned',
    subtext: 'Pristine garment care',
  },
  {
    icon: Clock,
    value: 24,
    suffix: 'hr',
    decimals: 0,
    label: 'Doorstep Delivery',
    subtext: 'Swift & timely turnaround',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '★',
    decimals: 1,
    label: 'Customer Rating',
    subtext: 'From 850+ happy clients',
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: '%',
    decimals: 0,
    label: 'Hygiene Assured',
    subtext: 'Eco-safe sanitation process',
  },
];

export const StatsBar: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-12 md:py-16 bg-[#06301F] text-[#FAF6EA] border-y border-[#D9B23C]/25 overflow-hidden">
      {/* Background glow & subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0B5D3B]/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: EASE.luxury,
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -4,
                        transition: { duration: 0.25 },
                      }
                }
                className="relative flex flex-col items-center text-center p-3.5 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#D9B23C]/40 hover:bg-white/[0.08] transition-all duration-300"
              >
                {/* Icon Badge */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D9B23C]/15 border border-[#D9B23C]/30 flex items-center justify-center mb-2.5 sm:mb-3">
                  <Icon size={17} className="text-[#D9B23C]" />
                </div>

                {/* Counter Metric */}
                <div className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-[#D9B23C] tracking-tight mb-1">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    duration={2000}
                  />
                </div>

                {/* Stat Title */}
                <div className="font-medium text-[#FAF6EA] text-xs sm:text-base tracking-wide mb-1">
                  {stat.label}
                </div>

                {/* Micro Subtext */}
                <div className="text-[11px] sm:text-xs text-[#FAF6EA]/60 tracking-normal hidden sm:block">
                  {stat.subtext}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
