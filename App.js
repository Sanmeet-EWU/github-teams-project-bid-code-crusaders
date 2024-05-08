// A container is a component that holds components
// View component is a container which will hold the logo,inputs,buttons...


import { StatusBar } from 'expo-status-bar'; // controls status bar
import React, { useState } from 'react'; // allows me to manage state in a component
import { StyleSheet, TextInput, Image, View, Text, TouchableOpacity } from 'react-native'; // components used to build UI

export default function App() { 
  const [username, setUsername] = useState('');  // state variable = username w/ empty string, function = setUsername which will update it.
  const [password, setPassword] = useState('');  // same goes for password.

  const Login = () => { // once we have firebase set up this can direct user to main paige.
    alert(`Will go to home page eventually.`); 
  };

  const SignUp = () => { // same for signup but will direct user to registration page.
    alert('Will eventually go to account registration.');
  };

  return (
    // container view component. View holds all elements of the apps interface. defines the styles for the layout
    <View style={styles.container}> 
      <Image
        source={require('/Users/ccornell11/EagleNest/assets/logo.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input} // component for username and applies style.
        placeholder="Username" // shown in the box until the user inputs anything.
        onChangeText={setUsername} // calls function and updates username when text changes.
        value={username} // saves the input to username state
        placeholderTextColor="#666" // color of username text
      />
      <TextInput
        style={styles.input} // same as above but for password.
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.loginButton} onPress={Login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={SignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({ // creates a style sheet object to style the components
  container: {
    flex: 1, // this makes it occupy the available height
    backgroundColor: '#f0f0f0', // Light grey background
    alignItems: 'center', // center everything
    justifyContent: 'center', // center vertical
    padding: 20,
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
  loginButton: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#A10022',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  signUpButton: {
    marginTop: 10,
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