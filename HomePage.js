import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import CommentBox from './Comment';
import SearchBar from "./Search";

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
          <SearchBar placeholder="Search..." />
        </View>
        <View style={styles.userInfo}>
          <Image
            source={user.avatar ? { uri: user.avatar } : require('./assets/logo.png')}
            style={styles.avatar}
          />
          <Text style={styles.welcomeMessage}>Welcome back, {user.email}!</Text>
        </View>
        <View style={styles.appContainer}>
          <CommentBox initialComment="" imageTitle="Congratulations to Our 2024 Graduates!" imagePath="https://in.ewu.edu/wp-content/uploads/2019/06/2019-Graduation-1024x443.jpg" username={user.email} />
        </View>
        <View style={styles.appContainer}>
          <CommentBox initialComment="" imageTitle="Don't Miss This Weekends Sporting Events!" imagePath="https://goeags.com/images/2020/3/31/20atZoomBackgroundSwoop2.jpg"
                      imageCaption= "Come out to cheer on our Football and Tennis teams Friday 6/7 and Saturday 6/8!" username={user.email} />
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
    padding: 15,
  },
  header: {
    paddingTop: 35,
    paddingBottom: 5,
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
