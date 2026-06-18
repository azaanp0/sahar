import { db } from '@/lib/dashboard-dashe/db';
import type { ThemeSettings } from '@/lib/dashboard-dashe/db';

export interface SiteSettings extends ThemeSettings {
  siteTitle: string;
  siteTagline: string;
  phone: string;
  email: string;
  socialMedia: {
    instagram: string;
    twitter: string;
    tiktok: string;
    snapchat: string;
  };
  shipping: {
    freeThreshold: number;
    standardFee: number;
    expressFee: number;
  };
  footerText: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  // Theme settings
  primaryColor: '#C6AAD0',
  accentColor: '#E91E63',
  fontFamily: 'Cairo',
  logoUrl: '/saher-logo.png',
  storeName: 'سحر',
  
  // Site settings
  siteTitle: 'سحر',
  siteTagline: 'متجر العناية والجمال الرائد',
  phone: '920014688',
  email: 'support@sahar.sa',
  socialMedia: {
    instagram: 'https://instagram.com/sahar',
    twitter: 'https://twitter.com/sahar',
    tiktok: 'https://tiktok.com/@sahar',
    snapchat: 'https://snapchat.com/add/sahar',
  },
  shipping: {
    freeThreshold: 199,
    standardFee: 0,
    expressFee: 29,
  },
  footerText: 'جميع الحقوق محفوظة لـ سحر © 2026',
  
  // Other theme settings
  banners: [],
  sectionOrder: ['hero', 'categories', 'offers', 'brands', 'featured', 'skintype', 'korean'],
  robotsTxt: '',
  ga4Id: '',
  metaPixelId: '',
  snapPixelId: '',
};

/**
 * Get all site settings from the database
 * This reads from the shared localStorage database used by both dashboard and storefront
 */
export function getSettings(): SiteSettings {
  try {
    const theme = db.getTheme();
    return {
      ...DEFAULT_SETTINGS,
      ...theme,
      siteTitle: theme.storeName || DEFAULT_SETTINGS.siteTitle,
      siteTagline: DEFAULT_SETTINGS.siteTagline,
      phone: DEFAULT_SETTINGS.phone,
      email: DEFAULT_SETTINGS.email,
      socialMedia: DEFAULT_SETTINGS.socialMedia,
      shipping: DEFAULT_SETTINGS.shipping,
      footerText: DEFAULT_SETTINGS.footerText,
      // Ensure all ThemeSettings fields are present
      banners: theme.banners || DEFAULT_SETTINGS.banners,
      sectionOrder: theme.sectionOrder || DEFAULT_SETTINGS.sectionOrder,
      robotsTxt: theme.robotsTxt || DEFAULT_SETTINGS.robotsTxt,
      ga4Id: theme.ga4Id || DEFAULT_SETTINGS.ga4Id,
      metaPixelId: theme.metaPixelId || DEFAULT_SETTINGS.metaPixelId,
      snapPixelId: theme.snapPixelId || DEFAULT_SETTINGS.snapPixelId,
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Update site settings
 * This writes to the shared localStorage database, triggering live updates in the storefront
 */
export function updateSettings(newSettings: Partial<SiteSettings>): void {
  try {
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    
    // Update theme in database
    db.saveTheme(updatedSettings);
    
    // The storefront will automatically pick up these changes via Zustand store
    // No need for manual revalidation - it's live!
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

/**
 * Get a specific setting by key
 */
export function getSetting<K extends keyof SiteSettings>(key: K): SiteSettings[K] {
  const settings = getSettings();
  return settings[key];
}

/**
 * Update a specific setting by key
 */
export function setSetting<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]): void {
  updateSettings({ [key]: value });
}
