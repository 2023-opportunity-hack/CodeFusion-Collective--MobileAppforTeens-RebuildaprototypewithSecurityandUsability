import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type RelativePathString = `/${string}`;

export const PageHeader = ({ route, title }: { route: RelativePathString, title: string }) => {

  return (
    <View style={styles.header}>
      <Link href={route} asChild>
        <Pressable>
          {({ pressed }) => (
            <Image
              source={require("../assets/images/Back.png")}
              style={[styles.backimage, pressed && { backgroundColor: "#B39EBE" }]}
            />
          )}
        </Pressable>
      </Link>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: "20%",
    marginBottom: "10%",
    position: "relative",
  },
  backimage: {
    height: 30,
    width: 30,
    position: "absolute",
    left: 0,
    top: "-45%",
    borderRadius: 10,
  },
  title: {
    fontFamily: "JakartaSemiBold",
    fontSize: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
})