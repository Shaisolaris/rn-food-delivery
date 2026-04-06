import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { formatCurrency } from "../utils/index.js";

export function OrdersScreen({ navigation }: { navigation: any }) {
  const orders = useAppStore((s) => s.orders);

  const statusColors: Record<string, string> = { placed: colors.warning, confirmed: colors.secondary, preparing: colors.primary, picked_up: colors.primary, on_the_way: colors.success, delivered: colors.textMuted, cancelled: colors.danger };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {orders.map((order) => (
        <TouchableOpacity key={order.id} style={styles.card} onPress={() => navigation.navigate("OrderTracking", { id: order.id })}>
          <View style={styles.cardHeader}>
            <Text style={styles.restaurantName}>{order.restaurantName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: (statusColors[order.status] || colors.textMuted) + "20" }]}>
              <Text style={[styles.statusText, { color: statusColors[order.status] }]}>{order.status.replace("_", " ")}</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.total}>{formatCurrency(order.total)}</Text>
            <Text style={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {orders.length === 0 && <Text style={styles.empty}>No orders yet</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md },
  title: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text, marginBottom: spacing.lg },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  restaurantName: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  statusText: { fontSize: fontSize.xs, fontWeight: "600", textTransform: "capitalize" },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm },
  total: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
  date: { fontSize: fontSize.sm, color: colors.textMuted },
  empty: { textAlign: "center", color: colors.textMuted, marginTop: spacing.xxl },
});
