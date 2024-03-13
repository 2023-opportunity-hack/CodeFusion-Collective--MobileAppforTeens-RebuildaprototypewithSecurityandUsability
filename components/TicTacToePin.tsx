import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface functionProps{
  checkButtonPress: (button: string) => void;
}

export default function TicTacToePin({ board, onPress }) {
  return (
    <View style={styles.board}>
      {board.map((row: string[], rowIndex: number) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((square, squareIndex) => (
            <TouchableOpacity
              key={squareIndex}
              style={styles.square}
              onPress={() => onPress(rowIndex, squareIndex)}
            >
              <Text style={styles.squareText}>{square}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    height: 100,
    width: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 36
  }
});