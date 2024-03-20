

import React, { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import * as LocalAuthentication from "expo-local-authentication";


const App = () => {
  const [lockedOpen, setLockedOpen] = useState(false);

  const authenticate = async () => {
  const enrolled = await LocalAuthentication.getEnrolledLevelAsync();
    const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();

    console.log("enrolled",enrolled);
    console.log("supported",supported);
    const hasHardware = await LocalAuthentication.hasHardwareAsync(); 
    if (!hasHardware) {
     Alert.alert("Not Supported")
     return
      
    }

    const res = await LocalAuthentication.authenticateAsync();
    console.log("res", res);
    if (res.success) {
      setLockedOpen(true)
    }

  }
  useEffect(() => {


    // authenticate();
  }, [])
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}

      />

   


      {!lockedOpen ?
      <View style={styles.container}> 
           <Text style={styles.heading}>Biometric Login</Text>
        <TouchableOpacity style={{alignItems:'center'}} onPress={() => authenticate()}>
          <Text style={styles.texts}>Please Use biometric login</Text>
          <Image source={Platform.OS == 'android' ? require('./assets/fingerprint.png') : require('./assets/security.png')}
            style={{ width: 80, height: 80 }}
          />
        </TouchableOpacity>
        </View>
        : 
        <View style={[styles.container,{backgroundColor:'#A19B88', width:'100%'}]}><Text style={[styles.heading, {color:'#ffff',margin:20}]}>Welcome Back!</Text>
          <TouchableOpacity style={{alignItems:'center', backgroundColor:'#ffff', borderRadius:5}} onPress={() => setLockedOpen(false)}>
          <Text style={[styles.texts,{margin:10}]}>Logout</Text>
        
        </TouchableOpacity>
        </View>
      }

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  heading:{
    fontSize:20,
    fontWeight:'bold'

  },
  texts:{
    fontSize:15,
    margin:20
    

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Adjust the image's resizeMode as needed
  },
});


export default App;