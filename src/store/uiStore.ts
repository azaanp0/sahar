import { create } from 'zustand';

interface UIStore {
    sidebarOpen: boolean;
    mobileMenuOpen: boolean;
    searchOpen: boolean;
    cartOpen: boolean;
    theme: 'light' | 'dark';
    language: 'ar' | 'en';
    toggleSidebar: () => void;
    toggleMobileMenu: () => void;
    toggleSearch: () => void;
    toggleCart: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setLanguage: (language: 'ar' | 'en') => void;
}

export const useUIStore = create<UIStore>((set) => ({
    sidebarOpen: false,
    mobileMenuOpen: false,
    searchOpen: false,
    cartOpen: false,
    theme: 'light',
    language: 'ar',
    
    toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
    },
    
    toggleMobileMenu: () => {
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }));
    },
    
    toggleSearch: () => {
        set((state) => ({ searchOpen: !state.searchOpen }));
    },
    
    toggleCart: () => {
        set((state) => ({ cartOpen: !state.cartOpen }));
    },
    
    setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
    },
    
    setLanguage: (language) => {
        set({ language });
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }
}));
