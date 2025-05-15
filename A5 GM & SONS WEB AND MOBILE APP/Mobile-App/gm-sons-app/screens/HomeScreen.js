import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.0.100:5000/api/products');
      const fruitsList = response.data.filter((p) => p.category === 'fruit');
      const vegList = response.data.filter((p) => p.category === 'vegetable');

      setFruits(fruitsList);
      setVegetables(vegList);
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
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  // Product card renderer with image clickable to navigate to detail
  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.price}>
        PKR{' '}
        <Text style={styles.priceValue}>{item.price}</Text> / kg
      </Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          addToCart(item);
          alert(`${item.name} added to cart!`);
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="cart-outline" size={18} color="#fff" />
        <Text style={styles.btnText}> Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>GM & SONS</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Fruits Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="fruit-cherries" size={28} color="#e94e1b" />
            <Text style={styles.sectionTitle}>Fruits</Text>
          </View>

          <FlatList
            data={fruits}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={renderProductCard}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          />
        </View>

        {/* Vegetables Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="carrot" size={28} color="#7ac74f" />
            <Text style={styles.sectionTitle}>Vegetables</Text>
          </View>

          <FlatList
            data={vegetables}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={renderProductCard}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          />
        </View>
      </ScrollView>

      {/* Bottom Floating Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AdminLogin')}
          style={[styles.floatingBtn, styles.leftBtn]}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="shield-account" size={28} color="#28a745" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={[styles.floatingBtn, styles.rightBtn]}
          activeOpacity={0.8}
        >
          <Ionicons name="cart" size={28} color="#28a745" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const cardWidth = width * 0.42;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f7f1',
    paddingTop: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#28a745',
    letterSpacing: 2,
    fontFamily: 'sans-serif-condensed',
  },

  section: {
    marginBottom: 30,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: cardWidth,
    padding: 15,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: cardWidth,
    borderRadius: 15,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#777',
    marginBottom: 12,
  },
  priceValue: {
    color: '#28a745',
    fontWeight: '700',
    fontSize: 18,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  floatingBtn: {
    backgroundColor: '#ffffffee',
    padding: 14,
    borderRadius: 40,
    elevation: 8,
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  leftBtn: {
    shadowColor: '#1e90ff',
  },
  rightBtn: {
    shadowColor: '#28a745',
  },
});

export default HomeScreen;
