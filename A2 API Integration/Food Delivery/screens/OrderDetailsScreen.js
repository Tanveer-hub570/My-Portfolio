import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderDetailsScreen = ({ route }) => {
  const { order } = route.params; // Destructure the order object passed from HomeScreen
  const navigation = useNavigation();

  // Use the passed imageUrl from the order
  const imageUrl = order.imageUrl || "https://placeimg.com/400/300/food"; // Fallback to placeholder if no image

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Order Details</Text>

        {/* Display the image of the restaurant or food from Yelp API */}
        <Image source={{ uri: imageUrl }} style={styles.orderImage} />

        <Text style={styles.orderText}>
          Order ID: <Text style={styles.bold}>{order.orderId}</Text>
        </Text>
        <Text style={styles.orderText}>
          Date: <Text style={styles.bold}>{order.date}</Text>
        </Text>
        <Text style={styles.orderText}>
          Total Price: <Text style={styles.bold}>${order.totalPrice.toFixed(2)}</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  orderText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  orderImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
    resizeMode: "cover", // This makes the image cover the container proportionally
  },
  button: {
    backgroundColor: "#ff6347", // Tomato color for button
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderDetailsScreen;
