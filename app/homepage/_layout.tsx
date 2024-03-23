import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function HomePageLayout() {
  const colorScheme = useColorScheme();
  return (
    //<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    //</ThemeProvider>
  );
}
