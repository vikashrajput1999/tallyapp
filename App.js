import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './src/navigator/navigator';
import {Context} from './src/context/Context';
export default function App() {
  return (
    <Context>
      <StatusBar barStyle="light-content"/>
      <Navigator />
    </Context>
  );
}
