import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from './FirebaseConfig';

const PostHistory = ({ user, goBack }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(FIRESTORE_DB, 'posts'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userPosts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user.uid]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#A10022" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postText}>{item.text}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#A10022',
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 5,
  },
  postText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PostHistory;


