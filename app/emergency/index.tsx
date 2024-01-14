import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEmergencyContactContext } from "../../context/contactContext";
import { checkPermission } from "../../lib/utils";

export default function Emergency() {
  const [isLoading, setIsLoading] = useState(false);
  const { emerContacts, setEmerContacts } = useEmergencyContactContext();

  const callEmergencyNum = async () => {
    const phoneNumber = "tel:911";

    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error making emergency phone call", error);
    }
  };

  const fetchEmergencyContacts = async () => {
    const emergencyContacts = await SecureStore.getItemAsync("emergencyContacts");
    if (emergencyContacts) {
      const parsedContacts = JSON.parse(emergencyContacts);
      const newSet = new Set<string>(Array.from(parsedContacts));
      setEmerContacts(newSet);
    }
  };

  useEffect(() => {
    fetchEmergencyContacts();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {isLoading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#683d7d" />
          </View>
        )}
        <View style={styles.header}>
          <Link href="/homepage" asChild>
            <Pressable>
              <Image
                source={require("../../assets/images/Back.png")}
                style={styles.backimage}
              />
            </Pressable>
          </Link>
          <Text style={styles.title}>Emergency</Text>
        </View>
        <Pressable style={styles.button} onPress={callEmergencyNum}>
          <Image
            style={styles.image}
            source={require("../../assets/images/telephone.png")}
          />
          <Text style={styles.text}>Call 911</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            setIsLoading(true);
            checkPermission(setIsLoading, emerContacts);
          }}
        >
          <Image
            style={styles.image}
            source={require("../../assets/images/location.png")}
          />
          <Text style={styles.text}>Send location to contacts</Text>
        </Pressable>
        <Link href="/emergency/contactsPage" style={styles.link} asChild>
          <Pressable style={styles.button}>
            <Image
              style={styles.image}
              source={require("../../assets/images/friends.png")}
            />
            <Text style={styles.text}>Call a friend</Text>
          </Pressable>
        </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 25,
  },
  text: {
    fontFamily: "JakartaSemiBold",
    color: "#683d7d",
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#683d7d",
    borderStyle: "solid",
    width: "85%",
    position: "relative",
    backgroundColor: "#ffffff",
    paddingTop: 15,
    paddingBottom: 15,
  },
  image: {
    height: 25,
    width: 25,
    position: "absolute",
    left: "5%",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    backgroundColor: "black",
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
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
