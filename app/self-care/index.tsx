import { Pressable, StyleSheet, useColorScheme, Image } from 'react-native';
import { Link, Tabs, Stack } from 'expo-router';
import { Text, View } from '../../components/Themed';

export default function SelfCare() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Self Care</Text>
      <Image source={require('../../assets/images/self-care.png')} style={styles.logo} resizeMode='contain'/>
      <Text style={styles.pagedescription}>Self care means taking time to do good things for yourself. Even small acts of self care in your daily life can have a big impact. Self care looks different for everyone. You may try different things before discovering what works best for you. </Text>
      <Link href="/self-care/gratitude-journal" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/gratitude-journal.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Gratitude Journal </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/self-care/mood-tracker" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/mood-tracker.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Mood Tracker </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/self-care/my-strategies" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/my-strategies.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            My Strategies </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/self-care/resources" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
          <Image source={require('../../assets/images/resources.png')} style={styles.image} />
          <Text style={styles.buttonText}>
            Resources </Text></View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
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
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#420C5C',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
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
    width: '70%',
    marginBottom: 10,
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
