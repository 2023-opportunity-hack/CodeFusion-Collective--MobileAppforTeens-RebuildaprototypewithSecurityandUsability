import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { ContactItemProps } from "../lib/types";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { EmergencyContactsType } from "../context/contactContext";

type EmergencyContactObj = {
  [key: string]: string
};


export default function ContactItem({ name, phoneNumbers, emergency, setEmerContacts, emerContacts }: ContactItemProps) {
  const [isEmergency, setIsEmergency] = useState(emergency);
  const { number } = phoneNumbers[0];

  const setEmergencyContact = async () => {
    try {
      if (emerContacts && emerContacts.length === 3) {
        alert("Already 3 emergency contacts. Please remove one to save");
      } else {
        if (setEmerContacts) {
          await setEmerContacts((prevNumbers) => [...prevNumbers, {[number]: number}]);
          if (!isEmergency) {
            emergency = true;
            await setIsEmergency(true);
          }
        }
        await SecureStore.setItemAsync('emergencyContacts', JSON.stringify(emerContacts));
      }
    } catch (error) {
      console.error("Error setting contact as emergency: ", error);
    }
  };

  const removeEmergencyContact = async () => {
    try {
      //retreive emergency contacts
      const emergencyContacts = await SecureStore.getItemAsync('emergencyContacts');
      console.log("original emergency contacts: ", emergencyContacts)
      if (emergencyContacts) {
        const parsedContacts = JSON.parse(emergencyContacts);
        //filter out the matching number
        const newEmerContacts = parsedContacts.filter((contact: EmergencyContactObj) => contact[number] !== number);
        console.log("new emergency contacts: ", newEmerContacts);
        //store the object back on the device
        await SecureStore.setItemAsync('emergencyContacts', JSON.stringify(newEmerContacts));
        //remove emergency tags
        emergency = false;
        setIsEmergency(false);
        if (setEmerContacts) {
          console.log("made it into set function if statement")
          setEmerContacts(newEmerContacts);
        }
      } else {
        alert("Could not find emergency contacts to remove");
        console.error("Error removing emergency contact: ");
      }
    } catch (error) {
      console.error("Error removing emergency contact: ", error);
    }
  };

  const callContact = async () => {
    const phoneNumber = `tel:${number}`;

    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error making emergency phone call", error);
    }
  };

  return (
    <Pressable style={styles.container} onPress={callContact}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
      <Pressable onPress={() => isEmergency ? removeEmergencyContact() : setEmergencyContact()} style={{ marginLeft: 45 }}>
        <Image style={isEmergency ? styles.isEmergencyIcon : styles.isNotEmergencyIcon} source={require("../assets/images/star-icon.png")} />
      </Pressable>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#683d7d",
    borderRadius: 5,
    backgroundColor: "#ffffff"
  },
  name: {
    color: "#683d7d",
    marginRight: 'auto'
  },
  number: {
    color: "#683d7d",
  },
  isEmergencyIcon: {
    width: 20,
    height: 20,
  },
  isNotEmergencyIcon: {
    width: 20,
    height: 20,
    opacity: 0.4
  }
})