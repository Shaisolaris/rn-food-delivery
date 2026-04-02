import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { formatCurrency } from "../../utils/index.js";
import type { CartItem } from "../../types/index.js";

interface Props { item: CartItem; onIncrease: () => void; onDecrease: () => void; onRemove: () => void; }

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.menuItem.name}</Text>
        <Text style={styles.price}>{formatCurrency(item.totalPrice)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.btn} onPress={item.quantity === 1 ? onRemove : onDecrease}>
          <Text style={styles.btnText}>{item.quantity === 1 ? "🗑" : "−"}</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity style={[styles.btn, styles.btnAdd]} onPress={onIncrease}>
          <Text style={[styles.btnText, { color: "#fff" }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  info: { flex: 1 },
  name: { fontSize: fontSize.md, fontWeight: "500", color: colors.text },
  price: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  controls: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  btn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: colors.border },
  btnAdd: { backgroundColor: colors.primary, borderColor: colors.primary },
  btnText: { fontSize: 16, fontWeight: "600", color: colors.text },
  qty: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text, minWidth: 24, textAlign: "center" },
});
