import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, CalendarCheck } from 'lucide-react';
import { WHATSAPP_URL } from '../constants';

interface StickyMobileCTAProps {
  onBookPickup: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onBookPickup }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#FAF6EA]/98 backdrop-blur-md border-t border-[#E5DEC9] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex gap-3 shadow-[0_-4px_24px_rgba(6,48,31,0.08)]"
    >
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
        className="flex-1 min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-full border border-[#0B5D3B]/40 text-[#0B5D3B] font-semibold text-sm bg-white/70 active:bg-white transition-colors"
      >
        <motion.span
          animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MessageCircle size={17} />
        </motion.span>
        WhatsApp
      </motion.a>

      <motion.button
        onClick={onBookPickup}
        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
        className="flex-1 min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-full bg-[#0B5D3B] text-white font-bold text-sm active:bg-[#06301F] transition-colors shadow-md shadow-[#0B5D3B]/20 cursor-pointer"
      >
        <CalendarCheck size={17} />
        Book Pickup
      </motion.button>
    </motion.div>
  );
};
