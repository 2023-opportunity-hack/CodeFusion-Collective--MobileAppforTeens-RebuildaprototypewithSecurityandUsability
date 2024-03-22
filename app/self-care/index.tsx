import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PageHeader } from '../../components/PageHeader';

export default function SelfCare() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PageHeader route="/homepage" title="Self Care" />
      <Image source={require('../../assets/images/self-care.png')} style={styles.logo} resizeMode='contain'/>
      <Text style={styles.pagedescription}>
        Self care means taking time to do good things for yourself. Even small acts of self care in your daily life can have a big impact. Self care looks different for everyone. You may try different things before discovering what works best for you.
      </Text>
      <Link href="/self-care/gratitude-journal" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable style={{ marginBottom: 15 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/gratitude-journal.png')} style={styles.image} />
                <Text style={styles.buttonText}>
                  Gratitude Journal
                </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/self-care/mood-tracker" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable style={{ marginBottom: 15 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/mood-tracker.png')} style={styles.image} />
                <Text style={styles.buttonText}>
                  Mood Tracker
                </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/self-care/my-strategies" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable style={{ marginBottom: 15 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/my-strategies.png')} style={styles.image} />
                <Text style={styles.buttonText}>
                  My Strategies
                </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
      <Link href="/self-care/resources" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} asChild>
        <Pressable style={{ marginBottom: 15 }}>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <View style={styles.iconandtext}>
                <Image source={require('../../assets/images/resources.png')} style={styles.image} />
                <Text style={styles.buttonText}>
                  Resources
                </Text>
              </View>
              <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
            </View>
          )}
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backimage: {
    width: 30,
    height: 30,
    transform: [{scaleX: -1}],
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#420C5C',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
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
    justifyContent: 'flex-start',
    padding: '5%',
    backgroundColor: '#F0EDF1',
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
  pagedescription: {
    fontFamily: "JakartaSemiBold",
    width: '100%',
    marginBottom: "10%",
    marginTop: "5%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
