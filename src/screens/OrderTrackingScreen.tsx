import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { OrderTracker } from "../components/order/OrderTracker.js";

export function OrderTrackingScreen({ route }: { route: any }) {
  const { id } = route.params as { id: string };
  const order = useAppStore((s) => s.orders.find((o) => o.id === id));

  if (!order) return <View style={styles.container}><Text style={{ textAlign: "center", marginTop: 100, color: colors.textMuted }}>Order not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order #{order.id.slice(-6)}</Text>
        <Text style={styles.restaurant}>{order.restaurantName}</Text>
        <Text style={styles.eta}>Estimated delivery: {order.estimatedDelivery}</Text>
      </View>

      {order.driverName && (
        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}><Text style={styles.driverEmoji}>🚗</Text></View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{order.driverName}</Text>
            <Text style={styles.driverPhone}>{order.driverPhone}</Text>
          </View>
        </View>
      )}

      <View style={styles.trackerSection}>
        <OrderTracker steps={order.trackingSteps} />
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Order Total</Text>
        <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text },
  restaurant: { fontSize: fontSize.lg, color: colors.textSecondary, marginTop: spacing.xs },
  eta: { fontSize: fontSize.md, color: colors.primary, fontWeight: "600", marginTop: spacing.sm },
  driverCard: { flexDirection: "row", alignItems: "center", margin: spacing.md, padding: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md },
  driverAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary + "20", justifyContent: "center", alignItems: "center" },
  driverEmoji: { fontSize: 24 },
  driverInfo: { marginLeft: spacing.md },
  driverName: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
  driverPhone: { fontSize: fontSize.sm, color: colors.textSecondary },
  trackerSection: { paddingHorizontal: spacing.lg },
  totalCard: { flexDirection: "row", justifyContent: "space-between", margin: spacing.md, padding: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md },
  totalLabel: { fontSize: fontSize.lg, color: colors.textSecondary },
  totalValue: { fontSize: fontSize.xl, fontWeight: "700", color: colors.text },
});
