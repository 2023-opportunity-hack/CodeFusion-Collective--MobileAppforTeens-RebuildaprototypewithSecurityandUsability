import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEmergencyContactContext } from "../../context/contactContext";
import { checkPermission } from "../../lib/utils";

export default function Emergency() {
  const [isLoading, setIsLoading] = useState(false);
  const { emerContacts } = useEmergencyContactContext();

  const callEmergencyNum = async () => {
    const phoneNumber = "tel:911";

    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error making emergency phone call", error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.overlay}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: "20%",
    alignItems: "center",
    gap: 25,
  },
  text: {
    color: "#683d7d",
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#683d7d",
    borderStyle: "solid",
    width: "85%",
    height: 40,
    position: "relative",
    backgroundColor: "#ffffff",
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  loading: {
    color: "#683d7d",
    fontSize: 20,
  },
});
