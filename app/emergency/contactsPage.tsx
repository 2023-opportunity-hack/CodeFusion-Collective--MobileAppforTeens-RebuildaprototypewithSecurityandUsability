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
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
      });
      if (data.length > 0) {
        const filteredData = data.map((contact) => {
          const newContactData: ContactItemProps = {
            name: contact.name || "",
            phoneNumbers: (contact.phoneNumbers || []).map((number) => ({
              number: number && number.number ? number.number : ""
            })),
            emergency: false
          };
          const contactNumber = newContactData.phoneNumbers[0].number;
          if (contacts && contacts.length > 0) {
            let [first, second, third] = contacts || [{}, {}, {}];
            if (!first) {
              first = {};
            };
            if (!second) {
              second = {};
            };
            if (!third) {
              third = {};
            };
            console.log("check values: ", first, second, third);
            console.log("check contact value: ", contact)
            if (contactNumber === first[contactNumber] || contactNumber === second[contactNumber] || contactNumber === third[contactNumber]) {
              newContactData.emergency = true;
              setEmerContacts((prevContacts) => [...prevContacts, {[contactNumber]: contactNumber}]);
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
    } catch (error) {
      alert("Contacts could not be rendered");
      console.error("Error retreiving contacts: ", error);
    }
  };

  const getContacts = async () => {
    try {
      const storedPermission = await SecureStore.getItemAsync('contactsPermission');
      const emergencyContacts = await SecureStore.getItemAsync('emergencyContacts');
      if (storedPermission) {
        if (emergencyContacts !== null) {
          validateContacts(JSON.parse(emergencyContacts));
        } else {
          validateContacts();
        }
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