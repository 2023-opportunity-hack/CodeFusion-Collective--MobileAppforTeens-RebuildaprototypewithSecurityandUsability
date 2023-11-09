import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function GaslightingText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Gaslighting</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontWeight: 'bold' }}>Gaslighting </Text>is the action of repetitively lying to someone to manipulate, and ultimately control them and the relationship. It could be divided into four different types: outright lying, manipulation of reality, scapegoating and coercion.
        </Text>
      </ScrollView>
    </View>
  );
}