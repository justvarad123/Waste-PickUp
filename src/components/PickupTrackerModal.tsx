import React, { useState } from 'react';
import {
  X,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Building,
  IndianRupee,
  FileText,
  RotateCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Package,
  PlusCircle,
  UserCheck
} from 'lucide-react';
import { PickupBooking } from '../types';
import { useAuth } from '../context/AuthContext';

interface PickupTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: PickupBooking[];
  activeBookingId: string | null;
  onSelectBooking: (id: string) => void;
  onAdvanceStatus: (id: string) => void;
  onNewBooking?: () => void;
}

export const PickupTrackerModal: React.FC<PickupTrackerModalProps> = ({
  isOpen,
  onClose,
  bookings,
  activeBookingId,
  onSelectBooking,
  onAdvanceStatus,
  onNewBooking,
}) => {
  const { currentUser } = useAuth();
  const [filterMineOnly, setFilterMineOnly] = useState(false);

  if (!isOpen) return null;

  const displayBookings = filterMineOnly && currentUser
    ? bookings.filter((b) => b.userId === currentUser.id)
    : bookings;

  const currentBooking = displayBookings.find((b) => b.id === activeBookingId) || displayBookings[0];

  const steps = [
    { key: 'scheduled', label: 'Pickup Booked', icon: Calendar },
    { key: 'dispatched', label: 'Driver Dispatched', icon: Truck },
    { key: 'arrived', label: 'At Doorstep', icon: MapPin },
    { key: 'weighed_and_verified', label: 'Verified & Loaded', icon: Package },
    { key: 'payment_settled', label: 'Payment / Receipt Settled', icon: IndianRupee },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 0;
      case 'dispatched':
        return 1;
      case 'arrived':
        return 2;
      case 'weighed_and_verified':
        return 3;
      case 'payment_settled':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIndex = currentBooking ? getStepIndex(currentBooking.status) : 0;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tracker-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-3xl w-full my-0 sm:my-6 shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/50 shrink-0">
          <div>
            <h2 id="tracker-modal-title" className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
              <span>Live Pickup & Payout Tracker</span>
            </h2>
            <p className="text-xs text-slate-600">
              Track driver dispatch, inspection, customer payouts & repeat orders
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onNewBooking && (
              <button
                id="book-another-pickup-btn"
                type="button"
                onClick={() => {
                  onClose();
                  onNewBooking();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span>Book Another Item</span>
              </button>
            )}

            <button
              id="close-tracker-modal-btn"
              type="button"
              onClick={onClose}
              aria-label="Close tracking modal"
              className="p-2 -mr-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Customer Account Filter Bar */}
        {currentUser && (
          <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-600">
                Viewing orders for account: <strong className="text-slate-900">{currentUser.name}</strong>
              </span>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={filterMineOnly}
                onChange={(e) => setFilterMineOnly(e.target.checked)}
                className="rounded text-emerald-600"
              />
              Show only my account's jobs
            </label>
          </div>
        )}

        {displayBookings.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-slate-800">No Pickups Found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Scan an item or choose a preset sample above to book your first pickup and receive instant payment!
            </p>
            {onNewBooking && (
              <button
                onClick={() => {
                  onClose();
                  onNewBooking();
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Scan or Dispose an Item
              </button>
            )}
          </div>
        ) : (
          <div className="p-6">
            {/* Multi-booking switcher if multiple pickups exist */}
            {displayBookings.length > 1 && (
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                {displayBookings.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onSelectBooking(b.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                      b.id === currentBooking?.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {b.item.itemName.slice(0, 18)}... ({b.trackingNumber})
                  </button>
                ))}
              </div>
            )}

            {currentBooking && (
              <div>
                {/* Status Hero Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                        <img
                          src={currentBooking.itemPhoto}
                          alt={currentBooking.item.itemName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Tracking #{currentBooking.trackingNumber}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          {currentBooking.item.itemName}
                        </h4>
                        <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                          <span className="capitalize font-semibold text-emerald-700">
                            {currentBooking.action} Route
                          </span>
                          <span>•</span>
                          <span>{currentBooking.actionDetails.partnerName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">
                        {currentBooking.action === 'sell'
                          ? 'Payout Amount'
                          : currentBooking.action === 'donate'
                          ? 'Tax Valuation'
                          : currentBooking.action === 'recycle'
                          ? 'Scrap Credit'
                          : 'Eco Haul Fee'}
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        {currentBooking.actionDetails.amount === 0
                          ? '₹0 (Free)'
                          : `${currentBooking.actionDetails.currency || '₹'}${currentBooking.actionDetails.amount}`}
                      </span>
                      <span className="block text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 mt-1">
                        {currentBooking.payoutOrPayment.status === 'released_to_account'
                          ? 'Payment Released ✓'
                          : 'Escrow / Release on Doorstep'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stepper Progress Bar */}
                <div className="mb-8 px-2">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0" />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 -z-0 transition-all duration-500"
                      style={{
                        width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                      }}
                    />

                    {steps.map((step, index) => {
                      const isCompleted = index <= currentStepIndex;
                      const isCurrent = index === currentStepIndex;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-emerald-100 scale-110' : ''}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[11px] font-semibold mt-2 text-center max-w-[70px] leading-tight ${
                              isCompleted ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pickup Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Customer & Doorstep Logistics
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-700">
                      <li className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Date: {currentBooking.pickupSchedule.date}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Time: {currentBooking.pickupSchedule.timeSlot}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>
                          {currentBooking.pickupSchedule.address}, {currentBooking.pickupSchedule.city} ({currentBooking.pickupSchedule.floorLevel})
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5 text-slate-400" />
                        <span>Vehicle: {currentBooking.item.estimatedPickupType}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Partner & Payment Settlement
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-700">
                      <li className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>Partner: {currentBooking.actionDetails.partnerName}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>License: Certified {currentBooking.actionDetails.partnerType}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                        <span>Method: {currentBooking.payoutOrPayment.method.replace('_', ' ').toUpperCase()}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Customer Contact: {currentBooking.pickupSchedule.contactName} ({currentBooking.pickupSchedule.contactPhone})</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Timeline Feed */}
                <div className="mb-6">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Event Log & Manifest
                  </h5>
                  <div className="space-y-2">
                    {currentBooking.timeline.map((evt, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                      >
                        <span className="font-mono text-[11px] text-slate-500 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-slate-200">
                          {evt.timestamp}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{evt.title}</p>
                          <p className="text-slate-600 mt-0.5">{evt.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advance Status Demo Tool */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">
                      Demo Live Progression
                    </span>
                    <span className="text-[11px] text-emerald-700">
                      Advance driver and payment status to test the end-to-end pickup & payout lifecycle.
                    </span>
                  </div>

                  {currentStepIndex < steps.length - 1 ? (
                    <button
                      id="advance-status-btn"
                      onClick={() => onAdvanceStatus(currentBooking.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      Advance: {steps[currentStepIndex + 1].label}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Pickup & Settlement Complete!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
