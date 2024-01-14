import { ScrollView, Text, View } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function DomesticViolenceText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>What is domestic violence?</Text>
      <ScrollView style={warningSignStyles.descriptionContainer} nestedScrollEnabled={true}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontFamily: 'JakartaSemiBold' }}>Domestic violence </Text>
        is a pattern of assaultive and coercive behaviors through physical, sexual, emotional, psychological, and or economic abuse by one person in a current or former intimate relationship to maintain power and control over the other.{'\n'}
        Domestic violence knows no boundaries. People of all ages, genders, cultures, religions, professions, abilities, and income levels experience domestic violence. However, systemic racism, poverty, immigration status, disability, and other inequities can make the risks even more severe, especially for BIPOC and LGBTQ individuals.
        </Text>
      </ScrollView>
    </View>
  );
}


