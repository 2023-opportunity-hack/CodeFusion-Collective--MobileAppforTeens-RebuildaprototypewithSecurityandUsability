import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Onboarding3 = () => {
  const { width } = Dimensions.get('window');
  const descriptionFontSize = width < 391 ? 21 : 24;

  useEffect(() => {
    const setFirstTime = async () => {
      await AsyncStorage.setItem("isFirstTime", 'true');
    };

    setFirstTime();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require(`../../assets/images/onboard3.png`)} resizeMode="stretch" />
      <Text style={styles.title}>How to Login</Text>
      <Text style={[styles.description, { fontSize: descriptionFontSize }]}>
        Tapping any one square three times in a row reveals the real application
      </Text>
      <Link style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} href="/lockscreen" asChild>
        <Pressable style={{ marginTop: "5%" }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={[styles.buttontext, { includeFontPadding: false }]}>Enter</Text>
              <FontAwesome name="long-arrow-right" size={35} color="white" style={{ position: 'absolute', right: "25%" }} />
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  logo: {
    width: '100%',
    height: '55%',
  },
  title: {
    marginTop: "5%",
    fontSize: 40,
    fontFamily: 'JakartaBold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    marginVertical: "5%",
    fontFamily: 'JakartaMed',
    color: `#676767`,
    width: '90%',
    textAlign: 'center',
  },
  button: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#420C5C',
    padding: 10
  },
  buttontext: {
    color: '#fff',
    fontFamily: 'JakartaBold',
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});

export default Onboarding3;



