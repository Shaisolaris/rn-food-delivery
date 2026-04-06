# rn-food-delivery

![CI](https://github.com/Shaisolaris/rn-food-delivery/actions/workflows/ci.yml/badge.svg)


## Quick Start

```bash
git clone https://github.com/Shaisolaris/rn-food-delivery.git
cd rn-food-delivery
npm install --legacy-peer-deps
npx expo start
```

React Native food delivery app built with Expo featuring restaurant browsing with menu categories, cart management with quantity controls, real-time order tracking with step-by-step progress, search with cuisine filtering, and a complete checkout flow. Uses Zustand for state management and TypeScript throughout.

## Stack

- **Framework:** React Native 0.74 with Expo SDK 51
- **Language:** TypeScript 5 strict mode
- **Navigation:** React Navigation 6 (native stack + bottom tabs)
- **State:** Zustand (restaurants, cart, orders, search)
- **Maps:** react-native-maps (ready for integration)
- **Styling:** StyleSheet API with centralized theme

## Features

### Restaurant Browsing
- Featured restaurants in horizontal carousel
- Full restaurant list with compact card view
- Category chips for quick filtering (Pizza, Burgers, Sushi, Tacos, Healthy)
- Delivery address selector
- Rating, delivery time, delivery fee, and distance display

### Restaurant Detail
- Full menu organized by categories (Popular, Appetizers, Bowls, etc.)
- Menu items with descriptions, prices, calorie counts
- Dietary badges (vegetarian, spicy, popular)
- One-tap add to cart with floating cart footer
- Live cart count and total in footer

### Cart Management
- Item quantity controls (increase, decrease, remove)
- Per-item price calculation
- Order summary (subtotal, delivery, tax, tip)
- Clear cart action
- Empty state with browse prompt
- Restaurant-locked cart (clears on switching restaurants)

### Order Tracking
- Step-by-step order progress tracker
- 6 status stages: placed → confirmed → preparing → picked up → on the way → delivered
- Driver information card with name and phone
- Estimated delivery time
- Completed/active/pending step indicators

### Search
- Real-time text search across restaurant names and cuisines
- Auto-focus on screen open
- No-results state with query display

## Architecture

```
src/
├── App.tsx                           # Root with SafeAreaProvider
├── navigation/
│   └── AppNavigator.tsx              # Stack (detail, cart, tracking) + Tab (home, browse, orders, account)
├── screens/
│   ├── HomeScreen.tsx                # Address, search bar, categories, featured + all restaurants
│   ├── RestaurantDetailScreen.tsx    # Hero, info, menu categories, floating cart footer
│   ├── CartScreen.tsx                # Item list, quantity controls, summary, place order
│   ├── OrderTrackingScreen.tsx       # Progress tracker, driver info, ETA
│   ├── OrdersScreen.tsx              # Order history with status badges
│   ├── SearchScreen.tsx              # Search input + filtered results
│   └── AccountScreen.tsx             # Profile, settings menu
├── components/
│   ├── restaurant/
│   │   ├── RestaurantCard.tsx        # Card with cuisine emoji, rating, delivery info (full + compact)
│   │   └── MenuItemCard.tsx          # Item with badges, calories, add button
│   ├── cart/
│   │   └── CartItemRow.tsx           # Quantity controls, price, remove
│   └── order/
│       └── OrderTracker.tsx          # Vertical step tracker with dots, lines, check marks
├── store/
│   └── index.ts                      # Zustand: restaurants, cart (add/remove/update/clear), orders, search
├── services/
│   └── mockData.ts                   # 5 restaurants with full menus, orders, addresses
├── theme/
│   └── index.ts                      # Warm palette (orange primary), spacing, fonts, radii
├── types/
│   └── index.ts                      # Restaurant, MenuItem, CartItem, Order, TrackingStep, Address
└── utils/
    └── index.ts                      # formatCurrency, formatDistance, calculateCartTotal
```

## Data Model

- **5 restaurants** with 2-3 menu categories each, 2-5 items per category
- **Cuisines:** Japanese, Italian, Mexican, Healthy, American
- **Menu items** with real descriptions, prices ($3.99-$22.99), calorie counts
- **Cart** with restaurant locking, quantity management, price calculation
- **Orders** with 6-step tracking, driver info, itemized totals

## Setup

```bash
git clone https://github.com/Shaisolaris/rn-food-delivery.git
cd rn-food-delivery
npm install
npx expo start
```

## Key Design Decisions

**Restaurant-locked cart.** Adding items from a different restaurant clears the current cart. This prevents mixed-restaurant orders which real delivery services don't support. The user experience matches UberEats/DoorDash behavior.

**Zustand selectors for performance.** Each screen subscribes to only the store slices it needs via selector functions. The cart screen doesn't re-render when restaurant data changes. The home screen doesn't re-render when cart quantities change.

**Vertical order tracker.** The tracking component uses a vertical layout with connected dots and lines rather than a horizontal stepper. This scales better on mobile and accommodates 6 status steps without horizontal scrolling.

**Emoji-based icons.** Rather than bundling an icon library, the app uses emoji for restaurant types, menu badges, and navigation tabs. This keeps the bundle small and works identically across iOS and Android.

**Centralized cart math.** Tax calculation, delivery fee inclusion, and total computation happen in the store via `cartTotal()`. Components never calculate prices — they call the store function and display the result. This prevents calculation drift between cart and checkout.

## License

MIT
