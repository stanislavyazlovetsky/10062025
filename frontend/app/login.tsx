import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/api';
import { LinearGradient } from 'expo-linear-gradient';


const Login = ({ navigation, setIsLoggedIn }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, { username: email, password });
      console.log('Login successful:', response.data);
      setIsLoggedIn(true);
      navigation.navigate('MainApp');
    } catch (error: any) {
      console.error('Error during login:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <View style={[styles.container, darkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.header,{fontFamily:'AbhayaLibre-ExtraBold'},darkTheme?styles.darkText:styles.lightText]}>Healthband</Text>


      <View style={styles.inputContainer}>
        <Text style={[styles.label, darkTheme ? styles.darkText : styles.lightText]}>Email</Text>
        <TextInput
          style={[styles.input, darkTheme ? styles.darkInput : styles.lightInput]}
          placeholder="Value"
          placeholderTextColor={darkTheme ? '#ccc' : 'grey'}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, darkTheme ? styles.darkText : styles.lightText]}>Password</Text>
        <TextInput
          style={[styles.input, darkTheme ? styles.darkInput : styles.lightInput]}
          placeholder="Value"
          placeholderTextColor={darkTheme ? '#ccc' : '#666'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity style={[styles.button, darkTheme ? styles.darkButton : styles.lightButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>log in</Text>
      </TouchableOpacity>

      <Text style={[styles.footerText, darkTheme ? styles.darkText : styles.lightText]}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#17202B',
  },
  darkContainer: {
    backgroundColor: '#1E2A38',
  },
  header: {
    fontSize: 48,
    marginBottom: 100,
  },
  lightText: {
    color: 'white',
  },
  darkText: {
    color: 'white',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    height: 25,
    backgroundColor: '#2C2C2C',
    textAlign: 'center',
    borderRadius: 4,
    fontSize: 12,
    marginTop: 10,
  },
  lightInput: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#1D1D1D',
  },
  darkInput: {
    color: 'white',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#333',
  },
  lightButton: {
    borderWidth: 1,
    borderColor: '#2C2C2C',
    backgroundColor: '#FFD374',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  },
  darkButton: {
    borderWidth: 1,
    borderColor: '#2C2C2C',
    backgroundColor: '#2EB82E',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
  },
  registerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0000ff',
    marginTop: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  themeButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 8,
  },
});

export default Login;
