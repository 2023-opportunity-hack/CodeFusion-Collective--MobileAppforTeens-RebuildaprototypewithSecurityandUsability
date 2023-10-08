import { useLayoutEffect } from "react";
import { Image, Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Contacts from 'expo-contacts';

export default function Emergency() {

  const handlePress = () => {

  };

  return (
    <View style={styles.container} >
      <Pressable style={styles.button} onPress={handlePress}>
        <Image style={styles.image} source={require("../../assets/images/telephone.png")} />
        <Text style={styles.text}>Call 911</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handlePress}>
        <Image style={styles.image} source={require("../../assets/images/location.png")} />
        <Text style={styles.text}>Send location to contacts</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handlePress}>
        <Image style={styles.image} source={require("../../assets/images/friends.png")} />
        <Text style={styles.text}>Call a friend</Text>
      </Pressable>
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
  }
});
