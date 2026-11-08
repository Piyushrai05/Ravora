import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  User, Phone, Hash, MapPin, Calendar, Clock, FileText,
  CheckSquare, Square, ArrowRight, Edit2, MessageCircle,
  AlertCircle, CheckCircle2, X,
} from 'lucide-react';
import { SERVICES, WHATSAPP_NUMBER } from '../constants';
import type { BookingForm, BookingErrors } from '../types';
import {
  validateBooking, buildWhatsAppMessage, saveBookingDraft, loadBookingDraft,
  clearBookingDraft, getMinPickupDate, getMaxPickupDate, sanitizePhoneNumber,
  generateWhatsAppUrl,
} from '../utils/booking';
import { viewport } from '../animations/variants';

const EMPTY_FORM: BookingForm = {
  name: '',
  phone: '',
  services: [],
  clothCount: '',
  address: '',
  pickupDate: '',
  pickupTime: '',
  instructions: '',
};

const TIME_SLOTS = [
  '8:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
  '6:00 PM – 8:00 PM',
];

const SERVICE_NAMES: Record<string, string> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.name])
);

interface BookingSectionProps {
  preSelectedServices?: string[];
  onClearPreSelected?: () => void;
}

type FormStep = 'form' | 'summary';

// Accessible error message with shake
const FieldError: React.FC<{ id: string; msg?: string }> = ({ id, msg }) => (
  <AnimatePresence>
    {msg && (
      <motion.div
        id={id}
        role="alert"
        aria-live="polite"
        initial={{ opacity: 0, y: -4, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -4, height: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center gap-1.5 mt-1.5 overflow-hidden"
      >
        <AlertCircle size={13} className="text-[#991F32] shrink-0" />
        <p className="text-[#991F32] text-xs font-medium">{msg}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export const BookingSection: React.FC<BookingSectionProps> = ({
  preSelectedServices = [],
  onClearPreSelected,
}) => {
  const [form, setForm] = useState<BookingForm>(() => loadBookingDraft() ?? EMPTY_FORM);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [step, setStep] = useState<FormStep>('form');
  const [submitted, setSubmitted] = useState(false);
  const [shakeFields, setShakeFields] = useState<string[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const [prevPropServices, setPrevPropServices] = useState<string[]>(preSelectedServices);
  if (preSelectedServices !== prevPropServices && preSelectedServices.length > 0) {
    setPrevPropServices(preSelectedServices);
    setForm((prev) => ({
      ...prev,
      services: Array.from(new Set([...prev.services, ...preSelectedServices])),
    }));
    onClearPreSelected?.();
  }

  useEffect(() => {
    saveBookingDraft(form);
  }, [form]);

  const updateField = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof BookingErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const toggleService = (id: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const handleContinue = () => {
    const errs = validateBooking(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShakeFields(Object.keys(errs));
      setTimeout(() => setShakeFields([]), 500);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    setStep('summary');
    setTimeout(() => {
      document.getElementById('booking-summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleWhatsApp = () => {
    const message = buildWhatsAppMessage(form, SERVICE_NAMES);
    const url = generateWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleEdit = () => {
    setStep('form');
    setSubmitted(false);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    clearBookingDraft();
    setForm(EMPTY_FORM);
    setErrors({});
    setStep('form');
    setSubmitted(false);
  };

  const inputBase = (hasError?: string) =>
    `w-full px-4 py-3 rounded-xl border text-[#26352B] text-sm placeholder:text-[#77766D]/70 focus:outline-none transition-all duration-200 ${
      hasError
        ? 'border-[#991F32] bg-red-50/40 focus:ring-2 focus:ring-[#991F32]/20'
        : 'border-[#E8DFC5] bg-white focus:ring-2 focus:ring-[#075B3B]/20 focus:border-[#075B3B]'
    }`;

  const summaryRows = [
    { label: 'Name', value: form.name },
    { label: 'WhatsApp', value: `+91 ${sanitizePhoneNumber(form.phone)}` },
    {
      label: 'Services',
      value: form.services.map((id) => SERVICE_NAMES[id] || id).join(', '),
    },
    { label: 'Approx. Clothes', value: `${form.clothCount} item(s)` },
    { label: 'Pickup Address', value: form.address },
    { label: 'Preferred Date', value: form.pickupDate },
    { label: 'Preferred Slot', value: form.pickupTime },
    ...(form.instructions ? [{ label: 'Special Instructions', value: form.instructions }] : []),
  ];

  return (
    <section id="booking" className="py-20 md:py-28 bg-[#FFFEFA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5 }}
            className="text-[#D4AF37] text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Doorstep Garment Care
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#26352B] mt-2 mb-4"
          >
            Schedule Your Pickup
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="gold-divider mb-4"
            style={{ transformOrigin: 'center' }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#55544D] text-base max-w-lg mx-auto"
          >
            Fill in your garment care details below. Your booking request will be confirmed via WhatsApp directly by our team.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl border border-[#E8DFC5] shadow-md overflow-hidden"
            >
              {/* Form header */}
              <div className="bg-gradient-to-r from-[#075B3B] to-[#06452F] px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Booking Details</h3>
                  <p className="text-white/80 text-xs mt-0.5">All fields marked * are required for pickup</p>
                </div>
                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  Step 1 of 2
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleContinue();
                }}
                className="p-6 md:p-8 space-y-6"
                noValidate
              >
                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    id="field-name"
                    animate={
                      shakeFields.includes('name') && !shouldReduceMotion
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor="input-name" className="block text-sm font-semibold text-[#26352B] mb-1.5">
                      Full Name <span className="text-[#991F32]">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77766D]" />
                      <input
                        id="input-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={`${inputBase(errors.name)} pl-10`}
                      />
                    </div>
                    <FieldError id="error-name" msg={errors.name} />
                  </motion.div>

                  <motion.div
                    id="field-phone"
                    animate={
                      shakeFields.includes('phone') && !shouldReduceMotion
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor="input-phone" className="block text-sm font-semibold text-[#26352B] mb-1.5">
                      WhatsApp Mobile Number <span className="text-[#991F32]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-semibold text-[#075B3B]">
                        +91
                      </span>
                      <Phone size={14} className="absolute left-11 text-[#77766D]" />
                      <input
                        id="input-phone"
                        type="tel"
                        autoComplete="tel-national"
                        value={form.phone}
                        onChange={(e) => updateField('phone', sanitizePhoneNumber(e.target.value))}
                        placeholder="9876543210"
                        maxLength={10}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`${inputBase(errors.phone)} pl-16 font-medium`}
                      />
                    </div>
                    <FieldError id="error-phone" msg={errors.phone} />
                  </motion.div>
                </div>

                {/* Services Selection */}
                <motion.div
                  id="field-services"
                  animate={
                    shakeFields.includes('services') && !shouldReduceMotion
                      ? { x: [0, -5, 5, -3, 3, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-[#26352B] mb-2">
                    Select Garment Services <span className="text-[#991F32]">*</span>{' '}
                    <span className="text-xs font-normal text-[#55544D]">(Multiple allowed)</span>
                  </label>
                  <div
                    className="grid sm:grid-cols-2 gap-2.5"
                    role="group"
                    aria-label="Garment care services"
                  >
                    {SERVICES.map((service) => {
                      const selected = form.services.includes(service.id);
                      return (
                        <motion.button
                          key={service.id}
                          type="button"
                          role="checkbox"
                          aria-checked={selected}
                          onClick={() => toggleService(service.id)}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                          animate={
                            selected
                              ? { borderColor: '#075B3B', backgroundColor: 'rgba(7,91,59,0.06)' }
                              : { borderColor: '#E8DFC5', backgroundColor: '#fff' }
                          }
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl border text-left cursor-pointer"
                        >
                          <AnimatePresence mode="wait">
                            {selected ? (
                              <motion.div
                                key="checked"
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                              >
                                <CheckSquare size={17} className="text-[#075B3B] shrink-0" />
                              </motion.div>
                            ) : (
                              <motion.div key="unchecked" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                                <Square size={17} className="shrink-0 text-[#77766D]" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <span
                            className={`text-sm font-medium transition-colors ${
                              selected ? 'text-[#075B3B] font-semibold' : 'text-[#26352B]'
                            }`}
                          >
                            {service.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                  <FieldError id="error-services" msg={errors.services} />
                </motion.div>

                {/* Cloth count + Address */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    id="field-clothCount"
                    animate={
                      shakeFields.includes('clothCount') && !shouldReduceMotion
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor="input-clothCount" className="block text-sm font-semibold text-[#26352B] mb-1.5">
                      Approx. Clothes Count <span className="text-[#991F32]">*</span>
                    </label>
                    <div className="relative">
                      <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77766D]" />
                      <input
                        id="input-clothCount"
                        type="number"
                        min={1}
                        max={500}
                        step={1}
                        value={form.clothCount}
                        onChange={(e) => updateField('clothCount', e.target.value)}
                        placeholder="e.g. 8"
                        aria-invalid={!!errors.clothCount}
                        aria-describedby={errors.clothCount ? 'error-clothCount' : undefined}
                        className={`${inputBase(errors.clothCount)} pl-10`}
                      />
                    </div>
                    <FieldError id="error-clothCount" msg={errors.clothCount} />
                  </motion.div>

                  <motion.div
                    id="field-address"
                    animate={
                      shakeFields.includes('address') && !shouldReduceMotion
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor="input-address" className="block text-sm font-semibold text-[#26352B] mb-1.5">
                      Doorstep Pickup Address <span className="text-[#991F32]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3.5 top-3.5 text-[#77766D]" />
                      <textarea
                        id="input-address"
                        rows={2}
                        value={form.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder="House/Tower No, Society/Colony, Sector 67A, Gurugram"
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? 'error-address' : undefined}
                        className={`${inputBase(errors.address)} pl-10 resize-none`}
                      />
                    </div>
                    <FieldError id="error-address" msg={errors.address} />
                  </motion.div>
                </div>

                {/* Date + Time */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div
                    id="field-pickupDate"
                    animate={
                      shakeFields.includes('pickupDate') && !shouldReduceMotion
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor="input-pickupDate" className="block text-sm font-semibold text-[#26352B] mb-1.5">
                      Preferred Pickup Date <span className="text-[#991F32]">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77766D]" />
                      <input
                        id="input-pickupDate"
                        type="date"
                        min={getMinPickupDate()}
                        max={getMaxPickupDate()}
                        value={form.pickupDate}
                        onChange={(e) => updateField('pickupDate', e.target.value)}
                        aria-invalid={!!errors.pickupDate}
                        aria-describedby={errors.pickupDate ? 'error-pickupDate' : undefined}
                        className={`${inputBase(errors.pickupDate)} pl-10 cursor-pointer`}
                      />
                    </div>
                    <FieldError id="error-pickupDate" msg={errors.pickupDate} />
                  </motion.div>

                  <motion.div
                    id="field-pickupTime"
                    animate={
                      shakeFields.includes('pickupTime') && !shouldReduceMotion
                        ? { x: [0, -6, 6, -4, 4, 0] }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor="input-pickupTime" className="block text-sm font-semibold text-[#26352B] mb-1.5">
                      Preferred Time Slot <span className="text-[#991F32]">*</span>
                    </label>
                    <div className="relative">
                      <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77766D]" />
                      <select
                        id="input-pickupTime"
                        value={form.pickupTime}
                        onChange={(e) => updateField('pickupTime', e.target.value)}
                        aria-invalid={!!errors.pickupTime}
                        aria-describedby={errors.pickupTime ? 'error-pickupTime' : undefined}
                        className={`${inputBase(errors.pickupTime)} pl-10 appearance-none cursor-pointer`}
                      >
                        <option value="">Select a pickup time window</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    <FieldError id="error-pickupTime" msg={errors.pickupTime} />
                  </motion.div>
                </div>

                {/* Additional Instructions */}
                <div>
                  <label htmlFor="input-instructions" className="block text-sm font-semibold text-[#26352B] mb-1.5">
                    Special Garment Instructions{' '}
                    <span className="text-[#55544D] font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <FileText size={15} className="absolute left-3.5 top-3.5 text-[#77766D]" />
                    <textarea
                      id="input-instructions"
                      rows={3}
                      value={form.instructions}
                      onChange={(e) => updateField('instructions', e.target.value)}
                      placeholder="e.g. Delicate silk sari, wine stain on collar, starch on formal shirts, etc."
                      className={`${inputBase()} pl-10 resize-none`}
                    />
                  </div>
                </div>

                {/* Auto-save helper indicator */}
                <div className="flex items-center justify-between text-xs text-[#55544D] pt-1 border-t border-[#E8DFC5]/60">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#075B3B]" />
                    Draft saved locally on this browser.
                  </span>
                  {form.name || form.phone || form.address ? (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[#991F32] hover:underline cursor-pointer"
                    >
                      Clear Draft
                    </button>
                  ) : null}
                </div>

                {/* Review Button */}
                <motion.button
                  type="submit"
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { scale: 1.01, y: -2, boxShadow: '0 12px 32px rgba(7,91,59,0.25)' }
                  }
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#075B3B] text-white font-bold text-base transition-colors hover:bg-[#06452F] shadow-md cursor-pointer"
                >
                  <span>Review Booking Details</span>
                  <motion.span
                    animate={shouldReduceMotion ? {} : { x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              id="booking-summary"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl border border-[#E8DFC5] shadow-md overflow-hidden"
            >
              {/* Summary Header */}
              <div className="bg-gradient-to-r from-[#075B3B] to-[#06452F] px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Review Your Booking</h3>
                  <p className="text-white/80 text-xs mt-0.5">Please confirm details before sending on WhatsApp</p>
                </div>
                <motion.button
                  type="button"
                  onClick={handleEdit}
                  whileHover={shouldReduceMotion ? {} : { backgroundColor: 'rgba(255,255,255,0.25)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/15 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  <Edit2 size={13} />
                  Edit Details
                </motion.button>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                {summaryRows.map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 pb-3.5 border-b border-[#E8DFC5]/80 last:border-0 last:pb-0"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#77766D] sm:min-w-[160px] shrink-0">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-[#26352B] leading-relaxed break-words">
                      {value}
                    </span>
                  </motion.div>
                ))}

                {/* WhatsApp Confirmation Policy Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: summaryRows.length * 0.05 + 0.1 }}
                  className="flex items-start gap-2.5 bg-[#FFF9E9] border border-[#E8DFC5] rounded-xl p-4 mt-2"
                >
                  <AlertCircle size={17} className="text-[#D4AF37] mt-0.5 shrink-0" />
                  <p className="text-[#55544D] text-xs leading-relaxed">
                    <strong className="text-[#26352B]">Notice:</strong> Clicking below opens WhatsApp with all your details pre-filled.
                    Orders are confirmed directly by RAVORA on WhatsApp — no automated charges or fake bookings.
                  </p>
                </motion.div>

                {/* Primary WhatsApp Action */}
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.button
                      key="wa-btn"
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleWhatsApp}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : { scale: 1.01, y: -2, boxShadow: '0 12px 32px rgba(34,197,94,0.35)' }
                      }
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#25D366] text-white font-bold text-base transition-colors hover:bg-[#20ba59] shadow-md cursor-pointer mt-3"
                    >
                      <motion.span
                        animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <MessageCircle size={20} />
                      </motion.span>
                      <span>Continue to WhatsApp Booking</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, type: 'spring', stiffness: 300, damping: 24 }}
                      className="space-y-3 pt-2"
                    >
                      <div className="flex items-center justify-center gap-2 py-4 rounded-xl bg-green-50 border border-green-200">
                        <motion.div
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <CheckCircle2 size={22} className="text-green-600" />
                        </motion.div>
                        <span className="font-semibold text-green-800 text-sm">
                          WhatsApp message generated and ready to send!
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="w-full py-3 rounded-xl border border-green-600 text-green-700 font-semibold text-sm hover:bg-green-50 transition-all cursor-pointer"
                      >
                        Re-open WhatsApp
                      </button>
                      <motion.button
                        type="button"
                        onClick={handleReset}
                        whileHover={shouldReduceMotion ? {} : { backgroundColor: '#FFF9E9' }}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E8DFC5] text-[#55544D] text-sm font-medium transition-colors cursor-pointer"
                      >
                        <X size={15} />
                        Start New Booking
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
