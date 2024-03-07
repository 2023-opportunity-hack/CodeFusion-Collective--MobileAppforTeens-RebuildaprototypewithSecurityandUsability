import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Onboarding3 = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require(`../../assets/images/onboard3.png`)} resizeMode="stretch" />
      <Text style={styles.title}>How to Login</Text>
      <Text style={styles.description}>Tapping any one square three times in a row reveals the real application</Text>
      <Link style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} href="/lockscreen" asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.buttontext}>Enter</Text>
              <FontAwesome name="long-arrow-right" size={35} color="white" />
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
    marginVertical: 20,
    fontSize: 40,
    fontFamily: 'JakartaBold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontFamily: 'JakartaMed',
    fontSize: 24,
    color: `#676767`,
    marginTop: 10,
    width: '90%',
    marginBottom: 30,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#420C5C',
  },
  buttontext: {
    color: '#fff',
    fontFamily: 'JakartaBold',
    marginVertical: 10,
    fontSize: 25,
    marginRight: 10
  },
});

export default Onboarding3;



