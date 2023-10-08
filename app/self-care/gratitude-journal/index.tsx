import { Pressable, StyleSheet, useColorScheme, Image, View, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useMemo } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';


export default function GratitiudeJournal() {
  const [gratefulEntry, setGratefulEntry] = useState('');
  const [promptEntry, setPromptEntry] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [submitJournal, setSubmitJournal] = useState(false);
  const db = SQLite.openDatabase('safespace.db');
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql('DROP TABLE IF EXISTS journal_entries');
      tx.executeSql('CREATE TABLE IF NOT EXISTS journal_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, gratefulEntry TEXT, promptEntry TEXT)');
    })
  }, []);

  const handleGratefulChange = (newEntry: string) => {
    setGratefulEntry(newEntry)
  }

  const handlePromptChange = (newEntry: string) => {
    setPromptEntry(newEntry);
  }

  const handleSubmit = () => {
    if (promptEntry.length > 0 || gratefulEntry.length > 0) {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO journal_entries (date, gratefulEntry, promptEntry) VALUES (?, ?, ?)',
          [formattedDate, gratefulEntry, promptEntry],
          (txObj, resultSet) => {
            console.log('SUBMISSION COMPLETE');
            console.log('Number of affected rows: ', resultSet.rowsAffected);
          },
          (txObj, error) => {
            console.error('SUBMISSION FAILED: ', error);
          }
        );
      });
    }
  };

  const items: {label: string; value: string}[] = [
    {label: 'List 10 things that you are grateful for in your life right now.', value: 'List 10 things that you are grateful for in your life right now.'}, {label: 'What talent or skill do you have that you are grateful for?', value: 'What talent or skill do you have that you are grateful for?'}, {label: 'Write about a book, movie, or song that has inspired you.', value: 'Write about a book, movie, or song that has inspired you.'},
     {label: 'List three things that you are looking forward to in the future.', value: 'List three things that you are looking forward to in the future.'}, {label: 'Write down a happy memory.', value: 'Write down a happy memory.'}
    ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gratitude Journal</Text>
      <View style={styles.form}>
      <Text style={styles.areatitle}>Today I am grateful for...</Text>
        <TextInput
              multiline={true}
              numberOfLines={10}
              maxLength={480}
              value={gratefulEntry}
              onChangeText={handleGratefulChange}
              placeholder='Try to list three things that went well today and why you are grateful for them.'
              placeholderTextColor={'gray'}
              style={styles.textinput}/>
        <View>
          <Text style={styles.areatitle}>Or, choose a journal prompt below</Text>
          <DropDownPicker
            items={items}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={currentValue}
            setValue={(val) => setCurrentValue(val)}
            dropDownContainerStyle={{
              top: 0,
              maxHeight: 150,
          }}
          />
          <TextInput
              multiline={true}
              numberOfLines={10}
              maxLength={480}
              value={promptEntry}
              onChangeText={handlePromptChange}
              placeholder='Write your response here.'
              placeholderTextColor={'gray'}
              style={styles.textinput}
              />
        </View>
        <TouchableOpacity style={styles.submitbutton} onPress={handleSubmit}>
            <Text style={styles.submittext}>Save Journal Entry</Text>
        </TouchableOpacity>
        {submitJournal === true ? <Text>Submitted!</Text> : <Text></Text>}
        <Link href="/self-care/gratitude-journal/journal-entries" asChild>
          <TouchableOpacity style={styles.submitbutton}>
            <Text style={styles.submittext}>
              View Entries </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areatitle: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EDF1'
  },
  form: {
    width: '70%',
    height: '90%',
    flexDirection: 'column',
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  submitbutton: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#420C5C',
  },
  submittext: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})