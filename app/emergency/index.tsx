import { Link } from "expo-router";
import { Image, Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import * as SecureStore from 'expo-secure-store';


export default function Emergency() {

  const callEmergencyNum = async () => {
    const phoneNumber = "tel:911";

    try {
      await Linking.openURL(phoneNumber);
    } catch (error) {
      console.error("Error making emergency phone call", error);
    }
  }

  const sendLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = coords;
    const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      await SMS.sendSMSAsync(['8013184919'], locationLink);
    } else {
      console.error("SMS is not available");
    }
  };

  const checkPermission = async () => {
    try {
      const storedPermission = await SecureStore.getItemAsync('locationPermission');
      if (storedPermission) {
        await sendLocation();
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          await sendLocation();
        } else {
          console.error("Permission denied");
        }
      }
    } catch (error) {
      console.error("Permission not granted: ", error);
    }
  };

  return (
    <View style={styles.container} >
      <Pressable style={styles.button} onPress={callEmergencyNum}>
        <Image style={styles.image} source={require("../../assets/images/telephone.png")} />
        <Text style={styles.text}>Call 911</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={checkPermission}>
        <Image style={styles.image} source={require("../../assets/images/location.png")} />
        <Text style={styles.text}>Send location to contacts</Text>
      </Pressable>
      <Link href='/emergency/contactsPage' style={styles.link}>
        {/* <Pressable > */}
          <View style={styles.linkContent}>
            <Image style={styles.linkImage} source={require("../../assets/images/friends.png")} />
            <Text style={styles.linkText}>Call a friend</Text>
          </View>
        {/* </Pressable> */}
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
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    backgroundColor: "black"
  },
  linkContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#683d7d",
    borderStyle: 'solid',
    // width: '85%',
    height: 40,
    // position: "relative",
    backgroundColor: "#ffffff",
    // display: "flex",
    // flexDirection: "row",
     width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  linkImage: {
    height: 25,
    width: 25
  },
  linkText: {
    color: "#683d7d",
    fontSize: 15,
  }
});
