import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FIRESTORE_DB } from './FirebaseConfig';

const Followers = ({ user, goBack }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const q = query(collection(FIRESTORE_DB, 'followers'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userFollowers = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setFollowers(userFollowers);
      } catch (error) {
        console.error("Error fetching followers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
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
          data={followers}
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

export default Followers;
