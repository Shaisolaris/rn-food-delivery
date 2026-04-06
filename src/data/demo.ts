export const DEMO_RESTAURANTS = [
  { id: "r1", name: "Pizza Palace", cuisine: "Italian", rating: 4.7, deliveryTime: "25-35 min", deliveryFee: 2.99, image: null },
  { id: "r2", name: "Sushi Express", cuisine: "Japanese", rating: 4.8, deliveryTime: "30-40 min", deliveryFee: 3.99, image: null },
  { id: "r3", name: "Burger Joint", cuisine: "American", rating: 4.5, deliveryTime: "20-30 min", deliveryFee: 1.99, image: null },
  { id: "r4", name: "Thai Orchid", cuisine: "Thai", rating: 4.6, deliveryTime: "35-45 min", deliveryFee: 2.49, image: null },
];
export const DEMO_MENU_ITEMS = [
  { id: "m1", restaurantId: "r1", name: "Margherita Pizza", description: "Fresh mozzarella, basil, tomato sauce", price: 14.99, category: "Pizza" },
  { id: "m2", restaurantId: "r1", name: "Pepperoni Pizza", description: "Classic pepperoni with mozzarella", price: 16.99, category: "Pizza" },
  { id: "m3", restaurantId: "r2", name: "Salmon Roll", description: "8 pieces, fresh salmon, avocado", price: 12.99, category: "Rolls" },
  { id: "m4", restaurantId: "r2", name: "Dragon Roll", description: "Shrimp tempura, eel, avocado", price: 15.99, category: "Rolls" },
];
export const DEMO_CART = { items: [], subtotal: 0, deliveryFee: 0, total: 0 };
export const DEMO_ORDERS = [
  { id: "o1", restaurant: "Pizza Palace", total: 31.98, status: "delivered", date: "2026-04-02" },
  { id: "o2", restaurant: "Sushi Express", total: 28.98, status: "delivered", date: "2026-03-28" },
];
