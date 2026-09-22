import { UserAccount } from '../types';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user-shivraj-hirave',
    email: 'shivraj.hirave@gmail.com',
    name: 'Shivraj Hirave (शिवराज हिरावे)',
    phone: '+91 98224 81729',
    avatarUrl: '/assets/shivraj_hirave.svg',
    memberSince: 'March 2024',
    ecoTier: 'Swachh Jath Champion',
    addresses: [
      {
        id: 'addr-1',
        label: 'Home (Shivaji Chowk)',
        street: 'Plot No. 14, Near Shivaji Maharaj Chowk, Shivaji Nagar',
        city: 'Jath, Sangli',
        zipCode: '416404',
        floorLevel: 'Ground Floor',
        hasElevator: false,
        isDefault: true,
      },
      {
        id: 'addr-2',
        label: 'Shop / Hardware Godown',
        street: 'Shop No. 4, Market Yard Commercial Complex, Sangli Road',
        city: 'Jath, Sangli',
        zipCode: '416404',
        floorLevel: '1st Floor',
        hasElevator: false,
        isDefault: false,
      },
      {
        id: 'addr-3',
        label: 'Farmhouse / Shett Mala',
        street: 'Mangalwedha Bypass Road, Shett Mala Shivar',
        city: 'Jath, Sangli',
        zipCode: '416404',
        floorLevel: 'Ground Floor',
        hasElevator: false,
        isDefault: false,
      }
    ],
    paymentMethods: [
      {
        id: 'pm-1',
        type: 'upi_instant',
        label: 'Google Pay / PhonePe UPI (shivraj.hirave@oksbi)',
        accountIdentifier: 'shivraj.hirave@oksbi',
        isDefault: true,
      },
      {
        id: 'pm-2',
        type: 'bank_transfer',
        label: 'State Bank of India (SBI Jath Branch - A/C ...8392)',
        accountIdentifier: 'SBI A/C: 38291048392 (IFSC: SBIN0000392)',
        isDefault: false,
      }
    ],
    stats: {
      totalPickups: 4,
      totalEarned: 5850,
      totalWasteDivertedKg: 285,
      co2PreventedKg: 420,
    }
  },
  {
    id: 'user-marcus-vance',
    email: 'rajesh.kulkarni@jathcontracting.in',
    name: 'Rajesh Kulkarni (राजेश कुलकर्णी)',
    phone: '+91 94238 56120',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    memberSince: 'January 2024',
    ecoTier: 'Sangli Zero-Waste Hero',
    addresses: [
      {
        id: 'addr-v1',
        label: 'Fabrication & Renovation Yard',
        street: 'Gat No. 128, MIDC Road, Jath Industrial Area',
        city: 'Jath, Sangli',
        zipCode: '416404',
        floorLevel: 'Ground Floor',
        hasElevator: false,
        isDefault: true,
      }
    ],
    paymentMethods: [
      {
        id: 'pm-v1',
        type: 'bank_transfer',
        label: 'Bank of Maharashtra (Jath Branch ...1942)',
        accountIdentifier: 'BoM Current A/C ...1942 (IFSC: MAHB0000189)',
        isDefault: true,
      },
      {
        id: 'pm-v2',
        type: 'upi_instant',
        label: 'Paytm / BHIM UPI (rajesh.jath@paytm)',
        accountIdentifier: 'rajesh.jath@paytm',
        isDefault: false,
      }
    ],
    stats: {
      totalPickups: 9,
      totalEarned: 14800,
      totalWasteDivertedKg: 1950,
      co2PreventedKg: 2400,
    }
  }
];
