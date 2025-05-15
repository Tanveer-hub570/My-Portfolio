// services/api.js
import axios from 'axios';

// Replace this with your own IP and backend port
const API_BASE_URL = 'http://192.168.18.14:5000/api'; // ⚠️ Change this to your local IP

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Function to send phone number to backend and receive OTP
export const loginWithPhone = async (phone) => {
  try {
    const response = await api.post('/auth/login', { phone });
    return response.data; // assuming server returns { success: true, otp: ... }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export default api;
