import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SplashScreen from './src/screens/SplashScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import OnboardingScreen from './src/screens/OnboardingScreen'
import HomePage from './src/components/HomePage'
import ProfilePage from './src/components/ProfilePage'
import ActivityPage from './src/components/ActivityPage'
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splash' component={SplashScreen}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component = {HomePage} />
        <Stack.Screen name="Profile" component={ProfilePage}/>
        <Stack.Screen name="Activity" component={ActivityPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
