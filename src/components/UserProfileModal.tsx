import React, { useState, useRef } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  IndianRupee,
  Recycle,
  Award,
  LogOut,
  Building,
  CreditCard,
  ExternalLink,
  Camera,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CustomerAddress, SavedPaymentMethod } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPickups: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onViewPickups,
}) => {
  const {
    currentUser,
    logout,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    addPaymentMethod,
    setDefaultPaymentMethod,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payouts'>('profile');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showAddPayoutForm, setShowAddPayoutForm] = useState(false);

  // New address state
  const [addrLabel, setAddrLabel] = useState('Home');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('Jath, Sangli');
  const [addrZip, setAddrZip] = useState('416404');
  const [addrFloor, setAddrFloor] = useState('Ground Floor');
  const [addrElevator, setAddrElevator] = useState(false);

  // New payout state
  const [payoutType, setPayoutType] = useState<'bank_transfer' | 'upi_instant'>('upi_instant');
  const [payoutLabel, setPayoutLabel] = useState('Google Pay / PhonePe');
  const [payoutIdentifier, setPayoutIdentifier] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !currentUser) return null;

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProfile({ avatarUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet || !addrCity || !addrZip) return;

    addAddress({
      label: addrLabel,
      street: addrStreet,
      city: addrCity,
      zipCode: addrZip,
      floorLevel: addrFloor,
      hasElevator: addrElevator,
      isDefault: currentUser.addresses.length === 0,
    });

    setAddrStreet('');
    setAddrCity('');
    setAddrZip('');
    setShowAddAddressForm(false);
  };

  const handleSaveNewPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutIdentifier) return;

    addPaymentMethod({
      type: payoutType,
      label: payoutLabel,
      accountIdentifier: payoutIdentifier,
      isDefault: currentUser.paymentMethods.length === 0,
    });

    setPayoutIdentifier('');
    setShowAddPayoutForm(false);
  };

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
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-2xl w-full my-0 sm:my-6 shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        {/* Mobile Pull Bar */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" aria-hidden="true" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-700 border-2 border-emerald-500 shrink-0 relative flex items-center justify-center text-white font-bold text-sm shadow-sm">
                <span className="text-white font-bold text-sm select-none">
                  {currentUser.name.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('')}
                </span>
                {currentUser.avatarUrl && (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
              </div>
              <button
                type="button"
                id="header-change-photo-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Upload / Change Profile Photo"
                aria-label="Upload or change profile photo"
                className="absolute -bottom-1 -right-1 p-1.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-full border border-slate-300 shadow-xs transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="hidden"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="profile-modal-title" className="font-bold text-base text-slate-900">{currentUser.name}</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {currentUser.ecoTier}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span>{currentUser.email}</span>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer font-medium"
                >
                  Change photo
                </button>
              </p>
            </div>
          </div>

          <button
            id="close-profile-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close profile modal"
            className="p-2 -mr-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 text-xs font-semibold px-6 bg-white">
          <button
            id="tab-profile-overview"
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Overview & Eco Stats
          </button>
          <button
            id="tab-saved-addresses"
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'addresses'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Saved Addresses ({currentUser.addresses.length})
          </button>
          <button
            id="tab-payout-methods"
            onClick={() => setActiveTab('payouts')}
            className={`py-3 px-3 border-b-2 transition-colors ${
              activeTab === 'payouts'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Payout Accounts ({currentUser.paymentMethods.length})
          </button>
        </div>

        {/* Tab 1: Profile & Eco Stats */}
        {activeTab === 'profile' && (
          <div className="p-6 space-y-6">
            {/* Stats Dashboard */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Lifetime Circular Impact
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    Total Pickups
                  </span>
                  <span className="text-xl font-black text-slate-900 mt-1 block">
                    {currentUser.stats.totalPickups}
                  </span>
                  <span className="text-[10px] text-slate-400">Completed jobs</span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-emerald-700 block">
                    Total Earned
                  </span>
                  <span className="text-xl font-black text-emerald-800 mt-1 block">
                    ₹{currentUser.stats.totalEarned.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-600">Disbursed UPI/Bank/Cash</span>
                </div>

                <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-teal-700 block">
                    Waste Diverted
                  </span>
                  <span className="text-xl font-black text-teal-800 mt-1 block">
                    {currentUser.stats.totalWasteDivertedKg} kg
                  </span>
                  <span className="text-[10px] text-teal-600">0% Landfill</span>
                </div>

                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                  <span className="text-[11px] font-semibold text-blue-700 block">
                    CO2 Avoided
                  </span>
                  <span className="text-xl font-black text-blue-800 mt-1 block">
                    {currentUser.stats.co2PreventedKg} kg
                  </span>
                  <span className="text-[10px] text-blue-600">Smelter reduction</span>
                </div>
              </div>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Verified Contact Details
              </span>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Phone for Driver SMS:</span>
                <span className="font-semibold text-slate-800">{currentUser.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Member Since:</span>
                <span className="font-semibold text-slate-800">{currentUser.memberSince}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Account Type:</span>
                <span className="font-semibold text-emerald-700">Verified Household / Commercial</span>
              </div>
            </div>

            {/* Profile Photo Management */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Profile Avatar Photo
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-700 border-2 border-emerald-500 shrink-0 relative flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    <span className="text-white font-bold text-sm select-none">
                      {currentUser.name.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('')}
                    </span>
                    {currentUser.avatarUrl && (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500">
                      Display photo for Jath doorstep drivers & receipts
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    id="upload-custom-avatar-btn"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateProfile({ avatarUrl: '/assets/shivraj_hirave.svg' })}
                    title="Restore default portrait"
                    className="px-2 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-medium transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                id="view-my-pickups-btn"
                onClick={() => {
                  onClose();
                  onViewPickups();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-emerald-700 p-2 rounded-lg hover:bg-slate-100"
              >
                <span>View Order & Tracking History →</span>
              </button>

              <button
                id="profile-logout-btn"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Saved Addresses (Key for Repeat Bookings!) */}
        {activeTab === 'addresses' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Doorstep Pickup Address Book
                </h4>
                <p className="text-[11px] text-slate-500">
                  Pre-populates during booking so you can re-order in seconds
                </p>
              </div>

              {!showAddAddressForm && (
                <button
                  id="show-add-address-btn"
                  onClick={() => setShowAddAddressForm(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Address
                </button>
              )}
            </div>

            {/* New Address Form */}
            {showAddAddressForm && (
              <form onSubmit={handleSaveNewAddress} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-800">New Address Details</h5>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      required
                      value={addrLabel}
                      onChange={(e) => setAddrLabel(e.target.value)}
                      placeholder="e.g. Home, Shop, Farm Godown"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Floor Level
                    </label>
                    <select
                      value={addrFloor}
                      onChange={(e) => setAddrFloor(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="1st Floor">1st Floor</option>
                      <option value="2nd - 4th Floor">2nd - 4th Floor</option>
                      <option value="5th+ Floor">5th+ Floor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={addrStreet}
                    onChange={(e) => setAddrStreet(e.target.value)}
                    placeholder="e.g. Near Shivaji Chowk, Mangalwedha Road"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      placeholder="Jath, Sangli"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Pin Code
                    </label>
                    <input
                      type="text"
                      required
                      value={addrZip}
                      onChange={(e) => setAddrZip(e.target.value)}
                      placeholder="416404"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addrElevator}
                      onChange={(e) => setAddrElevator(e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    Elevator available for heavy items
                  </label>

                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* List of existing saved addresses */}
            <div className="space-y-2.5">
              {currentUser.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                    addr.isDefault
                      ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">{addr.street}</p>
                      <p className="text-[11px] text-slate-500">
                        {addr.city}, {addr.zipCode} • {addr.floorLevel} ({addr.hasElevator ? 'Elevator' : 'No elevator'})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 p-1 rounded"
                      >
                        Set Default
                      </button>
                    )}
                    {currentUser.addresses.length > 1 && (
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Payout Accounts */}
        {activeTab === 'payouts' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Saved Payout & Settlement Methods
                </h4>
                <p className="text-[11px] text-slate-500">
                  Where you receive cash/credits when you choose "Sell It" or "Recycle It"
                </p>
              </div>

              {!showAddPayoutForm && (
                <button
                  id="show-add-payout-btn"
                  onClick={() => setShowAddPayoutForm(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Method
                </button>
              )}
            </div>

            {/* Add Payout Form */}
            {showAddPayoutForm && (
              <form onSubmit={handleSaveNewPayout} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-800">Add Settlement Destination</h5>
                  <button
                    type="button"
                    onClick={() => setShowAddPayoutForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Type
                    </label>
                    <select
                      value={payoutType}
                      onChange={(e) => setPayoutType(e.target.value as any)}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="upi_instant">Instant UPI (GPay / PhonePe / Paytm)</option>
                      <option value="bank_transfer">Direct Bank Transfer (NEFT/IMPS)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Account Nickname
                    </label>
                    <input
                      type="text"
                      required
                      value={payoutLabel}
                      onChange={(e) => setPayoutLabel(e.target.value)}
                      placeholder="e.g. State Bank of India Jath or PhonePe"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    {payoutType === 'bank_transfer' ? 'Bank Account Number & IFSC Code' : 'UPI ID (VPA)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutIdentifier}
                    onChange={(e) => setPayoutIdentifier(e.target.value)}
                    placeholder={payoutType === 'bank_transfer' ? 'A/C No: 39482019482, IFSC: SBIN0000392' : 'mobile@upi or yourname@oksbi'}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                  >
                    Save Payout Method
                  </button>
                </div>
              </form>
            )}

            {/* List of saved payout methods */}
            <div className="space-y-2.5">
              {currentUser.paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                    pm.isDefault
                      ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IndianRupee className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{pm.label}</span>
                        {pm.isDefault && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-mono mt-0.5">{pm.accountIdentifier}</p>
                    </div>
                  </div>

                  {!pm.isDefault && (
                    <button
                      onClick={() => setDefaultPaymentMethod(pm.id)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 p-1 rounded"
                    >
                      Make Primary
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
