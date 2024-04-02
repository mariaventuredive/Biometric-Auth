

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


const App = () => {
  const theme = useColorScheme();
  const Stack = createStackNavigator();
 
  return (
    <NetworkProvider >
      <ErrorBoundary FallbackComponent={ErrorFallback} >
       <NavigationContainer>
        <Stack.Navigator>
      <Stack.Screen name="Home" component={SimpleComp} />
      <Stack.Screen name="ComponentWithError" component={ComponentWithError} />
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