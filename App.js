import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Profile from './Profile'; // Import Profile component
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    setCurrentView('home');
  };

  const handleRegisterSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    setCurrentView('home');
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const goBackToLogin = () => {
    setIsRegistering(false);
  };

  const goToProfile = () => {
    setCurrentView('profile');
  };

  const goBack = () => {
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentView('login');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        currentView === 'home' ? (
          <HomePage user={user} goToProfile={goToProfile} handleLogout={handleLogout} />
        ) : (
          <Profile user={user} goBack={goBack} />
        )
      ) : (
        isRegistering ? (
          <Register onRegisterSuccess={handleRegisterSuccess} goBack={goBackToLogin} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onRegister={toggleRegister} />
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
  },
});
