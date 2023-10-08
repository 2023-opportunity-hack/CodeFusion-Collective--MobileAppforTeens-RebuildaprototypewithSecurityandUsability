import { Text, View } from "react-native";
import { ContactItemProps } from "../lib/types";

export default function ContactItem({ name, phoneNumbers }: ContactItemProps) {
  const { number } = phoneNumbers[0];


  const callContact = () => {

  };

  return (
    <View>
      <Text>{name}</Text>
      <Text>{number}</Text>
    </View>
  )
}