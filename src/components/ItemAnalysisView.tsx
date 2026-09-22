import React from 'react';
import {
  CheckCircle,
  Truck,
  Weight,
  Sparkles,
  ArrowLeft,
  IndianRupee,
  Recycle,
  Heart,
  Trash2,
  Leaf,
  ShieldCheck,
  Clock,
  ChevronRight,
  Info
} from 'lucide-react';
import { ItemAnalysis, ActionType } from '../types';

interface ItemAnalysisViewProps {
  item: ItemAnalysis;
  photoUrl: string;
  onSelectAction: (action: ActionType) => void;
  onReset: () => void;
}

export const ItemAnalysisView: React.FC<ItemAnalysisViewProps> = ({
  item,
  photoUrl,
  onSelectAction,
  onReset,
}) => {
  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Top bar with back button and AI badge */}
      <div className="flex items-center justify-between mb-4">
        <button
          id="back-to-upload-btn"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Scan Another Item
        </button>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Identification Complete ({(item.confidenceScore * 100).toFixed(0)}% confidence)</span>
        </div>
      </div>

      {/* Item Overview Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Item Photo & Badge */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={photoUrl}
                alt={item.itemName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                📷 Scanned Item
              </div>
            </div>

            {/* Recyclability Meter */}
            <div className="w-full mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  Likely Recyclable:
                </span>
                <span className="text-emerald-700 font-bold">
                  {item.isRecyclable ? `Yes (${item.recyclabilityPercentage}%)` : 'Non-Recyclable'}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.recyclabilityPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Identified Details Breakdown */}
          <div className="md:col-span-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Category: {item.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Condition: {item.condition}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <Truck className="w-3 h-3 text-emerald-600" />
                Pickup Type: {item.estimatedPickupType}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {item.itemName}
            </h2>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Est. Weight
                </span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Weight className="w-4 h-4 text-slate-500" />
                  {item.weightEstimateKg}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Dimensions
                </span>
                <span className="text-sm font-bold text-slate-800 line-clamp-1 mt-0.5">
                  {item.dimensionsEstimate}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Logistics Crew
                </span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Truck className="w-4 h-4 text-slate-500" />
                  Included at Doorstep
                </span>
              </div>
            </div>

            {/* Materials Detected */}
            <div className="mb-3">
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Detected Primary Materials:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.primaryMaterials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Handling note & Eco Impact */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
              <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Eco Impact: </span>
                {item.ecoImpactSummary}
                {item.specialHandlingNotes && (
                  <p className="mt-1 text-slate-600">
                    <span className="font-semibold text-slate-700">Driver Handling: </span>
                    {item.specialHandlingNotes}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Header Banner */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          What would you like to do with this item?
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Select an authorized path below. We automatically connect you with verified local collectors, certified recyclers, registered NGOs, or eco-disposal haulers.
        </p>
      </div>

      {/* The 4 Action Routes (SELL, RECYCLE, DONATE, DISPOSE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. SELL IT */}
        <div
          id="action-card-sell"
          className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between transition-all bg-white ${
            item.recommendedAction === 'sell'
              ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {item.recommendedAction === 'sell' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              AI Recommended
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-emerald-700 block">
                  You Receive
                </span>
                <span className="text-2xl font-extrabold text-emerald-700">
                  {item.options.sell.eligible
                    ? `${item.options.sell.currency}${item.options.sell.amount}`
                    : 'Not Eligible'}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900">Sell It</h4>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              To: {item.options.sell.partnerType}
            </p>

            <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                {item.options.sell.partnerName}
              </p>
              <p className="mt-1 line-clamp-3">
                {item.options.sell.summary}
              </p>
            </div>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              {item.options.sell.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <button
              id="choose-sell-btn"
              type="button"
              disabled={!item.options.sell.eligible}
              onClick={() => onSelectAction('sell')}
              aria-label={`Choose to sell this item for ${item.options.sell.currency}${item.options.sell.amount}`}
              className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden ${
                item.options.sell.eligible
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Choose: Sell It</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 2. RECYCLE IT */}
        <div
          id="action-card-recycle"
          className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between transition-all bg-white ${
            item.recommendedAction === 'recycle'
              ? 'border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {item.recommendedAction === 'recycle' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              AI Recommended
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Recycle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-teal-700 block">
                  Scrap Payout / Credit
                </span>
                <span className="text-2xl font-extrabold text-teal-700">
                  {item.options.recycle.amount > 0
                    ? `${item.options.recycle.currency}${item.options.recycle.amount}`
                    : 'Free Drop / ₹0'}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900">Recycle It</h4>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              To: {item.options.recycle.partnerType}
            </p>

            <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                {item.options.recycle.partnerName}
              </p>
              <p className="mt-1 line-clamp-3">
                {item.options.recycle.summary}
              </p>
            </div>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              {item.options.recycle.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <button
              id="choose-recycle-btn"
              type="button"
              disabled={!item.options.recycle.eligible}
              onClick={() => onSelectAction('recycle')}
              aria-label={`Choose to recycle this item for ${item.options.recycle.amount > 0 ? item.options.recycle.currency + item.options.recycle.amount : 'free drop'}`}
              className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:outline-hidden ${
                item.options.recycle.eligible
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Choose: Recycle It</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 3. DONATE IT */}
        <div
          id="action-card-donate"
          className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between transition-all bg-white ${
            item.recommendedAction === 'donate'
              ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {item.recommendedAction === 'donate' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              AI Recommended
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Heart className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-blue-700 block">
                  Tax Receipt Est.
                </span>
                <span className="text-2xl font-extrabold text-blue-700">
                  {item.options.donate.amount > 0
                    ? `${item.options.donate.currency}${item.options.donate.amount}`
                    : 'Free Pickup'}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900">Donate It</h4>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              To: {item.options.donate.partnerType}
            </p>

            <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                {item.options.donate.partnerName}
              </p>
              <p className="mt-1 line-clamp-3">
                {item.options.donate.summary}
              </p>
            </div>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              {item.options.donate.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <button
              id="choose-donate-btn"
              type="button"
              disabled={!item.options.donate.eligible}
              onClick={() => onSelectAction('donate')}
              aria-label={`Choose to donate this item to ${item.options.donate.partnerName}`}
              className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-hidden ${
                item.options.donate.eligible
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Choose: Donate It</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 4. DISPOSE IT */}
        <div
          id="action-card-dispose"
          className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between transition-all bg-white ${
            item.recommendedAction === 'dispose'
              ? 'border-slate-500 shadow-md ring-2 ring-slate-500/20'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          {item.recommendedAction === 'dispose' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              AI Recommended
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Trash2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-600 block">
                  Disposal Cost
                </span>
                <span className="text-2xl font-extrabold text-slate-800">
                  {item.options.dispose.amount === 0
                    ? '₹0 (Free)'
                    : `${item.options.dispose.currency}${item.options.dispose.amount}`}
                </span>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900">Dispose It</h4>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              To: {item.options.dispose.partnerType}
            </p>

            <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                {item.options.dispose.partnerName}
              </p>
              <p className="mt-1 line-clamp-3">
                {item.options.dispose.summary}
              </p>
            </div>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              {item.options.dispose.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <button
              id="choose-dispose-btn"
              type="button"
              disabled={!item.options.dispose.eligible}
              onClick={() => onSelectAction('dispose')}
              aria-label={`Choose to dispose this item via ${item.options.dispose.partnerName}`}
              className={`w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:outline-hidden ${
                item.options.dispose.eligible
                  ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Choose: Dispose It</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
