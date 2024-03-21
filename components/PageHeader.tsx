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
    height: 35,
    width: 35,
    position: "absolute",
    left: 0,
    top: "-65%",
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#420C5C",
  },
  title: {
    fontFamily: "JakartaSemiBold",
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#420C5C"
  },
})