import React, { useCallback } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import HomeScreen from './src/components/screens/HomeScreen';
import CleanerGetStartedScreen from './src/components/screens/CleanerFlow/CleanerGetStartedScreen';
import UserIdAndPassword from './src/components/screens/UserIdAndPassword';

import { Provider } from 'react-redux';
import store from './src/redux/store'


function App(): JSX.Element {
  // SplashScreen.preventAutoHideAsync();

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CleanerGetStarted" component={CleanerGetStartedScreen} />
            <Stack.Screen name="LoginCapture" component={UserIdAndPassword} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
