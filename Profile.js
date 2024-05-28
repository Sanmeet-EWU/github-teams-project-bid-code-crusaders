import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const Profile = ({ user, goBack }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={goBack}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
        <Image
          source={user.avatar ? { uri: user.avatar } : require('./assets/logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>{user.email}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3, justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.posts}>Posts</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.followers}>Followers</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.following}>Following</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 5 }}>
            <Text>Edit Profile</Text>
          </Button>
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userInfo}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image source={require('./assets/Lane.png')} style={styles.photo} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/Emily.png')} style={styles.photo} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/Marshall.png')} style={styles.photo} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/Parker.png')} style={styles.photo} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./assets/Chris.png')} style={styles.photo} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 20,
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
    position: 'relative', // Added to position the home button
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#454D65',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.1,
  },
  posts: {
    paddingLeft: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
    fontSize: 10,
  },
  followers: {
    paddingLeft: 4,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 10,
  },
  following: {
    paddingLeft: 4,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  appOutline: {
    width: 25,
    height: 25,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    margin: 30,
  },
  photo: {
    width: 75,
    height: 75,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 1,
    justifyContent: 'space-evenly',
    margin: 1,
  },
  homeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFF',
    zIndex: 20,
  },
  homeButtonText: {
    fontSize: 14,
    color: '#333',
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  search: {
    fontSize: 12,
    color: '#333',
    height: 30,
  },
});

export default Profile;

