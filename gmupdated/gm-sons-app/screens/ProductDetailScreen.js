import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>This is a detailed description of the product.</Text>
      <Text style={styles.price}>Price: PKR {product.price} / {product.unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  price: { fontSize: 18, fontWeight: '600', color: '#28a745' },
});

export default ProductDetailScreen;
