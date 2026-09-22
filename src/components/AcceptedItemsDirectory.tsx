import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Recycle,
  ArrowUpRight,
  IndianRupee
} from 'lucide-react';
import { SAMPLE_ITEMS, SampleItemPreset } from '../data/sampleItems';

interface AcceptedItemsDirectoryProps {
  onSelectSample: (sample: SampleItemPreset) => void;
}

export const AcceptedItemsDirectory: React.FC<AcceptedItemsDirectoryProps> = ({
  onSelectSample,
}) => {
  const categories = [
    {
      title: 'Old Appliances (घरगुती उपकरणे)',
      emoji: '🧺',
      description: 'Washing machines, fridges, air coolers, mixies, water heaters, microwaves',
      preferredRoute: 'Sell (Refurbish) or Scrap Yard',
      payoutRange: '₹800 - ₹3,500',
      sampleId: 'washing-machine',
    },
    {
      title: 'Electronics & Mobiles (इलेक्ट्रॉनिक्स)',
      emoji: '💻',
      description: 'Broken laptops, smartphones, tablets, TVs, invertor batteries, CPU scrap',
      preferredRoute: 'Sell (Components) or E-Smelter',
      payoutRange: '₹500 - ₹4,500',
      sampleId: 'broken-laptop',
    },
    {
      title: 'Old Furniture & Mattresses (गादी व फर्निचर)',
      emoji: '🛏️',
      description: 'Cotton gaadi, spring mattresses, wooden cots, plastic chairs, steel almirahs',
      preferredRoute: 'Recycle, Donate, or Bulky Removal',
      payoutRange: '₹200 - ₹1,500',
      sampleId: 'old-mattress',
    },
    {
      title: 'Paper, Raddi & Cartons (रद्दी व खोकी)',
      emoji: '📦',
      description: 'Flattened packing cartons, newspaper raddi, old books, office ledger files',
      preferredRoute: 'Sell to APMC / Board Mill',
      payoutRange: '₹14 - ₹22 / kg',
      sampleId: 'cardboard-bundles',
    },
    {
      title: 'Construction Debris & Malba (मल्बा)',
      emoji: '🧱',
      description: 'Ceramic tiles, broken brick bats, concrete rubble, plaster, stone chips',
      preferredRoute: 'Road Base Aggregate or Tractor Haul',
      payoutRange: 'Tractor / Trolley Pickup',
      sampleId: 'construction-debris',
    },
    {
      title: 'Scrap Metal & Iron (लोखंड व तांबे)',
      emoji: '🔩',
      description: 'Iron grills, tin sheets (पत्रा), copper wires, brass utensils, aluminum ladders',
      preferredRoute: 'Doorstep Digital Scale Buyout',
      payoutRange: '₹32 - ₹480 / kg',
      sampleId: 'washing-machine',
    },
    {
      title: 'Farm Plastics & Barrels (प्लॅस्टिक व ड्रम)',
      emoji: '♻️',
      description: 'Drip irrigation pipes (ड्रिप नळ्या), HDPE chemical barrels, crates, plastic sheets',
      preferredRoute: 'Granule Recycler Buyout',
      payoutRange: '₹18 - ₹35 / kg',
      sampleId: 'cardboard-bundles',
    },
    {
      title: 'Old Vehicles & Two-Wheelers (जुनी वाहने)',
      emoji: '🛵',
      description: 'Scrap two-wheelers, bicycle frames, battery scrap, auto rickshaw parts',
      preferredRoute: 'RTO Authorized Vehicle Scrappage',
      payoutRange: '₹1,500 - ₹12,000',
      sampleId: 'broken-laptop',
    },
  ];

  const handleCategoryClick = (sampleId?: string) => {
    if (!sampleId) return;
    const found = SAMPLE_ITEMS.find((s) => s.id === sampleId);
    if (found) {
      onSelectSample(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="accepted-items-directory" aria-labelledby="directory-title" className="py-12 border-t border-slate-200 mt-12 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-2 border border-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Universal Acceptance Standards</span>
          </div>
          <h2 id="directory-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            What Can You Sell, Recycle, Donate, or Dispose?
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            From single broken appliances to truckloads of renovation rubble in Jath, our AI appraiser classifies the material stream and pairs it with certified local partners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCategoryClick(cat.sampleId)}
              aria-label={`Inspect category: ${cat.title}. Typical route: ${cat.preferredRoute}. Value: ${cat.payoutRange}`}
              className="group p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between text-left focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl" aria-hidden="true">{cat.emoji}</span>
                  <span className="p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:text-emerald-800 group-hover:bg-emerald-50 transition-colors">
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs w-full">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Route:</span>
                  <span className="font-semibold text-slate-900 text-[11px]">{cat.preferredRoute}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Estimated Yield:</span>
                  <span className="font-bold text-emerald-800">{cat.payoutRange}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Trust & Process Banner */}
        <div className="mt-10 p-6 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0" aria-hidden="true">
              <Recycle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                100% Zero-Illegal-Dumping Guarantee (Jath & Sangli District)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                All scrap traders, refurbishers, and haulers are verified under Jath Nagar Parishad and Maharashtra Pollution Control Board (MPCB) guidelines. Digital gate-pass receipt issued for every pickup.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0 text-xs font-semibold text-slate-800">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>Doorstep Weighing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>Instant UPI / Spot Cash</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>80G NGO Receipts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
