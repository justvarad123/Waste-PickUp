import React from 'react';
import {
  Recycle,
  ShieldCheck,
  History,
  LogIn,
  ChevronDown,
  Camera,
  Layers,
  User,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activePickupsCount: number;
  onOpenHistory: () => void;
  onReset: () => void;
  onScrollToAccepted: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePickupsCount,
  onOpenHistory,
  onReset,
  onScrollToAccepted,
  onOpenAuth,
  onOpenProfile,
}) => {
  const { currentUser } = useAuth();

  return (
    <>
      {/* Top Header */}
      <header role="banner" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Heading */}
            <button
              id="brand-logo-btn"
              type="button"
              onClick={onReset}
              aria-label="Sell / Dispose Anything - Return to homepage"
              className="flex items-center gap-3 cursor-pointer group text-left focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden rounded-xl p-1 -ml-1"
            >
              <div
                className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-105"
                aria-hidden="true"
              >
                <Recycle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                    Sell / Dispose Anything
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300">
                    Jath ♻️
                  </span>
                </div>
                <p className="text-xs text-slate-600 hidden md:block">
                  Doorstep Waste, Scrap & Item Pickup • Sangli District
                </p>
              </div>
            </button>

            {/* Main Navigation Actions */}
            <nav aria-label="Main Navigation" className="flex items-center gap-2 sm:gap-3">
              <a
                href="/ssr/rates"
                id="ssr-rates-link"
                title="View Server-Side Rendered Scrap Rates"
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 px-2.5 py-2 rounded-xl transition-colors border border-slate-200 min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>SSR Rates</span>
              </a>

              <button
                id="accepted-items-nav-btn"
                type="button"
                onClick={onScrollToAccepted}
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors hidden sm:block min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
              >
                What We Take
              </button>

              <button
                id="view-pickups-btn"
                type="button"
                onClick={onOpenHistory}
                aria-label={`View My Pickups, ${activePickupsCount} active`}
                className="relative inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
              >
                <History className="w-4 h-4 text-slate-700 shrink-0" aria-hidden="true" />
                <span className="hidden xs:inline">My Pickups</span>
                <span className="xs:hidden">Pickups</span>
                {activePickupsCount > 0 && (
                  <span
                    className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-emerald-600 rounded-full"
                    aria-label={`${activePickupsCount} active orders`}
                  >
                    {activePickupsCount}
                  </span>
                )}
              </button>

              {/* Auth / Profile Button */}
              {currentUser ? (
                <button
                  id="header-user-profile-btn"
                  type="button"
                  onClick={onOpenProfile}
                  aria-label={`User profile for ${currentUser.name}`}
                  className="inline-flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-white transition-all text-xs font-semibold text-slate-900 min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-700 border border-slate-300 shrink-0 relative flex items-center justify-center text-white font-bold text-xs">
                    <span className="text-white font-bold text-xs select-none">
                      {currentUser.name
                        .split(' ')
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')}
                    </span>
                    {currentUser.avatarUrl && (
                      <img
                        src={currentUser.avatarUrl}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="leading-tight text-slate-900 font-bold truncate max-w-[130px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-emerald-800 font-medium">
                      {currentUser.addresses.length} saved addrs
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" aria-hidden="true" />
                </button>
              ) : (
                <button
                  id="header-signin-btn"
                  type="button"
                  onClick={onOpenAuth}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 px-3.5 py-2 rounded-xl shadow-xs transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
                >
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  <span>Sign In</span>
                </button>
              )}

              <div className="hidden xl:flex items-center gap-1.5 pl-2 text-xs text-slate-700 border-l border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Certified Jath Network</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Navigation Bar (< 640px) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg flex items-center justify-around safe-area-pb"
      >
        <button
          type="button"
          onClick={onReset}
          className="flex flex-col items-center justify-center p-2 min-h-[48px] min-w-[64px] text-slate-700 hover:text-emerald-700 active:text-emerald-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden rounded-xl"
        >
          <Camera className="w-5 h-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-0.5">Scan Item</span>
        </button>

        <button
          type="button"
          onClick={onScrollToAccepted}
          className="flex flex-col items-center justify-center p-2 min-h-[48px] min-w-[64px] text-slate-700 hover:text-emerald-700 active:text-emerald-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden rounded-xl"
        >
          <Layers className="w-5 h-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-0.5">Directory</span>
        </button>

        <button
          type="button"
          onClick={onOpenHistory}
          className="relative flex flex-col items-center justify-center p-2 min-h-[48px] min-w-[64px] text-slate-700 hover:text-emerald-700 active:text-emerald-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden rounded-xl"
        >
          <History className="w-5 h-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-0.5">Pickups</span>
          {activePickupsCount > 0 && (
            <span className="absolute top-1.5 right-3 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {activePickupsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={currentUser ? onOpenProfile : onOpenAuth}
          className="flex flex-col items-center justify-center p-2 min-h-[48px] min-w-[64px] text-slate-700 hover:text-emerald-700 active:text-emerald-800 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden rounded-xl"
        >
          <User className="w-5 h-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-0.5">
            {currentUser ? 'Account' : 'Sign In'}
          </span>
        </button>
      </nav>
    </>
  );
};
