import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const OrderItem = ({ order, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(order)}>
    <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
    <Text>Date: {order.date}</Text>
    <Text>Total: ${order.totalPrice.toFixed(2)}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#e3e3e3", marginBottom: 10, borderRadius: 5 },
  orderId: { fontSize: 16, fontWeight: "bold" },
});

export default OrderItem;
