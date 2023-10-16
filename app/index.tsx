import { useColorScheme } from 'react-native';
import { useEffect } from "react";
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const componentDidMount = async () => {
    try {
      const firstTime = await AsyncStorage.getItem("isFirstTime")
      if (firstTime != null) {
        router.replace('/lockscreen')
      } else {
        router.replace('/onboarding/')
        await AsyncStorage.setItem("isFirstTime", 'true')
      }
    } catch (error) {
      console.error("Error in componentDidMount function: ", error);
    }
  }

  useEffect(() => {
    componentDidMount();
  }, [])
}