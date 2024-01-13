import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

const savedStrategies = [
  {title: "Go for a walk"},
  {title: "Call a friend"},
  {title: "Doodle, draw, or paint"},
  {title: "Play with or walk a pet"},
  {title: "Do a puzzle"},
]

const moods = ["happy", "sad", "angry", "nervous", "annoyed", "goofy", "surprised", "disappointed", "tired"];

const moodImagePaths = {
  happy: require("../../../assets/images/happy.png"),
  sad: require("../../../assets/images/sad.png"),
  angry: require("../../../assets/images/angry.png"),
  nervous: require("../../../assets/images/nervous.png"),
  annoyed: require("../../../assets/images/annoyed.png"),
  goofy: require("../../../assets/images/goofy.png"),
  surprised: require("../../../assets/images/surprised.png"),
  disappointed: require("../../../assets/images/disappointed.png"),
  tired: require("../../../assets/images/tired.png"),
}

export default function MoodTracker () {
  const [selectedMood, setSelectedMood] = useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Link href="/self-care" asChild>
            <Pressable>
              <Image
                source={require("../../../assets/images/Back.png")}
                style={styles.backimage}
              />
            </Pressable>
          </Link>
          <Text style={styles.title}>Mood Tracker</Text>
        </View>
        <Text style={{ fontFamily: "JakartaSemiBold" }}>How are you feeling today?</Text>
        <View style={styles.moodGrid}>
          {moods.map((mood) => (
            <Pressable key={mood} style={styles.moodContainer}>
              <Image source={moodImagePaths[mood]}/>
              <Text style={styles.moodText}>{mood.slice(0, 1).toUpperCase() + mood.slice(1)}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Mood</Text>
          </Pressable>
          <Pressable style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Mood Entries</Text>
          </Pressable>
        </View>
        <Text style={styles.description}>If you are not having a great day, it may help to use one of your self care strategies. If you need to, try one and see if it helps!</Text>
        <Text style={{ fontFamily: "JakartaSemiBold" }}>Your Strategies</Text>
        <List.Section style={styles.listItemsSection}>
          {savedStrategies.map((strategy, index) => (
            <List.Item
              key={index}
              title={strategy.title}
              titleStyle={{ fontSize: 15, fontFamily: "JakartaSemiBold", textAlign: "left" }}
              style={[{ borderBottomWidth: 1, borderColor: "#420C5C" }, index === savedStrategies.length - 1 && { borderBottomWidth: 0 }]}
              />
          ))}
        </List.Section>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF1',
    flex: 1,
    padding: 30,
    paddingTop: 0
  },
  description: {
    fontFamily: "JakartaSemiBold",
    marginBottom: 25,
  },
  clearButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginHorizontal: '8%',
    borderRadius: 20,
    height: 50,
    color: '#420C5C',
    textAlign: 'center',
    paddingTop: '2.5%',
  },
  clearButtonText: {
    fontSize: 20,
    color: '#420C5C',
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
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
  moodContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "solid",
    borderWidth: 1,
    borderColor: "#420C5C",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    marginRight: 15,
    marginBottom: 20
  },
  moodGrid: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  moodText: {
    fontFamily: "JakartaSemiBold",
    fontSize: 10,
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
  },
  listItemsSection: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#420C5C",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  }
});