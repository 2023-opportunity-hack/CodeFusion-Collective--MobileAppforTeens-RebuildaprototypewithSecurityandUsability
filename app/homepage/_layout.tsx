import { Pressable, StyleSheet, useColorScheme, Image } from 'react-native';
import { Link, Tabs, Stack } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { DarkTheme, DefaultTheme, NavigationContainer, StackActions, ThemeProvider } from '@react-navigation/native';

export default function HomePageLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      </Stack>
    </ThemeProvider>
  )
}