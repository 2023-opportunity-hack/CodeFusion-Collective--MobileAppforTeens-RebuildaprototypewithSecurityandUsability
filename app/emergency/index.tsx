import { Link } from "expo-router";
import { Image, Linking, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { checkPermission } from "../../lib/utils";
import { useEmergencyContactContext } from "../../context/contactContext";


export default function Emergency() {
  const { emerContacts } = useEmergencyContactContext();

  const callEmergencyNum = async () => {
    const phoneNumber = "tel:911";

    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error making emergency phone call", error);
    }
  }

  return (
    <View style={styles.container} >
      <Pressable style={styles.button} onPress={callEmergencyNum}>
        <Image style={styles.image} source={require("../../assets/images/telephone.png")} />
        <Text style={styles.text}>Call 911</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => checkPermission(emerContacts)}>
        <Image style={styles.image} source={require("../../assets/images/location.png")} />
        <Text style={styles.text}>Send location to contacts</Text>
      </Pressable>
      <Link href='/emergency/contactsPage' style={styles.link} asChild>
        <Pressable style={styles.button}>
          <Image style={styles.image} source={require("../../assets/images/friends.png")} />
          <Text style={styles.text}>Call a friend</Text>
        </Pressable>
      </Link>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: '20%',
    alignItems: 'center',
    gap: 25
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
    borderStyle: 'solid',
    width: '85%',
    height: 40,
    position: "relative",
    backgroundColor: "#ffffff"
  },
  image: {
    height: 25,
    width: 25,
    position: "absolute",
    left: '5%'
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    backgroundColor: "black"
  },
});
