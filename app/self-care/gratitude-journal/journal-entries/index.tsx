import { Pressable, StyleSheet, useColorScheme, Image, View, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';


export default function JournalEntries() {
  const db = SQLite.openDatabase('safespace.db');
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const items: {label: string; value: string}[] = [
    {label: 'Placeholder 1', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, '}, {label: 'Placeholder 2', value: 'The quick brown fox jumped over the lazy moon'}, {label: 'Placeholder 3', value: 'She sells seashells down by the seashore.'}
    ];

    useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM journal_entries', undefined,
    (txObj, resultSet) => {
      console.log(resultSet.rows);
      // const bigObj = resultSet.rows;
      // for (var key in bigObj) {
      //   allEntries.push(bigObj[key])
      //   console.log(allEntries);
      // }
    })
  })
})


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Journal Entries</Text>
        <View>
          <DropDownPicker
            items={items}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={currentValue}
            setValue={(val) => setCurrentValue(val)}
            dropDownContainerStyle={{
              alignSelf: 'center',
              position: 'relative',
              top: 0,
          }}
          />
        </View>
        <Text style={styles.entry}>{currentValue}</Text>
      </View>
    </View>
  );
}

// return (
// <View style={styles.container}>
//   <View style={styles.form}>
//     <Text style={styles.title}>Journal Entries</Text>
//     {allEntries.map((entry) => (
//       <div key={entry.id}>
//         <Text>Date: {entry.date}</Text>
//         <Text>{entry.gratefulEntry}</Text>
//         <Text>{entry.promptEntry}</Text>
//       </div>
//     ))}

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