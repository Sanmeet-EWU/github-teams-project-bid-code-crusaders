
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

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
    setCurrentView('login');
  };

  const goToProfile = () => {
    setCurrentView('profile');
  };

  const goBack = () => {
    setCurrentView('home');
  };

  const goToForgotPassword = () => {
    setCurrentView('forgotPassword');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        currentView === 'home' ? (
          <HomePage user={user} goToProfile={goToProfile} />
        ) : (
          <Profile user={user} goBack={goBack} />
        )
      ) : (
        isRegistering ? (
          <Register onRegisterSuccess={handleRegisterSuccess} goBack={goBackToLogin} />
        ) : (
          currentView === 'forgotPassword' ? (
            <ForgotPassword goBack={goBackToLogin} />
          ) : (
            <Login
              onLoginSuccess={handleLoginSuccess}
              onRegister={toggleRegister}
              onForgotPassword={goToForgotPassword}
            />
          )
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

