// FollowersTab.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';


const FollowersTab = ({user, goBack}) => {
    const [isTabOpen, setIsTabOpen] = useState(false);

    const toggleTab = () => {
      setIsTabOpen(!isTabOpen);
    };
    const handleFollowingPress = () => {
        setIsTabOpen(false);
      };
    
      const handleFollowerPress = () => {
        setIsTabOpen(true);
      };
      const [isRowHidden, setIsRowHidden] = useState(false);
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
             <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.FollowingButton} onPress={handleFollowerPress}>
          <Text style={styles.menuButtonText}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.FollowingButton} onPress={handleFollowingPress}>
          <Text style={styles.menuButtonText}>Following</Text>
        </TouchableOpacity>
 
      </View>
      {isTabOpen ? (
  <View style={styles.tabContainer}>
    <View style={styles.userInfo}>
      <Image
        source={user.avatar ? { uri: user.avatar } : require('./assets/Lane.png')}
        style={styles.avatar}
      />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.followButtonText}> Lane</Text>
        <Text style={styles.followsYouText}>Follows you</Text>
      </View>
    </View>
    <View style={styles.userInfo}>
      <Image
        source={user.avatar ? { uri: user.avatar } : require('./assets/Marshall.png')}
        style={styles.avatar}
      />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.followButtonText}> Marshall</Text>
        <Text style={styles.followsYouText}>Follows you</Text>
      </View>
    </View>
  </View>
) : (
  <View style={styles.tabContainer}>
     {!isRowHidden && (
      <View style={styles.userInfo}>
      
      <Image
        source={user.avatar ? { uri: user.avatar } : require('./assets/Parker.png')}
        style={styles.avatar}/>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.followButtonText}> Parker</Text>
        <TouchableOpacity onPress={() => setIsRowHidden(true)} style={[styles.followsYouText]}>
             <Text style={styles.followButtonText}>Unfollow</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    )}
  </View>
)}

    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
    marginHorizontal: 200,
    borderRadius: 10,
    width: 500,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: '#333',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  FollowingButton: {
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
  followButtonText: {
    fontSize: 14,
    color: '#333',
    justifyContent: 'flex-end',
  },
  tabContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
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
    width:'90%',
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
  backButton: {
    padding: 10,
    backgroundColor: '#A10022',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent:'space-evenly',
    width:'12%',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent:'center',
  },
  appContainer: {
    flex: 1,
    padding: 20,
  },
  followsYouText: {
    fontSize: 14,
    color: '#666', // Adjust color as needed
    justifyContent: 'flex-end',
  },
});

export default FollowersTab;