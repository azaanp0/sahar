import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isAuthModalOpen: boolean;
  activeModal: string | null;
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setAuthModalOpen: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'ar' | 'en') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isAuthModalOpen: false,
  activeModal: null,
  theme: 'light',
  language: 'ar',

  setCartOpen: (open) => set({ isCartOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
}));
