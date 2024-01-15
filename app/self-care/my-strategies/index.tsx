import { Link } from "expo-router"
import { useState } from "react"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { List } from "react-native-paper"

const labelTitles = [
  {title: "Listen to your favorite artist"},
  {title: "Go for a walk"},
  {title: "Count to ten 10 slowly"},
  {title: "Listen to an audiobook or podcast"},
  {title: "Call a friend"},
  {title: "Practice yoga or meditation"},
  {title: "Doodle, draw or paint"},
  {title: "Put on some music and dance"},
  {title: "Play with or walk a pet"},
  {title: "Write in a journal"},
  {title: "Play a video game"},
  {title: "Cook or bake"},
  {title: "Make a scrapbook"},
  {title: "Make a playlist of your favorite songs"},
  {title: "Do a puzzle"},
  {title: "Watch funny videos"},
]

const MyStrategies = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.header}>
        <Link href="/self-care" asChild>
          <Pressable>
            <Image
              source={require("../../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>My Strategies</Text>
      </View>
      <Text style={styles.pagedescription}>Choose strategies that help you when you are feeling stressed or anxious</Text>
      <List.Section style={styles.listItemsSection}>
          <List.Accordion
            title="Please select all that help"
            style={styles.listItemsMainContainer}
            titleStyle={{ color: "black", fontFamily: "JakartaSemiBold" }}
            theme={{colors: {background: "#F0EDF1"}}}
            >
            <View style={styles.listItemsSubContainer}>
              {labelTitles.map((label, index) => (
                <List.Item
                  key={index}
                  title={label.title}
                  titleStyle={{ fontSize: 15, fontFamily: "JakartaSemiBold" }}
                  onPress={() => handleSelect(index)}
                  left={() => <List.Icon
                                icon={selected.includes(index) ? "checkbox-marked" : "checkbox-blank-outline"}
                                style={{ paddingLeft: 15, }}
                                color="#420C5C"
                                 />}
                  />
                ))}
            </View>
          </List.Accordion>
      </List.Section>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save My Strategies</Text>
        </Pressable>
        <Link href="/self-care/my-strategies/saved-strategies" asChild>
          <Pressable style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View My Strategies</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: "5%",
    backgroundColor: "#F0EDF1"
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
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#420C5C",
    borderRadius: 25,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 20
  },
  saveButtonText: {
    fontFamily: "JakartaSemiBold",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#420C5C",
    marginTop: 30,
    marginBottom: 50
  },
  viewButtonText: {
    fontFamily: "JakartaSemiBold",
    color: "#420C5C",
    fontSize: 18,
    fontWeight: "bold",
  },
  listItemsMainContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderColor: "#420C5C",
    borderWidth: 1,
    borderRadius: 10,
    color: "black",
    overflow: "hidden",
  },
  listItemsSubContainer: {
    borderWidth: 1,
    borderColor: "#420C5C",
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#FFFFFF"
  },
  listItemsSection: {
    width: "100%",
    backgroundColor: "#F0EDF1",
    borderRadius: 10,
    marginTop: 20
  },
  pagedescription: {
    fontFamily: "JakartaSemiBold",
    width: "100%",
    textAlign: "left"
  }
})

export default MyStrategies