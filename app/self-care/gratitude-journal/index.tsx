import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
//import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../../components/PageHeader';


const items = [
  {label: 'List 10 things that you are grateful for in your life right now.', value: 'List 10 things that you are grateful for in your life right now.'},
  {label: 'What talent or skill do you have that you are grateful for?', value: 'What talent or skill do you have that you are grateful for?'},
  {label: 'Write about a book, movie, or song that has inspired you.', value: 'Write about a book, movie, or song that has inspired you.'},
  {label: 'List three things that you are looking forward to in the future.', value: 'List three things that you are looking forward to in the future.'},
  {label: 'Write down a happy memory.', value: 'Write down a happy memory.'}
];


export default function GratitiudeJournal() {
  const db = SQLite.openDatabase('safespace.db');

  const [journalEntryLabel, setJournalEntryLabel] = useState('');
  const [gratefulEntry, setGratefulEntry] = useState('');
  const [promptEntry, setPromptEntry] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [labelAlert, setLabelAlert] = useState(false);


  const handleGratefulChange = (newEntry: string) => {
    setGratefulEntry(newEntry)
  }

  const handlePromptChange = (newEntry: string) => {
    setPromptEntry(newEntry);
  }

  const handleSubmit = () => {
    const newDate = new Date();
    const currentDate = newDate.toISOString().slice(0, 10);
    let promptValue = '';

    if (activeInput === 'gratefulEntry' && gratefulEntry.length > 0) {
      promptValue = 'Today I am grateful for';

      db.transaction((tx) => {
        tx.executeSql('SELECT id FROM journal_entries WHERE date = ?', [currentDate], (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            const journalId = resultSet.rows.item(0).id;

            tx.executeSql('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [journalId, gratefulEntry, promptValue])
          } else {
            tx.executeSql('INSERT INTO journal_entries (date) VALUES (?)', [currentDate], (_, resultSet) => {
              const journalId = resultSet.insertId;

              tx.executeSql('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [journalId!, gratefulEntry, promptValue])
            })
          }
        })
      })
    } else if (activeInput === 'promptEntry' && promptEntry.length > 0 && journalEntryLabel.length > 0) {
      promptValue = journalEntryLabel;
      db.transaction((tx) => {
        tx.executeSql('SELECT id FROM journal_entries WHERE date = ?', [currentDate], (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            const journalId = resultSet.rows.item(0).id;

            tx.executeSql('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [journalId, promptEntry, promptValue])
          } else {
            tx.executeSql('INSERT INTO journal_entries (date) VALUES (?)', [currentDate], (_, resultSet) => {
              const journalId = resultSet.insertId;

              tx.executeSql('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [journalId!, promptEntry, journalEntryLabel])
            })
          }
        })
      })
    } else if (activeInput === 'promptEntry' && promptEntry.length > 0 && journalEntryLabel.length === 0) {
      setLabelAlert(true);
      return;
    } else {
      Alert.alert('Error', 'Something went wrong', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])
    };

    setIsOpen(false);
    setActiveInput('');
    setGratefulEntry('');
    setPromptEntry('');
    setJournalEntryLabel('');
  };

  useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql('DROP TABLE IF EXISTS journal_entries');
      // tx.executeSql('DROP TABLE IF EXISTS journal_details');
      tx.executeSql('CREATE TABLE IF NOT EXISTS journal_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)');
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS journal_details (id INTEGER PRIMARY KEY AUTOINCREMENT, journal_id INTEGER, prompt TEXT, description TEXT, FOREIGN KEY (journal_id) REFERENCES Journal_entries(id))'
      );
    })
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader route="/self-care" title="Gratitude Journal" />
      <Modal
        visible={labelAlert}
        animationType='fade'
        transparent
        onRequestClose={() => setLabelAlert(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <Text style={styles.modalText}>Please select a journal prompt</Text>
            <Button mode={'text'} onPress={() => setLabelAlert(false)}>OK</Button>
          </View>
        </View>
      </Modal>
      <View style={styles.form}>
        <Text style={styles.areatitle}>Today I am grateful for...</Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          onFocus={() => setActiveInput('gratefulEntry')}
          maxLength={480}
          value={gratefulEntry}
          onChangeText={handleGratefulChange}
          placeholder='Try to list three things that went well today and why you are grateful for them.'
          placeholderTextColor={'gray'}
          returnKeyType='done'
          blurOnSubmit={true}
          onSubmitEditing={() => Keyboard.dismiss()}
          style={styles.textinput}
          />
        <View>
          <Text style={styles.areatitle}>Or, choose a journal prompt below</Text>
          <View style={{ borderRadius: 10, marginTop: 10, zIndex: 3}}>
            <DropDownPicker
              items={items}
              open={isOpen}
              setOpen={() => setIsOpen(!isOpen)}
              value={journalEntryLabel}
              setValue={(val) => setJournalEntryLabel(val)}
              dropDownContainerStyle={{ maxHeight: 150, borderColor: "#420C5C", borderRadius: 10 }}
              listItemLabelStyle={{ fontFamily: 'JakartaSemiBold', }}
              listItemContainerStyle={{ marginVertical: 5, borderRadius: 10 }}
              containerStyle={{ borderRadius: 10 }}
              selectedItemLabelStyle={{ color: "#420C5C", fontFamily: 'JakartaSemiBold' }}
              style={styles.dropDown}
              labelStyle={{ color: "#420C5C", fontFamily: 'JakartaSemiBold' }}
              showTickIcon={false}
            />
          </View>
          <TextInput
            multiline={true}
            numberOfLines={10}
            maxLength={480}
            onFocus={() => setActiveInput('promptEntry')}
            value={promptEntry}
            onChangeText={handlePromptChange}
            placeholder='Write your response here.'
            placeholderTextColor={'gray'}
            returnKeyType='done'
            blurOnSubmit={true}
            onSubmitEditing={() => Keyboard.dismiss()}
            style={[styles.textinput, {marginTop: 0, borderTopWidth: 0, borderTopStartRadius: 0, borderTopEndRadius: 0, height: 180}]}
          />
        </View>
        <Pressable
          style={{width: '100%', alignItems: 'center', marginVertical: 20}}
          onPress={handleSubmit}
          disabled={promptEntry.length === 0 && gratefulEntry.length === 0}
          >
          {({ pressed }) => (
            <View style={[styles.submitbutton, { opacity: pressed || promptEntry.length === 0 && gratefulEntry.length === 0 ? 0.5 : 1 }]}>
              <Text style={styles.submittext}>Save Journal Entry</Text>
            </View>
          )}
        </Pressable>
        <Link href="/self-care/gratitude-journal/journal-entries" asChild>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewText}>
              View Entries
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areatitle: {
    marginTop: 10,
    fontFamily: "JakartaMed",
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0EDF1',
    padding: '5%',
  },
  form: {
    width: '100%',
    height: '90%',
    flexDirection: 'column',
  },
  dropDown: {
    borderColor: '#420C5C',
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    borderRadius: 5,
  },
  textinput: {
    fontFamily: "JakartaMed",
    borderWidth: 1,
    borderColor: '#420C5C',
    borderRadius: 5,
    padding: 10,
    height: 150,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white'
  },
  submitbutton: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#420C5C',
  },
  submittext: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'JakartaSemiBold',
  },
  viewButton: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#420C5C',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  viewText: {
    color: '#420C5C',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'JakartaSemiBold',
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
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#420C5C',
    overflow: 'hidden',
    padding: 16,
    backgroundColor: '#F0EDF1',
  },
  modalText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'JakartaSemiBold',
    fontSize: 15
  }
})