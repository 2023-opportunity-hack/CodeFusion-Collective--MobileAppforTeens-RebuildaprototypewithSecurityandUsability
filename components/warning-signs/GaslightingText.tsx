import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function Gaslighting() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Gaslighting</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
           Gaslighting is PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER
        </Text>
      </ScrollView>
    </View>
  );
}