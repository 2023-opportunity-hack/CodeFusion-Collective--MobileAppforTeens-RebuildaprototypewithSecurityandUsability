import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, StyleSheet, Text } from "react-native";
import { useEmergencyContactContext } from "../context/contactContext";
import { ContactItemProps } from "../lib/types";

export default function ContactItem({
  name,
  phoneNumbers,
  emergency,
}: ContactItemProps) {
  const [isEmergency, setIsEmergency] = useState(emergency);
  const { emerContacts, setEmerContacts } = useEmergencyContactContext();

  const number = phoneNumbers;

  const setEmergencyContact = async () => {
    try {
      if ((emerContacts?.size || 0) === 3) {
        alert("Already 3 emergency contacts. Please remove one to save");
      } else {
        if (setEmerContacts) {
          await setIsEmergency(true);
          await setEmerContacts(new Set([...(emerContacts || []), number]));

          const updatedEmerContacts = new Set([
            ...(emerContacts || []),
            number,
          ]);

          const arrayFromSet = Array.from(updatedEmerContacts);
          const stringifiedArray = JSON.stringify(arrayFromSet);

          await SecureStore.setItemAsync("emergencyContacts", stringifiedArray);
        }
      }
    } catch (error) {
      console.error("Error setting contact as emergency: ", error);
    }
  };

  const removeEmergencyContact = async () => {
    try {
      const emergencyContacts = await SecureStore.getItemAsync(
        "emergencyContacts"
      );
      if (emergencyContacts) {
        const parsedContacts = JSON.parse(emergencyContacts);
        const newEmerContacts = parsedContacts.filter(
          (contact: string) => contact !== number
        );
        await SecureStore.setItemAsync(
          "emergencyContacts",
          JSON.stringify(newEmerContacts)
        );
        await setIsEmergency(false);
        if (setEmerContacts) {
          await setEmerContacts(newEmerContacts);
        }
        emergency = false;
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

  useEffect(() => {
    setIsEmergency(emergency);
  }, [emergency]);

  return (
    <Pressable style={styles.container} onPress={callContact}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.number}>{number}</Text>
      <Pressable
        onPress={() =>
          isEmergency ? removeEmergencyContact() : setEmergencyContact()
        }
        style={{ marginLeft: 45 }}
      >
        <Image
          style={
            isEmergency ? styles.isEmergencyIcon : styles.isNotEmergencyIcon
          }
          source={require("../assets/images/star-icon.png")}
        />
      </Pressable>
    </Pressable>
  );
}

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
    backgroundColor: "#ffffff",
  },
  name: {
    color: "#683d7d",
    marginRight: "auto",
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
    opacity: 0.4,
  },
});
