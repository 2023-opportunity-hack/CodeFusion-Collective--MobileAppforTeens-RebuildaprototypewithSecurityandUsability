import { router } from "expo-router";
import { useEffect, useState, } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import TicTacToePin from "../../components/TicTacToePin";


export default function Lockscreen() {
  const initialBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const [buttonSequence, setButtonSequence] = useState<string[]>([]);
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);


  const handlePress = (rowIndex: number, squareIndex: number) => {
    if (buttonSequence.length === 0) {
      setButtonSequence([`${rowIndex}${squareIndex}`]);
    } else if (buttonSequence[0] === `${rowIndex}${squareIndex}`) {
      setButtonSequence([...buttonSequence, `${rowIndex}${squareIndex}`]);
    } else {
      setButtonSequence([`${rowIndex}${squareIndex}`]);
    }

    if (buttonSequence.length === 2) {
      setButtonSequence([]);
      router.replace('/homepage');
    }

    if (board[rowIndex][squareIndex] === '' && !winner) {
      const newBoard = [...board];
      newBoard[rowIndex][squareIndex] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
        setWinner(board[i][0]);
        if (board[i][0] === 'X') {
          setXScore((prevScore) => prevScore + 1);
        } else {
          setOScore((prevScore) => prevScore + 1);
        }
        break;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
        setWinner(board[0][i]);
        if (board[0][i] === 'X') {
          setXScore((prevScore) => prevScore + 1);
        } else {
          setOScore((prevScore) => prevScore + 1);
        }
        break;
      }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
      setWinner(board[0][0]);
      if (board[0][0] === 'X') {
        setXScore((prevScore) => prevScore + 1);
      } else {
        setOScore((prevScore) => prevScore + 1);
      }
    } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
      setWinner(board[0][2]);
      if (board[0][2] === 'X') {
        setXScore((prevScore) => prevScore + 1);
      } else {
        setOScore((prevScore) => prevScore + 1);
      }
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setWinner('');
    setButtonSequence([]);
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (winner) {
      Alert.alert(`Player ${winner} wins!`, 'Restart the game', [
        {
          text: 'OK',
          onPress: resetBoard,
        }
      ]);
    }
  }, [winner]);

  useEffect(() => {
    if (!winner) {
      const isBoardFull = board.every(row => row.every(square => square !== ''));
      if (isBoardFull) {
        Alert.alert('It\'s a tie', ' ', [
          {
            text: 'OK',
            onPress: resetBoard,
          }
        ]);
      }
    }
  }, [board]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIC-TAC-TOE</Text>
      <View style={styles.separator} />
      <View style={styles.scoreboard}>
        <Text style={[{color: '#683D7D'}, styles.score]}>{xScore}</Text>
        <Text style={styles.score}> : </Text>
        <Text style={[{color: '#27B6AF'}, styles.score]}>{oScore}</Text>
      </View>
      <TicTacToePin board={board} onPress={handlePress}/>
      <Pressable style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={() => resetBoard()}>
        {({ pressed }) => (
          <View style={[styles.button, { marginTop: 5, backgroundColor: '#420C5C', opacity: pressed ? 0.5 : 1 }]}>
            <Text style={[styles.buttontext, {color: '#fff', fontWeight: 'bold'}]}>New Game</Text>
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