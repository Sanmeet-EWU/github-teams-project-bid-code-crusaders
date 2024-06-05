import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Modal, TextInput, Button, Alert, ScrollView } from 'react-native';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { FIRESTORE_DB } from './FirebaseConfig';
import CommentBox from './Comment';
import SearchBar from './Search';

const HomePage = ({ user, goToProfile, handleLogout }) => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [newImagePath, setNewImagePath] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const postsSnapshot = await getDocs(collection(FIRESTORE_DB, 'posts'));
    const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsList);
  };

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSubmitPost = async () => {
    if (newImageTitle.trim() && newImagePath.trim()) {
      const newPost = {
        imageTitle: newImageTitle,
        imagePath: newImagePath,
        imageCaption: newImageCaption,
        username: user.email,
        createdAt: serverTimestamp()
      };
      await addDoc(collection(FIRESTORE_DB, 'posts'), newPost);
      fetchPosts();
      setNewImageTitle('');
      setNewImageCaption('');
      setNewImagePath('');
      toggleModal();
      Alert.alert('Success', 'Post has been added!');
    } else {
      Alert.alert('Error', 'Please fill out all required fields.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleTab}>
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
        {isTabOpen && (
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.profileButton} onPress={() => goToProfile(user.uid)}>
              <Text style={styles.profileButtonText}>Go to Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eagle Nest</Text>
          <SearchBar onSelectUser={goToProfile} />
        </View>
        <View style={styles.userInfo}>
          <Image
            source={user.avatar ? { uri: user.avatar } : require('./assets/logo.png')}
            style={styles.avatar}
          />
          <Text style={styles.welcomeMessage}>Welcome back, {user.email}!</Text>
        </View>
        <Button title="Add Post" onPress={toggleModal} />
        {posts.map((post, index) => (
          <View key={index} style={styles.appContainer}>
            <CommentBox
              initialComment=""
              imageTitle={post.imageTitle}
              imagePath={post.imagePath}
              imageCaption={post.imageCaption}
              username={user.email}
            />
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Post</Text>
            <TextInput
              style={styles.input}
              placeholder="Image Title"
              value={newImageTitle}
              onChangeText={setNewImageTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Image Caption"
              value={newImageCaption}
              onChangeText={setNewImageCaption}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={newImagePath}
              onChangeText={setNewImagePath}
            />
            {newImagePath ? (
              <Image source={{ uri: newImagePath }} style={styles.previewImage} />
            ) : null}
            <Button title="Submit" onPress={handleSubmitPost} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default HomePage;





