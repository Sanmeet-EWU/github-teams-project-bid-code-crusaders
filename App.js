// A container is a component that holds components
// View component is a container which will hold the logo,inputs,buttons...


import { StatusBar } from 'expo-status-bar'; // controls status bar
import React, { useState } from 'react'; // allows me to manage state in a component
import { StyleSheet, TextInput, Image, View, Text, TouchableOpacity } from 'react-native'; // components used to build UI
import {FIREBASE_AUTH} from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function App() { 
  const [email, setEmail] = useState('');  // state variable = username w/ empty string, function = setUsername which will update it.
  const [password, setPassword] = useState('');  // same goes for password.
  const [loading,setLoading]= useState(false);//loading state
  const auth =FIREBASE_AUTH; //firebase auth
  
 
  
  const Login =  async () => {//login using firebase
    
     setLoading(true);
      
      try{
        const response = await signInWithEmailAndPassword(auth,email,password);
        console.log(response);

      }catch(error){
        console.log(error);
        alert('Sign in failed: '+error.message);

      }finally{
        setLoading(false);
      }
      
    
    
    };

  const SignUp = async () => { //signup using firebase
   
    
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth,email,password);
      console.log(response);
      alert('Check your emails!');
    }catch(error){
      console.log(error);
      alert('Sign up failed: '+ error.message);
    }finally{
      setLoading(false);
    } 
    
  };
  

  return (
    // container view component. View holds all elements of the apps interface. defines the styles for the layout
    <View style={styles.container}> 
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input} // component for username and applies style.
        placeholder="Email" // shown in the box until the user inputs anything.
        onChangeText={setEmail} // calls function and updates username when text changes.
        value={email} // saves the input to username state
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