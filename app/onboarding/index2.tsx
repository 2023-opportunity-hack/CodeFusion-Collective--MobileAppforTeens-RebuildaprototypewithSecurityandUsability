import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Image, Modal, StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';

const Onboarding2 = () => {

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require(`../../assets/images/onboard2.png`)} />
      <Text style={styles.title}>How it works</Text>
      <Text style={styles.description}>The app is disguised as a game to offer a layer of confidentiality and protection</Text>
      <Link style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} href="/onboarding/index3" asChild>
        <Pressable>
          <View style={styles.button}><Text style={styles.buttontext}>How it Works </Text></View>
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
    width: '50%',
    height: '40%',
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



