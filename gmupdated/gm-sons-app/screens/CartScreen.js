import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { CartContext } from '../contexts/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Your cart is empty.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>PKR {item.price * item.quantity}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      <Text style={styles.total}>Total: PKR {getTotalPrice()}</Text>
      <Button title="Clear Cart" onPress={clearCart} />
      <Button title="Proceed to Checkout" onPress={() => {/* Navigate to checkout */}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
});

export default CartScreen;
