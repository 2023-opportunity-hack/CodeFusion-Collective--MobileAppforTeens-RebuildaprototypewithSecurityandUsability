import { A } from '@expo/html-elements';
import { Pressable, StyleSheet, Text, View } from "react-native";

interface functionProps {
  closeModal: () => void;
}

export default function MediaUploadModal({closeModal = () => {}}: functionProps) {
  return (
    <View style={styles.modalContents}>
      <Text style={{ fontFamily: 'JakartaMed', fontSize: 14 }}>If you have any sensitive photos or videos that you don't want others to see, be sure to properly secure or hide them.</Text>
      <A style={{marginVertical: 40, color: 'blue', textDecorationLine: 'underline'}}href="https://support.apple.com/en-us/HT205891">Hide photos on iOS with the Hidden album</A>
      <A style={{marginVertical: 20, color: 'blue', textDecorationLine: 'underline'}}href="https://support.google.com/files/answer/9935264">Protect your files on Android with Safe folder</A>
      <Pressable
        onPress={closeModal}
        style={styles.pressable}
      >
        {({ pressed }) => (
          <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
            <Text style={styles.buttonText}>Close</Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContents: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#F0EDF1',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#420C5C',
    padding: 20,
  },
  pressable: {
    position: 'absolute',
    bottom: 20,
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
    marginVertical: 10,
    fontFamily: 'JakartaSemiBold',
    fontSize: 20,
    color: '#fff',
  },
})