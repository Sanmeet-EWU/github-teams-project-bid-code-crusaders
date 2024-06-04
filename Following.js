import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from './FirebaseConfig';

const Following = ({ user, goBack }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const q = query(collection(FIRESTORE_DB, 'following'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userFollowing = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setFollowing(userFollowing);
      } catch (error) {
        console.error("Error fetching following: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
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
          data={following}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              <Text style={styles.userText}>{item.name}</Text>
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
  userContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 5,
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Following;

