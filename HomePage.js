import React from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {Searchbar} from "react-native-paper";
import CommentBox from './Comment';



const HomePage = ({user}, goToProfile) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Eagle Nest</Text>
                <Searchbar style={styles.search} placeholder= "Search..."/>
            </View>
            <TouchableOpacity style={styles.userInfo} onPress={goToProfile}>
                <Image
                    source={user.avatar ? {uri: user.avatar} : require('./assets/logo.png')}
                    style={styles.avatar}
                />
                <Text style={styles.welcomeMessage}>Welcome back, {user.email}!</Text>
            </TouchableOpacity>
            <View style={styles.appContainer}>
                <CommentBox />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
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
        shadowColor: "#454D65",
        shadowOffset: {height: 5},
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
    },
    profileButton: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    search:{
        fontSize: 12,
        color: '#333',
        height: 30,
    },
});

export default HomePage;