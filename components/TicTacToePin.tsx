import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function TicTacToePin({ board, onPress }) {
  return (
    <View style={styles.board}>
      {board.map((row: string[], rowIndex: number) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((square, squareIndex) => (
            <TouchableOpacity
              key={squareIndex}
              style={[
                styles.square,
                { borderRightWidth: squareIndex === 2 ? 0 : 1 },
                { borderBottomWidth: rowIndex === 2 ? 0 : 1 },
                { borderLeftWidth: squareIndex === 0 ? 0 : 1 },
                { borderTopWidth: rowIndex === 0 ? 0 : 1 },
              ]}
              onPress={() => onPress(rowIndex, squareIndex)}
            >
              <Text style={[styles.squareText, { color: square === 'X' ? '#683D7D' : '#27B6AF' }]}>{square}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    marginVertical: 60,
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
    fontSize: 40
  }
});