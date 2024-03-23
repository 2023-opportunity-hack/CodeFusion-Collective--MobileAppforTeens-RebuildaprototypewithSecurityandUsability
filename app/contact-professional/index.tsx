import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SMS from 'expo-sms';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInput } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import { PageHeader } from '../../components/PageHeader';

export default function ContactProfessional() {
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');
  const [count, setCount] = useState(160);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState('');
  const [error, setError] = useState(0);

  const data = [
    {key: '88788', value: 'Domestic Violence Hotline'},
    {key: '22522', value: 'National Teen Dating Abuse Hotline'},
    {key: '741741', value: 'Crisis Hotline'},
    {key: '988', value: 'Suicide & Crisis Lifeline'},
  ]

  const retrieveData = async () => {
    try {
      const fullName = await AsyncStorage.getItem('fullName')
      const phoneNumber = await AsyncStorage.getItem('phoneNumber')
      const storedEmail = await AsyncStorage.getItem('storedEmail')
      if (fullName != null) {
        setName(fullName);
      }
      if (phoneNumber != null) {
        setPhone(phoneNumber);
      }
      if (storedEmail != null) {
        setEmail(storedEmail)
      }
    } catch (error) {
      console.error("Error in retrieving info: ", error);
    }
  }

  const sendSms = async () => {
    try {
      await AsyncStorage.setItem("fullName", `${name}`)
      await AsyncStorage.setItem("phoneNumber", `${phone}`)
      await AsyncStorage.setItem("storedEmail", `${email}`)
    } catch (error) {
      console.error("Error setting info: ", error);
    }
    if ((selected === '' || checked === '') || ((checked === 'Call' || checked === 'Text') && phone === '') || (checked === 'Email' && email === '')) {
      setError(1);
    } else {
      const {result} = await SMS.sendSMSAsync(
        [`${selected}`],
        `Hi, my name is ${name}. I'd like to be contacted via ${checked}.
      Phone Number: ${phone}
      Email: ${email}
      ${text}`
      );

      console.log(result);
    }
  }

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
    retrieveData();
    const isSmsAvailable = async () => {
      await SMS.isAvailableAsync();
    }
    isSmsAvailable();
  }, [])

  useEffect(() => {
    setCount(160 - text.length)
  }, [text])

  return (
    <ScrollView nestedScrollEnabled={true}>
      <View style={styles.container}>
        <PageHeader route="/homepage" title="Contact Professional" />
        <View style={styles.form}>
          <View>
            <Text style={[styles.areatitle, { marginTop: 0 }]}>
              The dropdown menu provides a list of national hotlines you can text or call for information
            </Text>
            <SelectList
              placeholder='Please select'
              inputStyles={{ fontFamily: 'JakartaMed' }}
              setSelected={(val: string) => setSelected(val)}
              data={data}
              save="key"
              boxStyles={{borderColor: '#420C5C', borderWidth: 1, borderRadius: 10}}
              dropdownStyles={{borderColor: '#420C5C', borderWidth: 1, borderRadius: 10}}
              dropdownTextStyles={{ fontFamily: 'JakartaSemiBold' }}
            />
          </View>
          <View>
            <View style={styles.messagecontent}>
              <Text style={styles.areatitle}>Type your message here</Text>
              <Text style={styles.remainingText}>{count} remaining</Text>
            </View>
            <TextInput
              textAlignVertical='top'
              multiline={true}
              maxLength={160}
              value={text}
              onChangeText={handleTextChange}
              style={styles.textinput}
            />
          </View>
          <View>
            <Text style={styles.areatitle}>Your Name</Text>
            <TextInput
              multiline={false}
              maxLength={20}
              value={name}
              onChangeText={handleNameChange}
              placeholder='First and last name'
              placeholderTextColor="gray"
              style={styles.infoinput}
            />
          </View>
          <View>
            <Text style={styles.areatitle}>Your Phone Number</Text>
            <TextInput
              multiline={false}
              maxLength={20}
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder='+1'
              placeholderTextColor="gray"
              style={styles.infoinput}
            />
          </View>
          <View>
            <Text style={styles.areatitle}>Your Email Address</Text>
            <TextInput
              multiline={false}
              maxLength={20}
              value={email}
              onChangeText={handleEmailChange}
              placeholder='Email address'
              placeholderTextColor="gray"
              style={styles.infoinput}
            />
          </View>
          <View>
            <Text style={styles.areatitle}>Choose how you want to be contacted</Text>
            <View style={styles.radio}>
              <View style={styles.radiooption}>
                <RadioButton.Android
                  value="Call"
                  status={ checked === 'Call' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Call')}
                />
                <Text style={{ fontFamily: 'JakartaMed' }}>Call/Voicemail</Text>
              </View>
              <View style={styles.radiooption}>
                <RadioButton.Android
                  value="Text"
                  status={ checked === 'Text' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Text')}
                />
                <Text style={{ fontFamily: 'JakartaMed' }}>Text</Text>
              </View>
              <View style={styles.radiooption}>
                <RadioButton.Android
                  value="Email"
                  status={ checked === 'Email' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Email')}
                />
                <Text style={{ fontFamily: 'JakartaMed' }}>Email</Text>
              </View>
            </View>
            {error === 0 ? <Text></Text> :
            <Text style={{color:'red'}}>Please ensure all required information is filled.</Text>
            }
          </View>
          <TouchableOpacity style={styles.submitbutton} onPress={sendSms}>
            <Text style={styles.submittext}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EDF1',
    padding: "5%",
  },
  form: {
    width: '100%',
    flexDirection: 'column',
  },
  areatitle: {
    fontFamily: 'JakartaSemiBold',
    fontSize: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5
  },
  infoinput: {
    fontFamily: 'JakartaLightItalic',
    borderWidth: 1,
    borderColor: '#420C5C',
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
    borderColor: '#420C5C',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
    height: 140,
  },
  radio: {
    flexDirection: 'column',
  },
  radiooption: {
    fontFamily: 'JakartaSemiBold',
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitbutton: {
    marginBottom: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#420C5C',
  },
  submittext: {
    fontFamily: 'JakartaSemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  remainingText: {
    fontSize: 12,
    fontFamily: "JakartaSemiBold",
    color: "gray",
  }
})