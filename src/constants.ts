// Brand colours
export const COLORS = {
  emeraldPrimary: '#075B3B',
  emeraldDeep: '#06452F',
  ivory: '#FFF9E9',
  warmWhite: '#FFFEFA',
  gold: '#D4AF37',
  goldLight: '#E8C84A',
  burgundy: '#991F32',
  darkText: '#26352B',
  mutedText: '#77766D',
  border: '#E8DFC5',
} as const;

// WhatsApp number
export const WHATSAPP_NUMBER = '919452709726';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Business info
export const BUSINESS = {
  name: 'RAVORA',
  fullName: 'RAVORA Clothes & Dry Clean',
  tagline: 'We Care For What You Wear.',
  phone: '+91 9452709726',
  address: 'Ground Floor, House No. UA-60, Vaishnav Enclave, NKV Colony, Dhumaspur Road, Near Preetizilla Fashion & Purvanchal Collections Pvt. Ltd., Dhumaspur, Sector 67A, Gurugram, Haryana 122101, India.',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ground+Floor+House+No+UA-60+Vaishnav+Enclave+NKV+Colony+Dhumaspur+Road+Sector+67A+Gurugram+Haryana+122101',
} as const;

// Service areas (configurable)
export const SERVICE_AREAS = [
  'Sector 67A, Gurugram',
  'Dhumaspur',
  'NKV Colony',
  'Vaishnav Enclave',
  'Nearby localities (subject to confirmation)',
];

// Festive offers
export const OFFERS = [
  { minBill: 500, discount: 5 },
  { minBill: 1000, discount: 10 },
  { minBill: 1500, discount: 15 },
  { minBill: 2000, discount: 20 },
];

// Services list
export const SERVICES = [
  {
    id: 'premium-laundry',
    name: 'Premium Laundry',
    description: 'Complete wash & fold service using premium detergents for a fresh, clean finish your clothes deserve.',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=600&q=80',
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    description: 'Professional dry cleaning for delicate fabrics, formal wear, and garments requiring expert care.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 'steam-pressing',
    name: 'Steam Pressing',
    description: 'Precision steam ironing that removes wrinkles and restores a crisp, polished look to every garment.',
    icon: 'Wind',
    image: 'https://images.unsplash.com/photo-1467453678174-768ec283a940?w=600&q=80',
  },
  {
    id: 'cloth-care',
    name: 'Cloth Care Solutions',
    description: 'Specialised treatment for stains, fabric conditioning and garment preservation for long-lasting wear.',
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80',
  },
  {
    id: 'fresh-hygienic',
    name: 'Fresh & Hygienic Cleaning',
    description: 'Deep hygiene cleaning that eliminates bacteria, allergens and odours — clothes come back truly fresh.',
    icon: 'Leaf',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80',
  },
] as const;

// How it works steps
export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Choose Your Service',
    description: 'Select from our premium laundry, dry cleaning, steam pressing and care services.',
    icon: 'ClipboardList',
  },
  {
    step: 2,
    title: 'Schedule Pickup',
    description: 'Book a convenient pickup time via WhatsApp — we come to your doorstep.',
    icon: 'CalendarCheck',
  },
  {
    step: 3,
    title: 'Professional Cleaning',
    description: 'Your garments receive expert care with premium products in our facility.',
    icon: 'Sparkles',
  },
  {
    step: 4,
    title: 'Doorstep Delivery',
    description: 'Freshly cleaned, pressed and packaged clothes delivered back to you.',
    icon: 'PackageCheck',
  },
] as const;
