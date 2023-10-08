import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Link, Tabs, Stack } from 'expo-router';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One blah</Text>
      <Link href="/lockscreen"> Lockscreen </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href='/emergency'>
        <Text>Emergency</Text>
      </Link>
      <EditScreenInfo path="app/(tabs)/index.tsx" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
