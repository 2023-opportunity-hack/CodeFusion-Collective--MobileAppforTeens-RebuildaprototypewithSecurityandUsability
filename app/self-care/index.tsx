import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function SelfCare() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.header}>
        <Link href="/homepage" asChild>
          <Pressable>
            <Image
              source={require("../../assets/images/Back.png")}
              style={styles.back}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Self Care</Text>
      </View>
      <Image source={require('../../assets/images/self-care.png')} style={styles.logo} resizeMode='contain'/>
      <Text style={styles.pagedescription}>Self care means taking time to do good things for yourself. Even small acts of self care in your daily life can have a big impact. Self care looks different for everyone. You may try different things before discovering what works best for you. </Text>
      <Link href="/self-care/gratitude-journal" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
            <Image source={require('../../assets/images/gratitude-journal.png')} style={styles.image} />
            <Text style={styles.buttonText}>
              Gratitude Journal
            </Text>
          </View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/self-care/mood-tracker" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
            <Image source={require('../../assets/images/mood-tracker.png')} style={styles.image} />
            <Text style={styles.buttonText}>
              Mood Tracker
            </Text>
          </View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/self-care/my-strategies" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
            <Image source={require('../../assets/images/my-strategies.png')} style={styles.image} />
            <Text style={styles.buttonText}>
              My Strategies
            </Text>
          </View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
        </Pressable>
      </Link>
      <Link href="/self-care/resources" asChild>
        <Pressable style={styles.button}>
          <View style={styles.iconandtext}>
            <Image source={require('../../assets/images/resources.png')} style={styles.image} />
            <Text style={styles.buttonText}>
              Resources
            </Text>
          </View>
          <Image source={require('../../assets/images/Back.png')} style={styles.backimage} />
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
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#420C5C',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
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
    width: '90%',
    marginBottom: "10%",
    marginTop: "5%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginTop: "20%",
    marginBottom: "10%",
  },
  back: {
    height: 30,
    width: 30,
    marginRight: "-10%",
  },
  title: {
    fontFamily: "JakartaSemiBold",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
