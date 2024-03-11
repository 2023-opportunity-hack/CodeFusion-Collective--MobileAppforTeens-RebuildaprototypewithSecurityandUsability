import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

// const pastMoods = [
//   {
//     date: "8/17/2023",
//     moodInfo: [{mood: "Happy", time: "9:47 AM" }, {mood: "Annoyed", time: "10:00 AM"}, {mood: "Sad", time: "10:35 AM" }]
//   },
//   {
//     date: "8/15/2023",
//     moodInfo: [{mood: "Nervous", time: "9:47 AM" }, {mood: "Disappointed", time: "10:00 AM"}, {mood: "Sad", time: "10:35 AM" }]
//   },
//   {
//     date: "8/10/2023",
//     moodInfo: [{mood: "Angry", time: "9:30 AM" }, {mood: "Nervous", time: "10:15 AM"}, {mood: "Disappointed", time: "11:20 AM" }]
//   },
//   {
//     date: "7/27/2023",
//     moodInfo: [{mood: "Happy", time: "9:37 AM" }, {mood: "Goofy", time: "10:43 AM"}]
//   },
//   {
//     date: "6/20/2023",
//     moodInfo: [{mood: "Sad", time: "9:00 AM" }, {mood: "Happy", time: "10:30 AM"}, {mood: "Annoyed", time: "11:45 AM" }]
//   },
//   {
//     date: "6/17/2023",
//     moodInfo: [{mood: "Sad", time: "9:15 AM" }, {mood: "Surprised", time: "10:45 AM"}, {mood: "Happy", time: "11:00 AM" }]
//   },
//   {
//     date: "5/25/2023",
//     moodInfo: [{mood: "Annoyed", time: "9:50 AM" }, {mood: "Goofy", time: "10:30 AM"}, {mood: "Angry", time: "11:15 AM" }]
//   },
//   {
//     date: "5/20/2023",
//     moodInfo: [{mood: "Happy", time: "9:20 AM" }, {mood: "Disappointed", time: "10:10 AM"}, {mood: "Annoyed", time: "11:30 AM" }]
//   },
// ];

const moodEntryImagePaths = {
  happy: require("../../../../assets/images/happy.png"),
  sad: require("../../../../assets/images/sad.png"),
  angry: require("../../../../assets/images/angry.png"),
  nervous: require("../../../../assets/images/nervous.png"),
  annoyed: require("../../../../assets/images/annoyed.png"),
  goofy: require("../../../../assets/images/goofy.png"),
  surprised: require("../../../../assets/images/surprised.png"),
  disappointed: require("../../../../assets/images/disappointed.png"),
  tired: require("../../../../assets/images/tired.png"),
};

const sqlQuery = `SELECT
                    me.id AS date_id,
                    me.date AS date,
                    '[' || GROUP_CONCAT(
                        '{"mood": "' || md.mood || '", "time": "' || md.time || '"}'
                    ) || ']' AS moodInfo
                    FROM
                      mood_entries me
                    LEFT JOIN
                      mood_details md ON me.id = md.mood_id
                    GROUP BY
                      me.id;
                          `;

const MoodEntry = ({mood, time}: {mood: string, time: string}) => {
  const moodTitle = mood.slice(0, 1).toLowerCase() + mood.slice(1);

  return (
    <View style={styles.moodEntryContainer}>
      <Image source={moodEntryImagePaths[moodTitle]} style={styles.moodImage}/>
      <Text style={styles.moodText}>{mood.slice(0, 1).toUpperCase() + mood.slice(1)}</Text>
      <Text style={styles.timeText}>at {time}</Text>
    </View>
  )
}

const MoodEntries = () => {
  const db = SQLite.openDatabase('safespace.db');

  const [pastMoods, setPastMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteAllMoodEntries = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM mood_entries;');
      tx.executeSql('DELETE FROM mood_details;');
      setPastMoods([]);
      setShowModal(false);
    })
  }

  useEffect(() => {
    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql(sqlQuery, undefined, (_, resultSet) => {
        resultSet.rows._array.forEach((day) => {
          console.log("Mood info: ", day.moodInfo);
          day.moodInfo = JSON.parse(day.moodInfo);
        });
        const sortedMoods = resultSet.rows._array.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setPastMoods(sortedMoods);
        setLoading(false);
      }, (_, error) => {
        setLoading(false);
        console.log("Error in mood entries: " + error);
      })
    })
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <Text>Are you sure you want to delete all mood entries?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButtonWrapper} onPress={deleteAllMoodEntries}>
                {({ pressed }) => (
                  <View style={[styles.modalButton, { backgroundColor: '#D22F27', opacity: pressed ? 0.5 : 1}]}>
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </View>
                )}
              </Pressable>
              <Pressable style={styles.modalButtonWrapper} onPress={() => setShowModal(false)}>
                {({ pressed }) => (
                  <View style={[styles.modalButton, { backgroundColor: 'green', opacity: pressed ? 0.5 : 1}]}>
                    <Text style={styles.modalButtonText}>No</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Link href="/self-care/mood-tracker/" asChild>
          <Pressable>
            <Image
              source={require("../../../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Saved Moods</Text>
      </View>
      <List.Section style={styles.listGroupContainer}>
        <View style={styles.listGroup}>
          {!loading && pastMoods.length > 0 ? (
              pastMoods.map((day) => (
                <List.Accordion
                  key={day.date}
                  id={day.date}
                  title={day.date}
                  theme={{ colors: { background: "#FFFFFF" } }}
                  >
                  {day.moodInfo.map((mood, index) => (
                    <List.Item key={index} title={<MoodEntry mood={mood.mood} time={mood.time} />} />
                  ))}
                </List.Accordion>
              ))
            ) : (
              <List.Item title="No saved moods" />
            )}
        </View>
      </List.Section>
      {pastMoods.length > 0 ?
        <Pressable onPress={() => setShowModal(true)} style={styles.buttonWrapper}>
          {({ pressed }) => (
            <View style={[styles.deleteButton, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.buttonText}>Delete Mood Entries</Text>
            </View>
          )}
        </Pressable>
        : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF1',
    flex: 1,
    padding: 30,
    paddingTop: 0
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
  listGroupContainer: {
    width: "100%",
    marginTop: "5%",
    borderRadius: 10,
    backgroundColor: "#F0EDF1",
  },
  listGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#420C5C"
  },
  moodEntryContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  moodText: {
    fontFamily: "JakartaSemiBold",
    fontSize: 15,
  },
  timeText: {
    fontFamily: "JakartaMed",
    fontSize: 15
  },
  moodImage: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#B39EBE",
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
  },
  modalContents: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: '90%',
    height: '30%',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#420C5C',
    overflow: 'hidden',
    padding: 16,
    backgroundColor: '#F0EDF1'
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%"
  },
  modalButtonWrapper: {
    alignItems: 'center',
  },
  modalButton: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  modalButtonText: {
    fontFamily: 'JakartaSemiBold',
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  deleteButton: {
    width: '95%',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D22F27',
    padding: 5,
    marginVertical: 30
  },
  buttonText: {
    fontFamily: 'JakartaSemiBold',
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
  },
})

export default MoodEntries