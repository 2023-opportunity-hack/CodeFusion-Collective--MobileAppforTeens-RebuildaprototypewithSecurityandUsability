import { Pressable, StyleSheet, Modal } from "react-native"
import { View, Text } from "../../components/Themed";
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import DocumentModal from "../../components/DocumentModal";

interface documentProps {
  date: string,
  description: string,
  time_added: number,
  id: number,
}

export default function NewRecordPage() {
  const db = SQLite.openDatabase('safespace.db');
  const [documents, setDocuments] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<string>();
  const [modalTime, setModalTime] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM abuse_documents', undefined, 
      (txObj, resultSet) => {
        console.log('SUCCESS READING DATABASE');
        console.log(resultSet.rows);
        setDocuments(resultSet.rows._array);
      },
      // (txObj, error) => console.log(error)
      );
    });
  }, [])

  const openModal = (doc) => {
    setModalDate(doc.date);
    setModalTime(doc.time_added ? true : false)
    setModalText(doc.description);
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  const listDocuments = () => {
    return documents.map((document , index)=> {
      console.log('HERE ARE THE DOCUMENTS: ', document);
      return (
        <Pressable 
          style={styles.pressable} 
          key={document.date}
          onPress={() => openModal(document)}
        >
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {new Date(document.date).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
            </Text>
            <Text style={styles.rowText}> </Text>
            <Text style={styles.rowText}>
              {document.time_added ? new Date(document.date).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}) : ''}
            </Text>
          </View>
        </Pressable>
      )
    })
  }

  return (
    <View style={styles.container}>
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {setModalVisible(!modalVisible)}}
      >
      <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <DocumentModal 
              text={modalText}
              time={modalTime}
              date={modalDate}
              closeModal={closeModal}
            />
          </View>
        </View>
      </Modal>
      {listDocuments()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  pressable: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  row: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 16,
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
  },
  modalContents: {
    width: '90%',
    height: '50%',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#420C5C',
    overflow: 'hidden',
    padding: 16,
  }
})