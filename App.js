import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './Login';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <Text>Welcome, {user.email}!</Text>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
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