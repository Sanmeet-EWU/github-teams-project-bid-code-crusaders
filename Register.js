import React, { useState } from 'react';
import { StyleSheet, TextInput, Image, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH,FIRESTORE_DB } from './FirebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import {setDoc,doc} from 'firebase/firestore';
const Register = ({ onRegisterSuccess, goBack }) => {
    const [username, setUsername] = useState(''); // State for username
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const domain = email.split('@')[1];
            if (domain !== 'ewu.edu') {
                throw new Error("Email must be an ewu.edu address");
            } else if (password.length < 6) {
                throw new Error("Password must be at least 6 characters");
            } else {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(response.user, {
                    displayName: `${firstName} ${lastName}`,
                   
                });
                await sendEmailVerification(response.user);
                console.log(response);
                await setDoc(doc(FIRESTORE_DB,'users',response.user.uid),{
                uid: response.user.uid,
                email: response.user.email,
                fireName: firstName,
                lastName: lastName,
                username: username,


                });




                alert('Sign up successful! Please check your email to verify your account.');
                // Check email verification status in a loop until verified (simple approach)
                const intervalId = setInterval(async () => {
                    await response.user.reload();
                    if (response.user.emailVerified) {
                        clearInterval(intervalId);
                        onRegisterSuccess(response.user); // Call the onRegisterSuccess function passed as a prop
                    }
                }, 1000); // Check every second
            }
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Image
                source={require('./assets/logo.png')}
                style={styles.logo}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
                placeholderTextColor="#666"
            />
            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={setFirstName}
                value={firstName}
                placeholderTextColor="#666"
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={setLastName}
                value={lastName}
                placeholderTextColor="#666"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="#666"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#A10022" />
            ) : (
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: -160,
        padding: 10,
        backgroundColor: '#A10022',
        borderRadius: 5,
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        width: '90%',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    signUpButton: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#A10022',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Register;

