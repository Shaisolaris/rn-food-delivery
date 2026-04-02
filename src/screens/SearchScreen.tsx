import React from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { RestaurantCard } from "../components/restaurant/RestaurantCard.js";

export function SearchScreen({ navigation }: { navigation: any }) {
  const searchQuery = useAppStore((s) => s.searchQuery);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const searchResults = useAppStore((s) => s.searchResults);

  const results = searchResults();

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput style={styles.input} placeholder="Search restaurants or cuisines..." placeholderTextColor={colors.textMuted} value={searchQuery} onChangeText={setSearchQuery} autoFocus />
      </View>
      <ScrollView style={styles.results}>
        {results.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} compact onPress={() => navigation.navigate("RestaurantDetail", { id: r.id })} />
        ))}
        {searchQuery && results.length === 0 && <Text style={styles.noResults}>No restaurants found for "{searchQuery}"</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, margin: spacing.md, borderRadius: borderRadius.md, paddingHorizontal: spacing.md },
  icon: { marginRight: spacing.sm },
  input: { flex: 1, paddingVertical: spacing.md, fontSize: fontSize.md, color: colors.text },
  results: { paddingHorizontal: spacing.md },
  noResults: { textAlign: "center", color: colors.textMuted, marginTop: spacing.xl },
});
