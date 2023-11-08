import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import * as SMS from "expo-sms";
import { EmergencyContactsType } from "../context/contactContext";

const sendLocation = async (contacts?: EmergencyContactsType) => {
  const { coords } = await Location.getCurrentPositionAsync();
  const { latitude, longitude } = coords;
  const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
  const isAvailable = await SMS.isAvailableAsync();

  const numbersArray = Array.from(contacts || []);

  if (isAvailable) {
    await SMS.sendSMSAsync(numbersArray, locationLink);
  } else {
    alert("SMS is not available");
    console.error("SMS is not available");
  }
};

export const checkPermission = async (contacts?: EmergencyContactsType) => {
  try {
    const storedPermission = await SecureStore.getItemAsync(
      "locationPermission"
    );
    if (storedPermission) {
      await sendLocation(contacts);
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        await sendLocation(contacts);
      } else {
        alert("Permission to access location was denied");
        console.error("Permission denied");
      }
    }
  } catch (error) {
    console.error("Permission not granted: ", error);
  }
};
