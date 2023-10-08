import { Pressable, StyleSheet, useColorScheme, Image, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, Tabs, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';

export default function ContactProfessional() {
  const colorScheme = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [text, setText] = useState('');
  const [count, setCount] = useState(160);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleTextChange = (newText: string) => {
    setText(newText);
  }

  const handleNameChange = (newName: string) => {
    setName(newName);
  }

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
  }

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  }

  useEffect(() => {
    setCount(160 - text.length)
  }, [text])

  const items: {label: string; value: string}[] = [
    {label: 'Domestic Violence Hotline', value: 'Domestic Violence Hotline'}, {label: 'Teen Dating Abuse Hotline', value: 'Teen Dating Abuse Hotline'}, {label: 'Safe Helpline for Sexual Assault', value: 'Safe Helpline for Sexual Assault'},
     {label: '24 Hour Helpline', value: '24 Hour Helpline'}
    ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Professional</Text>
      <View style={styles.form}>
        <View>
          <Text style={styles.areatitle}>The dropdown menu provides a list of national hotlines you can text or call information</Text>
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
        <View style={styles.messageform}>
          <View>
            <Text style={styles.areatitle}>Type your message here</Text>
            <Text>{count} remaining</Text>
          </View>
          <TextInput
          multiline={true}
          numberOfLines={7}
          maxLength={160}
          value={text}
          onChangeText={handleTextChange}
          style={styles.textinput}/>
        </View>
        <View>
          <Text style={styles.areatitle}>Your Name</Text>
          <TextInput
          multiline={true}
          numberOfLines={1}
          maxLength={20}
          value={name}
          onChangeText={handleNameChange}
          placeholder='First and Last Name'
          placeholderTextColor="gray"
          style={styles.infoinput}/>
        </View>
        <View>
          <Text style={styles.areatitle}>Your Phone Number</Text>
          <TextInput
          multiline={true}
          numberOfLines={1}
          maxLength={20}
          value={name}
          onChangeText={handlePhoneChange}
          placeholder='+1'
          placeholderTextColor="gray"
          style={styles.infoinput}/>
        </View>
        <View>
          <Text style={styles.areatitle}>Your Email Address</Text>
          <TextInput
          multiline={true}
          numberOfLines={1}
          maxLength={20}
          value={name}
          onChangeText={handleEmailChange}
          placeholder='email address'
          placeholderTextColor="gray"
          style={styles.infoinput}/>
        </View>
        <View>
          <Text style={styles.areatitle}>Choose how you want to be contacted</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '70%',
    height: '90%',
    flexDirection: 'column',
  },
  areatitle: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoinput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})