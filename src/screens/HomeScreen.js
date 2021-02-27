import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function HomeScreen(props) {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);
  return (
    <ImageBackground
      // resizeMode="stretch"
      source={require('../assets/bg5.jpg')}
      style={{
        height,
        width,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View>
        <Text
          style={{
            fontSize: height * 0.08,
            fontWeight: 'bold',
            color: '#26D491',
          }}>
          Tally
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CreateTally')}
          style={{
            backgroundColor: '#fff',
            elevation: 3,
            height: height * 0.08,
            borderRadius: height * 0.02,
            width: width * 0.4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: height * 0.03, fontWeight: 'bold'}}>
            Create
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Tally')}
          style={{
            backgroundColor: '#fff',
            marginTop: height * 0.03,
            elevation: 3,
            height: height * 0.08,
            borderRadius: height * 0.02,
            width: width * 0.4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: height * 0.03, fontWeight: 'bold'}}>
            View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('About')}
          style={{
            backgroundColor: '#fff',
            marginTop: height * 0.03,
            elevation: 3,
            height: height * 0.08,
            borderRadius: height * 0.02,
            width: width * 0.4,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: height * 0.03, fontWeight: 'bold'}}>
            About
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
