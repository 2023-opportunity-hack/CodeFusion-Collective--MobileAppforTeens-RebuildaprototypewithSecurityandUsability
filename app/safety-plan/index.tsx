import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';
import bank from './safetyLibrary.jsx'

const SafePlanHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [safetyCategory, setSafetyCategory] = useState('Home');


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Plan</Text>
      <Text style={styles.statement}>{bank.Statement}</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={[styles.container, styles.modalView]}>
          <Image style={styles.buttonimages} source={`../../assets/images/${safetyCategory}.png`} />
            <ScrollView>
              {bank[safetyCategory].map((tips) => { return <Text style={styles.modalText}>{`\u2022 ${tips}`}</Text> })}
            </ScrollView>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalBack}>Back</Text>
            </Pressable>

          </View>
      </Modal>
      {bank.Categories.map((ele) => {
        return <View style={styles.button}>
          <Pressable style={styles.pressArea}
            onPress={() => { setModalVisible(true); setSafetyCategory(ele) }}>
            <View style={styles.insideButton}>
              <Image style={styles.buttonimages} source={`../../assets/images/${ele}.png`} />
              <Text style={styles.textStyle}>{ele}</Text>
            </View>
          </Pressable>
          <Image style={styles.backArrow} source={require('../../assets/images/Back.png')} />
        </View>
      })}
    </View>
  );

}

const styles = StyleSheet.create({
  title: {
    fontWeight: `500`,
    fontSize: 80,
    marginBottom: '6%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statement: {
    marginHorizontal: '10%',
    marginBottom: '6%',
    fontSize: 15,
  },
  pressArea: {
    width: '90%',
  },
  insideButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    width: 30,
    height: 30,
    transform: [{scaleX: -1}],
    color: '#420C5C',
    align: 'right',
  },
  button: {
    width: '70%',
    height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#683D7D',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  buttonimages: {
    height: 30,
    width: 30,
  },
  textStyle: {
    color: '#683D7D',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F0EDF1',
    borderRadius: 20,
    padding: 10,
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
  modalButton: {
    height: '5%',
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#683D7D',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBack: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 30,
    fontSize: 17,
    textAlign: 'left',
  },
});

export default SafePlanHome;