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
import { PageHeader } from "../../components/PageHeader";
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
            <ActivityIndicator size="large" color="#420C5C" />
          </View>
        )}
        <PageHeader route="/homepage" title="Emergency" />
        <Pressable style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={callEmergencyNum}>
            {({ pressed }) => (
              <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/telephone.png")}
                />
                <Text style={styles.text}>Call 911</Text>
              </View>
            )}
        </Pressable>
        <Pressable
          style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            setIsLoading(true);
            checkPermission(setIsLoading, emerContacts);
          }}
        >
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Image
                style={styles.image}
                source={require("../../assets/images/location.png")}
              />
              <Text style={styles.text}>Send location to contacts</Text>
            </View>
          )}
        </Pressable>
        <Link href="/emergency/contactsPage" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
          <Pressable>
            {({ pressed }) => (
              <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
                <Image
                  style={styles.image}
                  source={require("../../assets/images/friends.png")}
                />
                <Text style={styles.text}>Call a friend</Text>
              </View>
            )}
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
    padding: "5%"
  },
  text: {
    fontFamily: "JakartaSemiBold",
    color: "#683d7d",
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#683d7d",
    borderStyle: "solid",
    width: "100%",
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    transitionProperty: "opacity, visibility",
    transitionDuration: "0.75s",
    zIndex: 100,
  },
});
