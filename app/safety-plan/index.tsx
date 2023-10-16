import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';
import bank from './safetyLibrary.jsx'
import { red400 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors.js';

const SafePlanHome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [safetyCategory, setSafetyCategory] = useState('Home');

  const icons = {
    Home: require(`../../assets/images/Home.png`),
    Basics: require(`../../assets/images/Basics.png`),
    School: require(`../../assets/images/School.png`),
    Technology: require(`../../assets/images/Technology.png`),
    Job: require(`../../assets/images/Job.png`),
    Children: require(`../../assets/images/Children.png`),
    Partner: require(`../../assets/images/Partner.png`),
  };

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
          <Image style={styles.buttonimages} source={icons[safetyCategory as keyof typeof icons]} />
          <ScrollView>
            {(bank[safetyCategory as keyof typeof bank] as []).map((tips: string, i: number) => { return <Text key={i} style={styles.modalText}>{`\u2022 ${tips}`}</Text> })}
          </ScrollView>
          <Pressable
            style={styles.modalButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.modalBack}>Back</Text>
          </Pressable>

        </View>
      </Modal>
      {bank.Categories.map((ele: string, i: number) => {
        return <View key={'sp' + i} style={styles.button}>
          <Pressable style={styles.pressArea}
            onPress={() => { setModalVisible(true); setSafetyCategory(ele) }}>
            <View style={styles.insideButton}>
              <Image style={styles.buttonimages} source={icons[ele as keyof typeof icons]} />
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
    fontSize: 40,
    marginBottom: '6%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    transform: [{ scaleX: -1 }],
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
    alignSelf: 'center',
    justifyContent: 'center',
    width: '70%',
    marginTop: '30%',
    maxHeight: '70%',
    backgroundColor: '#F0EDF1',
    borderRadius: 20,
    padding: 10,
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
    justifyContent: 'center',
    marginTop: 10,
  },
  modalBack: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'left',
  },
});

export default SafePlanHome;