import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '../constants';
import { Magnetic } from './motion/Magnetic';
import { EASE_IN_OUT } from '../lib/motion';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Offers', href: '#offers' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onBookPickup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookPickup }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Scroll direction detection (hide on scroll down, show on scroll up)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled state for styling
      setIsScrolled(currentScrollY > 40);

      // Don't hide if menu is open or near top
      if (menuOpen || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        const delta = currentScrollY - lastScrollY.current;
        if (delta > 8) {
          // Scrolling down
          setIsVisible(false);
        } else if (delta < -8) {
          // Scrolling up
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Track active section on scroll
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.25 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(6, 48, 31, 0.96)' : 'rgba(6, 48, 31, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(217, 178, 60, 0.25)',
        transform: isVisible ? 'translateY(0%)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.76, 0, 0.24, 1), background-color 0.3s ease',
      }}
      className="w-full shadow-lg shadow-[#06301F]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <Magnetic strength={0.15} range={50}>
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              {/* Circular Logo Icon with Gold Border & Gold Fill */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#06301F] border-2 border-[#D9B23C] flex items-center justify-center shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C9 2 6.5 4 6.5 4L4 6l2 1-1 2 3-1 1 2-1 2 3-1 1 3h2l1-3 3 1-1-2 1-2 3 1-1-2 2-1-2.5-2S15 2 12 2Z"
                    fill="#D9B23C"
                  />
                  <path d="M8 14c0 3 1.5 6 4 7 2.5-1 4-4 4-7H8Z" fill="#D9B23C" opacity="0.85" />
                </svg>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-xl md:text-2xl tracking-wider text-[#D9B23C] drop-shadow-sm group-hover:text-[#E7C65A] transition-colors">
                  RAVORA
                </span>
                <span className="text-[9px] tracking-[0.18em] uppercase text-[#D9B23C] font-semibold opacity-90 hidden sm:block font-mono">
                  Clothes &amp; Dry Clean
                </span>
              </div>
            </button>
          </Magnetic>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`group relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-[#D9B23C]' : 'text-[#FAF6EA] hover:text-[#D9B23C]'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-[#D9B23C]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Underline growing from left */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-[#D9B23C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Button */}
            <Magnetic strength={0.15} range={50}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium text-[#D9B23C] border border-[#D9B23C]/50 hover:bg-[#D9B23C] hover:text-[#06301F] transition-all duration-200 shadow-sm"
              >
                <MessageCircle size={15} />
                <span className="hidden md:inline">WhatsApp</span>
              </a>
            </Magnetic>

            {/* Book a Pickup Button */}
            <Magnetic strength={0.2} range={60}>
              <button
                onClick={onBookPickup}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-[#D9B23C] text-[#06301F] border border-[#D9B23C] hover:bg-[#E7C65A] transition-all shadow-md shadow-[#D9B23C]/20 cursor-pointer"
              >
                <span>Book a Pickup</span>
                <span className="w-5 h-5 rounded-full bg-[#06301F]/15 flex items-center justify-center">
                  <ArrowRight size={12} className="text-[#06301F]" />
                </span>
              </button>
            </Magnetic>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#D9B23C] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
            >
              <motion.div
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Staggered Entrance */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_IN_OUT }}
            style={{
              backgroundColor: 'rgba(6, 48, 31, 0.98)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(217, 178, 60, 0.25)',
            }}
            className="w-full lg:hidden overflow-hidden shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: idx * 0.05,
                      duration: 0.3,
                      ease: EASE_IN_OUT,
                    }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                      isActive
                        ? 'text-[#D9B23C] bg-white/10 font-semibold'
                        : 'text-[#FAF6EA] hover:text-[#D9B23C] hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}

              {/* Mobile Menu Actions */}
              <div className="mt-3 pt-4 border-t border-[rgba(217,178,60,0.2)] flex flex-col gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D9B23C]/60 text-[#D9B23C] font-semibold text-sm hover:bg-[#D9B23C] hover:text-[#06301F] transition-all"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onBookPickup();
                  }}
                  className="py-3 rounded-xl bg-[#D9B23C] text-[#06301F] font-bold text-sm hover:bg-[#E7C65A] transition-all shadow-md shadow-[#D9B23C]/20 flex items-center justify-center gap-2"
                >
                  <span>Book a Pickup</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
