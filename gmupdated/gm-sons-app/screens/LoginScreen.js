import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUsernameLogin = () => {
    if (username && password) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', 'Please enter username and password.');
    }
  };

  const sendOtp = () => {
    if (phone.length !== 10) {
      Alert.alert('Invalid Phone Number', 'Enter a valid 10-digit phone number.');
      return;
    }
    setIsOtpSent(true);
    Alert.alert('OTP Sent', 'Mock OTP "1234" has been sent.');
  };

  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otp === '1234') {
        navigation.navigate('Home');
      } else {
        Alert.alert('Incorrect OTP', 'The entered OTP is incorrect.');
      }
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Coming Soon', 'Google sign-in will be added later.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍎 GM & SONS</Text>
      <Text style={styles.subtitle}>Fresh Fruits & Vegetables</Text>

      {/* Username & Password */}
      <Text style={styles.section}>Login with Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleUsernameLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>OR</Text>

      {/* Phone + OTP */}
      <Text style={styles.section}>Verify with OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />
      {isOtpSent && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={4}
          value={otp}
          onChangeText={setOtp}
        />
      )}
      {!isOtpSent ? (
        <TouchableOpacity style={styles.secondaryButton} onPress={sendOtp}>
          <Text style={styles.secondaryButtonText}>Send OTP</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.secondaryButton} onPress={verifyOtp}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.secondaryButtonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Google Sign In */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#28a745',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 50,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  or: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 16,
    fontSize: 14,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  googleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginScreen;
