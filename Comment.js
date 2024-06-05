import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, FlatList } from 'react-native';
import { FIRESTORE_DB } from './FirebaseConfig'; // Import Firestore instance
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const CommentBox = ({ initialComment, imageTitle, imagePath, imageCaption, username }) => {
  const [comment, setComment] = useState(initialComment);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'comments'), {
          username,
          text: comment,
          imagePath,
          timestamp: new Date(),
        });
        console.log('Document written with ID: ', docRef.id);
        setComments([...comments, { username, text: comment }]); // Add the new comment to the comments list
        Alert.alert('Comment Submitted', comment);
        setComment(''); // Clear the input field after submission
      } catch (error) {
        console.error('Error adding document: ', error);
        Alert.alert('Error', 'Failed to submit comment');
      }
    } else {
      Alert.alert('Error', 'Comment cannot be empty');
    }
  };

  const fetchComments = async () => {
    try {
      const q = query(collection(FIRESTORE_DB, 'comments'), where('imagePath', '==', imagePath));
      const querySnapshot = await getDocs(q);
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push(doc.data());
      });
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments: ', error);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.comment}>
      <Text style={styles.commentText}>
        <Text style={styles.commentUsername}>{item.username}: </Text>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.imageTitle}>{imageTitle}</Text>
      <Image 
        style={styles.image}
        source={{ uri: imagePath }} 
      />
      <Text style={styles.imageCaption}>{imageCaption}</Text>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item, index) => index.toString()}
        style={styles.commentsList}
      />
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={comment}
        onChangeText={handleCommentChange}
      />
      <TouchableOpacity style={styles.commentButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageCaption: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'left',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 275,
    marginBottom: 10,
  },
  commentsList: {
    marginBottom: 10,
  },
  comment: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  commentText: {
    fontSize: 16,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: '#A10022',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CommentBox;

