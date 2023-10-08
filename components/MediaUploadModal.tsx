import { Pressable } from "react-native";
import { View, Text } from "./Themed";

interface functionProps{
  closeModal: () => void;
}

export default function MediaUploadModal({closeModal = () => {}}: functionProps) {
  return (
    <View>
      <Text>THIS IS A MODAL COMPONENT</Text>
      <Pressable
        onPress={closeModal}
      >
        <Text>Close Modal</Text>
      </Pressable>
    </View>
  )
}