import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
  const [loading, setLoading] = useState(false);

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
  }
})