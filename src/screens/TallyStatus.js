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
import {Divider} from 'react-native-elements';
import {TallyContext} from '../context/Context';
const {height, width} = Dimensions.get('window');

export default function TallyStatus(props) {
  const {state, setState} = React.useContext(TallyContext);
  const [countValue, setCountValue] = React.useState(0);
  const durationTally = ['day', 'week', 'month', 'year', 'never'];
  const countDurationAt = ['01', '00'];
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

  React.useEffect(() => {
    setCountValue(state[modalData.idxVal].valueIncrement);
  }, [modalData]);

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

  // console.log(state, 'state,,,,');

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
              <InputSpinner
                max={10}
                min={1}
                style={{width: width * 0.4}}
                skin="clean"
                step={1}
                height={height * 0.05}
                colorMax={'#f04048'}
                colorMin={'#40c5f4'}
                // value={state[modalData.idxVal].valueIncrement}
                value={countValue}
                onChange={(num) => {
                  setCountValue(num);
                  // state[modalData.idxVal].valueIncrement = num;
                  // setState(state);

                  // [state.splice(modalData.idx, 1, {...state[modalData.idxVal].valueIncrement })];
                  // setState(state);
                  // setScreenState([...state, {...state[modalData.idxVal]}]);
                }}
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
              onLongPress={() => {
                setModalData({
                  ...modalData,
                  visible: true,
                  idxVal: idx,
                });
              }}
              delayLongPress={200}
              key={idx}
              style={{
                height: width * 0.35,
                marginVertical: height * 0.02,
                elevation: 5,
                width: width * 0.38,
                backgroundColor: e.colorSelect,
                borderTopLeftRadius: idx % 2 === 0 ? height * 0.02 : 0,
                borderBottomLeftRadius: idx % 2 === 0 ? height * 0.02 : 0,
                borderTopRightRadius: idx % 2 !== 0 ? height * 0.02 : 0,
                borderBottomRightRadius: idx % 2 !== 0 ? height * 0.02 : 0,
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
              <Text style={{fontWeight: 'bold', fontSize: height * 0.05}}>
                {e.valueIncrement}
              </Text>
              <View>
                <Text>{dateAgo(e.createdDate)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

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
              <InputSpinner
                max={10}
                min={1}
                style={{width: width * 0.4}}
                skin="clean"
                step={1}
                height={height * 0.05}
                colorMax={'#f04048'}
                colorMin={'#40c5f4'}
                // value={state[modalData.idxVal].valueIncrement}
                value={countValue}
                onChange={(num) => {
                  setCountValue(num);
                  // state[modalData.idxVal].valueIncrement = num;
                  // setState(state);

                  // [state.splice(modalData.idx, 1, {...state[modalData.idxVal].valueIncrement })];
                  // setState(state);
                  // setScreenState([...state, {...state[modalData.idxVal]}]);
                }}
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
                    state[modalData.idxVal].valueIncrement = countValue;
                    setState(state);
                    setModalData({...modalData, visible: false});
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

      {/* <ModalItem /> */}
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
