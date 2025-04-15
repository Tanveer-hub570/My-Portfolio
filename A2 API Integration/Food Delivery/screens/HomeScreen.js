import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Using the provided Yelp API Key
  const API_KEY = "ZI2MqBwloaAuEcdyPUOytgH8-PiIO9PdSZm0JtDDlrKqXkqt-pU-1yJMu1OgL_XsY8UuPgPNEEvDKVn9dC6Oi1kyQrWX2R19CFVyrgywvz_8RbvR9llBUT9wFs3-Z3Yx";
  const API_URL = "https://api.yelp.com/v3/businesses/search?term=restaurants&location=New+York&limit=10"; // Example for New York

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`, // Yelp API requires an Authorization header with Bearer token
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Ensure that 'businesses' is an array before setting the state
        if (Array.isArray(data.businesses)) {
          setRestaurants(data.businesses);
        } else {
          setError("No restaurants found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants} // Make sure data is an array
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            {/* Food image from Yelp API */}
            <Image
              source={{ uri: item.image_url || "https://placeimg.com/300/200/food" }} // Fallback to placeholder image if none available
              style={styles.foodImage}
            />
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text style={styles.restaurantDetails}>{item.categories.map((cat) => cat.title).join(", ")}</Text>
            <Text style={styles.restaurantDetails}>{item.location.address1}</Text>

            {/* Buttons */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("OrderDetails", {
                    order: {
                      orderId: item.id,
                      date: "2025-04-16",
                      totalPrice: 49.99,
                    },
                  })
                }
              >
                <Text style={styles.buttonText}>Order Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("OrderHistory", {
                    userId: item.id,
                  })
                }
              >
                <Text style={styles.buttonText}>Order History</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Add navigation header icons (Profile and Cart)
HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate("Profile")}>
        <Icon name="user" size={24} color="#fff" />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.navigate("Cart")}>
        <Icon name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>
    ),
    title: "Restaurants",
    headerStyle: {
      backgroundColor: "#ff6347", // Header background color
    },
    headerTintColor: "#fff", // Header text color
    headerTitleAlign: "center", // Center the title
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f8f8f8" },
  restaurantItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000", // Add shadow to make it more attractive
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Android shadow
  },
  foodImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  restaurantDetails: {
    color: "#555",
    fontSize: 16,
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  buttonGroup: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#ff6347", // A vibrant color for buttons
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerIcon: {
    padding: 10,
  },
});

export default HomeScreen;
