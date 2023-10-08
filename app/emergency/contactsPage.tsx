import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ContactItem from "../../components/ContactItem";
import * as Contacts from 'expo-contacts';
import * as SecureStore from 'expo-secure-store';
import { ContactItemProps } from "../../lib/types";
import { checkPermission } from "../../lib/utils";
import { EmergencyContactContext, EmergencyContactsType, useEmergencyContactContext } from "../../context/contactContext";


export default function ContactsPage() {
  const [contactList, setContactList] = useState<ContactItemProps[]>([]);
  const { emerContacts, setEmerContacts } = useEmergencyContactContext();

  const validateContacts = async (contacts?:EmergencyContactsType) => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
    });
    if (data.length > 0) {
      const filteredData = data.map((contact) => {
        const newContactData: ContactItemProps = {
          name: contact.name || "",
          phoneNumbers: (contact.phoneNumbers || []).map((number) => ({
            number: number.number || "",
          })),
          emergency: false
        };
        const contactNumber = newContactData.phoneNumbers[0].number;
        if (contacts && contacts.length > 0) {
          console.log("made it into contacts validation check")
          const [first, second, third] = contacts || [];
          console.log("check values: ", first, second, third);
          console.log("check contact value: ", contact)
          if (contactNumber === first[contactNumber] || contactNumber === second[contactNumber] || contactNumber === third[contactNumber]) {
            newContactData.emergency = true;
            setEmerContacts((prevContacts) => [...prevContacts, {[contactNumber]: contactNumber}]);
            console.log("check emergencycontacts: ", emerContacts)
            console.log("check newcontactdata: ", newContactData.emergency)
            return newContactData;
          } else {
            console.log("made it into no numbers matching block")
            return newContactData;
          }
        } else {
          return newContactData;
        }
      });
      setContactList(filteredData);
    } else {
      alert("No contacts found");
    }
  };

  const getContacts = async () => {
    try {
      console.log("made it into get contacts")
      const storedPermission = await SecureStore.getItemAsync('contactsPermission');
      const emergencyContacts = await SecureStore.getItemAsync('emergencyContacts');
      if (storedPermission) {
        console.log("made it into storedpermission")
        if (emergencyContacts !== null) {
          console.log("made it into emergencycontacts check")
          validateContacts(JSON.parse(emergencyContacts));
        } else {
          validateContacts();
        }
      } else {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          console.log("made it into status equals granted section")
          validateContacts();
          await SecureStore.setItemAsync('contactsPermission', 'granted');
        } else {
          alert("Permission to access contacts was denied");
        }
      }
    } catch (error) {
      console.error("Error getting contacts: ", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      {contactList.map((contact, index) => (
        <ContactItem
          name={contact.name}
          phoneNumbers={contact.phoneNumbers}
          key={index}
          emergency={contact.emergency}
          setEmerContacts={setEmerContacts}
          emerContacts={emerContacts}
          />
      ))}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    gap: 3
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "#683d7d"
  }
})