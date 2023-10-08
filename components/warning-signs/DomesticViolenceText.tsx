import { View, Text, StyleSheet, ScrollView } from 'react-native';


export default function DomesticViolenceText () {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is domestic violence?</Text>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>Domestic violence is PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER </Text>
        </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 25,
  },
  descriptionContainer: {
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: '#FOFOFO',
    padding: 15,
    maxHeight: 200
  },
  description: {
    marginBottom: 25,
  },
});