import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '../data/demoUsers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'signin',
}) => {
  const { login, signup, quickLoginDemo } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('shivraj.hirave@gmail.com');
  const [signInPassword, setSignInPassword] = useState('password123');

  // Sign Up state
  const [name, setName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Jath, Sangli');
  const [zipCode, setZipCode] = useState('416404');
  const [floorLevel, setFloorLevel] = useState('Ground Floor');
  const [hasElevator, setHasElevator] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const result = login(signInEmail, signInPassword);
    if (result.success) {
      onClose();
    } else {
      setErrorMsg(result.error || 'Failed to sign in. Please check credentials.');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name || !signUpEmail || !phone || !street || !city || !zipCode) {
      setErrorMsg('Please fill in all required customer details for doorstep pickup.');
      return;
    }

    const result = signup({
      name,
      email: signUpEmail,
      phone,
      street,
      city,
      zipCode,
      floorLevel,
      hasElevator,
    });

    if (result.success) {
      onClose();
    } else {
      setErrorMsg(result.error || 'Could not create account.');
    }
  };

  const handleQuickDemo = (userId: string) => {
    quickLoginDemo(userId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full my-8 shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              {tab === 'signin' ? 'Customer Sign In' : 'Create Customer Account'}
            </h3>
            <p className="text-xs text-slate-500">
              Manage pickups, saved addresses, payments & repeat bookings
            </p>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Selector */}
        <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-emerald-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              1-Click Demo Customer:
            </span>
            <span className="text-[11px] text-emerald-700">Pre-saved addresses & history</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="demo-user-shivraj-btn"
              onClick={() => handleQuickDemo('user-shivraj-hirave')}
              className="p-2 rounded-lg bg-white border border-emerald-200 hover:border-emerald-500 text-left transition-all shadow-2xs hover:shadow-xs"
            >
              <div className="font-bold text-slate-900">Shivraj Hirave</div>
              <div className="text-[11px] text-slate-500">Shivaji Nagar (3 Jath addrs)</div>
            </button>
            <button
              type="button"
              id="demo-user-marcus-btn"
              onClick={() => handleQuickDemo('user-marcus-vance')}
              className="p-2 rounded-lg bg-white border border-emerald-200 hover:border-emerald-500 text-left transition-all shadow-2xs hover:shadow-xs"
            >
              <div className="font-bold text-slate-900">Rajesh Kulkarni</div>
              <div className="text-[11px] text-slate-500">MIDC Jath Workshop & Yard</div>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 text-xs font-bold text-center">
          <button
            type="button"
            id="auth-tab-signin"
            onClick={() => {
              setTab('signin');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 transition-colors ${
              tab === 'signin'
                ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white font-extrabold'
                : 'text-slate-500 bg-slate-50 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            id="auth-tab-signup"
            onClick={() => {
              setTab('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-3 transition-colors ${
              tab === 'signup'
                ? 'text-emerald-700 border-b-2 border-emerald-600 bg-white font-extrabold'
                : 'text-slate-500 bg-slate-50 hover:text-slate-800'
            }`}
          >
            Sign Up (New Customer)
          </button>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Tab 1: Sign In */}
        {tab === 'signin' ? (
          <form onSubmit={handleSignInSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="signin-email-input"
                  type="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="signin-password-input"
                  type="password"
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                Remember this device
              </label>
              <span className="text-emerald-700 hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <button
              id="submit-signin-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Customer Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Tab 2: Sign Up */
          <form onSubmit={handleSignUpSubmit} className="p-6 space-y-3.5 max-h-[65vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Customer Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="signup-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Varad Patil / वरद पाटील"
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="signup-email-input"
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="varad@gmail.com"
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone (for Driver SMS) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="signup-phone-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98224 00000"
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Default Doorstep Pickup Address
              </span>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Street Address *
                  </label>
                  <input
                    id="signup-street-input"
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. Near Shivaji Chowk, Mangalwedha Road"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      City *
                    </label>
                    <input
                      id="signup-city-input"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Jath, Sangli"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Pin Code *
                    </label>
                    <input
                      id="signup-zip-input"
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="416404"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Floor
                    </label>
                    <select
                      id="signup-floor-select"
                      value={floorLevel}
                      onChange={(e) => setFloorLevel(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="1st Floor">1st Floor</option>
                      <option value="2nd - 4th Floor">2nd - 4th Floor</option>
                      <option value="5th+ Floor">5th+ Floor</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 pt-4">
                    <input
                      id="signup-elevator-checkbox"
                      type="checkbox"
                      checked={hasElevator}
                      onChange={(e) => setHasElevator(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="signup-elevator-checkbox" className="text-xs text-slate-700">
                      Elevator available
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              id="submit-signup-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <span>Create Account & Save Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
