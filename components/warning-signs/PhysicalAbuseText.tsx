import { ScrollView, Text, View } from 'react-native';
import warningSignStyles from './warningSignsStyles';

export default function PhysicalAbuseText() {
  return (
    <View style={warningSignStyles.container}>
      <Text style={warningSignStyles.title}>Physical abuse</Text>
      <ScrollView style={warningSignStyles.descriptionContainer}>
        <Text style={warningSignStyles.description}>
        <Text style={{ fontFamily: 'JakartaSemiBold' }}>Physical abuse </Text>occurs when one person uses physical force or the threat of physical force to intimidate, injure, or endanger another person. A wide range of behaviors falls into the category of physical abuse. They include pushing, hitting, kicking, grabbing, choking, throwing things, driving recklessly, abandonment, and assault with a weapon.
        </Text>
      </ScrollView>
    </View>
  );
}