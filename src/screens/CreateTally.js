import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {ButtonGroup, Divider, Icon} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {SliderHuePicker} from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import InputSpinner from 'react-native-input-spinner';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {TallyContext} from '../context/Context';

const {height, width} = Dimensions.get('window');
export default function CreateTally(props) {
  const {state, setState} = React.useContext(TallyContext);
  const durationTally = ['day', 'week', 'month', 'year', 'never'];
  const countDurationAt = ['01', '00'];
  const targetButtons = ['no', 'yes'];
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  const [screenState, setScreenState] = React.useState({
    tallyName: '',
    durationTallyIndex: 0,
    group: 'none',
    firstCountStartsAtIndex: 0,
    colorSelect: '#fff',
    valueIncrement: 1,
    targetCountValue: '',
    targetButtonsIndex: 0,
    createdDate: today,
  });


  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTintColor:'#fff',
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
            Create
          </Text>
        </View>
      ),
    });
  }, [props.navigation]);

  const changeColor = (colorHsvOrRgb, resType) => {
    if (resType === 'end') {
      setScreenState({
        ...screenState,
        colorSelect: tinycolor(colorHsvOrRgb).toHexString(),
      });
    }
  };

  const handleSubmit = () => {
    if(screenState.tallyName){
      setState([...state, screenState]);
      setScreenState({
        tallyName: '',
        durationTallyIndex: 0,
        group: 'none',
        firstCountStartsAtIndex: 0,
        colorSelect: '',
        valueIncrement: 1,
        targetCountValue: '',
        targetButtonsIndex: 0,
        createdDate: today,
      });
      props.navigation.navigate('Tally');

    }else{
      alert('please enter the tally name')
    }
  };

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
       source={require('../assets/bg3.jpg')}
        style={{
          height: height * 0.9,
          width: width,
          alignItems: 'center',
          // backgroundColor: '#adedd9',
        }}>
        <View
          style={{
            height: height * 0.9,
            width: width * 0.9,
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={{color:'#fff', fontWeight:'bold'}}>What do you want to Tally?</Text>
            <TextInput
              onChangeText={(text) =>
                setScreenState({...screenState, tallyName: text})
              }
              value={screenState.tallyName}
              style={{backgroundColor: '#fff',height: height * 0.07, borderRadius: height * 0.01}}
              placeholder="Enter here..."
            />
          </View>

          <View>
            <Text style={{color:'#fff', fontWeight:'bold'}}>Reset Tally To Zero Every:</Text>
            <ButtonGroup
              buttons={durationTally}
              onPress={(e) =>
                setScreenState({...screenState, durationTallyIndex: e})
              }
              selectedIndex={screenState.durationTallyIndex}
            />
          </View>

          <View>
            <Text style={{color:'#fff', fontWeight:'bold'}}>Group</Text>
            <DropDownPicker
              defaultValue={screenState.group}
              items={[{label: 'None', value: 'none'}]}
              containerStyle={{height: 40, width: width * 0.4}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              onChangeItem={(itemValue, itemIndex) =>
                setScreenState({...screenState, group: itemValue.value})
              }
            />
          </View>
          {/* <View>
            <Text style={{color:'#fff', fontWeight:'bold'}}>First Count Starts at:</Text>
            <ButtonGroup
              buttons={countDurationAt}
              onPress={(e) =>
                setScreenState({...screenState, firstCountStartsAtIndex: e})
              }
              selectedIndex={screenState.firstCountStartsAtIndex}
            />
          </View> */}
          <View>
            <Text style={{color:'#fff', fontWeight:'bold'}}>Choose Color</Text>
            <View style={{marginTop: height * 0.02, width: width * 0.9}}>
              <SliderHuePicker
                oldColor={'#f67'}
                trackStyle={[{height: 12, width: width * 0.9}]}
                thumbStyle={styles.thumb}
                useNativeDriver={true}
                onColorChange={changeColor}
              />
            </View>
          </View>
          <View>
            {/* <Text style={{color:'#fff', fontWeight:'bold'}}>Default Value Increment</Text> */}
            <Text style={{color:'#fff', fontWeight:'bold'}}>First Count Starts at:</Text>
            <InputSpinner
              max={100}
              min={1}
              style={{width: width * 0.4}}
              skin="clean"
              step={1}
              height={height * 0.05}
              colorMax={'#f04048'}
              colorMin={'#fff'}
              value={screenState.valueIncrement}
              onChange={(num) => {
                setScreenState({...screenState, valueIncrement: num});
              }}
            />
          </View>
          <View>
            <Text style={{color:'#fff', fontWeight:'bold'}}>Set Target?</Text>
            <View
              style={{
                width: width * 0.8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ButtonGroup
                containerStyle={{width: width * 0.5}}
                buttons={targetButtons}
                onPress={(e) =>
                  setScreenState({...screenState, targetButtonsIndex: e})
                }
                selectedIndex={screenState.targetButtonsIndex}
              />
              {screenState.targetButtonsIndex ? (
                <TextInput
                  keyboardType="numeric"
                  value={screenState.targetCountValue}
                  style={{backgroundColor: '#fff',height: height * 0.05, width: width * 0.2}}
                  onChangeText={(text) => {
                    setScreenState({
                      ...screenState,
                      targetCountValue: text,
                    });
                  }}
                  placeholder="Enter"
                />
              ) : null}
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {height: 10, width: 10},
                shadowOpacity: 0.5,
                shadowRadius: 3,
                elevation: 10,
                height: height * 0.05,
                width: width * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: height * 0.01,
              }}>
              <Text style={{color:'#000', fontWeight:'bold'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: '#fff',
                height: height * 0.05,
                shadowColor: '#000',
                shadowOffset: {height: 10, width: 10},
                shadowOpacity: 0.5,
                shadowRadius: 3,
                elevation: 10,
                width: width * 0.3,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: height * 0.01,
              }}>
              <Text style={{color:'#000', fontWeight:'bold'}}> Save</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
});
