import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Onboarding3 = () => {
  const { width } = Dimensions.get('window');
  const descriptionFontSize = width < 391 ? 21 : 24;

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require(`../../assets/images/onboard3.png`)} resizeMode="stretch" />
      <Text style={styles.title}>How to Login</Text>
      <Text style={[styles.description, { fontSize: descriptionFontSize }]}>
        Tapping any one square three times in a row reveals the real application
      </Text>
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
    marginTop: "5%",
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



