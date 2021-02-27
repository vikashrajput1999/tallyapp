import React from 'react';
import {View, Text} from 'react-native';
import Navigator from './src/navigator/navigator';
import {Context} from './src/context/Context';
export default function App() {
  return (
    <Context>
      <Navigator />
    </Context>
  );
}
