import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import CreateTally from '../screens/CreateTally';
import TallyPage from '../screens/TallyPage';
import TallyStatus from '../screens/TallyStatus';
import SlideView from '../screens/SlideView';
import TabNavigation from './tabNavigator';
const Stack = createStackNavigator();
export default function navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slides">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Slides" component={SlideView} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Tally" component={TallyPage} />
        <Stack.Screen name="CreateTally" component={CreateTally} />
        <Stack.Screen name="TallyStatus" component={TallyStatus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
