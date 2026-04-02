import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen.js";
import { RestaurantDetailScreen } from "../screens/RestaurantDetailScreen.js";
import { CartScreen } from "../screens/CartScreen.js";
import { OrderTrackingScreen } from "../screens/OrderTrackingScreen.js";
import { OrdersScreen } from "../screens/OrdersScreen.js";
import { SearchScreen } from "../screens/SearchScreen.js";
import { AccountScreen } from "../screens/AccountScreen.js";
import { colors, fontSize } from "../theme/index.js";
import type { RootStackParamList, MainTabParamList } from "../types/index.js";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<string, string> = { Home: "🏠", Browse: "🔍", Orders: "📋", Account: "👤" };

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarIcon: ({ focused }) => <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{tabIcons[route.name]}</Text>,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Browse" component={SearchScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ headerShown: true, headerTitle: "", headerBackTitle: "Back", headerTintColor: colors.primary }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, headerTitle: "Cart", headerTintColor: colors.primary }} />
        <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ headerShown: true, headerTitle: "Track Order", headerTintColor: colors.primary }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true, headerTitle: "Search", headerTintColor: colors.primary }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: 1, height: 85, paddingBottom: 25 },
});
