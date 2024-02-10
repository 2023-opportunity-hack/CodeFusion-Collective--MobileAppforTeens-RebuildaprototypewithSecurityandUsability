import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

const journalEntries = [
  {
    date: "8/12/2023",
    entries: [
      {
        prompt: "Today I am grateful for...",
        entry: "The trees, the grass and the sky."
      },
      {
        prompt: "Write down a happy memory",
        entry: "When I was a teenager I went to my first homecoming with someone I had known since childhood."
      }
    ],
  },
  {
    date: "10/20/2023",
    entries: [
      {
        prompt: "What talent or skill do you have that you are grateful for?",
        entry: "My JavaScript coding skills."
      },
      {
        prompt: "Today I am grateful for...",
        entry: "Restaurant bars, the fact their food and drinks are so good keeps me away from regular restaurants."
      },
      {
        prompt: "Write about a book, movie, or song that has inspired you.",
        entry: "The movie The Hulk inspired me to become as shredded as possible."
      }
    ],
  },
  {
    date: "9/8/2023",
    entries: [
      {
        prompt: "Write about a book, movie, or song that has inspired you.",
        entry: "The movie Harry Potter was a deeply inspirational movie for me because of how well it teaches the importance of friendship and camaraderie."
      },
      {
        prompt: "List 10 things that you are grateful for in your life right now.",
        entry: "My dog, my house, my clothes, food, my family, my friends, technology, my mind, my spirit and my body."
      },
      {
        prompt: "Today I am grateful for...",
        entry: "The fact that my dog is the cutest dog in the whole entire world"
      }
    ],
  },
  {
    date: "10/10/2023",
    entries: [
      {
        prompt: "Today I am grateful for...",
        entry: "The fish and the sea and the air that we breathe."
      },
    ],
  },
  {
    date: "4/4/2023",
    entries: [
      {
        prompt: "List 10 things that you are grateful for in your life right now.",
        entry: "The animals, the flowers, the people, the nature, the environment, the music, the books, the movies, video games and family."
      },
    ],
  },
  {
    date: "2/10/2023",
    entries: [
      {
        prompt: "Write down a happy memory",
        entry: "I remember when I was a child, we went to a place called Bear Lake where me and my siblings rode Banana Bikes for the first time. It was a long time ago but I still remember how much fun I had at the time."
      },
      {
        prompt: "List three things that you are looking forward to in the future.",
        entry: "Getting a SWE job, getting a new car, and getting a new house."
      }
    ]
  },
]

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM journal_entries', undefined,
      (txObj, resultSet) => {
        console.log(resultSet.rows);
        // const bigObj = resultSet.rows;
        // for (var key in bigObj) {
        //   allEntries.push(bigObj[key])
        //   console.log(allEntries);
        // }
      })
    })
  })


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
          {journalEntries.map((day) => (
            <List.Accordion
              key={day.date}
              title={day.date}
              theme={{ colors: { background: "#FFFFFF" } }}
            >
              {day.entries.map((entry) => (
                <List.Item
                  key={entry.entry}
                  title={<JournalEntry entry={entry.entry} prompt={entry.prompt} />}
                />
              ))}
            </List.Accordion>
          ))}
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