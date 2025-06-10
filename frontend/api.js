import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.102:4000';// Замініть на ваш IP та порт, якщо потрібно

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (username, password) => {
    try {
      console.log('Sending data to server:', { username, password });
      const response = await api.post('/register', { username, password });
      console.log('Response received:', response.data);
      return response.data; // Contains user details
    } catch (error) {
      console.error('Error details:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

export const loginUser = async (username, password) => {
  try {
    console.log('Attempting login with:', { username, password });
    const response = await api.post('/login', { username, password });
    console.log('Login response received:', response.data);
    return response.data; // Contains user details
  } catch (error) {
    console.error('Error details:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};