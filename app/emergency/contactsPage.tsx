import * as Contacts from "expo-contacts";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ContactItem from "../../components/ContactItem";
import {
  EmergencyContactsType,
  useEmergencyContactContext,
} from "../../context/contactContext";
import { ContactItemProps } from "../../lib/types";

export default function ContactsPage() {
  const [contactList, setContactList] = useState<ContactItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setEmerContacts } = useEmergencyContactContext();

  const validateContacts = async (contacts?: EmergencyContactsType) => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        const filteredData = data.map((contact) => {
          let number =
            (contact.phoneNumbers && contact.phoneNumbers[0].number) || "";
          let digitsOnly = number.replace(/\D/g, "");
          if (digitsOnly.length > 10) {
            digitsOnly = digitsOnly.slice(1);
          }
          number = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
            3,
            6
          )} - ${digitsOnly.slice(6, 10)}`;

          const newContactData: ContactItemProps = {
            name: contact.name || "",
            phoneNumbers: number,
            emergency: false,
          };

          const contactNumber = newContactData.phoneNumbers;

          if (contacts && contacts.size > 0) {
            if (contacts.has(contactNumber)) {
              newContactData.emergency = true;
              setEmerContacts(
                (prevContacts) => new Set([...prevContacts, contactNumber])
              );
              return newContactData;
            } else {
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
      const storedPermission = await SecureStore.getItemAsync(
        "contactsPermission"
      );
      const emergencyContacts = await SecureStore.getItemAsync(
        "emergencyContacts"
      );
      if (storedPermission) {
        if (emergencyContacts !== null) {
          const newSet = JSON.parse(emergencyContacts);
          const emergencySet = new Set<string>(Array.from(newSet));
          validateContacts(emergencySet);
        } else {
          validateContacts();
        }
      } else {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          validateContacts();
          await SecureStore.setItemAsync("contactsPermission", "granted");
        } else {
          alert("Permission to access contacts was denied");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting contacts: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getContacts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#683d7d" />
        </View>
      )}
      <View style={styles.header}>
        <Link href="/emergency" asChild>
          <Pressable>
            <Image
              source={require("../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Contacts</Text>
      </View>
      {contactList.map((contact, index) => (
        <ContactItem
          name={contact.name}
          phoneNumbers={contact.phoneNumbers}
          key={index}
          emergency={contact.emergency}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    gap: 3,
    marginTop: -5,
    marginBottom: 35,
  },
  loading: {
    fontSize: 20,
    marginTop: 10,
    color: "#683d7d",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    transitionProperty: "opacity, visibility",
    transitionDuration: "0.75s",
    zIndex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginTop: "20%",
    marginBottom: "10%",
  },
  backimage: {
    height: 30,
    width: 30,
    marginRight: "-10%",
  },
  title: {
    fontFamily: "JakartaSemiBold",
    fontSize: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
