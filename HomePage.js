import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import CommentBox from './Comment';

const HomePage = ({ user, goToProfile, handleLogout }) => {
  const [isTabOpen, setIsTabOpen] = useState(false);

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleTab}>
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
        {isTabOpen && (
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={goToProfile}>
              <Text style={styles.profileButtonText}>Go to Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eagle Nest</Text>
          <Searchbar style={styles.search} placeholder="Search..." />
        </View>
        <View style={styles.userInfo}>
          <Image
            source={user.avatar ? { uri: user.avatar } : require('./assets/logo.png')}
            style={styles.avatar}
          />
          <Text style={styles.welcomeMessage}>Welcome back, {user.email}!</Text>
        </View>
        <View style={styles.appContainer}>
          <CommentBox initialComment="" imageTitle="Post and comment tester" imagePath="https://static.miraheze.org/greatcharacterswiki/thumb/d/df/516-5164386_vegeta-ssj-blue-png-transparent-png.png/640px-516-5164386_vegeta-ssj-blue-png-transparent-png.png" username={user.email} />
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  menuContainer: {
    width: 200,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#333',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  menuButtonText: {
    fontSize: 14,
    color: '#333',
  },
  tabContainer: {
    marginTop: 10,
    width: '100%',
  },
  profileButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    width: '100%',
  },
  profileButtonText: {
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    paddingVertical: 10,
    width: '100%',
  },
  logoutButtonText: {
    fontSize: 14,
    color: '#333',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#454D65',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  search: {
    fontSize: 12,
    color: '#333',
    height: 30,

  },
  appContainer: {
    flex: 1,
    padding: 20,
  },
});

export default HomePage;
