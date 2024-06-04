import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator,Alert,Image,TouchableOpacity } from 'react-native';
import { FIRESTORE_DB } from './FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import * as ImagePicker from "expo-image-picker"; 


const NewPost = ({ user, goBack }) => {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); 
  const [error, setError] = useState(null); 
  // Function to pick an image from  
    //the device's media library 
    const pickImage = async () => { 
      const { status } = await ImagePicker. 
          requestMediaLibraryPermissionsAsync(); 

      if (status !== "granted") { 

          // If permission is denied, show an alert 
          Alert.alert( 
              "Permission Denied", 
              `Sorry, we need camera  
               roll permission to upload images.` 
          ); 
      } else { 

          // Launch the image library and get 
          // the selected image 
          const result = 
              await ImagePicker.launchImageLibraryAsync(); 

          if (!result.cancelled) { 

              // If an image is selected (not cancelled),  
              // update the file state variable 
              setFile(result.uri); 

              // Clear any previous errors 
              setError(null); 
          } 
      } 
  }; 
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

