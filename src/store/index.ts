import { create } from "zustand";
import type { Restaurant, CartItem, MenuItem, Order, Address } from "../types/index.js";
import { mockRestaurants, mockOrders, mockAddresses } from "../services/mockData.js";
import { generateId, calculateCartTotal } from "../utils/index.js";

interface AppStore {
  // Restaurants
  restaurants: Restaurant[];
  featuredRestaurants: Restaurant[];
  getRestaurant: (id: string) => Restaurant | undefined;

  // Cart
  cartItems: CartItem[];
  cartRestaurantId: string | null;
  addToCart: (restaurantId: string, item: MenuItem, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => { subtotal: number; deliveryFee: number; tax: number; total: number };
  cartItemCount: () => number;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  placeOrder: (tip: number) => Order;

  // Address
  addresses: Address[];
  selectedAddress: Address;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: () => Restaurant[];
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Restaurants
  restaurants: mockRestaurants,
  featuredRestaurants: mockRestaurants.filter((r) => r.featured),
  getRestaurant: (id) => get().restaurants.find((r) => r.id === id),

  // Cart
  cartItems: [],
  cartRestaurantId: null,

  addToCart: (restaurantId, item, quantity = 1) => {
    set((state) => {
      // If cart has items from different restaurant, clear first
      if (state.cartRestaurantId && state.cartRestaurantId !== restaurantId) {
        return {
          cartItems: [{ id: generateId(), menuItem: item, quantity, selectedOptions: {}, totalPrice: item.price * quantity }],
          cartRestaurantId: restaurantId,
        };
      }

      const existing = state.cartItems.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((ci) =>
            ci.id === existing.id
              ? { ...ci, quantity: ci.quantity + quantity, totalPrice: ci.menuItem.price * (ci.quantity + quantity) }
              : ci,
          ),
          cartRestaurantId: restaurantId,
        };
      }

      return {
        cartItems: [...state.cartItems, { id: generateId(), menuItem: item, quantity, selectedOptions: {}, totalPrice: item.price * quantity }],
        cartRestaurantId: restaurantId,
      };
    });
  },

  removeFromCart: (cartItemId) => {
    set((state) => {
      const items = state.cartItems.filter((ci) => ci.id !== cartItemId);
      return { cartItems: items, cartRestaurantId: items.length === 0 ? null : state.cartRestaurantId };
    });
  },

  updateQuantity: (cartItemId, quantity) => {
    if (quantity <= 0) { get().removeFromCart(cartItemId); return; }
    set((state) => ({
      cartItems: state.cartItems.map((ci) =>
        ci.id === cartItemId ? { ...ci, quantity, totalPrice: ci.menuItem.price * quantity } : ci,
      ),
    }));
  },

  clearCart: () => set({ cartItems: [], cartRestaurantId: null }),

  cartTotal: () => {
    const items = get().cartItems;
    const subtotal = items.reduce((sum, ci) => sum + ci.totalPrice, 0);
    const restaurant = get().cartRestaurantId ? get().getRestaurant(get().cartRestaurantId!) : undefined;
    return calculateCartTotal(subtotal, restaurant?.deliveryFee ?? 0);
  },

  cartItemCount: () => get().cartItems.reduce((sum, ci) => sum + ci.quantity, 0),

  // Orders
  orders: mockOrders,
  activeOrder: mockOrders.find((o) => o.status !== "delivered" && o.status !== "cancelled") || null,

  placeOrder: (tip) => {
    const state = get();
    const totals = state.cartTotal();
    const restaurant = state.getRestaurant(state.cartRestaurantId!);

    const order: Order = {
      id: `ord-${generateId()}`,
      restaurantId: state.cartRestaurantId!,
      restaurantName: restaurant?.name || "Restaurant",
      items: [...state.cartItems],
      ...totals,
      tip,
      total: totals.total + tip,
      status: "placed",
      estimatedDelivery: `${new Date(Date.now() + 35 * 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      trackingSteps: [
        { status: "placed", label: "Order Placed", completed: false, active: true, time: new Date().toISOString() },
        { status: "confirmed", label: "Restaurant Confirmed", completed: false, active: false },
        { status: "preparing", label: "Preparing Your Food", completed: false, active: false },
        { status: "picked_up", label: "Driver Picked Up", completed: false, active: false },
        { status: "on_the_way", label: "On The Way", completed: false, active: false },
        { status: "delivered", label: "Delivered", completed: false, active: false },
      ],
      createdAt: new Date().toISOString(),
    };

    set((s) => ({
      orders: [order, ...s.orders],
      activeOrder: order,
      cartItems: [],
      cartRestaurantId: null,
    }));

    return order;
  },

  // Address
  addresses: mockAddresses,
  selectedAddress: mockAddresses[0]!,

  // Search
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchResults: () => {
    const query = get().searchQuery.toLowerCase();
    if (!query) return get().restaurants;
    return get().restaurants.filter(
      (r) => r.name.toLowerCase().includes(query) || r.cuisine.some((c) => c.toLowerCase().includes(query)),
    );
  },
}));
