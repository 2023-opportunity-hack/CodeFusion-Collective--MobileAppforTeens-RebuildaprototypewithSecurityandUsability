import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useState } from "react";
import { Link, Tabs, Stack, router } from 'expo-router';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
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