export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? `${count} ${singular}` : `${count} ${plural || singular + "s"}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function calculateCartTotal(subtotal: number, deliveryFee: number, taxRate = 0.0875): {
  subtotal: number; deliveryFee: number; tax: number; total: number;
} {
  const tax = subtotal * taxRate;
  return { subtotal, deliveryFee, tax: Math.round(tax * 100) / 100, total: Math.round((subtotal + deliveryFee + tax) * 100) / 100 };
}
