import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, CustomerAddress, SavedPaymentMethod } from '../types';
import { DEMO_USERS } from '../data/demoUsers';

const AUTH_USER_KEY = 'waste_pickup_current_user_v3';
const USERS_LIST_KEY = 'waste_pickup_all_users_v3';

interface AuthContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  login: (email: string, password?: string) => { success: boolean; error?: string };
  signup: (userData: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zipCode: string;
    floorLevel: string;
    hasElevator: boolean;
  }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<UserAccount>) => void;
  addAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentMethod: (pm: Omit<SavedPaymentMethod, 'id'>) => void;
  setDefaultPaymentMethod: (id: string) => void;
  quickLoginDemo: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_LIST_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed loading users list', e);
    }
    return DEMO_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed loading current user', e);
    }
    // Default logged in as Shivraj Hirave for instant smooth demonstration
    return DEMO_USERS[0];
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed saving users list', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    } catch (e) {
      console.warn('Failed saving current user', e);
    }
  }, [currentUser]);

  const login = (email: string) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      return { success: true };
    }
    return { success: false, error: 'No account found with this email address.' };
  };

  const signup = (userData: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zipCode: string;
    floorLevel: string;
    hasElevator: boolean;
  }) => {
    const existing = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    const defaultAddress: CustomerAddress = {
      id: `addr-${Date.now()}`,
      label: 'Home (Default)',
      street: userData.street,
      city: userData.city,
      zipCode: userData.zipCode,
      floorLevel: userData.floorLevel,
      hasElevator: userData.hasElevator,
      isDefault: true,
    };

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      ecoTier: 'Green Starter',
      addresses: [defaultAddress],
      paymentMethods: [
        {
          id: `pm-${Date.now()}`,
          type: 'bank_transfer',
          label: 'Direct Bank Transfer',
          accountIdentifier: 'Pending setup on first payout',
          isDefault: true,
        },
      ],
      stats: {
        totalPickups: 0,
        totalEarned: 0,
        totalWasteDivertedKg: 0,
        co2PreventedKg: 0,
      },
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const addAddress = (addressData: Omit<CustomerAddress, 'id'>) => {
    if (!currentUser) return;
    const newAddress: CustomerAddress = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };

    let updatedAddresses = [...currentUser.addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    updateProfile({ addresses: updatedAddresses });
  };

  const deleteAddress = (id: string) => {
    if (!currentUser) return;
    const filtered = currentUser.addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    updateProfile({ addresses: filtered });
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;
    const updated = currentUser.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    updateProfile({ addresses: updated });
  };

  const addPaymentMethod = (pmData: Omit<SavedPaymentMethod, 'id'>) => {
    if (!currentUser) return;
    const newPm: SavedPaymentMethod = {
      ...pmData,
      id: `pm-${Date.now()}`,
    };
    let updatedMethods = [...currentUser.paymentMethods];
    if (newPm.isDefault) {
      updatedMethods = updatedMethods.map((m) => ({ ...m, isDefault: false }));
    }
    updatedMethods.push(newPm);
    updateProfile({ paymentMethods: updatedMethods });
  };

  const setDefaultPaymentMethod = (id: string) => {
    if (!currentUser) return;
    const updated = currentUser.paymentMethods.map((m) => ({
      ...m,
      isDefault: m.id === id,
    }));
    updateProfile({ paymentMethods: updated });
  };

  const quickLoginDemo = (userId: string) => {
    const user = users.find((u) => u.id === userId) || DEMO_USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        signup,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        addPaymentMethod,
        setDefaultPaymentMethod,
        quickLoginDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
