import { ItemAnalysis } from '../types';

export interface SampleItemPreset {
  id: string;
  name: string;
  category: string;
  tag: string;
  emoji: string;
  imageUrl: string;
  analysis: ItemAnalysis;
}

export const SAMPLE_ITEMS: SampleItemPreset[] = [
  {
    id: 'washing-machine',
    name: 'Old Washing Machine (वॉशिंग मशीन)',
    category: 'Electronic Appliance',
    tag: 'E-Waste / Appliance',
    emoji: '🧺',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    analysis: {
      itemName: 'Whirlpool / Godrej Semi-Automatic Washing Machine',
      category: 'Electronic appliance',
      condition: 'Used / Functional',
      isRecyclable: true,
      recyclabilityPercentage: 88,
      primaryMaterials: ['Stainless Steel Drum', 'Copper Motor Windings', 'Cast Aluminum Weight', 'High-Impact ABS Plastic'],
      estimatedPickupType: 'Tata Ace / Chhota Hathi (छोटा हाथी)',
      weightEstimateKg: '55 - 65 kg',
      dimensionsEstimate: '85cm H x 60cm W x 55cm D',
      specialHandlingNotes: 'Drain pump and drain hose must be cleared. 2-person crew assigned for ground floor or upper floor pickup in Jath.',
      ecoImpactSummary: 'Diverts ~55kg of scrap steel, copper, and polymer from roadside dumping in Sangli district; prevents 110kg CO2e emissions.',
      recommendedAction: 'sell',
      confidenceScore: 0.94,
      options: {
        sell: {
          eligible: true,
          amount: 2200,
          isPayout: true,
          currency: '₹',
          partnerType: 'Local Appliance Refurbisher',
          partnerName: 'Miraj-Jath ReNew Appliances',
          summary: 'Refurbisher will test motor and drum bearings. You receive ₹2,200 instant payout on spot via UPI or Cash.',
          turnaroundTime: 'Same-day or next-day window',
          perks: ['Cash or PhonePe/GPay UPI upon loading', 'Free doorstep disconnection & extraction in Jath', 'Zero packing needed']
        },
        recycle: {
          eligible: true,
          amount: 850,
          isPayout: true,
          currency: '₹',
          partnerType: 'Licensed Scrap Metal Yard',
          partnerName: 'Jath Scrap Traders Association (भंगार केंद्र)',
          summary: 'Dismantled for motor copper stator, stainless steel body, and heavy scrap metal value.',
          turnaroundTime: 'Within 24 hours',
          perks: ['Doorstep calibrated digital scale weighing', 'Spot cash payment', '100% recycling compliance']
        },
        donate: {
          eligible: true,
          amount: 1800,
          isPayout: false,
          currency: '₹',
          partnerType: 'Rural Community NGO',
          partnerName: 'Jath Gramin Samajik Seva Trust',
          summary: 'Cleaned, serviced, and provided to rural community hostel or hospital attendants quarter in Jath.',
          turnaroundTime: 'Scheduled within 48h',
          perks: ['80G Income tax deduction voucher (₹1,800 valuation)', 'Direct community social impact in Sangli', 'Free pickup vehicle']
        },
        dispose: {
          eligible: true,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Municipal Eco-Disposal Depot',
          partnerName: 'Jath Nagar Parishad Swachhata Division',
          summary: 'Free authorized bulky appliance collection under the Swachh Bharat Swachh Jath scheme.',
          turnaroundTime: 'Weekly Nagar Parishad bulky round',
          perks: ['Official municipal haul in Jath', 'Zero roadside dumping penalty', 'Free civic service']
        }
      }
    }
  },
  {
    id: 'broken-laptop',
    name: 'Broken Gaming Laptop (जुना लॅपटॉप)',
    category: 'Electronics',
    tag: 'E-Waste / Tech',
    emoji: '💻',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    analysis: {
      itemName: 'Dell / Lenovo Gaming Laptop (Cracked Display / Scrap)',
      category: 'Electronics / E-waste',
      condition: 'Needs Repair',
      isRecyclable: true,
      recyclabilityPercentage: 96,
      primaryMaterials: ['Motherboard (Gold/Palladium contacts)', 'Lithium-ion Battery Pack', 'Aluminum Chassis', 'Copper Heat Pipes'],
      estimatedPickupType: 'Piaggio Ape 3-Wheeler Cargo Auto',
      weightEstimateKg: '2.5 - 3.2 kg',
      dimensionsEstimate: '38cm x 26cm x 3cm',
      specialHandlingNotes: 'Lithium battery present. Store at room temperature; do not puncture. Free certified data-wipe included.',
      ecoImpactSummary: 'Reclaims rare earth elements, gold, and prevents hazardous battery cadmium from contaminating Sangli ground water.',
      recommendedAction: 'sell',
      confidenceScore: 0.98,
      options: {
        sell: {
          eligible: true,
          amount: 2800,
          isPayout: true,
          currency: '₹',
          partnerType: 'Circuit Board & Parts Specialist',
          partnerName: 'Sangli Chip & Microelectronics Salvage',
          summary: 'CPU, RAM, GPU chips, display panel components, and aluminum housing extracted for replacement parts.',
          turnaroundTime: 'Instant courier or doorstep pickup in Jath',
          perks: ['Certified data-wipe certificate', 'Instant UPI payout (GPay/PhonePe)', 'Doorstep collection']
        },
        recycle: {
          eligible: true,
          amount: 650,
          isPayout: true,
          currency: '₹',
          partnerType: 'Certified Maharashtra E-Waste Smelter',
          partnerName: 'Sangli District Green E-Smelters',
          summary: 'Thermal separation of motherboard gold pins, copper heatsinks, and aluminum frame.',
          turnaroundTime: 'Next day pickup',
          perks: ['MPCB green recycling certificate', 'Digital destruction slip', 'Safe lithium battery isolation']
        },
        donate: {
          eligible: true,
          amount: 1500,
          isPayout: false,
          currency: '₹',
          partnerType: 'Youth STEM Education Trust',
          partnerName: 'Jath Taluka Gramin Shikshan Sanstha',
          summary: 'Refurbished for rural school computer lab or students learning hardware troubleshooting.',
          turnaroundTime: 'Flexible weekday',
          perks: ['80G Tax exemption receipt', 'Student learning impact in Jath', 'Free pickup']
        },
        dispose: {
          eligible: true,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Hazardous E-Waste Center',
          partnerName: 'Sangli District Haz-Waste Wing',
          summary: 'Safely neutralize lithium battery cells and mercury backlights according to MPCB standards.',
          turnaroundTime: 'Weekly drop pickup',
          perks: ['Fire-safe containment', 'Complies with Indian E-Waste Rules 2022', 'No disposal fee']
        }
      }
    }
  },
  {
    id: 'old-mattress',
    name: 'Old Mattress / Cotton Gaadi (गादी)',
    category: 'Furniture',
    tag: 'Bulky Bedding',
    emoji: '🛏️',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    analysis: {
      itemName: 'Double Bed Cotton Gaadi / Innerspring Mattress',
      category: 'Old furniture / Bulky mattress',
      condition: 'Used / Functional',
      isRecyclable: true,
      recyclabilityPercentage: 75,
      primaryMaterials: ['High-Tensile Steel Coil Springs', 'Pure Cotton Fluff / Polyfill', 'Woven Fabric Jacquard'],
      estimatedPickupType: 'Tata Ace / Chhota Hathi (छोटा हाथी)',
      weightEstimateKg: '25 - 35 kg',
      dimensionsEstimate: '180cm L x 150cm W x 20cm H',
      specialHandlingNotes: 'Keep dry. Tie with rope. 2-person lifting crew provided for carry-out in Jath.',
      ecoImpactSummary: 'Cotton fibers reclaimed for carding and steel springs melted into local construction rebar.',
      recommendedAction: 'recycle',
      confidenceScore: 0.91,
      options: {
        sell: {
          eligible: false,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Secondhand Furniture Consignment',
          partnerName: 'Jath Old Furniture Mart',
          summary: 'Sanitation guidelines limit direct resale of heavily used mattresses without professional sanitization.',
          turnaroundTime: 'N/A',
          perks: ['Not recommended for direct resale']
        },
        recycle: {
          eligible: true,
          amount: 350,
          isPayout: true,
          currency: '₹',
          partnerType: 'Textile Shredding & Scrap Mill',
          partnerName: 'Sangli Textile Shredding & Spring Reclaimers',
          summary: 'Deconstructed into scrap steel coils and recycled cotton batting for industrial insulation padding.',
          turnaroundTime: 'Within 24 hours',
          perks: ['Doorstep removal from any floor in Jath', 'Spot payout in Cash or UPI', 'Zero dump guarantee']
        },
        donate: {
          eligible: true,
          amount: 500,
          isPayout: false,
          currency: '₹',
          partnerType: 'Local Gaushala & Animal Trust',
          partnerName: 'Jath Taluka Gaushala & Animal Welfare Trust',
          summary: 'Sanitized and used for animal shelter bedding or night shelter mats.',
          turnaroundTime: '1-2 business days',
          perks: ['Free doorstep collection', 'Donation certificate', 'Warm shelter utility']
        },
        dispose: {
          eligible: true,
          amount: 200,
          isPayout: false,
          currency: '₹',
          partnerType: 'Municipal Bulky Item Wing',
          partnerName: 'Jath Nagar Parishad Bulky Waste Wing',
          summary: 'Scheduled bulky waste removal trolley by Jath Nagar Parishad sanitation workers.',
          turnaroundTime: 'Guaranteed 24-48 hr slot',
          perks: ['Full carry-out from bedroom', 'Civic waste compliance', 'Official municipal receipt']
        }
      }
    }
  },
  {
    id: 'cardboard-bundles',
    name: 'Paper Raddi & Cardboard (रद्दी व खोकी)',
    category: 'Paper / Packaging',
    tag: 'Paper & Packaging',
    emoji: '📦',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    analysis: {
      itemName: 'Corrugated Packaging Boxes & Newspaper Raddi (रद्दी खोकी)',
      category: 'Paper / Cardboard',
      condition: 'Used / Functional',
      isRecyclable: true,
      recyclabilityPercentage: 100,
      primaryMaterials: ['Unbleached Kraft Corrugated Fiberboard', 'Newspaper Cellulose Pulp'],
      estimatedPickupType: 'Piaggio Ape 3-Wheeler Cargo Auto',
      weightEstimateKg: '30 - 45 kg',
      dimensionsEstimate: 'Stack of folded boxes + newspaper bundles',
      specialHandlingNotes: 'Keep dry away from rain. Tie with sutli (twine) into neat stacks for weighing.',
      ecoImpactSummary: 'Saves approx 0.8 mature trees and 3,500 liters of water through local pulp recycling.',
      recommendedAction: 'sell',
      confidenceScore: 0.99,
      options: {
        sell: {
          eligible: true,
          amount: 450,
          isPayout: true,
          currency: '₹',
          partnerType: 'APMC Packaging Re-Packer',
          partnerName: 'Jath APMC Market Yard Raddi Kendra',
          summary: 'Clean boxes sorted and reused for local pomegranate and grape packing in Jath taluka.',
          turnaroundTime: 'Same-day (within 4 hours)',
          perks: ['Calibrated digital scale weighing at your door', 'Instant Cash or UPI (GPay/PhonePe)', 'Boxes reused in local farm packing']
        },
        recycle: {
          eligible: true,
          amount: 380,
          isPayout: true,
          currency: '₹',
          partnerType: 'Commercial Pulp & Paper Mill',
          partnerName: 'Sangli-Kolhapur Kraft Paper Mills',
          summary: 'Direct delivery to board manufacturing plants for recycling into fresh kraft paper.',
          turnaroundTime: 'Within 24 hours',
          perks: ['Bulk raddi scrap rate', 'Zero landfill guarantee', 'Any clean paper accepted']
        },
        donate: {
          eligible: true,
          amount: 300,
          isPayout: false,
          currency: '₹',
          partnerType: 'School Craft Club',
          partnerName: 'Jath Vidyaniketan Craft Club',
          summary: 'Clean cardboard used for school projects, science models, and art exhibitions in Jath.',
          turnaroundTime: 'Weekend collection',
          perks: ['Direct support to local rural students', 'Friendly volunteer pickup', 'Acknowledgement letter']
        },
        dispose: {
          eligible: true,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Municipal Sanitation Wing',
          partnerName: 'Jath Nagar Parishad Swachhata Division',
          summary: 'Segregated doorstep dry waste collection under Swachh Maharashtra Mission.',
          turnaroundTime: 'Daily morning ghanta gaadi',
          perks: ['Free municipal dry waste service', 'Segregated collection', 'Clean Jath pledge']
        }
      }
    }
  },
  {
    id: 'construction-debris',
    name: 'Construction Waste / Malba (बांधकाम कचरा)',
    category: 'Construction Waste',
    tag: 'Aggregates / Renovation',
    emoji: '🧱',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    analysis: {
      itemName: 'Remodeling Rubble, Concrete Chunks, Broken Bricks & Ceramic Tiles (मल्बा)',
      category: 'Construction waste',
      condition: 'Broken / Scrap Material',
      isRecyclable: true,
      recyclabilityPercentage: 70,
      primaryMaterials: ['Crushed Aggregate Concrete', 'Kiln-Fired Red Bricks', 'Mortar Rubble & Vitrified Tiles'],
      estimatedPickupType: 'Tractor-Trolley / Heavy Tipper',
      weightEstimateKg: '300 - 500 kg',
      dimensionsEstimate: 'Approx. 1 tractor trolley load or 15 heavy sacks',
      specialHandlingNotes: 'Heavy weight. Tractor-trolley or Bolero pickup can back up to gate or street curb.',
      ecoImpactSummary: 'Crushed into road-base gravel and drainage sub-base, preventing fresh stone quarrying in Sangli.',
      recommendedAction: 'recycle',
      confidenceScore: 0.95,
      options: {
        sell: {
          eligible: false,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Antique Stone Reclaimer',
          partnerName: 'Jath Stone Traders',
          summary: 'Only whole basalt / stone slabs qualify for resale; crushed rubble does not.',
          turnaroundTime: 'N/A',
          perks: ['Rubble not suitable for direct resale']
        },
        recycle: {
          eligible: true,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Crusher & Infrastructure Co.',
          partnerName: 'Sangli Crusher & Road Infrastructure Co.',
          summary: 'Crushed mechanically into grade-2 aggregate (GSB) for village road foundation and farm roads.',
          turnaroundTime: 'Within 48 hours',
          perks: ['Zero tipping fee at crusher', 'Environmental compliance manifest', 'Zero roadside dumping']
        },
        donate: {
          eligible: true,
          amount: 0,
          isPayout: false,
          currency: '₹',
          partnerType: 'Farmers Agro Drainage Project',
          partnerName: 'Jath Taluka Shetkari Drainage & Bunding Project',
          summary: 'Used for farm bund stabilization and nala bunding against soil erosion around Jath.',
          turnaroundTime: 'Scheduled with local farmers',
          perks: ['Supports local rural farming in Jath', 'Tractor pickup arranged by farmers']
        },
        dispose: {
          eligible: true,
          amount: 600,
          isPayout: false,
          currency: '₹',
          partnerType: 'Licensed Debris Hauler',
          partnerName: 'Jath Tipper & Tractor Transport Union',
          summary: 'Tractor-trolley with 2 laborers loads all rubble sacks and hauls to authorized municipal filling site.',
          turnaroundTime: 'Same-day or next-morning service',
          perks: ['Includes labor loading & sweeping', 'Authorized Nagar Parishad quarry fill site', 'Tractor capacity up to 1 ton']
        }
      }
    }
  }
];
