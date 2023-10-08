import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function GaslightingText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Gaslighting</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontWeight: 'bold' }}>Gaslighting </Text>is PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER
        </Text>
      </ScrollView>
    </View>
  );
}