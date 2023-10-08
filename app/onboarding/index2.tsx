import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Image, Modal, StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';

const Onboarding2 = () => {

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require(`../../assets/images/onboard2.png`)} />
      <Text style={styles.title}>How it works</Text>
      <Text style={styles.description}>The app is disguised as a game to offer a layer of confidentiality and protection</Text>
      <Link style={styles.button} href="/onboarding/index3">
        <Pressable style={styles.buttontext}>
          <View><Text>How it Works &#8594;</Text></View>
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
  },
  logo: {
    width: 408,
    height: 581,
  },
  title: {
    marginVertical: 20,
    fontSize: 40,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 24,
    color: `#676767`,
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 30,
 textAlign: 'center',
  },
  separator: {
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    backgroundColor: 'f0edf1',
    borderBottomWidth: 1,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: 60,
  },
  button: {
    display: 'flex',
    width: '80%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#420C5C',
  },
  buttontext: {
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 20,
  },
});


export default Onboarding2;



