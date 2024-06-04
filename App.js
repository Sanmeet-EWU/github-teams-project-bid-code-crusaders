import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import PostHistory from './PostHistory';
import EditProfile from './EditProfile';
import Followers from './Followers';
import Following from './Following';
import NewPost from './NewPost';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [previousView, setPreviousView] = useState(null);

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
    setPreviousView(currentView);
    setCurrentView('profile');
  };

  const goToPostHistory = () => {
    setPreviousView(currentView);
    setCurrentView('postHistory');
  };

  const goToEditProfile = () => {
    setPreviousView(currentView);
    setCurrentView('editProfile');
  };

  const goToFollowers = () => {
    setPreviousView(currentView);
    setCurrentView('followers');
  };

  const goToFollowing = () => {
    setPreviousView(currentView);
    setCurrentView('following');
  };

  const goToNewPost = () => {
    setPreviousView(currentView);
    setCurrentView('newPost');
  };

  const goBack = () => {
    setCurrentView(previousView || 'home');
  };

  const goToForgotPassword = () => {
    setCurrentView('forgotPassword');
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
        ) : currentView === 'profile' ? (
          <Profile
            user={user}
            goBack={goBack}
            goToPostHistory={goToPostHistory}
            goToEditProfile={goToEditProfile}
            goToFollowers={goToFollowers}
            goToFollowing={goToFollowing}
            goToNewPost={goToNewPost}
          />
        ) : currentView === 'postHistory' ? (
          <PostHistory user={user} goBack={goBack} />
        ) : currentView === 'editProfile' ? (
          <EditProfile user={user} goBack={goBack} />
        ) : currentView === 'followers' ? (
          <Followers user={user} goBack={goBack} />
        ) : currentView === 'following' ? (
          <Following user={user} goBack={goBack} />
        ) : currentView === 'newPost' ? (
          <NewPost user={user} goBack={goBack} />
        ) : null
      ) : (
        currentView === 'register' ? (
          <Register onRegisterSuccess={handleRegisterSuccess} goBack={goBackToLogin} />
        ) : currentView === 'forgotPassword' ? (
          <ForgotPassword goBack={goBackToLogin} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onRegister={toggleRegister} onForgotPassword={goToForgotPassword} />
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





