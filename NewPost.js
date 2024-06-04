import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { FIRESTORE_DB } from './FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const NewPost = ({ user, goBack }) => {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);

  const createPost = async () => {
    if (postContent.trim() === '') {
      alert('Post content cannot be empty');
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
        image: null // If you have image functionality, update this accordingly
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
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={postContent}
        onChangeText={setPostContent}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#A10022" />
      ) : (
        <Button title="Post" onPress={createPost} />
      )}
      <Button title="Back" onPress={goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  }
});

export default NewPost;

