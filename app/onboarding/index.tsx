import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Onboarding = () => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/onboardingNew.png")}
        contentFit="contain"
        onError={(err) => console.log("error: ", err)}
        />
      <Link style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} href="/onboarding/index2" asChild>
        <Pressable style={{ marginTop: "5%" }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={[styles.buttontext, { includeFontPadding: false }]} >How it works </Text>
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
    backgroundColor: 'white',
  },
  logo: {
    height: "80%",
    width: '100%',
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

export default Onboarding;