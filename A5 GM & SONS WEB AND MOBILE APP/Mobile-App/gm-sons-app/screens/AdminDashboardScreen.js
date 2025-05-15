import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AdminDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* Header with Back button and company/admin name */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.companyName}>GM & SONS</Text>
          <Text style={styles.adminName}>Admin: Tanveer</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4CAF50' }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ManageProducts')}
      >
        <Text style={styles.buttonText}>Manage Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2196F3' }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ManageOrders')}
      >
        <Text style={styles.buttonText}>Manage Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF5722' }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ManageUsers')}
      >
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  companyName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
  },
  adminName: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default AdminDashboardScreen;
