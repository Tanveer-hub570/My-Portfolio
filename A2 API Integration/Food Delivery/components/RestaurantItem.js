import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RestaurantItem = ({ restaurant }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{restaurant.name}</Text>
    <Text>{restaurant.cuisine}</Text>
    <Text>⭐ {restaurant.rating}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#f9f9f9", marginBottom: 10, borderRadius: 5 },
  name: { fontSize: 18, fontWeight: "bold" },
});

export default RestaurantItem;
