import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const OrderHistoryScreen = ({ route }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { userId } = route.params; // Assuming we get userId from navigation
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user's order history based on userId
    // Replace with an actual API call or local data
    const fetchOrderHistory = () => {
      // Simulated order history data
      const data = [
        { id: "1", date: "2025-04-15", totalPrice: 34.99, restaurantName: "Pizza Place" },
        { id: "2", date: "2025-04-12", totalPrice: 59.99, restaurantName: "Burger Joint" },
      ];
      setOrderHistory(data);
    };

    fetchOrderHistory();
  }, [userId]);

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Restaurant: {item.restaurantName}</Text>
      <Text style={styles.orderText}>Date: {item.date}</Text>
      <Text style={styles.orderText}>Total Price: ${item.totalPrice.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.viewOrderButton}
        onPress={() =>
          navigation.navigate("OrderDetails", {
            order: { orderId: item.id, date: item.date, totalPrice: item.totalPrice },
          })
        }
      >
        <Text style={styles.buttonText}>View Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  viewOrderButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderHistoryScreen;
