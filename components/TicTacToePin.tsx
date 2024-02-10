import { Pressable, StyleSheet, View } from "react-native";

interface functionProps{
  checkButtonPress: (button: string) => void;
}

export default function TicTacToePin({ checkButtonPress = () => {} }: functionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <View style={styles.row}>
          <View style={[styles.square, {borderTopWidth: 0, borderLeftWidth: 0}]}>
            <Pressable
              onPress={() => {checkButtonPress('1')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
          <View style={[styles.square, {borderTopWidth: 0}]}>
          <Pressable
              onPress={() => {checkButtonPress('2')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
          <View style={[styles.square, {borderTopWidth: 0, borderRightWidth: 0}]}>
          <Pressable
              onPress={() => {checkButtonPress('3')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.square, {borderLeftWidth: 0}]}>
          <Pressable
              onPress={() => {checkButtonPress('4')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
          <View style={styles.square}>
          <Pressable
              onPress={() => {checkButtonPress('5')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
          <View style={[styles.square, {borderRightWidth: 0}]}>
          <Pressable
              onPress={() => {checkButtonPress('6')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
        </View>
        <View style={[styles.row, {borderBottomWidth: 0}]} >
          <View style={[styles.square, {borderBottomWidth: 0, borderLeftWidth: 0}]}>
          <Pressable
              onPress={() => {checkButtonPress('7')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
          <View style={[styles.square, {borderBottomWidth: 0}]}>
          <Pressable
              onPress={() => {checkButtonPress('8')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
          <View style={[styles.square, {borderBottomWidth: 0, borderRightWidth: 0}]}>
          <Pressable
              onPress={() => {checkButtonPress('9')}}
              style={({pressed}) => [{backgroundColor: pressed ? '#B39EBE40' : '#f0edf1'}, styles.button]}
            >
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    justifyContent: 'center',
  },
  board: {
    width: 300,
    aspectRatio: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
  },
  square: {
    height: '100%',
    width: '33%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 90,
    borderRadius: 90,
    aspectRatio: 1,
    // backgroundColor: 'black',
  }
});