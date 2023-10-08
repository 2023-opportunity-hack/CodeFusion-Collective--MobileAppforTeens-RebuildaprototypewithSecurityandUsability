import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Image, Modal, StyleSheet, Text, Pressable, ScrollView, View } from 'react-native';

const Onboarding = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require(`../../assets/images/onboard1.png`)} />
      <Link style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} href="/onboarding/index2" asChild>
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
    height: '70%',
    width: '70%',
    margin: 10,
  },
  title: {
    marginVertical: 20,
    fontSize: 40,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
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

export default Onboarding;