import React from 'react';
import {View, Text, ImageBackground, Dimensions, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';

const {height, width} = Dimensions.get('window');
export default function AboutScreen(props) {
  //   const {categoryItem} = props.route.params;
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#002554',
        height: height * 0.1,
      },
      headerTitle: '',

      headerRight: () => (
        <View
          style={{
            backgroundColor: '#fff',
            width: width * 0.5,
            borderTopLeftRadius: height * 0.04,
            elevation: 5,
            borderBottomLeftRadius: height * 0.04,
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.03}}>
            About
          </Text>
        </View>
      ),
    });
  }, [props.navigation]);
  return (
    <ImageBackground
      style={{width, height, alignItems: 'center', justifyContent: 'center'}}
      source={require('../assets/bg2.jpg')}>
      <View
        style={{
          width: width * 0.9,
          height: height * 0.8,
          alignItems: 'center',
          padding: height * 0.02,
          //   justifyContent:'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}>
        <Text
          style={{
            fontSize: height * 0.04,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: height * 0.05,
          }}>
          About Us
        </Text>

        <Text
          style={{
            fontSize: height * 0.03,
            fontWeight: 'bold',
            color: '#ebe459',
            textAlign: 'center',
          }}>
          This is simple, amazing and ads free app for functions.
        </Text>
        <Text
          style={{
            fontSize: height * 0.03,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            paddingTop: height * 0.04,
          }}>
          In this app, user can create and update a number of tallys or targets to organize activities 
        </Text>
        <Text
          style={{
            fontSize: height * 0.03,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            paddingTop: height * 0.05,
          }}>
           Also , targets are reset automatically once it's done.{'\n'}
        </Text>
        <Text
          style={{
            fontSize: height * 0.03,
            fontWeight: 'bold',
            color: '#f66',
            textAlign: 'center',
            paddingTop: height * 0.01,
          }}>
          Enjoy the App
        </Text>
      </View>
    </ImageBackground>
  );
}
