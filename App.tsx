

import React, { useContext, useEffect } from 'react';
import { Button, Text, View, StyleSheet ,useColorScheme} from 'react-native';
import Constants from 'expo-constants';
import ErrorBoundary from 'react-native-error-boundary';
import { NetworkProvider } from './context/NetworkContext';

import { NavigationContainer,  DarkTheme,
  DefaultTheme, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SimpleComp from './Comp';
import ComponentWithError from './screens/CompoentWithErrors';
import { ErrorFallback } from "./utils/ErrorFallback";
import { checkLocationPermission , requestCameraPermission, requestLocationPermission,checkCameraPermission} from './utils/PermissionsUtil';
import MediaPicker from './screens/MediaPicker';
import { setNavigationReference } from './utils/NavigationRef';
import {  Platform,LogLevel } from '@dynatrace/react-native-plugin';

import { Dynatrace, DataCollectionLevel, UserPrivacyOptions } from '@dynatrace/react-native-plugin';
import {  ConfigurationBuilder } from '@dynatrace/react-native-plugin';
// Privacy settings configured below are only provided


const App = () => {
  const theme = useColorScheme();
  const Stack = createStackNavigator();


 // const configurationBuilder = new ConfigurationBuilder("https://bf07731ogr.bf.dynatrace.com/mbeacon", "a0299a68-e245-42e0-85a8-f2c61d5d2857");
useEffect(()=>{



// configurationBuilder.withCrashReporting(true)
//   .withLogLevel(LogLevel.Debug)
//   .withLifecycleUpdate(false)
//   .withUserOptIn(false)
//   .withActionNamePrivacy(false)
//   .withBundleName(undefined);
  
// Dynatrace.start(configurationBuilder.buildConfiguration());
  // to allow a quick start with capturing monitoring data.
// This has to be requested from the user
// (e.g. in a privacy settings screen) and the user decision
// has to be applied similar to this example.
let privacyConfig = new UserPrivacyOptions(DataCollectionLevel.UserBehavior, true);
Dynatrace.applyUserPrivacyOptions(privacyConfig);
  checkCamera()
  checkLocation()
  requestLocationPermission()
},[])

//
// Checking camera permission
const checkCamera = async () => {
  const cameraPermissionGranted = await checkCameraPermission();
  if (!cameraPermissionGranted) {
    const permissionGranted = await requestCameraPermission();
    if (!permissionGranted) {
      // Handle camera permission denied
    }
  }
};

// Checking location permission
const checkLocation = async () => {
  const locationPermissionGranted = await checkLocationPermission();
  if (!locationPermissionGranted) {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      console.log("grated No");
      
      // Handle location permission denied
    }
  }
};


 
  return (
    <NetworkProvider >
      <ErrorBoundary FallbackComponent={ErrorFallback} >
       <NavigationContainer  ref={setNavigationReference}>
        <Stack.Navigator>
      <Stack.Screen name="Home" component={SimpleComp} />
      <Stack.Screen name="ComponentWithError" component={ComponentWithError} />
      <Stack.Screen name="MediaPicker" component={MediaPicker} />
      </Stack.Navigator>
     

      </NavigationContainer>
      </ErrorBoundary>
    </NetworkProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    //  backgroundColor: '#ecf0f1',
    padding: 28,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    fontSize: 48
  },
  text: {
    marginVertical: 16
  }
});

export default App