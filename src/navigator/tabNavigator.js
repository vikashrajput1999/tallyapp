import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TallyPage from '../screens/TallyPage';
import SlideView from '../screens/SlideView';

const Tab = createBottomTabNavigator();
export default function tabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TallyPage" component={TallyPage} />
      <Tab.Screen name="SlideView" component={SlideView} />
    </Tab.Navigator>
  );
}
