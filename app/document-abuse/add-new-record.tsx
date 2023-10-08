import { Pressable, StyleSheet, TextInput, Modal } from "react-native"
import { View, Text } from "../../components/Themed";
import { Link } from "expo-router";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from "react";
import MediaUploadModal from "../../components/MediaUploadModal";

export default function AddNewRecordPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<Date>();
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(false);

    if (mode === 'time') {
      setTime(currentDate);
    } else if (mode === 'date') {
      setDate(currentDate);
    }
  }

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  }

  const showDatePicker = () => {
    showMode('date');
  }

  const showTimePicker = () => {
    showMode('time');
  }

  const closeModal = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
      >
        <View>
          <MediaUploadModal closeModal={closeModal} />
        </View>
      </Modal>
      <Text style={styles.title}>Add a New Record</Text>
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
        <Text style={styles.subtitle}>Date</Text>
        <Pressable
          onPress={showDatePicker}
        >
          <View style={styles.dateContainer}>
            <Text>{date?.toLocaleDateString() ? date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select Date'}</Text>
            {/* ADD CALENDAR ICON */}
          </View>
        </Pressable>
        <Text style={styles.subtitle}>Time {'(Optional)'}</Text>
        <Pressable
          onPress={showTimePicker}
        >
          <View style={styles.dateContainer}>
            <Text>{time?.toLocaleTimeString() ? time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Select Time'}</Text>
            {/* ADD CLOCK ICON */}
          </View>
        </Pressable>
        {show && (
          <DateTimePicker
          value={new Date()}
          mode={mode}
          onChange={onChange}
          maximumDate={new Date()}
          />
        )}
      </View>
      <Pressable
        style={{width: '100%', alignItems: 'center', marginBottom: 40}} 
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.button}>
            <Text style={styles.buttonText}>Upload Media</Text>
          </View>
      </Pressable>
      <Pressable
        onPress={() => console.log('PRESSED DONE')}
        style={{width: '100%', alignItems: 'center'}}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Done</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  descriptionContainer: {
    width: '90%',
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  textbox: {
    width: '100%',
    height: 120,
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
    width: '80%',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#420C5C',
    // marginBottom: 40,
  },
  buttonText: {
    marginVertical: 10,
    fontSize: 20,
    color: '#fff',
  }
})