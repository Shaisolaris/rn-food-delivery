import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { formatCurrency } from "../../utils/index.js";
import type { MenuItem } from "../../types/index.js";

interface Props { item: MenuItem; onAdd: () => void; }

export function MenuItemCard({ item, onAdd }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badges}>
          {item.popular && <Text style={styles.badge}>🔥 Popular</Text>}
          {item.vegetarian && <Text style={styles.badge}>🌱 Veg</Text>}
          {item.spicy && <Text style={styles.badge}>🌶️ Spicy</Text>}
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatCurrency(item.price)}</Text>
          {item.calories && <Text style={styles.calories}>{item.calories} cal</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", paddingVertical: spacing.md, paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  content: { flex: 1, marginRight: spacing.md },
  badges: { flexDirection: "row", gap: spacing.xs, marginBottom: spacing.xs },
  badge: { fontSize: fontSize.xs, color: colors.textSecondary },
  name: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
  description: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 20 },
  footer: { flexDirection: "row", alignItems: "center", marginTop: spacing.sm, gap: spacing.md },
  price: { fontSize: fontSize.lg, fontWeight: "700", color: colors.text },
  calories: { fontSize: fontSize.sm, color: colors.textMuted },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", alignSelf: "center" },
  addText: { color: "#fff", fontSize: 20, fontWeight: "600", lineHeight: 22 },
});
