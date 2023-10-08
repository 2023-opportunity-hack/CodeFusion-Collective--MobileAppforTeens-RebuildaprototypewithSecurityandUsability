import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, ScrollView, View} from 'react-native';
import bank from './safetyLibrary.jsx'

const SafePlanHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [safetyCategory, setSafetyCategory] = useState('Home');


  return (
    <View style={styles.centeredView}>
      <Text>{bank.Statement}</Text>
      {
      bank.Categories.map((ele) => {
        return <View><Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
            {bank[safetyCategory].map((tips) => {return <Text style={styles.modalText}>{tips}</Text>})}
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
                <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {setModalVisible(true); setSafetyCategory(ele)}}>
        <Text style={styles.textStyle}>{ele}</Text>
      </Pressable>
      </View>
    })}
    </View>
    );

  }

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:'#F0EDF1'
  },
  modalView: {
    margin: 20,
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
    padding: 10,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#683D7D'
  },
  buttonOpen: {
    backgroundColor: '#ffffff',
  },
  buttonClose: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: '#683D7D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SafePlanHome;