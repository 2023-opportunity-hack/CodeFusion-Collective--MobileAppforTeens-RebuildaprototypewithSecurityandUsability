import { Pressable, StyleSheet, useColorScheme, Image, View, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect, useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';


export default function JournalEntries() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  const items: {label: string; value: string}[] = [
    {label: 'Placeholder 1', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'}, {label: 'Placeholder 2', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'}, {label: 'Placeholder 3', value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'}
    ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal Entries</Text>
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