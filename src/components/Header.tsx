import React from 'react';
import { Recycle, PackageCheck, ShieldCheck, Sparkles, Clock, History, User, LogIn, ChevronDown } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            id="brand-logo-btn"
            onClick={onReset}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-105">
              <Recycle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Sell / Dispose Anything
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  AI Pickup ♻️
                </span>
              </div>
              <p className="text-xs text-slate-700 hidden md:block">
                Upload photo → Identify item → Sell, Recycle, Donate or Dispose
              </p>
            </div>
          </div>

          {/* Quick Nav & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              id="accepted-items-nav-btn"
              onClick={onScrollToAccepted}
              className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors hidden sm:block"
            >
              What We Take
            </button>

            <button
              id="view-pickups-btn"
              onClick={onOpenHistory}
              className="relative inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <History className="w-4 h-4 text-slate-600" />
              <span className="hidden xs:inline">My Pickups</span>
              <span className="xs:hidden">Pickups</span>
              {activePickupsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-emerald-600 rounded-full">
                  {activePickupsCount}
                </span>
              )}
            </button>

            {/* Auth / Profile Button */}
            {currentUser ? (
              <button
                id="header-user-profile-btn"
                onClick={onOpenProfile}
                className="inline-flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-white transition-all text-xs font-semibold text-slate-800"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-700 border border-slate-300 shrink-0 relative flex items-center justify-center text-white font-bold text-xs">
                  <span className="text-white font-bold text-xs select-none">
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
                <div className="hidden sm:block text-left">
                  <div className="leading-tight text-slate-900 font-bold truncate max-w-[130px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium">
                    {currentUser.addresses.length} saved addrs
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>
            ) : (
              <button
                id="header-signin-btn"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            <div className="hidden xl:flex items-center gap-1.5 pl-2 text-xs text-slate-600 border-l border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Pickups</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
