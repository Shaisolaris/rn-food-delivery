import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import type { Restaurant } from "../../types/index.js";

interface Props { restaurant: Restaurant; onPress: () => void; compact?: boolean; }

export function RestaurantCard({ restaurant, onPress, compact }: Props) {
  return (
    <TouchableOpacity style={[styles.container, compact && styles.compact]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.imagePlaceholder, compact && styles.imageCompact]}>
        <Text style={styles.imageEmoji}>{restaurant.cuisine[0] === "Japanese" ? "🍣" : restaurant.cuisine[0] === "Italian" ? "🍕" : restaurant.cuisine[0] === "Mexican" ? "🌮" : restaurant.cuisine[0] === "Healthy" ? "🥗" : "🍔"}</Text>
        {restaurant.featured && <View style={styles.featuredBadge}><Text style={styles.featuredText}>Featured</Text></View>}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
        <View style={styles.meta}>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.detail}>{restaurant.deliveryTime}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.detail}>{restaurant.deliveryFee === 0 ? "Free delivery" : `$${restaurant.deliveryFee} delivery`}</Text>
        </View>
        <Text style={styles.cuisine} numberOfLines={1}>{restaurant.cuisine.join(" · ")}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.card, borderRadius: borderRadius.lg, overflow: "hidden", marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  compact: { flexDirection: "row", height: 100 },
  imagePlaceholder: { height: 160, backgroundColor: colors.surface, justifyContent: "center", alignItems: "center" },
  imageCompact: { width: 100, height: "100%" },
  imageEmoji: { fontSize: 48 },
  featuredBadge: { position: "absolute", top: spacing.sm, left: spacing.sm, backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  featuredText: { color: "#fff", fontSize: fontSize.xs, fontWeight: "700" },
  info: { padding: spacing.md },
  name: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
  meta: { flexDirection: "row", alignItems: "center", marginTop: spacing.xs },
  rating: { fontSize: fontSize.sm, fontWeight: "600", color: colors.text },
  dot: { marginHorizontal: spacing.xs, color: colors.textMuted },
  detail: { fontSize: fontSize.sm, color: colors.textSecondary },
  cuisine: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: spacing.xs },
});
