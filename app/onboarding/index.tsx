import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Onboarding = () => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require(`../../assets/images/onboard1.png`)}
        resizeMode="contain"
        />
      <Link style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} href="/onboarding/index2" asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.buttontext}>How it works </Text>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  logo: {
    height: "80%",
    width: '100%',
  },
  button: {
    display: 'flex',
    marginTop: "5%",
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

export default Onboarding;