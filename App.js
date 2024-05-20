import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const handleRegisterSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const goBackToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <HomePage user={user} />
      ) : (
        isRegistering ? (
          <Register onRegisterSuccess={handleRegisterSuccess} goBack={goBackToLogin} /> // Pass the goBack prop
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onRegister={toggleRegister} /> // Pass the onRegister prop
        )
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
});