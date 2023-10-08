import { Pressable, StyleSheet, useColorScheme, Image, View, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { dismissBrowser } from 'expo-web-browser';


export default function JournalEntries() {
  const db = SQLite.openDatabase('safespace.db');
  const [entries, setEntries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const items = [];

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM journal_entries', undefined,
        (txObj, resultSet) => {
          console.log(resultSet.rows);
        })
      })
    })

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Journal Entries</Text>
          <DropDownPicker
            items={entries}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={currentValue}
            setValue={(val) => setCurrentValue(val)}
            dropDownContainerStyle={{
              top: 0,
              maxHeight: 150,
          }}
          />
        <Text style={styles.entry}>{currentValue}</Text>
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
    backgroundColor: '#F0EDF1',
  },
  entry: {
    marginTop: 10,
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