import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert, Text, Image, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from './FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const NewPost = ({ user, goBack }) => {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);

  const createPost = async () => {
    if (postContent.trim() === '') {
      alert('Post cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const newPost = {
        uid: user.uid,
        text: postContent,
        createdAt: new Date(),
        likes: [],
        comments: [],
        username: user.email,
        avatar: user.avatar || null
      };

      await addDoc(collection(FIRESTORE_DB, 'profileposts'), newPost);
      console.log('Post created successfully');
      goBack();
    } catch (error) {
      console.error('Error creating post: ', error);
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={user.avatar ? { uri: user.avatar } : require('./assets/logo.png')}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>{user.email}</Text>
          <Text style={styles.timestamp}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#A10022" />
      ) : (
        <TouchableOpacity style={styles.postButton} onPress={createPost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#A10022',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default NewPost;



