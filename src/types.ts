export type ActionType = 'sell' | 'recycle' | 'donate' | 'dispose';

export interface ActionOption {
  eligible: boolean;
  amount: number; // positive = user receives money/credits, negative/positive fee
  isPayout: boolean; // true if user earns, false if fee
  currency: string;
  partnerType: string; // e.g. "Certified Refurbisher", "Licensed E-Waste Recycler", "Registered NGO Charity", "Municipal Eco-Hauler"
  partnerName: string;
  summary: string;
  turnaroundTime: string;
  perks: string[];
}

export interface ItemAnalysis {
  itemName: string;
  category: string;
  condition: 'Working / Like New' | 'Used / Functional' | 'Needs Repair' | 'Broken / Scrap Material' | 'Mixed Waste';
  isRecyclable: boolean;
  recyclabilityPercentage: number;
  primaryMaterials: string[];
  estimatedPickupType: string; // e.g. "Heavy Appliance Van (2-person lift)", "Standard Courier / Car", "Flatbed Hauler"
  weightEstimateKg: string;
  dimensionsEstimate: string;
  specialHandlingNotes: string;
  ecoImpactSummary: string;
  recommendedAction: ActionType;
  options: {
    sell: ActionOption;
    recycle: ActionOption;
    donate: ActionOption;
    dispose: ActionOption;
  };
  confidenceScore: number;
}

export interface CustomerAddress {
  id: string;
  label: string; // e.g. "Home", "Office", "Storage Unit"
  street: string;
  city: string;
  zipCode: string;
  floorLevel: string;
  hasElevator: boolean;
  isDefault?: boolean;
}

export interface SavedPaymentMethod {
  id: string;
  type: 'bank_transfer' | 'upi_instant' | 'cash_on_pickup';
  label: string; // e.g. "Chase Checking (...4821)", "alex@venmo"
  accountIdentifier: string;
  isDefault?: boolean;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  memberSince: string;
  ecoTier: 'Green Starter' | 'Eco Champion' | 'Zero-Waste Hero' | 'Swachh Jath Champion' | 'Sangli Zero-Waste Hero';
  addresses: CustomerAddress[];
  paymentMethods: SavedPaymentMethod[];
  stats: {
    totalPickups: number;
    totalEarned: number;
    totalWasteDivertedKg: number;
    co2PreventedKg: number;
  };
}

export interface PickupBooking {
  id: string;
  userId?: string;
  createdAt: string;
  trackingNumber: string;
  item: ItemAnalysis;
  itemPhoto: string;
  action: ActionType;
  actionDetails: {
    partnerName: string;
    partnerType: string;
    amount: number;
    isPayout: boolean;
    currency: string;
    description: string;
  };
  pickupSchedule: {
    date: string;
    timeSlot: string;
    address: string;
    city: string;
    zipCode: string;
    floorLevel: string;
    hasElevator: boolean;
    contactName: string;
    contactPhone: string;
    specialInstructions?: string;
  };
  payoutOrPayment: {
    method: 'bank_transfer' | 'cash_on_pickup' | 'upi_instant' | 'donation_tax_receipt' | 'free_municipal_ticket';
    accountOrId?: string;
    status: 'pending_verification' | 'released_to_account' | 'receipt_issued';
  };
  status: 'scheduled' | 'dispatched' | 'arrived' | 'weighed_and_verified' | 'payment_settled';
  timeline: {
    timestamp: string;
    title: string;
    description: string;
  }[];
}
