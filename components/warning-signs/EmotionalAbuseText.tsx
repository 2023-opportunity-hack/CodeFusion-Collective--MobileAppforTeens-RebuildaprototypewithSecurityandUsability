import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function EmotionalAbuseText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Emotional abuse</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontWeight: 'bold' }}>Emotional abuse </Text>or psychological abuse can be verbal or nonverbal. Emotional abuse may include verbal abuse, such as yelling, name-calling, blaming, and <Text style={{ fontWeight: 'bold' }}>gaslighting. </Text>{'\n'}Nonverbal abuse may consist of behaviors and tactics such as isolation, intimidation, and coercion. Emotional abuse is just as damaging as physical abuse.
        </Text>
      </ScrollView>
    </View>
  );
}
