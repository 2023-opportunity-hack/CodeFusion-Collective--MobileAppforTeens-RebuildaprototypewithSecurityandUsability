import { View, Text, StyleSheet, ScrollView } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function ReproductiveCoercionText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Reproductive coercion</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontWeight: 'bold' }}>Reproductive coercion </Text>occurs when one partner strips another of their ability to control their reproductive health. It includes sabotaging birth control, threatening or pressuring someone to get pregnant, having an abortion, or removing a condom during sex without consent.
        </Text>
      </ScrollView>
    </View>
  );
}