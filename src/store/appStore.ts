import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '@/lib/dashboard-dashe/db';
import type { Product, ThemeSettings, SeoRedirect } from '@/lib/dashboard-dashe/db';

interface AppState {
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Theme Settings
  theme: ThemeSettings;
  setTheme: (theme: ThemeSettings) => void;
  updateTheme: (updates: Partial<ThemeSettings>) => void;
  
  // Redirects
  redirects: SeoRedirect[];
  setRedirects: (redirects: SeoRedirect[]) => void;
  addRedirect: (redirect: SeoRedirect) => void;
  deleteRedirect: (id: string) => void;
  updateRedirect: (id: string, updates: Partial<SeoRedirect>) => void;
  
  // Sync from dashboard DB
  syncFromDashboard: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state from dashboard DB
      products: db.getProducts(),
      theme: db.getTheme(),
      redirects: db.getRedirects(),
      
      // Products actions
      setProducts: (products) => set({ products }),
      
      addProduct: (product) => {
        const products = get().products;
        set({ products: [product, ...products] });
        // Also update dashboard DB
        db.addProduct(product);
      },
      
      updateProduct: (id, updates) => {
        const products = get().products.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        );
        set({ products });
        // Also update dashboard DB
        db.updateProduct(id, updates);
      },
      
      deleteProduct: (id) => {
        const products = get().products.filter((p) => p.id !== id);
        set({ products });
        // Also update dashboard DB
        db.deleteProduct(id);
      },
      
      // Theme actions
      setTheme: (theme) => set({ theme }),
      
      updateTheme: (updates) => {
        const theme = { ...get().theme, ...updates };
        set({ theme });
        // Also update dashboard DB
        db.saveTheme(theme);
      },
      
      // Redirects actions
      setRedirects: (redirects) => set({ redirects }),
      
      addRedirect: (redirect) => {
        const redirects = get().redirects;
        set({ redirects: [redirect, ...redirects] });
        // Also update dashboard DB
        db.saveRedirects([redirect, ...redirects]);
      },
      
      deleteRedirect: (id) => {
        const redirects = get().redirects.filter((r) => r.id !== id);
        set({ redirects });
        // Also update dashboard DB
        db.saveRedirects(redirects);
      },
      
      updateRedirect: (id, updates) => {
        const redirects = get().redirects.map((r) =>
          r.id === id ? { ...r, ...updates } : r
        );
        set({ redirects });
        // Also update dashboard DB
        db.saveRedirects(redirects);
      },
      
      // Sync from dashboard DB
      syncFromDashboard: () => {
        set({
          products: db.getProducts(),
          theme: db.getTheme(),
          redirects: db.getRedirects(),
        });
      },
    }),
    {
      name: 'sahar-app-storage',
    }
  )
);
