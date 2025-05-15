import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

const CheckoutScreen = ({ navigation, route }) => {
  // Destructure params passed from CartScreen
  const { items = [], totalAmount = 0, discount = 0, coupon = null } = route.params || {};

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const finalAmount = totalAmount - discount;

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your full name.');
      return false;
    }
    if (!phone.trim() || phone.length < 7) {
      Alert.alert('Validation Error', 'Please enter a valid phone number.');
      return false;
    }
    if (!street.trim()) {
      Alert.alert('Validation Error', 'Please enter your street address.');
      return false;
    }
    if (!house.trim()) {
      Alert.alert('Validation Error', 'Please enter your house number.');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('Validation Error', 'Please enter your city.');
      return false;
    }
    if (!state.trim()) {
      Alert.alert('Validation Error', 'Please enter your state.');
      return false;
    }
    if (!postalCode.trim()) {
      Alert.alert('Validation Error', 'Please enter your postal code.');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateInputs()) return;

    // Here you can add backend API call to place order if needed

    Alert.alert('Order Placed', 'Thank you! Your order has been placed successfully. Rider will contact you shortly Fresh Fruits and Veg at your doorstep and your reviews help us ', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Checkout</Text>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>No items in your order.</Text>
        ) : (
          items.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>PKR {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))
        )}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>PKR {totalAmount.toFixed(2)}</Text>
        </View>

        {discount > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={styles.totalValue}>- PKR {discount.toFixed(2)}</Text>
          </View>
        )}

        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, styles.finalTotalLabel]}>Total to Pay:</Text>
          <Text style={[styles.totalValue, styles.finalTotalValue]}>PKR {finalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Delivery Info Form */}
      <View style={styles.deliveryForm}>
        <Text style={styles.sectionTitle}>Delivery Information</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          keyboardType="default"
          autoComplete="name"
        />

        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
          autoComplete="tel"
        />

        <TextInput
          placeholder="Street"
          value={street}
          onChangeText={setStreet}
          style={styles.input}
          keyboardType="default"
        />

        <TextInput
          placeholder="House Number"
          value={house}
          onChangeText={setHouse}
          style={styles.input}
          keyboardType="default"
        />

        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          keyboardType="default"
        />

        <TextInput
          placeholder="State"
          value={state}
          onChangeText={setState}
          style={styles.input}
          keyboardType="default"
        />

        <TextInput
          placeholder="Postal Code"
          value={postalCode}
          onChangeText={setPostalCode}
          style={styles.input}
          keyboardType="numeric"
          autoComplete="postal-code"
        />

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.9}
        >
          <Text style={styles.placeOrderButtonText}>Place Order (Cash on Delivery)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fafafa',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#555',
  },
  orderSummary: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: { fontSize: 16, flex: 2, color: '#333' },
  itemQty: { fontSize: 14, flex: 1, textAlign: 'center', color: '#666' },
  itemPrice: { fontSize: 16, flex: 1, textAlign: 'right', color: '#333' },

  divider: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: { fontSize: 16, color: '#444' },
  totalValue: { fontSize: 16, color: '#444' },
  finalTotalLabel: { fontWeight: 'bold', fontSize: 18, color: '#000' },
  finalTotalValue: { fontWeight: 'bold', fontSize: 18, color: '#000' },

  deliveryForm: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 16,
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  placeOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CheckoutScreen;
