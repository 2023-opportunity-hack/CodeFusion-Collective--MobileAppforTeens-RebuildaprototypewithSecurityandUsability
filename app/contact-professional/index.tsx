import { Pressable, StyleSheet, useColorScheme, Image, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

export default function ContactProfessional() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [text, setText] = useState('');
  const [count, setCount] = useState(160);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [checked, setChecked] = useState('');
  const [error, setError] = useState(0);

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

  const submitHandler = () => {
    const contactmessage = {
      hotlineCenter: currentValue,
      message: text,
      name: name,
      phone: phone,
      email: email,
      checked: checked,
    };
    if ((checked === '') || ((checked === 'Call' || checked === 'Text') && (phone.length < 11)) || ((checked === 'Email') && (!email.includes('@')))) {
      setError(1);
    }
    else {
      setError(2);
    }
  };


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
        <View>
          <View style={styles.messagecontent}>
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
          value={phone}
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
          value={email}
          onChangeText={handleEmailChange}
          placeholder='email address'
          placeholderTextColor="gray"
          style={styles.infoinput}/>
        </View>
        <View>
          <Text style={styles.areatitle}>Choose how you want to be contacted</Text>
          <View style={styles.radio}>
            <View style={styles.radiooption}><RadioButton
            value="Call"
            status={ checked === 'Call' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Call')}
          />
            <Text>Call</Text>
            </View>
            <View style={styles.radiooption}><RadioButton
            value="Text"
            status={ checked === 'Text' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Text')}
          />
            <Text>Text</Text>
            </View>
            <View style={styles.radiooption}><RadioButton
            value="Email"
            status={ checked === 'Email' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Email')}
          />
            <Text>Email</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.submitbutton} onPress={submitHandler}>
          <Text style={styles.submittext}>Submit</Text>
        </TouchableOpacity>
        {error === 0 ? (
        <Text></Text>
        ) : error === 1 ? (
        <Text>Error. Please fill out missing information.</Text>
        ) : (
        <Text>Message sent!</Text>
        )}
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
    backgroundColor: '#F0EDF1'
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
  messagecontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  radio: {
    flexDirection: 'column',
  },
  radiooption: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#FFFFFF'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})