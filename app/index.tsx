import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Link, Tabs, Stack } from 'expo-router';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One blah</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Link href="/homepage" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
      <Link href="/warning-signs">WARNING SIGNS</Link>
      <Link href="/safety-plan">TESTING</Link>
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
