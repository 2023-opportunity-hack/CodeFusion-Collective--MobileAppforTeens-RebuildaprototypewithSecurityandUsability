import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

export default function Homepage() {
  const db = SQLite.openDatabase('safespace.db');
  const colorScheme = useColorScheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteAllData = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM journal_entries;');
      tx.executeSql('DELETE FROM journal_details;');
      tx.executeSql('DELETE FROM mood_entries;');
      tx.executeSql('DELETE FROM mood_details;');
      tx.executeSql('DELETE FROM records;');
      tx.executeSql('DELETE FROM record_details;');
    });
    setShowDeleteModal(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <Text style={{ fontFamily: 'JakartaSemiBold', fontSize: 16 }}>Are you sure you want to delete all saved data?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButtonWrapper} onPress={deleteAllData}>
                {({ pressed }) => (
                  <View style={[styles.modalButton, { backgroundColor: '#D22F27', opacity: pressed ? 0.5 : 1}]}>
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </View>
                )}
              </Pressable>
              <Pressable style={styles.modalButtonWrapper} onPress={() => setShowDeleteModal(false)}>
                {({ pressed }) => (
                  <View style={[styles.modalButton, { backgroundColor: 'green', opacity: pressed ? 0.5 : 1}]}>
                    <Text style={styles.modalButtonText}>No</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Home</Text>
      <Image source={require('../../assets/images/safe-space-logo.png')} style={styles.logo} resizeMode='contain'/>
      <Link href="/emergency" style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable style={{ marginBottom: 20 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/SOS.png')} style={styles.image} />
                <Text style={styles.buttonText}> Emergency </Text>
              </View>
              <Image source={require('../../assets/images/Back2.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/contact-professional" style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable style={{ marginBottom: 20 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/contact-professional.png')} style={styles.image} />
                <Text style={styles.buttonText}> Contact Professional </Text>
              </View>
              <Image source={require('../../assets/images/Back2.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/document-abuse" style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable style={{ marginBottom: 20 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/document-abuse.png')} style={styles.image} />
                <Text style={styles.buttonText}> Document Abuse </Text>
              </View>
              <Image source={require('../../assets/images/Back2.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/safety-plan" asChild style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable style={{ marginBottom: 20 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/safety-plan.png')} style={styles.image} />
                <Text style={styles.buttonText}> Safety Plan </Text>
              </View>
              <Image source={require('../../assets/images/Back2.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/self-care" asChild style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable style={{ marginBottom: 20 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/self-care.png')} style={styles.image} />
                <Text style={styles.buttonText}> Self Care </Text>
              </View>
              <Image source={require('../../assets/images/Back2.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/warning-signs" asChild style={{ width: '85%', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable style={{ marginBottom: 20 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/warning-sign.png')} style={styles.image} />
                <Text style={styles.buttonText}> Warning Signs </Text>
              </View>
              <Image source={require('../../assets/images/Back2.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Pressable style={{ position: 'absolute', bottom: 35, width: '85%', borderRadius: 100 }} onPress={() => setShowDeleteModal(true)}>
        {({ pressed }) => (
          <View style={[styles.deleteButton, { opacity: pressed ? 0.5 : 1 }]}>
            <Text style={styles.deleteButtonText}>Delete all data</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'JakartaMed'
  },
  backimage: {
    width: 30,
    height: 30,
    transform: [{scaleX: -1}],
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#420C5C',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#420C5C',
    marginLeft: 10,
    fontFamily: 'JakartaSemiBold'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconandtext: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  image: {
    width: 30,
    height: 30,
  },
  logo: {
    height: 200,
    width: 200,
  },
  title: {
    fontSize: 20,
    fontFamily: 'JakartaBold',
    color: '#420C5C',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
  },
  modalContents: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: '90%',
    height: '30%',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#420C5C',
    overflow: 'hidden',
    padding: 16,
    backgroundColor: '#F0EDF1'
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%"
  },
  modalButtonWrapper: {
    alignItems: 'center',
    width: "40%"
  },
  modalButton: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  modalButtonText: {
    fontFamily: 'JakartaSemiBold',
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
  },
});
