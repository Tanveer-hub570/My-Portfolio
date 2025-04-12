import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionItem = ({ transaction }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{transaction.title}</Text>
      <Text style={styles.amount}>${Math.floor(Math.random() * 100) + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  amount: {
    fontSize: 14,
    color: 'green',
    marginTop: 5
  }
});

export default TransactionItem;
