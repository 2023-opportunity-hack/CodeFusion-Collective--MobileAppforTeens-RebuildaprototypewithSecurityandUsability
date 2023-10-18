import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function SexualAbuseText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Sexual abuse</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontWeight: 'bold' }}>Sexual abuse </Text>exists in any situation in which one partner forces another to participate in unwanted, unsafe, or degrading sexual activity. Forcible sex, even by a spouse or intimate partner, is an act of aggression and violence.
        </Text>
      </ScrollView>
    </View>
  );
}