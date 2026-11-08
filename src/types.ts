export interface BookingForm {
  name: string;
  phone: string;
  services: string[];
  clothCount: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  instructions: string;
}

export interface BookingErrors {
  name?: string;
  phone?: string;
  services?: string;
  clothCount?: string;
  address?: string;
  pickupDate?: string;
  pickupTime?: string;
}

export type SectionId = 'home' | 'services' | 'offers' | 'how-it-works' | 'booking' | 'location' | 'contact';
