export function formatPrice(price: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPriceEn(price: number, currency: string = 'SAR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function calculateTax(amount: number, taxRate: number = 0.15): number {
  return amount * taxRate;
}

export function calculateTotal(subtotal: number, discount: number = 0, taxRate: number = 0.15): number {
  const afterDiscount = subtotal - discount;
  const tax = calculateTax(afterDiscount, taxRate);
  return afterDiscount + tax;
}

export function formatPercentage(value: number): string {
  return `${value}%`;
}
