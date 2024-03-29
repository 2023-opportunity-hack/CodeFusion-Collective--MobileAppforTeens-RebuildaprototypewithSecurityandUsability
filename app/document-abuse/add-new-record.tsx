import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import MediaUploadModal from "../../components/MediaUploadModal";
import { PageHeader } from '../../components/PageHeader';

export default function AddNewRecordPage() {
  const db = SQLite.openDatabase('safespace.db');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>('');


  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  }

  const showDatePicker = () => {
    setDate(new Date());
    setShow(true);
  }

  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleSubmit = () => {
    const newDate = new Date();
    const currentDate = newDate.toISOString().slice(0, 10);

    if (date && text.length > 0) {
      db.transaction((tx) => {
        tx.executeSql('SELECT id FROM records WHERE date = ?;', [currentDate], (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            const recordId = resultSet.rows.item(0).id;

            tx.executeSql('INSERT INTO record_details (record_id, description, date) VALUES (?, ?, ?);', [recordId, text, date.toISOString()], (_, resultSetDetails) => {
              router.back();
            })
          } else {
            tx.executeSql('INSERT INTO records (date) VALUES (?)', [currentDate],
            (_, resultSet) => {
              const recordId = resultSet.insertId;

              tx.executeSql('INSERT INTO record_details (record_id, description, date) VALUES (?, ?, ?)', [recordId!, text, date.toISOString()],
              (_, resultSetDetails) => {
                router.back();
              })
            },
            );
          }
        });
      });
    }
  }

  useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql('DROP TABLE IF EXISTS records');
      // tx.executeSql('DROP TABLE IF EXISTS record_details');
      tx.executeSql('CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)');
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS record_details (id INTEGER PRIMARY KEY AUTOINCREMENT, record_id INTEGER, description TEXT, date TEXT, FOREIGN KEY (record_id) REFERENCES Records(id))'
      );
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <PageHeader route="/document-abuse" title="Add New Record" />
      <View style={[styles.descriptionContainer, { marginBottom: 40 }]}>
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
              value={date || new Date()}
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
              {({ pressed }) => (
                <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
                  <Text style={styles.buttonText}>Done</Text>
                </View>
              )}
            </Pressable>
          </>
        )}
      </View>
      <Pressable
        style={styles.buttonWrapper}
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
        disabled={text.length === 0 || !date}
      >
        {({ pressed }) => (
          <View style={[styles.button, { opacity: pressed || text.length === 0 || !date ? 0.5 : 1 }]}>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0EDF1',
    padding: "5%",
  },
  descriptionContainer: {
    width: '100%',
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
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60
  },
  button: {
    width: '100%',
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
})