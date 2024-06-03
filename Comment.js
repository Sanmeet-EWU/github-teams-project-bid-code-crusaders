import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, FlatList } from 'react-native';

const CommentBox = ({ initialComment, imageTitle, imagePath, imageCaption, username }) => {
  const [comment, setComment] = useState(initialComment);
  const [comments, setComments] = useState([]);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { username, text: comment }]); // Add the new comment to the comments list
      Alert.alert('Comment Submitted', comment);
      setComment(''); // Clear the input field after submission
    } else {
      Alert.alert('Error', 'Comment cannot be empty');
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
      <Button
        style={styles.button}
        title="Comment"
        onPress={handleSubmit}
      />
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
  imageCaption:{
    fontsize: 14,
    fontWeight: 'normal',
    textAlign: 'left',
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
});

export default CommentBox;
