import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { ContactItemProps } from "../lib/types";
import * as SecureStore from 'expo-secure-store';


export default function ContactItem({ name, phoneNumbers, emergency, setEmerContacts, emerContacts }: ContactItemProps) {
  const { number } = phoneNumbers[0];
  const iconStyles = emergency ? styles.isEmergencyIcon : styles.isNotEmergencyIcon;

  const setEmergencyContact = async () => {
    console.log("clicked button")
    if (emerContacts && emerContacts.length === 3) {
      alert("Already 3 emergency contacts. Please remove one to save");
    } else {
      console.log('got into else statement, check values: ', emerContacts)
      if (setEmerContacts) {
        console.log("made it into if check for setenmercontacts")
        setEmerContacts((prevNumbers) => [...prevNumbers, {[number]: number}]);
      }
      await SecureStore.setItemAsync('emergencyContacts', JSON.stringify(emerContacts));
    }
  };

  const removeEmergencyContact = () => {

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
      <Pressable onPress={setEmergencyContact} style={{ marginLeft: 45 }}>
        <Image style={iconStyles} source={require("../assets/images/star-icon.png")} />
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
    borderRadius: 5
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