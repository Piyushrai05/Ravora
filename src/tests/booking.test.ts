import assert from 'node:assert';
import {
  sanitizePhoneNumber,
  sanitizeText,
  validateBooking,
  buildWhatsAppMessage,
  generateWhatsAppUrl,
  getMinPickupDate,
} from '../utils/booking.ts';
import { BUSINESS, OFFERS, SERVICES, WHATSAPP_NUMBER } from '../constants.ts';
import type { BookingForm } from '../types.ts';

console.log('🧪 Starting RAVORA Comprehensive Automated Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function it(description: string, fn: () => void) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passedTests++;
  } catch (error: any) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     ${error.message}`);
  }
}

// ----------------------------------------------------
// 1. Phone Number Sanitization Tests
// ----------------------------------------------------
console.log('📦 1. Testing Phone Number Sanitization');
it('strips non-digits from phone input', () => {
  assert.strictEqual(sanitizePhoneNumber('+91 94527-09726'), '9452709726');
});

it('removes 91 prefix when 12 digits provided', () => {
  assert.strictEqual(sanitizePhoneNumber('919452709726'), '9452709726');
});

it('removes leading 0 when 11 digits provided', () => {
  assert.strictEqual(sanitizePhoneNumber('09452709726'), '9452709726');
});

it('keeps 10 digits as-is', () => {
  assert.strictEqual(sanitizePhoneNumber('9452709726'), '9452709726');
});

// ----------------------------------------------------
// 2. Text Sanitization Tests
// ----------------------------------------------------
console.log('\n📦 2. Testing Text Sanitization & XSS Prevention');
it('strips HTML brackets from text', () => {
  assert.strictEqual(sanitizeText('<script>alert("xss")</script>Priya'), 'scriptalert("xss")/scriptPriya');
});

it('trims whitespace', () => {
  assert.strictEqual(sanitizeText('  Rahul Verma  '), 'Rahul Verma');
});

// ----------------------------------------------------
// 3. Validation Logic Tests
// ----------------------------------------------------
console.log('\n📦 3. Testing Booking Form Validation');
it('fails on empty form submission', () => {
  const emptyForm: BookingForm = {
    name: '',
    phone: '',
    services: [],
    clothCount: '',
    address: '',
    pickupDate: '',
    pickupTime: '',
    instructions: '',
  };
  const errors = validateBooking(emptyForm);
  assert.ok(errors.name);
  assert.ok(errors.phone);
  assert.ok(errors.services);
  assert.ok(errors.clothCount);
  assert.ok(errors.address);
  assert.ok(errors.pickupDate);
  assert.ok(errors.pickupTime);
});

it('rejects names shorter than 2 characters or with digits', () => {
  const form: BookingForm = {
    name: 'A',
    phone: '9452709726',
    services: ['premium-laundry'],
    clothCount: '5',
    address: 'Sector 67A Gurugram',
    pickupDate: getMinPickupDate(),
    pickupTime: '10:00 AM – 12:00 PM',
    instructions: '',
  };
  const errors = validateBooking(form);
  assert.ok(errors.name);

  form.name = 'Priya123';
  const errors2 = validateBooking(form);
  assert.ok(errors2.name);
});

it('rejects invalid mobile numbers not starting with 6-9', () => {
  const form: BookingForm = {
    name: 'Priya Sharma',
    phone: '5452709726',
    services: ['premium-laundry'],
    clothCount: '5',
    address: 'Sector 67A Gurugram',
    pickupDate: getMinPickupDate(),
    pickupTime: '10:00 AM – 12:00 PM',
    instructions: '',
  };
  const errors = validateBooking(form);
  assert.ok(errors.phone);
});

it('rejects non-integer, negative, or excessive clothes count', () => {
  const form: BookingForm = {
    name: 'Priya Sharma',
    phone: '9452709726',
    services: ['premium-laundry'],
    clothCount: '0',
    address: 'Sector 67A Gurugram',
    pickupDate: getMinPickupDate(),
    pickupTime: '10:00 AM – 12:00 PM',
    instructions: '',
  };
  assert.ok(validateBooking(form).clothCount);

  form.clothCount = '-5';
  assert.ok(validateBooking(form).clothCount);

  form.clothCount = '3.5';
  assert.ok(validateBooking(form).clothCount);

  form.clothCount = '1000';
  assert.ok(validateBooking(form).clothCount);
});

it('rejects short or empty pickup address', () => {
  const form: BookingForm = {
    name: 'Priya Sharma',
    phone: '9452709726',
    services: ['premium-laundry'],
    clothCount: '5',
    address: 'Flat 1',
    pickupDate: getMinPickupDate(),
    pickupTime: '10:00 AM – 12:00 PM',
    instructions: '',
  };
  assert.ok(validateBooking(form).address);
});

it('rejects past pickup dates', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const form: BookingForm = {
    name: 'Priya Sharma',
    phone: '9452709726',
    services: ['premium-laundry'],
    clothCount: '5',
    address: 'House UA-60, Sector 67A, Gurugram',
    pickupDate: yesterday.toISOString().split('T')[0],
    pickupTime: '10:00 AM – 12:00 PM',
    instructions: '',
  };
  const errors = validateBooking(form);
  assert.ok(errors.pickupDate);
});

it('accepts a completely valid booking form', () => {
  const form: BookingForm = {
    name: 'Priya Sharma',
    phone: '9452709726',
    services: ['premium-laundry', 'dry-cleaning'],
    clothCount: '8',
    address: 'Tower 4, Flat 502, Vaishnav Enclave, Sector 67A, Gurugram',
    pickupDate: getMinPickupDate(),
    pickupTime: '10:00 AM – 12:00 PM',
    instructions: 'Handle formal blazer with extra care',
  };
  const errors = validateBooking(form);
  assert.strictEqual(Object.keys(errors).length, 0);
});

// ----------------------------------------------------
// 4. WhatsApp Message & URL Generation Tests
// ----------------------------------------------------
console.log('\n📦 4. Testing WhatsApp Message & URL Generation');
it('generates properly formatted WhatsApp booking message', () => {
  const form: BookingForm = {
    name: 'Aman Gupta',
    phone: '9876543210',
    services: ['premium-laundry', 'steam-pressing'],
    clothCount: '6',
    address: 'House UA-60, NKV Colony, Sector 67A, Gurugram',
    pickupDate: '2026-11-15',
    pickupTime: '4:00 PM – 6:00 PM',
    instructions: 'Please call before arrival',
  };
  const serviceNames = {
    'premium-laundry': 'Premium Laundry',
    'steam-pressing': 'Steam Pressing',
  };
  const message = buildWhatsAppMessage(form, serviceNames);
  assert.ok(message.includes('Aman Gupta'));
  assert.ok(message.includes('+91 9876543210'));
  assert.ok(message.includes('Premium Laundry, Steam Pressing'));
  assert.ok(message.includes('6 item(s)'));
  assert.ok(message.includes('House UA-60, NKV Colony, Sector 67A, Gurugram'));
  assert.ok(message.includes('2026-11-15'));
  assert.ok(message.includes('4:00 PM – 6:00 PM'));
  assert.ok(message.includes('Please call before arrival'));
});

it('generates valid WhatsApp wa.me URL with business number', () => {
  const url = generateWhatsAppUrl(WHATSAPP_NUMBER, 'Hello RAVORA!');
  assert.strictEqual(url, `https://wa.me/919452709726?text=Hello%20RAVORA!`);
  assert.ok(url.startsWith('https://wa.me/919452709726?text='));
});

// ----------------------------------------------------
// 5. Business Data & Offers Integrity Tests
// ----------------------------------------------------
console.log('\n📦 5. Testing Business Data & Offers Integrity');
it('verifies exact business contact number and location', () => {
  assert.strictEqual(BUSINESS.phone, '+91 9452709726');
  assert.ok(BUSINESS.address.includes('Sector 67A, Gurugram, Haryana 122101'));
  assert.strictEqual(BUSINESS.tagline, 'We Care For What You Wear.');
});

it('verifies all 4 discount tiers matching poster', () => {
  assert.strictEqual(OFFERS.length, 4);
  assert.deepStrictEqual(OFFERS[0], { minBill: 500, discount: 5 });
  assert.deepStrictEqual(OFFERS[1], { minBill: 1000, discount: 10 });
  assert.deepStrictEqual(OFFERS[2], { minBill: 1500, discount: 15 });
  assert.deepStrictEqual(OFFERS[3], { minBill: 2000, discount: 20 });
});

it('verifies all 5 premium services exist with valid metadata', () => {
  assert.strictEqual(SERVICES.length, 5);
  const ids = SERVICES.map(s => s.id);
  assert.ok(ids.includes('premium-laundry'));
  assert.ok(ids.includes('dry-cleaning'));
  assert.ok(ids.includes('steam-pressing'));
  assert.ok(ids.includes('cloth-care'));
  assert.ok(ids.includes('fresh-hygienic'));
});

// ----------------------------------------------------
// Summary
// ----------------------------------------------------
console.log(`\n====================================================`);
console.log(`📊 Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log(`====================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
