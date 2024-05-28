import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const ForgotPassword = ({ goBack }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email) {
      sendPasswordResetEmail(FIREBASE_AUTH, email)
        .then(() => {
          Alert.alert('Password reset email sent!', 'Please check your email to reset your password.');
          goBack();
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Please enter your email address.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        onChangeText={setEmail}
        value={email}
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack}>
        <Text style={styles.goBackText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '120%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resetButton: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#A10022',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackText: {
    color: '#A10022',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ForgotPassword;
