export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    dateOfBirth?: string;
    gender?: "male" | "female" | "other";
    language?: "ar" | "en";
    currency?: "SAR";
    emailVerified: boolean;
    phoneVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile extends User {
    addresses: Address[];
    loyaltyPoints: number;
    loyaltyTier: LoyaltyTier;
    preferences: UserPreferences;
}

export type LoyaltyTier = "bronze" | "silver" | "gold" | "platinum";

export interface UserPreferences {
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
}

export interface Address {
    id: string;
    label: string;
    fullName: string;
    phone: string;
    city: string;
    district: string;
    street: string;
    building?: string;
    floor?: string;
    apartment?: string;
    postalCode?: string;
    isDefault: boolean;
    location?: {
        lat: number;
        lng: number;
    };
}

export interface LoyaltyReward {
    id: string;
    name: string;
    description: string;
    pointsRequired: number;
    type: "discount" | "free_shipping" | "free_product" | "cashback";
    value: number;
    expiryDate?: string;
    image?: string;
}
