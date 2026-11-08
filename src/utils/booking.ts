import type { BookingForm, BookingErrors } from '../types';

const STORAGE_KEY = 'ravora_booking_draft';

/**
 * Standardize Indian phone number input.
 * Strips non-digits, strips leading +91 / 91 (if 12 digits), or leading 0 (if 11 digits).
 */
export function sanitizePhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits.slice(0, 10);
}

/**
 * Sanitize plain text to prevent injection or weird control characters
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, '') // remove HTML tag brackets
    .trim();
}

export function saveBookingDraft(data: BookingForm): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Gracefully handle storage quota or privacy mode errors
  }
}

export function loadBookingDraft(): BookingForm | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    return parsed as BookingForm;
  } catch {
    return null;
  }
}

export function clearBookingDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage deletion errors
  }
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getMinPickupDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function getMaxPickupDate(): string {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // Allow bookings up to 30 days in advance
  return maxDate.toISOString().split('T')[0];
}

export function validateBooking(form: BookingForm): BookingErrors {
  const errors: BookingErrors = {};

  // Name validation
  const cleanName = sanitizeText(form.name);
  if (!cleanName) {
    errors.name = 'Please enter your full name.';
  } else if (cleanName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (!/^[a-zA-Z\s.'-]+$/.test(cleanName)) {
    errors.name = 'Please enter a valid name (letters and spaces only).';
  }

  // Phone validation (10-digit Indian mobile starting with 6-9)
  const cleanPhone = sanitizePhoneNumber(form.phone);
  if (!cleanPhone) {
    errors.phone = 'Please enter your WhatsApp mobile number.';
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number (starts with 6-9).';
  }

  // Services validation
  if (!form.services || form.services.length === 0) {
    errors.services = 'Please select at least one garment care service.';
  }

  // Clothes count validation (integer between 1 and 500)
  const count = Number(form.clothCount);
  if (!form.clothCount || !form.clothCount.trim()) {
    errors.clothCount = 'Please enter approximate number of clothes.';
  } else if (isNaN(count) || !Number.isInteger(count) || count < 1 || count > 500) {
    errors.clothCount = 'Please enter a valid whole number between 1 and 500.';
  }

  // Address validation
  const cleanAddress = sanitizeText(form.address);
  if (!cleanAddress) {
    errors.address = 'Please enter your pickup address.';
  } else if (cleanAddress.length < 8) {
    errors.address = 'Please provide a complete address (house/flat, colony or sector).';
  }

  // Date validation (must not be past date)
  const minDate = getMinPickupDate();
  const maxDate = getMaxPickupDate();
  if (!form.pickupDate) {
    errors.pickupDate = 'Please select a preferred pickup date.';
  } else if (form.pickupDate < minDate) {
    errors.pickupDate = 'Pickup date must be tomorrow or later.';
  } else if (form.pickupDate > maxDate) {
    errors.pickupDate = 'Pickup date cannot be more than 30 days in advance.';
  }

  // Time slot validation
  if (!form.pickupTime) {
    errors.pickupTime = 'Please select a preferred time slot.';
  }

  return errors;
}

export function buildWhatsAppMessage(
  form: BookingForm,
  serviceNames: Record<string, string>
): string {
  const selectedServiceNames = form.services
    .map((id) => serviceNames[id] || id)
    .join(', ');

  const cleanName = sanitizeText(form.name);
  const cleanPhone = sanitizePhoneNumber(form.phone);
  const cleanAddress = sanitizeText(form.address);
  const cleanInstructions = form.instructions ? sanitizeText(form.instructions) : '';

  return `Hello RAVORA! 👋

I would like to book a laundry & dry cleaning pickup.

*📋 Booking Details*
━━━━━━━━━━━━━━━━━━
👤 *Name:* ${cleanName}
📞 *Contact:* +91 ${cleanPhone}

🧺 *Services:* ${selectedServiceNames}
👕 *Approx. Clothes:* ${form.clothCount} item(s)

📍 *Pickup Address:*
${cleanAddress}

📅 *Preferred Pickup Date:* ${form.pickupDate}
⏰ *Preferred Pickup Time:* ${form.pickupTime}
${cleanInstructions ? `\n📝 *Additional Instructions:*\n${cleanInstructions}` : ''}
━━━━━━━━━━━━━━━━━━
Please confirm my booking at your earliest convenience. Thank you!`;
}

export function generateWhatsAppUrl(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
