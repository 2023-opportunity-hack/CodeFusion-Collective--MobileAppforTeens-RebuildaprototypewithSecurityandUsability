import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Link, router } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MediaUploadModal from "../../components/MediaUploadModal";

export default function AddNewRecordPage() {
  const db = SQLite.openDatabase('safespace.db');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS abuse_documents (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, description TEXT, time_added BOOLEAN)');
    })
  }, []);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  }

  const showMode = (currentMode: string) => {
    setDate(new Date());
    setShow(true);
  }

  const showDatePicker = () => {
    showMode('date');
  }

  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleSubmit = () => {
    if (date && text.length > 0) {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO abuse_documents (date, description, time_added) VALUES (?, ?, ?)', [date.toISOString(), text, time ? 1 : 0],
        (txObj, resultSet) => {
          console.log('SUBMISSION COMPLETE');
          console.log(txObj);
          console.log(resultSet);
          router.back();
        },
        // (txObj, error) => {console.log('SUBMISSION FAILED: ', error)}
        );
      });
    } else if (!date) {
      console.error('PLEASE SELECT A DATE');
    } else if (text.length === 0) {
      console.error('PLEASE FILL OUT FORM');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start'}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <MediaUploadModal closeModal={closeModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Link href="/document-abuse" asChild>
          <Pressable>
            <Image
              source={require("../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Add a New Record</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.subtitle}>What Happened?</Text>
        <TextInput
          style={styles.textbox}
          editable
          multiline
          textAlignVertical="top"
          placeholder="Describe what happened here. Provide as much detail as possible"
          onChangeText={setText}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.subtitle}>Date of Event</Text>
        <Pressable onPress={showDatePicker}>
          <View style={styles.dateContainer}>
            <Text style={{ fontFamily: "JakartaMed"}}>{date?.toLocaleDateString() ? date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select Date'}</Text>
          </View>
        </Pressable>
        {show && (
          <>
            <DateTimePicker
              value={date}
              mode={"date"}
              display='spinner'
              onChange={onChange}
              maximumDate={new Date()}
            />
            <Pressable
              onPress={() => {
                setShow(false);
              }}
              style={{width: '100%', alignItems: 'center', marginTop: 20}}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Done</Text>
              </View>
            </Pressable>
          </>
        )}
      </View>
      <Pressable
        style={{width: '100%', alignItems: 'center', marginBottom: 40, marginTop: 60}}
        onPress={() => setModalVisible(true)}
      >
        {({ pressed }) => (
          <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
            <Text style={styles.buttonText}>Secure your photos & videos</Text>
          </View>
        )}
      </Pressable>
      <Pressable
        onPress={handleSubmit}
        style={{width: '100%', alignItems: 'center'}}
      >
        {({ pressed }) => (
          <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        )}
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0EDF1',
  },
  descriptionContainer: {
    width: '90%',
    marginBottom: 20,
    marginTop: "5%",
  },
  subtitle: {
    fontFamily: "JakartaSemiBold",
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textbox: {
    fontFamily: "JakartaSemiBold",
    width: '100%',
    height: 170,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#420C5C',
    borderRadius: 10,
    padding: 10,
  },
  dateContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#420C5C',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#420C5C',
    padding: 5,
  },
  buttonText: {
    fontFamily: 'JakartaSemiBold',
    marginVertical: 10,
    fontSize: 20,
    color: '#fff',
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
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginTop: "20%",
    marginBottom: "10%",
  },
  backimage: {
    height: 30,
    width: 30,
    marginRight: "-10%",
  },
  title: {
    fontFamily: "JakartaSemiBold",
    fontSize: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
})