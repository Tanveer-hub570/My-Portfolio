import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { CartContext } from '../contexts/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);

  const logoUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04ucTtyX3JbmK-lwE-oehDYm-Pq0u92-0Zg&s';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={{ uri: logoUrl }} style={styles.logo} />
          <Text style={styles.companyName}>GM & SONS</Text>
        </View>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id?.toString() || item._id?.toString() || Math.random().toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemPrice}>Price: PKR {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.id || item._id)}
              activeOpacity={0.7}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Footer */}
      <ScrollView style={styles.footer} keyboardShouldPersistTaps="handled">
        <Text style={styles.total}>Total: PKR {getTotalPrice().toFixed(2)}</Text>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.clearCartButton}
            onPress={clearCart}
            activeOpacity={0.8}
          >
            <Text style={styles.clearCartButtonText}>Clear Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.checkoutButton,
              cartItems.length === 0 && { backgroundColor: '#aaa' },
            ]}
            onPress={() => {
              if (cartItems.length === 0) return;
              navigation.navigate('Checkout', {
                items: cartItems,
                totalAmount: getTotalPrice(),
                discount: 0,
                coupon: null,
              });
            }}
            activeOpacity={cartItems.length === 0 ? 1 : 0.9}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, backgroundColor: '#f9f9f9' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  backButtonText: {
    fontSize: 28,
    color: '#555',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginRight: 40,
  },
  logo: { width: 50, height: 50, resizeMode: 'contain', marginRight: 12 },
  companyName: { fontSize: 26, fontWeight: 'bold', color: '#333' },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginVertical: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: '600', color: '#222' },
  itemQuantity: { fontSize: 14, color: '#555', marginTop: 4 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#000', marginTop: 6 },

  removeButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },

  footer: {
    marginTop: 20,
    paddingBottom: 30,
  },

  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 15,
  },

  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  clearCartButton: {
    flex: 1,
    backgroundColor: '#0275d8',
    paddingVertical: 14,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
  },
  clearCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  checkoutButton: {
    flex: 1,
    backgroundColor: '#5cb85c',
    paddingVertical: 14,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
