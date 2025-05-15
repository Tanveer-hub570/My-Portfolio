import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.18.14:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>GM & SONS</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>PKR {item.price} / {item.unit}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  addToCart(item);
                  alert(`${item.name} added to cart!`);
                }}
              >
                <Text style={styles.btnText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              >
                <Text style={styles.btnText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Bottom Floating Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')} style={styles.iconLeft}>
          <MaterialIcons name="admin-panel-settings" size={28} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconRight}>
          <Ionicons name="cart" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#28a745' },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  image: { width: '100%', height: 180, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  price: { fontSize: 16, color: '#555', marginVertical: 5 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  addBtn: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  detailsBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconLeft: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 30,
  },
  iconRight: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 30,
  },
});

export default HomeScreen;
