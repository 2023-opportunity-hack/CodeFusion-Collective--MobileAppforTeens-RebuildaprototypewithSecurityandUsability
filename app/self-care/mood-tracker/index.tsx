import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { PageHeader } from '../../../components/PageHeader';

const sqlQuery = `SELECT
                    '[' || GROUP_CONCAT('"' || strategy || '"') || ']' AS strategies
                  FROM
                    strategies;
                  `;

const moods = ["happy", "sad", "angry", "nervous", "annoyed", "goofy", "surprised", "disappointed", "tired"];

const moodImagePaths: { [key: string]: any } = {
  happy: require("../../../assets/images/happy.png"),
  sad: require("../../../assets/images/sad.png"),
  angry: require("../../../assets/images/angry.png"),
  nervous: require("../../../assets/images/nervous.png"),
  annoyed: require("../../../assets/images/annoyed.png"),
  goofy: require("../../../assets/images/goofy.png"),
  surprised: require("../../../assets/images/surprised.png"),
  disappointed: require("../../../assets/images/disappointed.png"),
  tired: require("../../../assets/images/tired.png"),
};

export default function MoodTracker () {
  const db = SQLite.openDatabase('safespace.db');
  const [selectedMood, setSelectedMood] = useState('');
  const [savedStrategies, setSavedStrategies] = useState([]);

  const saveMoodEntry = () => {
    const newDate = new Date();
    const currentDate = newDate.toISOString().slice(0, 10);
    const currentTime = newDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    db.transaction((tx) => {
      tx.executeSql('SELECT id FROM mood_entries WHERE date = ?', [currentDate], (_, resultSet) => {
        if (resultSet.rows.length > 0) {
          const moodId = resultSet.rows.item(0).id;

          tx.executeSql('INSERT INTO mood_details (mood_id, mood, time) VALUES (?, ?, ?)', [moodId, selectedMood, currentTime]);
        } else {
          tx.executeSql('INSERT INTO mood_entries (date) VALUES (?)', [currentDate], (_, resultSet) => {
            const moodId = resultSet.insertId;

            tx.executeSql('INSERT INTO mood_details (mood_id, mood, time) VALUES (?, ?, ?)', [moodId!, selectedMood, currentTime]);
          })
        }
      })
    });

    setSelectedMood('');
  }

  useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql('DROP TABLE IF EXISTS mood_entries');
      // tx.executeSql('DROP TABLE IF EXISTS mood_details');
      tx.executeSql(sqlQuery, [], (_, resultSet) => {
        const parsedStrategies = JSON.parse(resultSet.rows._array[0].strategies);
        if (!parsedStrategies) {
          setSavedStrategies([]);
        } else {
          setSavedStrategies(parsedStrategies);
        }
      })
    });

    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS mood_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)');
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS mood_details (id INTEGER PRIMARY KEY AUTOINCREMENT, mood_id INTEGER, mood TEXT, time TEXT, FOREIGN KEY (mood_id) REFERENCES mood_entries(id))'
      );
    })
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <PageHeader route="/self-care" title="Mood Tracker"/>
        <Text style={{ fontFamily: "JakartaSemiBold" }}>How are you feeling today?</Text>
        <View style={styles.moodGrid}>
          {moods.map((mood) => (
            <Pressable
              key={mood}
              style={[styles.moodContainer, { backgroundColor: selectedMood === mood ? "#B39EBE" : "white" }]}
              onPress={() => setSelectedMood(mood)}
              >
              <Image source={moodImagePaths[mood]}/>
              <Text style={styles.moodText}>{mood.slice(0, 1).toUpperCase() + mood.slice(1)}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 20 }}
            disabled={selectedMood === ""}
            onPress={saveMoodEntry}
            >
            {({ pressed }) => (
              <View style={[styles.saveButton, { opacity: pressed || selectedMood === "" ? 0.5 : 1 }]}>
                <Text style={styles.saveButtonText}>Save Mood</Text>
              </View>
            )}
          </Pressable>
          <Link href="/self-care/mood-tracker/mood-entries" asChild>
            <Pressable style={{ width: "100%", justifyContent: "center", alignItems: "center", marginTop: 30, marginBottom: 50 }}>
              {({ pressed }) => (
                <View style={[styles.viewButton, { opacity: pressed ? 0.5 : 1 }]}>
                  <Text style={styles.viewButtonText}>View Mood Entries</Text>
                </View>
              )}
            </Pressable>
          </Link>
        </View>
        <Text style={styles.description}>
          If you are not having a great day, it may help to use one of your self care strategies. If you need to, try one and see if it helps!
        </Text>
        <Text style={{ fontFamily: "JakartaSemiBold" }}>Your Strategies</Text>
        <List.Section style={styles.listItemsSection}>
          {savedStrategies.map((strategy, index) => (
            <List.Item
              key={index}
              title={strategy}
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
    padding: "5%"
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
    width: `${(100 / 3) - 4}%`,
    marginRight: 12,
    marginBottom: 12
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