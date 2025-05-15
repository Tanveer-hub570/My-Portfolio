import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  const description = `
${product.name} is carefully selected and packed to ensure the highest quality and freshness. 
At GM & SONS, we take pride in delivering the finest fruits and vegetables directly from trusted local farms to your home. 
Our commitment to quality means you get only the best produce, harvested at peak ripeness to guarantee exceptional taste and nutrition.

Experience the freshness and quality of ${product.name} with every bite — handpicked, handpacked, and delivered with care.

GM & SONS — Your trusted partner for fresh produce in Pakistan.
  
"At your doorstep, fresh."
`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{description.trim()}</Text>
      <Text style={styles.price}>
        Price: PKR {product.price} / {product.unit}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 280, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, color: '#28a745' },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 25, color: '#444' },
  price: { fontSize: 20, fontWeight: '600', color: '#28a745' },
});

export default ProductDetailScreen;
