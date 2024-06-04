import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { FIRESTORE_DB } from './FirebaseConfig';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';
import { format } from 'date-fns';

const Profile = ({ user, goToHome, goToNewPost, goToPostHistory, goToEditProfile, goToFollowers, goToFollowing }) => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(FIRESTORE_DB, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
          setBio(userData.bio || '');
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const q = query(collection(FIRESTORE_DB, 'profileposts'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userPosts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPosts(userPosts);
        setPostsCount(userPosts.length);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchPosts();
  }, [user.uid]);

 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={goToHome}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
        <Image
          source={user.avatar ? { uri: user.avatar } : require('./assets/logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>{username}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <TouchableOpacity onPress={goToPostHistory}>
              <Text style={styles.statText}>Posts</Text>
              <Text style={styles.statNumber}>{postsCount}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statItem}>
            <TouchableOpacity onPress={goToFollowers}>
              <Text style={styles.statText}>Followers</Text>
              <Text style={styles.statNumber}>0</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statItem}>
            <TouchableOpacity onPress={goToFollowing}>
              <Text style={styles.statText}>Following</Text>
              <Text style={styles.statNumber}>0</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.bio}>{bio}</Text>
        <Button mode="contained" style={styles.editProfileButton} onPress={goToEditProfile}>
          Edit Profile
        </Button>
      </View>
      <View style={styles.userInfo}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={goToPostHistory}>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNewPost}>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToFollowers}>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToFollowing}>
            <Image source={require('./assets/app-outline.png')} style={styles.appOutline} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.recentPostsContainer}>
        <Text style={styles.recentPostsTitle}>Recent Posts</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#A10022" />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <Image source={user.avatar ? { uri: user.avatar } : require('./assets/logo.png')} style={styles.postAvatar} />
                  <View style={styles.postInfo}>
                    <Text style={styles.postUser}>{username}</Text>
                    <Text style={styles.postTimestamp}>{format(new Date(item.createdAt.toDate()), 'PPP')}</Text>
                  </View>
                </View>
                <Text style={styles.postText}>{item.text}</Text>
                {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
              </View>
            )}
          />
        )}
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
    position: 'relative',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#333',
  },
  statNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  editProfileButton: {
    marginTop: 10,
    backgroundColor: '#A10022',
  },
  editProfileText: {
    color: '#FFF',
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
  recentPostsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EBECF4',
  },
  recentPostsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  postContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInfo: {
    flexDirection: 'column',
  },
  postUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  postTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default Profile;