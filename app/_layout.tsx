import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CommonActions } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { AppState, AppStateStatus, useColorScheme } from "react-native";
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
  const [appState, setAppState] = useState(AppState.currentState);
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
      if (nextAppState === 'background') {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'lockscreen/index' }] }));
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [appState])

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <EmergencyContactContextProvider>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="lockscreen/index" />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
        </Stack>
      {/* </ThemeProvider> */}
    </EmergencyContactContextProvider>
  );
}
