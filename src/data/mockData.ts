// Type definitions for mock data
interface PromoCode {
  status: 'ACTIVE' | 'REDEEMED' | 'PENDING';
  customer: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  promo: string;
  accountNumber: string;
  discount: number;
  discountType: 'percent' | 'fixed';
  item: string;
  partId?: string;
  referenceNumber?: string;
}

interface AvailablePromotion {
  code: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'EXPIRED';
  expires: string;
}

// Simulate the backend database of promo codes
export const mockPromoCodes: Record<string, PromoCode> = {
  '8BCFM2': { 
    status: 'ACTIVE', 
    customer: 'Tim Farmer',
    firstName: 'Tim',
    lastName: 'Farmer', 
    email: 'tfarmer@example.com',
    mobile: '(555) 123-4567',
    promo: '20% Off Filters', 
    accountNumber: '1234',
    discount: 20,
    discountType: 'percent',
    item: 'Filters',
    partId: 'JDFILTER20',
    referenceNumber: '8BCFM2'
  },
  'JD5678OIL': { 
    status: 'ACTIVE', 
    customer: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sjohnson@example.com',
    mobile: '(555) 987-6543', 
    promo: '15% Off Oil Changes', 
    accountNumber: '5678',
    discount: 15,
    discountType: 'percent',
    item: 'Oil Change Service'
  },
  'JD9012PARTS': { 
    status: 'REDEEMED', 
    customer: 'Mike Wilson',
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'mwilson@example.com',
    mobile: '(555) 555-0123', 
    promo: '10% Off Parts', 
    accountNumber: '9012',
    discount: 10,
    discountType: 'percent',
    item: 'Tractor Parts'
  },
  'JD7890REPAIR': {
    status: 'PENDING', 
    customer: 'Linda Martinez',
    firstName: 'Linda',
    lastName: 'Martinez',
    email: 'lmartinez@example.com',
    mobile: '(555) 444-5678',
    promo: '$50 Off Repair Service',
    accountNumber: '7890',
    discount: 50,
    discountType: 'fixed',
    item: 'Repair Services'
  }
};

// Available promotions for the dealer
export const availablePromotions: AvailablePromotion[] = [
  { code: 'SPRING25', name: 'Spring Service Special', description: '25% off maintenance packages', status: 'ACTIVE', expires: '2025-04-30' },
  { code: 'FILTER20', name: 'Filter Promotion', description: '20% off all filters', status: 'ACTIVE', expires: '2025-03-31' },
  { code: 'OIL15', name: 'Oil Change Deal', description: '15% off oil change service', status: 'ACTIVE', expires: '2025-06-15' },
  { code: 'PARTS10', name: 'Parts Discount', description: '10% off genuine John Deere parts', status: 'EXPIRED', expires: '2025-02-28' },
  { code: 'WINTER50', name: 'Winter Service', description: '$50 off winter preparation', status: 'EXPIRED', expires: '2025-01-31' }
]; 