import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { PhotoUploadSection } from './components/PhotoUploadSection';
import { ItemAnalysisView } from './components/ItemAnalysisView';
import { PickupBookingModal } from './components/PickupBookingModal';
import { PickupTrackerModal } from './components/PickupTrackerModal';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { AcceptedItemsDirectory } from './components/AcceptedItemsDirectory';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ItemAnalysis, ActionType, PickupBooking } from './types';
import { SAMPLE_ITEMS, SampleItemPreset } from './data/sampleItems';

const STORAGE_KEY = 'sell_dispose_pickups_jath_v4';

const INITIAL_DEMO_BOOKINGS: PickupBooking[] = [
  {
    id: 'booking-seed-1',
    userId: 'user-shivraj-hirave',
    createdAt: '2026-09-20T14:30:00Z',
    trackingNumber: 'PKP-984210',
    item: SAMPLE_ITEMS[0].analysis,
    itemPhoto: SAMPLE_ITEMS[0].imageUrl,
    action: 'sell',
    actionDetails: {
      partnerName: 'Sangli ElectroFix & Appliance Refurbishers',
      partnerType: 'Certified Appliance Repair Co.',
      amount: 3200,
      isPayout: true,
      currency: '₹',
      description: 'Refurbished drum and motor for local re-use in Sangli district',
    },
    pickupSchedule: {
      date: '2026-09-21',
      timeSlot: '12:00 PM - 04:00 PM',
      address: 'Plot No. 14, Near Shivaji Maharaj Chowk, Shivaji Nagar',
      city: 'Jath, Sangli',
      zipCode: '416404',
      floorLevel: 'Ground Floor',
      hasElevator: false,
      contactName: 'Shivraj Hirave',
      contactPhone: '+91 98224 81729',
      specialInstructions: 'Near main entrance gate in courtyard',
    },
    payoutOrPayment: {
      method: 'upi_instant',
      accountOrId: 'GPay UPI: shivraj.hirave@oksbi',
      status: 'released_to_account',
    },
    status: 'payment_settled',
    timeline: [
      { timestamp: '09:00 AM', title: 'Pickup Booked', description: 'Assigned to Sangli ElectroFix certified collection team.' },
      { timestamp: '12:15 PM', title: 'Driver Dispatched', description: 'Tempo pickup vehicle dispatched from Sangli-Jath route.' },
      { timestamp: '01:10 PM', title: 'Driver Arrived', description: 'Inspected washing machine drum and copper coil motor.' },
      { timestamp: '01:25 PM', title: 'Loaded & Weighed', description: 'Verified working condition (48 kg). Loaded safely.' },
      { timestamp: '01:30 PM', title: 'Payment Settled', description: '₹3,200 deposited instantly via Google Pay UPI.' },
    ],
  },
  {
    id: 'booking-seed-2',
    userId: 'user-shivraj-hirave',
    createdAt: '2026-09-22T08:15:00Z',
    trackingNumber: 'PKP-774912',
    item: SAMPLE_ITEMS[2].analysis,
    itemPhoto: SAMPLE_ITEMS[2].imageUrl,
    action: 'donate',
    actionDetails: {
      partnerName: 'Jath Samaj Kalyan & Rural Gramin Vikas Trust',
      partnerType: 'Registered Charitable NGO',
      amount: 1500,
      isPayout: true,
      currency: '₹',
      description: 'Cleaned and provided to rural vocational training shelter in Jath',
    },
    pickupSchedule: {
      date: '2026-09-23',
      timeSlot: '09:00 AM - 12:00 PM',
      address: 'Plot No. 14, Near Shivaji Maharaj Chowk, Shivaji Nagar',
      city: 'Jath, Sangli',
      zipCode: '416404',
      floorLevel: 'Ground Floor',
      hasElevator: false,
      contactName: 'Shivraj Hirave',
      contactPhone: '+91 98224 81729',
      specialInstructions: 'Packed and kept in porch',
    },
    payoutOrPayment: {
      method: 'donation_tax_receipt',
      accountOrId: 'shivraj.hirave@gmail.com',
      status: 'pending_verification',
    },
    status: 'dispatched',
    timeline: [
      { timestamp: '08:15 AM', title: 'Charity Pickup Scheduled', description: 'Assigned to Jath Gramin Vikas community van.' },
      { timestamp: '09:30 AM', title: 'Driver Dispatched', description: 'Driver Santosh in Mahindra Bolero Maxi Truck en route.' },
    ],
  },
];

function MainApp() {
  const { currentUser } = useAuth();

  const [currentView, setCurrentView] = useState<'upload' | 'analysis'>('upload');
  const [analyzedItem, setAnalyzedItem] = useState<ItemAnalysis | null>(null);
  const [itemPhotoUrl, setItemPhotoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Modals
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionType>('sell');
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Stored Bookings
  const [bookings, setBookings] = useState<PickupBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse saved pickups', e);
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.warn('Could not save pickups', e);
    }
  }, [bookings]);

  // Handle Photo Analysis via Gemini Server Endpoint
  const handleAnalyze = async (imageData: string, hint?: string) => {
    setIsAnalyzing(true);
    setItemPhotoUrl(imageData);

    try {
      const res = await fetch('/api/analyze-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageData,
          itemDescriptionHint: hint,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.analysis) {
        setAnalyzedItem(data.analysis);
        setCurrentView('analysis');
      } else {
        throw new Error('Analysis payload missing in response');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      alert('Unable to analyze image via server. Please try another photo or preset sample.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle preset sample selection
  const handleSelectPreset = (preset: SampleItemPreset) => {
    setItemPhotoUrl(preset.imageUrl);
    setAnalyzedItem(preset.analysis);
    setCurrentView('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // User selects one of the 4 routes
  const handleSelectAction = (action: ActionType) => {
    setSelectedAction(action);
    setIsBookingOpen(true);
  };

  // Confirmation of pickup booking
  const handleBookingConfirmed = (newBooking: PickupBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);
    setIsBookingOpen(false);
    setIsTrackerOpen(true);
  };

  // Status progression simulation
  const handleAdvanceStatus = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        let nextStatus: PickupBooking['status'] = b.status;
        let newTitle = '';
        let newDesc = '';

        if (b.status === 'scheduled') {
          nextStatus = 'dispatched';
          newTitle = 'Driver En Route';
          newDesc = `Driver assigned to ${b.item.estimatedPickupType} has started route.`;
        } else if (b.status === 'dispatched') {
          nextStatus = 'arrived';
          newTitle = 'Driver Arrived at Doorstep';
          newDesc = `Driver is outside at ${b.pickupSchedule.address} ready for inspection.`;
        } else if (b.status === 'arrived') {
          nextStatus = 'weighed_and_verified';
          newTitle = 'Item Inspected & Loaded';
          newDesc = `Condition verified as "${b.item.condition}". Loaded safely onto vehicle.`;
        } else if (b.status === 'weighed_and_verified') {
          nextStatus = 'payment_settled';
          newTitle = b.action === 'sell' ? 'Payment Settled to User' : 'Certificate & Receipt Issued';
          newDesc = b.action === 'sell'
            ? `₹${b.actionDetails.amount} transferred via ${b.payoutOrPayment.method.replace('_', ' ').toUpperCase()}. Transaction complete.`
            : `Official circular economy manifest & tax receipt released.`;
        }

        const newTimelineEvent = {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: newTitle,
          description: newDesc,
        };

        return {
          ...b,
          status: nextStatus,
          payoutOrPayment: {
            ...b.payoutOrPayment,
            status: nextStatus === 'payment_settled' ? 'released_to_account' : b.payoutOrPayment.status,
          },
          timeline: [...b.timeline, newTimelineEvent],
        };
      })
    );
  };

  const handleReset = () => {
    setCurrentView('upload');
    setAnalyzedItem(null);
    setItemPhotoUrl(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToAccepted = () => {
    const el = document.getElementById('accepted-items-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Header
        activePickupsCount={bookings.filter((b) => b.status !== 'payment_settled').length}
        onOpenHistory={() => setIsTrackerOpen(true)}
        onReset={handleReset}
        onScrollToAccepted={handleScrollToAccepted}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'upload' ? (
          <div>
            <PhotoUploadSection
              onAnalyze={handleAnalyze}
              onSelectPreset={handleSelectPreset}
              isAnalyzing={isAnalyzing}
              onOpenCamera={() => setIsCameraOpen(true)}
            />
            <AcceptedItemsDirectory onSelectSample={handleSelectPreset} />
          </div>
        ) : (
          analyzedItem &&
          itemPhotoUrl && (
            <ItemAnalysisView
              item={analyzedItem}
              photoUrl={itemPhotoUrl}
              onSelectAction={handleSelectAction}
              onReset={handleReset}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Sell / Dispose Anything</span>
            <span>•</span>
            <span>AI Waste & Item Pickup Platform ♻️</span>
          </div>
          <p className="text-center sm:text-right text-slate-600">
            Serving Jath Taluka, Sangli District: Local Refurbishers • Sangli MIDC Recyclers • Registered Trusts • MPCB Compliant Haulers
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(data) => {
          setIsCameraOpen(false);
          handleAnalyze(data);
        }}
      />

      {analyzedItem && itemPhotoUrl && (
        <PickupBookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          item={analyzedItem}
          itemPhoto={itemPhotoUrl}
          action={selectedAction}
          onBookingConfirmed={handleBookingConfirmed}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      )}

      <PickupTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        bookings={bookings}
        activeBookingId={activeBookingId}
        onSelectBooking={(id) => setActiveBookingId(id)}
        onAdvanceStatus={handleAdvanceStatus}
        onNewBooking={handleReset}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onViewPickups={() => setIsTrackerOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
