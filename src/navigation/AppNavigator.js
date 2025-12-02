import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import OnboardingScreen from '../screens/OnboardingScreen'
import HomePage from '../components/HomePage'
import ProfilePage from '../components/ProfilePage'
import ActivityPage from '../components/ActivityPage'
import SwapSchedule from '../components/SwapSchedule'
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
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
        <Stack.Screen name="SwapSchedule" component={SwapSchedule}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
