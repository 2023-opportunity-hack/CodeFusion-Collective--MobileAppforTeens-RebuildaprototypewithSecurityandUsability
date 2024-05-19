import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { PageHeader } from '../../../../components/PageHeader';
import { ToastMessage } from '../../../../components/ToastMessage';


type MoodEntryType = {
  date_id: number,
  date: string,
  date_value: string,
  moodInfo: {
    mood: string,
    time: string
  }[]
};

const moodEntryImagePaths: Record<string, any> = {
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
                    me.date_title AS date,
                    me.date_value AS date_value,
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

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

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
  const db = SQLite.openDatabaseSync('safespace.db');

  const [pastMoods, setPastMoods] = useState<MoodEntryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const deleteAllMoodEntries = () => {
    db.execAsync('DELETE FROM mood_entries; DELETE FROM mood_details;');
    setPastMoods([]);
    setShowModal(false);
    setShowSuccessToast(true);
  }

  useEffect(() => {
    setLoading(true);

    const getMoodEntries = async () => {
      try {
        const fetchedMoods: MoodEntryType[] = await db.getAllAsync(sqlQuery);
        const sortedMoods: MoodEntryType[] = fetchedMoods.map((day: MoodEntryType) => {
          if (typeof day.moodInfo === 'string') {
            day.moodInfo = JSON.parse(day.moodInfo);
            day.moodInfo.sort((a, b) => {
              const parseTime = (timeStr: string) => {
                const [time, period] = timeStr.split(" ");
                const [hours, minutes] = time.split(":");
                let hours24 = parseInt(hours);
                if (period === "PM" && hours24 !== 12) {
                  hours24 += 12;
                } else if (period === "AM" && hours24 === 12) {
                  hours24 = 0;
                }
                return { hours: hours24, minutes: parseInt(minutes) };
              };

              const aTime = parseTime(a.time);
              const bTime = parseTime(b.time);

              const aDate = new Date(`${day.date}T${aTime.hours.toString().padStart(2, "0")}:${aTime.minutes.toString().padStart(2, "0")}`);
              const bDate = new Date(`${day.date}T${bTime.hours.toString().padStart(2, "0")}:${bTime.minutes.toString().padStart(2, "0")}`);

              return bDate.getTime() - aDate.getTime();
            });
          }
          return day;
        }).sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setPastMoods(sortedMoods);
      } catch (error) {
        setLoading(false);
        console.error('Error getting mood entries:', error);
        setShowErrorToast(true);
      } finally {
        setLoading(false);
      }
    };

    getMoodEntries();
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: '#F0EDF1' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {showSuccessToast ? <ToastMessage entryName='Moods' type='delete' /> : null}
        {showErrorToast ? <ToastMessage entryName='mood entries' type="error" /> : null}
        <Modal
          animationType='fade'
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <Text style={{ fontFamily: 'JakartaSemiBold', fontSize: 16 }}>Are you sure you want to delete all mood entries?</Text>
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
        <PageHeader route="/self-care/mood-tracker" title="Saved Moods" />
        <List.Section style={styles.listGroupContainer}>
          <View style={styles.listGroup}>
            {!loading && pastMoods.length > 0 ? (
                pastMoods.map((day) => (
                  <List.Accordion
                    key={day.date}
                    id={day.date}
                    title={new Date(day.date_value).toLocaleDateString('en-US', options)}
                    theme={{ colors: { background: "#FFFFFF" } }}
                    titleStyle={{ fontFamily: 'JakartaMed' }}
                    >
                    {day.moodInfo.map((mood, index) => (
                      <List.Item key={index} title={<MoodEntry mood={mood.mood} time={mood.time} />} />
                    ))}
                  </List.Accordion>
                ))
              ) : (
                <List.Item title="No saved moods" titleStyle={{ fontFamily: "JakartaMed" }} />
              )}
          </View>
        </List.Section>
        {pastMoods.length > 0 ?
          <View style={styles.deleteButton}>
            <Pressable
              onPress={() => setShowModal(true)}
              style={({ pressed }) => [{ borderRadius: 100, width: '100%', backgroundColor: pressed ? '#ff3333' : '#D22F27' }]}
              >
              <Text style={styles.buttonText}>Delete Mood Entries</Text>
            </Pressable>
          </View>
          : null}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF1',
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5%"
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
    width: 300,
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
    width: "40%"
  },
  modalButton: {
    width: "100%",
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
  deleteButton: {
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: '#D22F27',
    marginVertical: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'JakartaSemiBold',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    color: 'white'
  },
})

export default MoodEntries