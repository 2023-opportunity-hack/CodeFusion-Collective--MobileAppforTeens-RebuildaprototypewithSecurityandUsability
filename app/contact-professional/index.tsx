import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInput } from 'react-native-gesture-handler';
import { List, RadioButton } from 'react-native-paper';
import { PageHeader } from '../../components/PageHeader';

type Timezones = {
  [key: string]: string;
};

export default function ContactProfessional() {
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');
  const [count, setCount] = useState(160);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactChoice, setContactChoice] = useState('');
  const [chosenTime, setChosenTime] = useState('');
  const [expandedList, setExpandedList] = useState(false);
  const [error, setError] = useState(0);

  const timezones: Timezones = {
    'GMT-5': 'EST',
    'GMT-6': 'CST',
    'GMT-7': 'MST',
    'GMT-8': 'PST',
  };

  const formatTimeZone = () => {
    let timeZone = new Intl.DateTimeFormat('en-us', { timeZoneName: 'short' })
    .formatToParts(new Date())
    .find(part => part.type == "timeZoneName")?.value;

    if (!timeZone) {
      return 'Error getting time zone';
    }

    if (timezones[timeZone]) {
      return timezones[timeZone];
    }

    return timeZone;
  };

  const timeZone = formatTimeZone();

  const timeValues = [
    { key: 0, value: 'ASAP' },
    { key: 1, value: 'Weekday mornings (8am - 12pm)' },
    { key: 2, value: 'Weekday midday (12pm - 5pm)' },
    { key: 3, value: 'Weekday evenings (5pm - 10pm)' },
    { key: 4, value: 'Weekend mornings (8am - 12pm)' },
    { key: 5, value: 'Weekend midday (12pm - 5pm)' },
    { key: 6, value: 'Weekend evenings (5pm - 10pm)' },
    { key: 7, value: 'No preference/anytime' },
  ];

  const data = [
    {key: '88788', value: 'Domestic Violence Hotline'},
    {key: '22522', value: 'National Teen Dating Abuse Hotline'},
    {key: '741741', value: 'Crisis Hotline'},
    {key: '988', value: 'Suicide & Crisis Lifeline'},
  ];

  const sendEmail = async () => {
    try {
      await axios.post('http://192.168.86.46:3000/contactProfessional', {
        name,
        phone,
        email,
        hotlineCenter: selected,
        checked: contactChoice,
        availability: chosenTime + timeZone,
      });
      console.log('Email sent');
      router.back();
    } catch (err) {
      console.log(err);
    }
  };

  const selectTime = (selected: string) => {
    setExpandedList(false);
    setChosenTime(selected);
    console.log("chosen time: ", selected);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  useEffect(() => {
    setCount(160 - text.length);
  }, [text]);

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
            <Text style={styles.areatitle}>Preferred Name</Text>
            <TextInput
              multiline={false}
              maxLength={20}
              value={name}
              onChangeText={handleNameChange}
              placeholder='Name'
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
                  status={ contactChoice === 'Call' ? 'checked' : 'unchecked' }
                  onPress={() => setContactChoice('Call')}
                />
                <Text style={{ fontFamily: 'JakartaMed' }}>Call/Voicemail</Text>
              </View>
              {contactChoice === 'Call'
                ? <List.Section style={{ borderRadius: 10, backgroundColor: "#F0EDF1" }} >
                    <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "#420C5C", overflow: "hidden", backgroundColor: "white"}}>
                      <List.Accordion
                        title={'When would you prefer to be contacted?'}
                        description={chosenTime.length > 0 ? (chosenTime.includes('(') ? `${chosenTime} ${timeZone}` : chosenTime) : ''}
                        descriptionStyle={{ marginTop: 2 }}
                        titleStyle={{ fontFamily: 'JakartaSemiBold', fontSize: 14 }}
                        style={{ paddingVertical: 0,  }}
                        expanded={expandedList}
                        onPress={() => setExpandedList(!expandedList)}
                        titleNumberOfLines={2}
                      >
                        {timeValues.map((timeValue) => (
                          <List.Item
                            key={timeValue.key}
                            title={timeValue.value}
                            titleStyle={{ fontFamily: 'JakartaMed', fontSize: 14, color: chosenTime === timeValue.value ? '#420C5C' : 'gray' }}
                            onPress={() => selectTime(timeValue.value)}
                          />
                        ))}
                      </List.Accordion>
                    </View>
                  </List.Section>
                : null}
              <View style={styles.radiooption}>
                <RadioButton.Android
                  value="Text"
                  status={ contactChoice === 'Text' ? 'checked' : 'unchecked' }
                  onPress={() => setContactChoice('Text')}
                />
                <Text style={{ fontFamily: 'JakartaMed' }}>Text</Text>
              </View>
              <View style={styles.radiooption}>
                <RadioButton.Android
                  value="Email"
                  status={ contactChoice === 'Email' ? 'checked' : 'unchecked' }
                  onPress={() => setContactChoice('Email')}
                />
                <Text style={{ fontFamily: 'JakartaMed' }}>Email</Text>
              </View>
            </View>
            {error === 0 ? <Text></Text> :
            <Text style={{ color:'red', fontFamily: 'JakartaMed', textAlign: 'center' }}>Please ensure all required information is filled.</Text>
            }
          </View>
          <TouchableOpacity style={styles.submitbutton} onPress={sendEmail}>
            <Text style={styles.submittext}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
    borderRadius: 100,
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
});