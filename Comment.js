import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';

const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [imageTitle, setImageTitle] = useState('Text comment on post testing for more length'); // Add a state for the text above the image

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      // Handle the comment submission logic here
      Alert.alert('Comment Submitted', comment);
      setComment(''); // Clear the input field after submission
    } else {
      Alert.alert('Error', 'Comment cannot be empty');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.imageTitle}>{imageTitle}</Text> {/* Add the text above the image */}
      <Image 
        style={styles.image}
        source={{ uri: 'https://i9.ytimg.com/vi_webp/3syWQtsO7sA/maxresdefault.webp?v=6636b856&sqp=CJidw7IG&rs=AOn4CLB_iraAId30NalyO5cEnuBc_YnyYQ' }} 
      />
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={comment}
        onChangeText={handleCommentChange}
      />
      <Button title="Comment" onPress={handleSubmit} />
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center align the text
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default CommentBox;