import { Link } from "expo-router"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"

const Resources = () => {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Link href="/self-care" asChild>
          <Pressable>
            <Image
              source={require("../../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Resources</Text>
      </View>
      <Text style={{ fontFamily: "JakartaSemiBold" }}>These videos may be helpful for additional support and strategies in maintaining your mental health</Text>
      <View style={styles.video}>
        <YoutubePlayer
          height={195}
          videoId="wr4N-SdekqY"
          webViewStyle={{ borderRadius: 9, }}
        />
      </View>
      <Text style={{ marginBottom: 30, fontFamily: "JakartaSemiBold" }}>Mental Health Minute video</Text>
      <View style={styles.video}>
        <YoutubePlayer
          height={195}
          videoId="7Ep5mKuRmAA"
          webViewStyle={{ borderRadius: 9 }}
        />
      </View>
      <Text style={{ fontFamily: "JakartaSemiBold" }}>Belly Breathing exercises</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: "5%",
    backgroundColor: "#F0EDF1",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: "20%",
    marginBottom: "10%",
  },
  backimage: {
    height: 30,
    width: 30,
    marginRight: "-10%",
  },
  title: {
    fontFamily: "JakartaSemiBold",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  video: {
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#420C5C",
  }
})

export default Resources