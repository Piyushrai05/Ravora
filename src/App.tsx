import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/motion/Marquee';
import { StatsBar } from './components/StatsBar';
import { ServicesSection } from './components/ServicesSection';
import { OffersSection } from './components/OffersSection';
import { HowItWorks } from './components/HowItWorks';
import { BookingSection } from './components/BookingSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { ScrollProgress } from './components/ScrollProgress';
import { Preloader } from './components/motion/Preloader';

function App() {
  const [preSelectedServices, setPreSelectedServices] = useState<string[]>([]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectService = (serviceId: string) => {
    setPreSelectedServices((prev) =>
      prev.includes(serviceId) ? prev : [...prev, serviceId]
    );
    scrollToBooking();
  };

  const handleBookPickup = () => scrollToBooking();

  const handleExploreServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen pb-28 sm:pb-0 relative bg-[#FAF6EA] text-[#0F1A14] selection:bg-[#D9B23C]/30 selection:text-[#06301F]">
      {/* Subtle Film Grain Texture Overlay (2-3% opacity) */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Preloader Intro */}
      <Preloader />

      {/* Global Scroll Progress */}
      <ScrollProgress />

      {/* Header */}
      <Navbar onBookPickup={handleBookPickup} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onBookPickup={handleBookPickup}
          onExploreServices={handleExploreServices}
        />

        {/* Marquee Ticker */}
        <Marquee speed={32} />

        {/* Stats Counter Bar */}
        <StatsBar />

        {/* Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Offers Section */}
        <OffersSection />

        {/* How It Works */}
        <HowItWorks />

        {/* Booking Section */}
        <BookingSection
          preSelectedServices={preSelectedServices}
          onClearPreSelected={() => setPreSelectedServices([])}
        />

        {/* Location Section */}
        <LocationSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onBookPickup={handleBookPickup} />

      {/* Mobile Sticky CTA */}
      <StickyMobileCTA onBookPickup={handleBookPickup} />
    </div>
  );
}

export default App;
