import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PageHeader } from "../../components/PageHeader";
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
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader route="/homepage" title="Safety Plan" />
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
          <ScrollView contentContainerStyle={{ paddingBottom: 25, paddingTop: 10 }}>
            {(bank[safetyCategory as keyof typeof bank] as []).map((tips: string, i: number) => (
              <View key={i} style={{ flexDirection: "row", maxWidth: "95%", padding: 5, marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>{"\u2022"}</Text>
                <Text style={styles.modalText}>{tips}</Text>
              </View>
              ))}
          </ScrollView>
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{ width: '90%', marginTop: 10}}
            >
            {({ pressed }) => (
              <View style={[styles.modalButton, { opacity: pressed ? 0.5 : 1 }]}>
                <Text style={styles.modalBack}>Back</Text>
              </View>
            )}
          </Pressable>
        </View>
      </Modal>
      {bank.Categories.map((ele: string, i: number) => {
        return (
          <Pressable key={'sp' + i} style={{  justifyContent: 'center', alignItems: 'center' }} onPress={() => { setModalVisible(true); setSafetyCategory(ele) }}>
              {({ pressed }) => (
              <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
                <View style={styles.insideButton}>
                  <Image style={styles.buttonimages} source={icons[ele as keyof typeof icons]} />
                  <Text style={styles.textStyle}>{ele}</Text>
                  <Image style={styles.backArrow} source={require('../../assets/images/Back.png')} />
                </View>
              </View>
              )}
            </Pressable>
        )
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  statement: {
    fontFamily: 'JakartaSemiBold',
    marginBottom: '6%',
    fontSize: 12,
    width: '90%'
  },
  insideButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    width: 30,
    height: 30,
    transform: [{ scaleX: -1 }],
    marginLeft: "auto"
  },
  button: {
    width: '100%',
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
    width: '85%',
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
    width: '100%',
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#683D7D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBack: {
    color: 'white',
    fontFamily: 'JakartaSemiBold',
    fontSize: 15,
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