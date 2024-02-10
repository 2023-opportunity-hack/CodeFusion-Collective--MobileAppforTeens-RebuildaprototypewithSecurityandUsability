import { Pressable, StyleSheet, Text, View } from "react-native"

interface modalProps {
  text: string | undefined,
  time: boolean,
  date: string | undefined,
  closeModal: () => void,
}

export default function DocumentModal({text, time, date, closeModal}: modalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Date</Text>
      <Text style={styles.details}>{date ? new Date(date).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) : 'N/A'}</Text>
      <Text style={styles.subtitle}>Time</Text>
      <Text style={styles.details}>{time && date ? new Date(date).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}) : 'N/A'}</Text>
      <Text style={styles.subtitle}>Description</Text>
      <Text style={styles.details}>{text}</Text>
      <Pressable
        onPress={closeModal}
        style={styles.pressable}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Close</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  subtitle: {
    fontWeight: 'bold',
  },
  details: {
    marginBottom: 20,
  },
  pressable: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#420C5C',
  },
  buttonText: {
    marginVertical: 5,
    fontSize: 20,
    color: '#fff',
  }
})