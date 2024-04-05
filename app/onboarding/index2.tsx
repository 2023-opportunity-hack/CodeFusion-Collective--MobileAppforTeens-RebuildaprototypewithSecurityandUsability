import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Onboarding2 = () => {
  const { width } = Dimensions.get('window');
  const descriptionFontSize = width < 391 ? 21 : 24;

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require(`../../assets/images/onboard2.png`)}
        resizeMode="stretch"
        />
      <Text style={styles.title}>How it works</Text>
      <Text style={[styles.description, { fontSize: descriptionFontSize }]}>The app is disguised as a game to offer a layer of confidentiality and protection</Text>
      <Link style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} href="/onboarding/index3" asChild>
        <Pressable style={{ marginTop: "5%" }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={[styles.buttontext, { includeFontPadding: false }]}>How to Login</Text>
              <FontAwesome name="long-arrow-right" size={35} color="white" style={{ position: 'absolute', right: "15%" }} />
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  logo: {
    width: '100%',
    height: '55%',
  },
  title: {
    fontSize: 40,
    marginTop: "5%",
    fontFamily: 'JakartaBold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontFamily: 'JakartaMed',
    marginVertical: "5%",
    width: '90%',
    color: `#676767`,
    textAlign: 'center',
  },
  button: {
    display: 'flex',
    position: 'relative',
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

export default Onboarding2;



