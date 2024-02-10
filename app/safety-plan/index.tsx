import { Link } from "expo-router";
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import bank from './safetyLibrary.jsx';

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
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.header}>
          <Link href="/homepage" asChild>
            <Pressable>
              <Image
                source={require("../../assets/images/Back.png")}
                style={styles.backimage}
              />
            </Pressable>
          </Link>
          <Text style={styles.title}>Safety Plan</Text>
        </View>
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
            <ScrollView contentContainerStyle={{ paddingBottom: 25 }}>
              {(bank[safetyCategory as keyof typeof bank] as []).map((tips: string, i: number) => (
                <View key={i} style={{ flexDirection: "row", maxWidth: "95%", padding: 5, marginBottom: 10 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>{"\u2022"}</Text>
                  <Text style={styles.modalText}>{tips}</Text>
                </View>
                ))}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "JakartaSemiBold",
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  backimage: {
    height: 30,
    width: 30,
    marginRight: "-10%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: "10%",
    marginTop: "15%",
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  statement: {
    fontFamily: 'JakartaSemiBold',
    marginHorizontal: '10%',
    marginBottom: '6%',
    fontSize: 12,
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
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#683D7D',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 10
  },
  buttonimages: {
    height: 30,
    width: 30,
  },
  textStyle: {
    color: '#683D7D',
    fontFamily: 'JakartaSemiBold',
    textAlign: 'left',
    marginLeft: 20,
    fontSize: 18,
  },
  modalView: {
    alignSelf: 'center',
    alignItems: 'center',
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
    fontFamily: "JakartaMed",
    marginLeft: 5,
    paddingTop: 3,
    fontSize: 15,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
});

export default SafePlanHome;