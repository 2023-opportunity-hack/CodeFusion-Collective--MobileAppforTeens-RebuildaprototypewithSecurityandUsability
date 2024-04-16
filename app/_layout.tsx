import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CommonActions } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus, Image, StyleSheet, View } from "react-native";
import EmergencyContactContextProvider from "../context/contactContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const navigation = useNavigation();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JakartaSemiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    JakartaLight: require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    JakartaLightItalic: require("../assets/fonts/PlusJakartaSans-LightItalic.ttf"),
    JakartaMed: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    JakartaBold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'lockscreen/index' }] }));
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {appStateVisible === 'background'
        ? <Image
            source={require('../assets/images/splash.png')}
            resizeMode="cover"
            style={styles.overlayImage}
          />
        : null
      }
      <RootLayoutNav />
    </View>
  );
};

function RootLayoutNav() {

  return (
      <EmergencyContactContextProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="lockscreen/index" />
        </Stack>
      </EmergencyContactContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlayImage: {
    ...StyleSheet.absoluteFillObject,
  }
})
