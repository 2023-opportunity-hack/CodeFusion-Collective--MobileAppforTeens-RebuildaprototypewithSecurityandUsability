import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

export default function Homepage() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Image source={require('../../assets/images/safe-space-logo.png')} style={styles.logo} resizeMode='contain'/>
      <Link href="/emergency" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/SOS.png')} style={styles.image} />
                <Text style={styles.buttonText}> Emergency </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/contact-professional" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/contact-professional.png')} style={styles.image} />
                <Text style={styles.buttonText}> Contact Professional </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/document-abuse" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/document-abuse.png')} style={styles.image} />
                <Text style={styles.buttonText}> Document Abuse </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/safety-plan" asChild style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/safety-plan.png')} style={styles.image} />
                <Text style={styles.buttonText}> Safety Plan </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/self-care" asChild style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/self-care.png')} style={styles.image} />
                <Text style={styles.buttonText}> Self Care </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/warning-signs" asChild style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/warning-sign.png')} style={styles.image} />
                <Text style={styles.buttonText}> Warning Signs </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  backimage: {
    width: 30,
    height: 30,
    transform: [{scaleX: -1}],
  },
  button: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#420C5C',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#420C5C',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconandtext: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  image: {
    width: 30,
    height: 30,
  },
  logo: {
    height: 200,
    width: 200,
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
