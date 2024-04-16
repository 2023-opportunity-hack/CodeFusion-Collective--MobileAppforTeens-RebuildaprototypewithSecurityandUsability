import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect } from "react";
import { useColorScheme } from 'react-native';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const componentDidMount = async () => {
    try {
      const firstTime = await AsyncStorage.getItem("isFirstTime")
      if (firstTime !== null) {
        router.replace('/lockscreen')
      } else {
        router.replace('/onboarding/')
      }
    } catch (error) {
      console.error("Error in componentDidMount function: ", error);
    }
  }

  useEffect(() => {
    componentDidMount();
  }, [])
}