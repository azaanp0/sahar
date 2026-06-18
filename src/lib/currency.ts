export const formatCurrency = (amount: number, currency = "SAR"): string => {
    return new Intl.NumberFormat("ar-SA", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const formatPrice = (price: number): string => {
    return `${price.toFixed(2)} ر.س`;
};

export const calculateDiscount = (originalPrice: number, salePrice: number): number => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const calculateVAT = (amount: number, vatRate = 0.15): number => {
    return amount * vatRate;
};

export const calculateTotalWithVAT = (amount: number, vatRate = 0.15): number => {
    return amount + calculateVAT(amount, vatRate);
};
