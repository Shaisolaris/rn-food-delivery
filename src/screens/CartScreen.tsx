import { } from "../data/demo";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { CartItemRow } from "../components/cart/CartItemRow.js";
import { formatCurrency } from "../utils/index.js";

export function CartScreen({ navigation }: { navigation: any }) {
  const cartItems = useAppStore((s) => s.cartItems);
  const updateQuantity = useAppStore((s) => s.updateQuantity);
  const removeFromCart = useAppStore((s) => s.removeFromCart);
  const clearCart = useAppStore((s) => s.clearCart);
  const cartTotal = useAppStore((s) => s.cartTotal);
  const placeOrder = useAppStore((s) => s.placeOrder);
  const getRestaurant = useAppStore((s) => s.getRestaurant);
  const cartRestaurantId = useAppStore((s) => s.cartRestaurantId);

  const restaurant = cartRestaurantId ? getRestaurant(cartRestaurantId) : undefined;
  const totals = cartTotal();

  if (cartItems.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Add items from a restaurant to get started</Text>
        <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.browseBtnText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleOrder = () => {
    const order = placeOrder(5.00);
    navigation.navigate("OrderTracking", { id: order.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {restaurant && <Text style={styles.restaurantName}>{restaurant.name}</Text>}
        <View style={styles.items}>
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </View>

        <TouchableOpacity onPress={clearCart}><Text style={styles.clearText}>Clear cart</Text></TouchableOpacity>

        <View style={styles.summary}>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>{formatCurrency(totals.subtotal)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery</Text><Text style={styles.summaryValue}>{formatCurrency(totals.deliveryFee)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Tax</Text><Text style={styles.summaryValue}>{formatCurrency(totals.tax)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Tip</Text><Text style={styles.summaryValue}>{formatCurrency(5.00)}</Text></View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(totals.total + 5)}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.orderBtn} onPress={handleOrder}>
        <Text style={styles.orderBtnText}>Place Order — {formatCurrency(totals.total + 5)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.md },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background, padding: spacing.xl },
  emptyIcon: { fontSize: 64, marginBottom: spacing.md },
  emptyTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.text },
  emptyText: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.xs },
  browseBtn: { marginTop: spacing.lg, backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.md },
  browseBtnText: { color: "#fff", fontSize: fontSize.lg, fontWeight: "600" },
  restaurantName: { fontSize: fontSize.xl, fontWeight: "700", color: colors.text, marginTop: spacing.md, marginBottom: spacing.sm },
  items: { marginBottom: spacing.md },
  clearText: { color: colors.danger, fontSize: fontSize.sm, textAlign: "right", marginBottom: spacing.md },
  summary: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.lg },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: spacing.xs },
  summaryLabel: { fontSize: fontSize.md, color: colors.textSecondary },
  summaryValue: { fontSize: fontSize.md, color: colors.text },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: spacing.sm, paddingTop: spacing.sm },
  totalLabel: { fontSize: fontSize.lg, fontWeight: "700", color: colors.text },
  totalValue: { fontSize: fontSize.lg, fontWeight: "700", color: colors.text },
  orderBtn: { backgroundColor: colors.primary, borderRadius: borderRadius.md, paddingVertical: spacing.md, alignItems: "center", marginBottom: spacing.xl },
  orderBtnText: { color: "#fff", fontSize: fontSize.lg, fontWeight: "700" },
});
