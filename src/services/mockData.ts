import type { Restaurant, Order, Address, TrackingStep } from "../types/index.js";

export const mockAddresses: Address[] = [
  { id: "a1", label: "Home", street: "123 Main St", city: "San Francisco", state: "CA", zip: "94102", latitude: 37.7749, longitude: -122.4194, isDefault: true },
  { id: "a2", label: "Office", street: "456 Market St", city: "San Francisco", state: "CA", zip: "94105", latitude: 37.7900, longitude: -122.3990, isDefault: false },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: "r1", name: "Sakura Sushi", image: "sushi", cuisine: ["Japanese", "Sushi"],
    rating: 4.8, reviewCount: 342, deliveryTime: "25-35 min", deliveryFee: 2.99, minOrder: 15,
    distance: 1.2, isOpen: true, featured: true, address: "100 Sutter St",
    latitude: 37.7900, longitude: -122.4040,
    menu: [
      { id: "mc1", name: "Popular", items: [
        { id: "m1", name: "Dragon Roll", description: "Shrimp tempura, avocado, eel sauce, tobiko", price: 16.99, calories: 420, popular: true },
        { id: "m2", name: "Salmon Sashimi", description: "8 pieces of fresh Atlantic salmon", price: 14.99, calories: 280, popular: true },
        { id: "m3", name: "Spicy Tuna Roll", description: "Fresh tuna, spicy mayo, cucumber, sesame", price: 12.99, calories: 350, spicy: true },
      ]},
      { id: "mc2", name: "Appetizers", items: [
        { id: "m4", name: "Edamame", description: "Steamed soybeans with sea salt", price: 5.99, calories: 120, vegetarian: true },
        { id: "m5", name: "Gyoza (6pc)", description: "Pan-fried pork dumplings", price: 8.99, calories: 310 },
        { id: "m6", name: "Miso Soup", description: "Traditional miso with tofu and seaweed", price: 3.99, calories: 80, vegetarian: true },
      ]},
      { id: "mc3", name: "Bowls", items: [
        { id: "m7", name: "Chirashi Bowl", description: "Assorted sashimi over seasoned rice", price: 22.99, calories: 520 },
        { id: "m8", name: "Teriyaki Chicken Bowl", description: "Grilled chicken, teriyaki sauce, rice, vegetables", price: 15.99, calories: 650 },
      ]},
    ],
  },
  {
    id: "r2", name: "Bella Napoli", image: "pizza", cuisine: ["Italian", "Pizza"],
    rating: 4.6, reviewCount: 528, deliveryTime: "30-40 min", deliveryFee: 3.49, minOrder: 12,
    distance: 0.8, isOpen: true, featured: true, address: "200 Columbus Ave",
    latitude: 37.7980, longitude: -122.4070,
    menu: [
      { id: "mc4", name: "Pizzas", items: [
        { id: "m9", name: "Margherita", description: "San Marzano tomatoes, fresh mozzarella, basil", price: 14.99, calories: 800, vegetarian: true, popular: true },
        { id: "m10", name: "Pepperoni", description: "Classic pepperoni with mozzarella", price: 16.99, calories: 950, popular: true },
        { id: "m11", name: "Diavola", description: "Spicy salami, chili flakes, mozzarella", price: 17.99, calories: 900, spicy: true },
      ]},
      { id: "mc5", name: "Pasta", items: [
        { id: "m12", name: "Carbonara", description: "Guanciale, egg yolk, pecorino, black pepper", price: 15.99, calories: 720 },
        { id: "m13", name: "Penne Arrabbiata", description: "Spicy tomato sauce, garlic, chili", price: 13.99, calories: 580, spicy: true, vegetarian: true },
      ]},
    ],
  },
  {
    id: "r3", name: "Taco Loco", image: "tacos", cuisine: ["Mexican", "Tacos"],
    rating: 4.5, reviewCount: 215, deliveryTime: "20-30 min", deliveryFee: 1.99, minOrder: 10,
    distance: 1.8, isOpen: true, featured: false, address: "300 Valencia St",
    latitude: 37.7650, longitude: -122.4220,
    menu: [
      { id: "mc6", name: "Tacos", items: [
        { id: "m14", name: "Carne Asada Tacos (3)", description: "Grilled steak, onions, cilantro, salsa verde", price: 11.99, calories: 480, popular: true },
        { id: "m15", name: "Al Pastor Tacos (3)", description: "Marinated pork, pineapple, onions", price: 10.99, calories: 450 },
        { id: "m16", name: "Fish Tacos (3)", description: "Beer-battered fish, cabbage slaw, chipotle crema", price: 12.99, calories: 520 },
      ]},
      { id: "mc7", name: "Burritos", items: [
        { id: "m17", name: "Super Burrito", description: "Choice of meat, rice, beans, cheese, sour cream, guac", price: 13.99, calories: 980 },
        { id: "m18", name: "Veggie Burrito", description: "Grilled veggies, rice, beans, cheese, pico de gallo", price: 11.99, calories: 750, vegetarian: true },
      ]},
    ],
  },
  {
    id: "r4", name: "Green Bowl", image: "salad", cuisine: ["Healthy", "Salads", "Bowls"],
    rating: 4.7, reviewCount: 189, deliveryTime: "15-25 min", deliveryFee: 2.49, minOrder: 12,
    distance: 0.5, isOpen: true, featured: true, address: "400 Hayes St",
    latitude: 37.7760, longitude: -122.4230,
    menu: [
      { id: "mc8", name: "Bowls", items: [
        { id: "m19", name: "Acai Bowl", description: "Acai blend, granola, banana, berries, honey", price: 12.99, calories: 380, vegetarian: true, popular: true },
        { id: "m20", name: "Poke Bowl", description: "Ahi tuna, edamame, avocado, sushi rice, ponzu", price: 15.99, calories: 450, popular: true },
        { id: "m21", name: "Quinoa Power Bowl", description: "Quinoa, roasted veggies, tahini, chickpeas", price: 13.99, calories: 520, vegetarian: true },
      ]},
      { id: "mc9", name: "Smoothies", items: [
        { id: "m22", name: "Green Detox", description: "Spinach, kale, banana, ginger, apple", price: 8.99, calories: 180, vegetarian: true },
        { id: "m23", name: "Protein Power", description: "Banana, peanut butter, protein, oat milk", price: 9.99, calories: 340, vegetarian: true },
      ]},
    ],
  },
  {
    id: "r5", name: "Burger Joint", image: "burger", cuisine: ["American", "Burgers"],
    rating: 4.3, reviewCount: 412, deliveryTime: "25-35 min", deliveryFee: 2.99, minOrder: 10,
    distance: 2.1, isOpen: true, featured: false, address: "500 Haight St",
    latitude: 37.7700, longitude: -122.4300,
    menu: [
      { id: "mc10", name: "Burgers", items: [
        { id: "m24", name: "Classic Smash Burger", description: "Double patty, American cheese, pickles, secret sauce", price: 12.99, calories: 850, popular: true },
        { id: "m25", name: "BBQ Bacon Burger", description: "Bacon, cheddar, BBQ sauce, onion rings", price: 14.99, calories: 1050 },
        { id: "m26", name: "Veggie Burger", description: "Beyond patty, lettuce, tomato, vegan mayo", price: 13.99, calories: 620, vegetarian: true },
      ]},
      { id: "mc11", name: "Sides", items: [
        { id: "m27", name: "Truffle Fries", description: "Crispy fries, parmesan, truffle oil", price: 7.99, calories: 480, vegetarian: true },
        { id: "m28", name: "Onion Rings", description: "Beer-battered onion rings, ranch dip", price: 6.99, calories: 420, vegetarian: true },
      ]},
    ],
  },
];

function createTrackingSteps(currentStatus: string): TrackingStep[] {
  const statuses: { status: string; label: string }[] = [
    { status: "placed", label: "Order Placed" },
    { status: "confirmed", label: "Restaurant Confirmed" },
    { status: "preparing", label: "Preparing Your Food" },
    { status: "picked_up", label: "Driver Picked Up" },
    { status: "on_the_way", label: "On The Way" },
    { status: "delivered", label: "Delivered" },
  ];

  let reachedCurrent = false;
  return statuses.map((s) => {
    const completed = !reachedCurrent;
    const active = s.status === currentStatus;
    if (active) reachedCurrent = true;
    return {
      ...s,
      status: s.status as TrackingStep["status"],
      completed: completed && !active,
      active,
      time: completed || active ? new Date().toISOString() : undefined,
    };
  });
}

export const mockOrders: Order[] = [
  {
    id: "ord-001", restaurantId: "r1", restaurantName: "Sakura Sushi",
    items: [], subtotal: 44.97, deliveryFee: 2.99, tax: 3.93, tip: 5.00, total: 56.89,
    status: "on_the_way", estimatedDelivery: "12:45 PM",
    driverName: "Marcus T.", driverPhone: "+1 (555) 987-6543",
    trackingSteps: createTrackingSteps("on_the_way"), createdAt: new Date().toISOString(),
  },
  {
    id: "ord-002", restaurantId: "r2", restaurantName: "Bella Napoli",
    items: [], subtotal: 31.98, deliveryFee: 3.49, tax: 2.80, tip: 4.00, total: 42.27,
    status: "delivered", estimatedDelivery: "Yesterday",
    trackingSteps: createTrackingSteps("delivered"), createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
