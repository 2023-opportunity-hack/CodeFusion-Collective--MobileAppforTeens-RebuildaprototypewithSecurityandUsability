import { ScrollView, Text, View } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function EconomicAbuseText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Economic abuse</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontFamily: 'JakartaSemiBold' }}>Economic abuse </Text>occurs when one partner controls another's ability to be financially independent. It may include limiting their ability to work or go to school, controlling access to bank acounts or paychecks, and not allowing their partner's name on a lease, mortgage, or car title.
        </Text>
      </ScrollView>
    </View>
  );
}