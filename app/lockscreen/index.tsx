import { router } from "expo-router";
import { useEffect, useState, } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TicTacToePin from "../../components/TicTacToePin";

export default function Lockscreen() {
  const [buttonSequence, setButtonSequence] = useState('');

  const checkButtonPress = (button: string) => {
    setButtonSequence((oldSequence) => (oldSequence + button));
  };

  const checkSequence = (sequence: string[]) => {
    if (sequence.length < 3) {
      return false;
    }

    const firstString = sequence[0];
    for (let i = 1; i < sequence.length; i++) {
      if (firstString !== sequence[i]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (buttonSequence.length >= 3) {
      if (checkSequence(buttonSequence.split(''))) {
        setButtonSequence('');
        console.log('HURRAY');
        router.replace('/homepage');
      } else {
        setButtonSequence('');
        console.log('BOO');
        // DISPLAY ERROR MESSAGE?
      }
    }
  }, [buttonSequence]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIC TAC TOE</Text>
      <View style={styles.separator} />
      <View style={styles.scoreboard}>
        <Text style={[{color: '#683D7D'}, styles.score]}>0</Text>
        <Text style={styles.score}> : </Text>
        <Text style={[{color: '#27B6AF'}, styles.score]}>0</Text>
      </View>
      <TicTacToePin checkButtonPress={checkButtonPress}/>
      <Pressable style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {({ pressed }) => (
          <View style={[styles.button, {marginBottom: 30, marginTop: 5, backgroundColor: '#420C5C', opacity: pressed ? 0.5 : 1}]}>
            <Text style={[styles.buttontext, {color: '#fff', fontWeight: 'bold'}]}>New Game</Text>
          </View>
        )}
      </Pressable>
      <Pressable style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {({ pressed }) => (
          <View style={[styles.button, {backgroundColor: 'white', opacity: pressed ? 0.5 : 1}]}>
            <Text style={[styles.buttontext, {color: '#420C5C'}]}>Reset Game</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0EDF1',
    },
    title: {
      marginVertical: 20,
      fontSize: 40,
      fontFamily: 'JakartaBold',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      marginBottom: 20,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'solid',
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
      marginHorizontal: 10,
    },
    button: {
      width: '90%',
      borderWidth: 1,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttontext: {
      marginVertical: 15,
      fontSize: 20,
      fontFamily: 'JakartaBold',
    }
});