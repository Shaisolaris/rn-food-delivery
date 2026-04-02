export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  distance: number;
  isOpen: boolean;
  featured: boolean;
  address: string;
  latitude: number;
  longitude: number;
  menu: MenuCategory[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  calories?: number;
  popular?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  customizations?: Customization[];
}

export interface Customization {
  id: string;
  name: string;
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string>;
  totalPrice: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  total: number;
  status: OrderStatus;
  estimatedDelivery: string;
  driverName?: string;
  driverPhone?: string;
  trackingSteps: TrackingStep[];
  createdAt: string;
}

export type OrderStatus = "placed" | "confirmed" | "preparing" | "picked_up" | "on_the_way" | "delivered" | "cancelled";

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  time?: string;
  completed: boolean;
  active: boolean;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  RestaurantDetail: { id: string };
  Cart: undefined;
  Checkout: undefined;
  OrderTracking: { id: string };
  Search: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Browse: undefined;
  Orders: undefined;
  Account: undefined;
};
