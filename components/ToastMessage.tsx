import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export const ToastMessage = ({ entryName, type }: { entryName: string, type: string }) => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const hideDelay = 1000;

    const showAnimation = Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    const hideAnimation = Animated.timing(translateY, {
      toValue: -150,
      duration: 500,
      useNativeDriver: true,
    });

    const sequence = Animated.sequence([
      showAnimation,
      Animated.delay(hideDelay),
      hideAnimation,
    ]);

    sequence.start();

    // Clear animations on unmount to prevent memory leaks
    return () => sequence.stop();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: type === "success" || type === "delete" || type === "email" ? 'green' : 'red',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        zIndex: 100,
        alignSelf: 'center',
        width: '80%',
      }}
    >
      {type === "success" || type === "delete"
        ? <Ionicons name="checkbox" size={50} color="green" />
        : <MaterialCommunityIcons name="alert-box" size={50} color="red" />
      }
      <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 5 }}>
        <Text style={{ fontFamily: 'JakartaBold', fontSize: 14 }}>{type === "success" || type === "delete" || type === "email" ? "Success!" : "Error"}</Text>
        <Text style={{ fontFamily: 'JakartaMed', fontSize: 14 }}>
          { type === "success" ? `${entryName} has been saved`
            : type === "delete" ? `${entryName} have been deleted`
            : type === "email" ? "Email has been sent"
            : "Please try again"
          }
        </Text>
      </View>
    </Animated.View>
  );
};