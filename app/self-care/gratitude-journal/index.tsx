import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import { PageHeader } from '../../../components/PageHeader';
import { ToastMessage } from '../../../components/ToastMessage';


const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const items = [
  {label: 'List 10 things that you are grateful for in your life right now.', value: 'List 10 things that you are grateful for in your life right now.'},
  {label: 'What talent or skill do you have that you are grateful for?', value: 'What talent or skill do you have that you are grateful for?'},
  {label: 'Write about a book, movie, or song that has inspired you.', value: 'Write about a book, movie, or song that has inspired you.'},
  {label: 'List three things that you are looking forward to in the future.', value: 'List three things that you are looking forward to in the future.'},
  {label: 'Write down a happy memory.', value: 'Write down a happy memory.'}
];


export default function GratitiudeJournal() {
  const db = SQLite.openDatabaseSync('safespace.db');

  const [journalEntryLabel, setJournalEntryLabel] = useState('');
  const [gratefulEntry, setGratefulEntry] = useState('');
  const [promptEntry, setPromptEntry] = useState('');
  const [activeInput, setActiveInput] = useState('');
  const [labelAlert, setLabelAlert] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);


  const handleGratefulChange = (newEntry: string) => {
    setGratefulEntry(newEntry)
  };

  const handlePromptChange = (newEntry: string) => {
    setPromptEntry(newEntry);
  };

  const handleSubmit = async () => {
    const newDate = new Date();
    const dateTitle = newDate.toLocaleDateString('en-US', options);
    let promptValue = '';

    try {
      const existingEntry: { id: number } | null = await db.getFirstAsync('SELECT id FROM journal_entries WHERE date_title = ?', [dateTitle]);

      if (activeInput === 'gratefulEntry' && gratefulEntry.length > 0) {
        promptValue = 'Today I am grateful for';

        if (existingEntry) {
          const existingEntryId = existingEntry.id;
          await db.runAsync('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [existingEntryId, gratefulEntry, promptValue]);
          setShowSuccessToast(true);
        } else {
          const result = await db.runAsync('INSERT INTO journal_entries (date_title, date_value) VALUES (?, ?)', [dateTitle, newDate.toISOString()]);
          const journalId = result.lastInsertRowId;
          await db.runAsync('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [journalId, gratefulEntry, promptValue]);
          setShowSuccessToast(true);
        }
      } else if (activeInput === 'promptEntry' && promptEntry.length > 0 && journalEntryLabel.length > 0) {
        promptValue = journalEntryLabel;

        if (existingEntry) {
          const existingEntryId = existingEntry.id;
          await db.runAsync('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [existingEntryId, promptEntry, promptValue]);
          setShowSuccessToast(true);
        } else {
          const result = await db.runAsync('INSERT INTO journal_entries (date_title, date_value) VALUES (?, ?)', [dateTitle, newDate.toISOString()]);
          const journalId = result.lastInsertRowId;
          await db.runAsync('INSERT INTO journal_details (journal_id, description, prompt) VALUES (?, ?, ?)', [journalId, promptEntry, journalEntryLabel]);
          setShowSuccessToast(true);
        }
      } else if (activeInput === 'promptEntry' && promptEntry.length > 0 && journalEntryLabel.length === 0) {
        setLabelAlert(true);
        return;
      } else {
        setShowErrorToast(true);
        return;
      }
    } catch (error) {
      console.error('Error inserting new entry:', error);
      setShowErrorToast(true);
    } finally {
      setActiveInput('');
      setGratefulEntry('');
      setPromptEntry('');
      setJournalEntryLabel('');

      setTimeout(() => {
        if (showErrorToast) {
          setShowErrorToast(false);
        }
        setShowSuccessToast(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const createTables = async () => {
      try {
        await db.execAsync('CREATE TABLE IF NOT EXISTS journal_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, date_title TEXT, date_value TEXT)');
        await db.execAsync('CREATE TABLE IF NOT EXISTS journal_details (id INTEGER PRIMARY KEY AUTOINCREMENT, journal_id INTEGER, description TEXT, prompt TEXT, FOREIGN KEY (journal_id) REFERENCES Journal_entries(id))');
      } catch (error) {
        console.error('Error creating tables:', error);
        setShowErrorToast(true);
      }
    };

    createTables();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
      {showSuccessToast ? <ToastMessage type='success' entryName='Entry' /> : null}
      {showErrorToast ? <ToastMessage type='error' entryName='Entry' /> : null}
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
          <View style={{ marginTop: 10 }}>
            <Dropdown
              style={styles.dropDown}
              data={items}
              valueField={'value'}
              labelField={'label'}
              maxHeight={150}
              value={journalEntryLabel}
              placeholder='Select Journal Prompt'
              onChange={(item) => setJournalEntryLabel(item.value)}
              placeholderStyle={{ fontFamily: 'JakartaSemiBold', fontSize: 14, paddingLeft: 10, color: '#605F5F' }}
              selectedTextProps={{ numberOfLines: 2 }}
              selectedTextStyle={{ color: '#420C5C', fontFamily: 'JakartaSemiBold', fontSize: 14, height: 60, padding: 5 }}
              containerStyle={{  borderWidth: 1, borderColor: '#420C5C', borderTopWidth: 0 , marginTop: -2, marginLeft: 0.5 }}
              dropdownPosition={'bottom'}
              activeColor='white'
              autoScroll={false}
              renderItem={({ label }, active) => {
                return (
                  <Text
                    style={{
                      color: active ? "#420C5C" : 'gray',
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      fontFamily: 'JakartaSemiBold',
                      fontSize: 14
                    }}
                  >
                    {label}
                  </Text>
                );
              }}
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
            style={[styles.textinput, {marginTop: 0, borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, height: 180}]}
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
    </ScrollView>
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
    backgroundColor: '#F0EDF1',
    padding: '5%',
  },
  form: {
    width: '100%',
    flexDirection: 'column',
    paddingBottom: '10%',
  },
  dropDown: {
    borderColor: '#420C5C',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    height: 60,
  },
  textinput: {
    fontFamily: "JakartaMed",
    borderWidth: 1,
    borderColor: '#420C5C',
    borderRadius: 5,
    padding: 5,
    height: 150,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    textAlignVertical: 'top',
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