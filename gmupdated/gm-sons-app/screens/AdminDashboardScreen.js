import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Button title="Manage Products" onPress={() => navigation.navigate('ManageProducts')} />
      <Button title="Manage Orders" onPress={() => navigation.navigate('ManageOrders')} />
      <Button title="Manage Users" onPress={() => navigation.navigate('ManageUsers')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default AdminDashboardScreen;
