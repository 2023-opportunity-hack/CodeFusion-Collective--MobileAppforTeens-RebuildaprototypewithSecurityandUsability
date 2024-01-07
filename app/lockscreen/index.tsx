import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import TicTacToePin from "../../components/TicTacToePin";

export default function Lockscreen() {
  const [buttonSequence, setButtonSequence] = useState('');

  const checkButtonPress = (button: string) => {
    setButtonSequence((oldSequence) => (oldSequence + button));
  }

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
  }

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
  }, [buttonSequence])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TIC TAC TOE</Text>
            <View style={styles.separator} lightColor="#000" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.scoreboard}>
              <Text style={[{color: '#683D7D'}, styles.score]}>0</Text>
              <Text style={styles.score}> : </Text>
              <Text style={[{color: '#27B6AF'}, styles.score]}>0</Text>
            </View>
            <TicTacToePin checkButtonPress={checkButtonPress}/>
            <View style={[styles.button, {marginBottom: 20, backgroundColor: '#420C5C'}]}>
              <Text style={[styles.buttontext, {color: '#fff', fontWeight: 'bold'}]}>New Game</Text>
            </View>
            <View style={styles.button}>
              <Text style={[styles.buttontext, {color: '#420C5C'}]}>Reset Game</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    button: {
      width: '80%',
      borderWidth: 1,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttontext: {
      marginVertical: 10,
      fontSize: 20,
    }
});