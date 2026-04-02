import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";

export function AccountScreen() {
  const menuItems = [
    { icon: "👤", label: "Edit Profile" }, { icon: "📍", label: "Saved Addresses" },
    { icon: "💳", label: "Payment Methods" }, { icon: "🎁", label: "Promotions" },
    { icon: "⚙️", label: "Settings" }, { icon: "❓", label: "Help & Support" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={styles.avatarText}>JD</Text></View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john@example.com</Text>
      </View>
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.logoutBtn}><Text style={styles.logoutText}>Sign Out</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: "center", paddingVertical: spacing.xl },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: fontSize.xxl, fontWeight: "700", color: "#fff" },
  name: { fontSize: fontSize.xl, fontWeight: "700", color: colors.text, marginTop: spacing.md },
  email: { fontSize: fontSize.md, color: colors.textSecondary },
  menu: { marginHorizontal: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md },
  menuItem: { flexDirection: "row", alignItems: "center", padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: { fontSize: 18, marginRight: spacing.md },
  menuLabel: { flex: 1, fontSize: fontSize.md, color: colors.text },
  chevron: { fontSize: fontSize.xl, color: colors.textMuted },
  logoutBtn: { margin: spacing.md, padding: spacing.md, backgroundColor: colors.danger + "10", borderRadius: borderRadius.md, alignItems: "center" },
  logoutText: { color: colors.danger, fontSize: fontSize.md, fontWeight: "600" },
});
