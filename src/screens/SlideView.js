import React from 'react';
import {View, Text} from 'react-native';
import {TallyContext} from '../context/Context';
export default function SlideView() {
  const {state, setState} = React.useContext(TallyContext);

  return (
    <View>
      <Text></Text>
    </View>
  );
}
