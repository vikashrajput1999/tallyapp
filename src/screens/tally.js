import React from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import {useIsFocused} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import {TallyContext} from '../context/Context';
import {TextInput} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

export default function TallyPage(props) {
  const {state, setState} = React.useContext(TallyContext);
  const [abc, setAbc] = React.useState(0);
  const isFocused = useIsFocused();
  const [countValue, setCountValue] = React.useState();
  const durationTally = ['day', 'week', 'month', 'year', 'never'];
  const countDurationAt = ['01', '00'];

  const getInitialData = async () => {};
  React.useEffect(() => {
    getInitialData();
  }, [props.navigation, isFocused]);
  const [modalData, setModalData] = React.useState({
    idxVal: 0,
    visible: false,
  });
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: '#adedd0',
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
            height: height * 0.06,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.03}}>
            Tally
          </Text>
        </View>
      ),
    });
  }, [props.navigation]);

  const dateAgo = (date) => {
    var startDate = new Date(date);
    var diffDate = new Date(new Date() - startDate);
    return (
      diffDate.toISOString().slice(0, 4) -
      1970 +
      'Y ' +
      diffDate.getMonth() +
      'M ' +
      (diffDate.getDate() - 1) +
      'D'
    );
  };


  const ModalItem = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalData.visible}
          onRequestClose={() => {
            setModalData({...modalData, visible: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={[
                  {
                    ...styles.modalText,
                    fontSize: height * 0.03,
                    fontWeight: 'bold',
                  },
                ]}>
                Add Count
              </Text>
              <TextInput
                placeholder="Enter..."
                style={{
                  borderWidth: 1,
                  width: width * 0.3,
                  height: height * 0.05,
                }}
                keyboardType="numeric"
                value={countValue}
                onChangeText={(text) => setCountValue(text)}
              />
              <Divider
                style={{
                  backgroundColor: 'black',
                  marginTop: height * 0.03,
                  height: 1,
                  width: width * 0.5,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  height: height * 0.05,
                  width: width * 0.5,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => setModalData({...modalData, visible: false})}
                  style={{
                    padding: 2,
                    width: width * 0.2,
                    alignItems: 'center',
                    borderRadius: height * 0.01,
                    borderWidth: 1,
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    state[modalData.idxVal].valueIncrement =
                      state[modalData.idxVal].valueIncrement +
                      parseInt(countValue ? countValue : '0');
                    setState(state);
                    setModalData({...modalData, visible: false});
                    setCountValue(undefined);
                  }}
                  style={{
                    padding: 2,
                    width: width * 0.2,
                    alignItems: 'center',
                    borderRadius: height * 0.01,
                    borderWidth: 1,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider />
        </Modal>
      </View>
    );
  };

  return (
    <View
      style={{width, height, alignItems: 'center', backgroundColor: '#adedd9'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: width * 0.85,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
        style={{
          height: height * 0.9,
          marginBottom: height * 0.1,
          flexWrap: 'wrap',
        }}>
        {state.map((e, idx) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (state[idx].targetCountValue) {
                  setAbc(state[idx].valueIncrement);
                  state[idx].valueIncrement = state[idx].valueIncrement + 1;
                  setState(state);
                } else {
                  console.log('target');
                }
              }}
              onLongPress={() => {
                !state[idx].targetCountValue
                  ? setModalData({
                      ...modalData,
                      visible: true,
                      idxVal: idx,
                    })
                  : null;
              }}
              delayLongPress={200}
              key={idx}
              style={{
                height: width * 0.35,
                marginVertical: height * 0.02,
                elevation: 5,
                width: width * 0.38,
                backgroundColor: e.colorSelect,
                borderRadius: height * 0.02,
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: height * 0.026,
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                  {e.tallyName}
                </Text>
                <Text style={{textAlign: 'center'}}>
                  {durationTally[e.durationTallyIndex]}
                </Text>
              </View>
              {e.targetCountValue ? (
                <Text style={{fontWeight: 'bold', fontSize: height * 0.05}}>
                  {e.valueIncrement} / {e.targetCountValue}
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold', fontSize: height * 0.05}}>
                  {e.valueIncrement}
                </Text>
              )}
              <View>
                <Text>{dateAgo(e.createdDate)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {ModalItem()}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: height * 0.25,
    width: width * 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
