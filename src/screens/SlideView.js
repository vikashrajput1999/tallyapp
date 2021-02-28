import React from 'react';
import {View, Text, Dimensions, FlatList} from 'react-native';
import {TallyContext} from '../context/Context';
const {height, width} = Dimensions.get('window');
export default function SlideView(props) {
  const {state, setState} = React.useContext(TallyContext);
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: height * 0.5,
          borderWidth: 1,
          width: width,
          alignItems: 'center',
        //   justifyContent: 'center',
        }}>
        <View
          style={{
            width: width * 0.8,
            height: height * 0.5,
            backgroundColor: '#399',
          }}>
          <Text>{item}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{width, height, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          horizontal
          pagingEnabled
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
