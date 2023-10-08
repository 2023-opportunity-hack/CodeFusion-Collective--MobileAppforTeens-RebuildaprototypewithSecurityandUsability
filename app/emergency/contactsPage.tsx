import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ContactItem from "../../components/ContactItem";
import * as Contacts from 'expo-contacts';
import * as SecureStore from 'expo-secure-store';
import { ContactItemProps } from "../../lib/types";


export default function ContactsPage() {
  const [contactList, setContactList] = useState<ContactItemProps[]>([]);

  const validateContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
    });
    if (data.length > 0) {
      const filteredData = data.map((contact) => ({
        name: contact.name || "",
        phoneNumbers: (contact.phoneNumbers || []).map((number) => ({
          number: number.number || "",
        })),
      }));
      setContactList(filteredData);
    } else {
      alert("No contacts found");
    }
  };

  const getContacts = async () => {
    try {
      const storedPermission = await SecureStore.getItemAsync('contactsPermission');
      if (storedPermission) {
        validateContacts();
      } else {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
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
    <View>
      <Text>Contacts</Text>
      {contactList.map((contact, index) => (
        <ContactItem name={contact.name} phoneNumbers={contact.phoneNumbers} key={index} />
      ))}
    </View>
  )
};