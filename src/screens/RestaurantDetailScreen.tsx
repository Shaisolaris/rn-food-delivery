import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { MenuItemCard } from "../components/restaurant/MenuItemCard.js";
import { formatCurrency } from "../utils/index.js";

export function RestaurantDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { id } = route.params as { id: string };
  const restaurant = useAppStore((s) => s.getRestaurant(id));
  const addToCart = useAppStore((s) => s.addToCart);
  const cartCount = useAppStore((s) => s.cartItemCount);
  const cartTotal = useAppStore((s) => s.cartTotal);

  if (!restaurant) return <View style={styles.container}><Text style={styles.notFound}>Restaurant not found</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{restaurant.cuisine[0] === "Japanese" ? "🍣" : restaurant.cuisine[0] === "Italian" ? "🍕" : restaurant.cuisine[0] === "Mexican" ? "🌮" : "🍽️"}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine.join(" · ")}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>⭐ {restaurant.rating} ({restaurant.reviewCount})</Text>
            <Text style={styles.meta}>🕐 {restaurant.deliveryTime}</Text>
            <Text style={styles.meta}>💰 {restaurant.deliveryFee === 0 ? "Free" : `$${restaurant.deliveryFee}`} delivery</Text>
          </View>
        </View>

        {restaurant.menu.map((category) => (
          <View key={category.id} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            {category.items.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={() => addToCart(restaurant.id, item)} />
            ))}
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Cart Footer */}
      {cartCount() > 0 && (
        <TouchableOpacity style={styles.cartFooter} onPress={() => navigation.navigate("Cart")}>
          <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount()}</Text></View>
          <Text style={styles.cartFooterText}>View Cart</Text>
          <Text style={styles.cartFooterPrice}>{formatCurrency(cartTotal().total)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  notFound: { textAlign: "center", marginTop: 100, color: colors.textMuted },
  hero: { height: 200, backgroundColor: colors.surface, justifyContent: "center", alignItems: "center" },
  heroEmoji: { fontSize: 64 },
  info: { padding: spacing.md },
  name: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text },
  cuisine: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.xs },
  metaRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.sm },
  meta: { fontSize: fontSize.sm, color: colors.textSecondary },
  category: { marginTop: spacing.lg },
  categoryTitle: { fontSize: fontSize.xl, fontWeight: "600", color: colors.text, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  cartFooter: { position: "absolute", bottom: spacing.lg, left: spacing.md, right: spacing.md, backgroundColor: colors.primary, borderRadius: borderRadius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cartBadge: { backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  cartBadgeText: { color: "#fff", fontWeight: "700", fontSize: fontSize.sm },
  cartFooterText: { color: "#fff", fontSize: fontSize.lg, fontWeight: "600" },
  cartFooterPrice: { color: "#fff", fontSize: fontSize.lg, fontWeight: "700" },
});
