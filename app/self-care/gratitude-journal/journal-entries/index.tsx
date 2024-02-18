import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';


const sqlQuery = `SELECT
                    je.id AS date_id,
                    je.date AS date,
                    '[' || GROUP_CONCAT(
                        '{"entry_id": ' || jd.id || ', "prompt": "' || jd.prompt || '", "entry": "' || jd.description || '"}'
                    ) || ']' AS entries
                    FROM
                      journal_entries je
                    LEFT JOIN
                      journal_details jd ON je.id = jd.journal_id
                    GROUP BY
                      je.id;
                          `;

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const JournalEntry = ({ entry, prompt }: { entry: string, prompt: string }) => {

  return (
    <View style={styles.journalEntryContainer}>
      <Text style={styles.prompt}>{prompt}</Text>
      <Text style={styles.entrytext}>{entry}</Text>
    </View>
  )
}

export default function JournalEntries() {
  const db = SQLite.openDatabase('safespace.db');

  const [journalEntries, setJournalEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteAllJournalEntries = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM journal_entries;');
      tx.executeSql('DELETE FROM journal_details;');
      setJournalEntries([]);
      setShowModal(false);
    })
  }

  useEffect(() => {
    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql(sqlQuery, undefined,
      (txObj, resultSet) => {
        console.log("Made it into first resultset: ", resultSet)
        resultSet.rows._array.forEach((day) => {
          day.entries = JSON.parse(day.entries);
        });
        console.log("parsed results: ", resultSet.rows._array)
        const sortedEntries = resultSet.rows._array.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log("sorted results: ", sortedEntries)
        setJournalEntries(sortedEntries);
        setLoading(false);
      }, (txObj, error) => {
        setLoading(false);
        console.log('Error in Journal Entries: ' + error)
      })
    })
  }, []);


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start'}}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContents}>
            <Text>Are you sure you want to delete all journal entries?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButtonWrapper} onPress={deleteAllJournalEntries}>
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
        <Link href="/self-care/gratitude-journal/" asChild>
          <Pressable>
            <Image
              source={require("../../../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Journal Entries</Text>
      </View>
      <List.Section style={styles.listGroupContainer}>
        <View style={styles.listGroup}>
          {!loading && journalEntries.length > 0 ? (
            journalEntries.map((day) => (
              <List.Accordion
                key={day.date}
                title={new Date(`${day.date}T07:00:00Z`).toLocaleDateString('en-US', options)}
                theme={{ colors: { background: "#FFFFFF" } }}
                >
                {day.entries.map((entry) => (
                  <List.Item
                    key={entry.entry}
                    title={<JournalEntry entry={entry.entry} prompt={entry.prompt} />}
                  />
                ))}
             </List.Accordion>
            ))
          ) : (
            <List.Item title={"No saved journal entries"} />
          )}
        </View>
      </List.Section>
      {journalEntries.length > 0 ?
        <Pressable onPress={() => setShowModal(true)} style={styles.buttonWrapper}>
          {({ pressed }) => (
            <View style={[styles.deleteButton, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.buttonText}>Delete Journal Entries</Text>
            </View>
          )}
        </Pressable>
        : null}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0EDF1',
    width: "100%",
  },
  submitbutton: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#420C5C',
  },
  submittext: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    fontSize: 25,
    fontFamily: "JakartaSemiBold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  listGroupContainer: {
    width: "95%",
    marginTop: "5%",
    borderRadius: 10,
    backgroundColor: "#F0EDF1",
    marginBottom: "10%"
  },
  listGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#420C5C"
  },
  journalEntryContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  prompt: {
    fontFamily: "JakartaSemiBold",
    fontSize: 15,
    marginBottom: 5
  },
  entrytext: {
    fontFamily: "JakartaLight",
    fontSize: 15
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