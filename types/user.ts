export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  language: 'ar' | 'en';
  currency: 'SAR';
  isVerified: boolean;
  loyaltyPoints: number;
  loyaltyTier: LoyaltyTier;
  createdAt: string;
  updatedAt: string;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface UserProfile extends User {
  addresses: UserAddress[];
  preferences: UserPreferences;
  notifications: NotificationSettings;
}

export interface UserAddress {
  id: string;
  fullName: string;
  phone: string;
  country: string;
  city: string;
  area: string;
  street: string;
  building?: string;
  apartment?: string;
  landmark?: string;
  postalCode?: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface UserPreferences {
  newsletter: boolean;
  sms: boolean;
  push: boolean;
  email: boolean;
}

export interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  recommendations: boolean;
  account: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface OTPVerification {
  phone: string;
  code: string;
  type: 'register' | 'login' | 'reset_password';
}
