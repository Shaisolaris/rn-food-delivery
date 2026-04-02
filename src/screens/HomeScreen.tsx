import React from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { RestaurantCard } from "../components/restaurant/RestaurantCard.js";

export function HomeScreen({ navigation }: { navigation: any }) {
  const restaurants = useAppStore((s) => s.restaurants);
  const featured = useAppStore((s) => s.featuredRestaurants);
  const address = useAppStore((s) => s.selectedAddress);
  const cartCount = useAppStore((s) => s.cartItemCount);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.deliverTo}>Deliver to</Text>
          <TouchableOpacity style={styles.addressRow}>
            <Text style={styles.address}>📍 {address.label} — {address.street}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount() > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount()}</Text></View>}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate("Search")}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search restaurants or cuisines...</Text>
      </TouchableOpacity>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {["🍕 Pizza", "🍔 Burgers", "🍣 Sushi", "🌮 Tacos", "🥗 Healthy", "🍜 Noodles"].map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featured.map((r) => (
            <View key={r.id} style={styles.featuredCard}>
              <RestaurantCard restaurant={r} onPress={() => navigation.navigate("RestaurantDetail", { id: r.id })} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* All Restaurants */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Restaurants</Text>
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} compact onPress={() => navigation.navigate("RestaurantDetail", { id: r.id })} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.md, paddingTop: spacing.lg, paddingBottom: spacing.md },
  deliverTo: { fontSize: fontSize.sm, color: colors.textMuted },
  addressRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  address: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
  cartBtn: { position: "relative", padding: spacing.sm },
  cartIcon: { fontSize: 24 },
  cartBadge: { position: "absolute", top: 0, right: 0, backgroundColor: colors.primary, borderRadius: 10, width: 20, height: 20, justifyContent: "center", alignItems: "center" },
  cartBadgeText: { color: "#fff", fontSize: fontSize.xs, fontWeight: "700" },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, marginHorizontal: spacing.md, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  searchIcon: { marginRight: spacing.sm },
  searchPlaceholder: { fontSize: fontSize.md, color: colors.textMuted },
  categories: { paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  categoryChip: { backgroundColor: colors.surface, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, marginRight: spacing.sm, borderWidth: 1, borderColor: colors.border },
  categoryText: { fontSize: fontSize.md },
  section: { marginTop: spacing.md, paddingHorizontal: spacing.md },
  sectionTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.text, marginBottom: spacing.md },
  featuredCard: { width: 280, marginRight: spacing.md },
});
