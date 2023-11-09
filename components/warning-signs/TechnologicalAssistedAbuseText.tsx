import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function TechnologicalAssistedAbuseText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Technological-assisted abuse</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontWeight: 'bold' }}>Technological-assisted abuse </Text>is when a current or former partner uses technology, ranging from cellphones and computers to thermostats and cars, to track, humiliate, or harass.
        </Text>
      </ScrollView>
    </View>
  );
}