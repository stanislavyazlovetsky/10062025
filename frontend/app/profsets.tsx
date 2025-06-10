import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../constants/api';

const ProfileSettingsScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [growth, setGrowth] = useState('');
  const [cupsOfWater, setCupsOfWater] = useState('');
  const [heartRateMax, setHeartRateMax] = useState('');
  const [heartRateMin, setHeartRateMin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFields = () => {
    if (
      !fullName.trim() ||
      !age.trim() ||
      !weight.trim() ||
      !growth.trim() ||
      !cupsOfWater.trim() ||
      !heartRateMax.trim() ||
      !heartRateMin.trim()
    ) {
      setErrorMessage('Please fill in all fields');
      return false;
    }
    if (isNaN(Number(age)) || Number(age) <= 0) {
      setErrorMessage('Age must be a positive number');
      return false;
    }
    if (isNaN(Number(weight)) || Number(weight) <= 0) {
      setErrorMessage('Weight must be a positive number');
      return false;
    }
    if (isNaN(Number(growth)) || Number(growth) <= 0) {
      setErrorMessage('Height must be a positive number');
      return false;
    }
    if (isNaN(Number(cupsOfWater)) || Number(cupsOfWater) < 0) {
      setErrorMessage('Cups of water must be zero or more');
      return false;
    }
    if (isNaN(Number(heartRateMax)) || Number(heartRateMax) <= 0) {
      setErrorMessage('Heart rate (max) must be a positive number');
      return false;
    }
    if (isNaN(Number(heartRateMin)) || Number(heartRateMin) <= 0) {
      setErrorMessage('Heart rate (min) must be a positive number');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const payload = {
        name: fullName,
        age: Number(age),
        weight: Number(weight),
        growth: Number(growth),
        cups_of_water: Number(cupsOfWater),
        heart_rate_max: Number(heartRateMax),
        heart_rate_min: Number(heartRateMin),
      };

      await axios.post(`${BASE_URL}/profile-settings`, payload);

      Alert.alert('Success', 'Profile saved successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to save profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#aaa"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        placeholderTextColor="#aaa"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        placeholderTextColor="#aaa"
        value={growth}
        onChangeText={setGrowth}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cups of water"
        placeholderTextColor="#aaa"
        value={cupsOfWater}
        onChangeText={setCupsOfWater}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Heart rate (max)"
        placeholderTextColor="#aaa"
        value={heartRateMax}
        onChangeText={setHeartRateMax}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Heart rate (min)"
        placeholderTextColor="#aaa"
        value={heartRateMin}
        onChangeText={setHeartRateMin}
        keyboardType="numeric"
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17202B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    marginBottom: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1D1D1D',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFD374',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ProfileSettingsScreen;

