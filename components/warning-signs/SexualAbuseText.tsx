import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function SexualAbuseText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Sexual abuse</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
          Sexual abuse is PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER PLACEHOLDER
        </Text>
      </ScrollView>
    </View>
  );
}