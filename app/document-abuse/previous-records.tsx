import { Link } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { List } from 'react-native-paper';

const testRecordEntries = [
  {
    date: '1625882400000',
    records: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam vestibulum tortor nec erat ullamcorper, non laoreet libero fermentum. Sed volutpat, nisl ac ullamcorper scelerisque, dui libero dapibus dolor, nec bibendum orci purus quis justo. Suspendisse potenti. Maecenas commodo orci sed ex tristique, ac sollicitudin nunc fermentum.' ,
        date: '1457606400000'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod ultrices nulla, ut blandit massa viverra vel. Integer convallis odio at diam auctor, quis lacinia nulla placerat. Proin eleifend ex ut arcu varius, eget commodo nulla accumsan. Duis dignissim felis eu orci varius sodales. Nam volutpat dapibus magna sit amet tincidunt.' ,
        date: '1489142400000'
      },
    ]
  },
  {
    date: '1627197000000',
    records: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae velit a dui finibus vehicula. Cras in pulvinar urna. Donec dictum, turpis vitae maximus blandit, lectus nisl rutrum arcu, at ultricies nisi enim non nulla. Maecenas varius erat nec purus accumsan, vel congue orci commodo. Curabitur vitae nunc eget elit placerat volutpat.' ,
        date: '1520630400000'
      },
    ]
  },
  {
    date: '1628185500000',
    records: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate vehicula metus ut suscipit. Phasellus id diam ac libero blandit facilisis. Duis ultrices convallis efficitur. Nam auctor turpis ac nunc consequat, non congue justo bibendum. Integer sed ultricies nisl.' ,
        date: '1552166400000'
      },
    ]
  },
  {
    date: '1627197231000',
    records: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate vehicula metus ut suscipit. Phasellus id diam ac libero blandit facilisis. Duis ultrices convallis efficitur. Nam auctor turpis ac nunc consequat, non congue justo bibendum. Integer sed ultricies nisl.' ,
        date: '1552166400000'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis libero non libero lacinia auctor. Sed feugiat ligula ac diam molestie, at ultrices mauris mattis. Maecenas vel neque a nunc rhoncus sodales nec a nisi. Mauris eget eleifend nisi, sed convallis purus.' ,
        date: '1583702400000'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus enim non odio eleifend, quis tempor felis faucibus. Integer ac hendrerit magna. Duis ut justo non neque condimentum egestas ac sed justo. In hac habitasse platea dictumst. Fusce ac ex leo.' ,
        date: '1615238400000'
      },
    ]
  },
  {
    date: '1625882423100',
    records: [
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at sollicitudin sapien. Morbi commodo justo ac justo malesuada, non feugiat ligula laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam sit amet libero ut odio maximus lacinia eu sed dui.' ,
        date: '1489188992013'
      },
      {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id nisl a arcu consectetur ultricies. Quisque sit amet eros nec purus tincidunt feugiat. In hac habitasse platea dictumst. Nam ultricies tellus nec dolor posuere, id lacinia lectus vehicula. Sed gravida eros in mi varius, at cursus metus volutpat.' ,
        date: '1576091150345'
      },
    ]
  },
];

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const RecordEntry = ({ description, date }: { description: string, date: string}) => {


  const formattedDate = new Date(date).toLocaleString('en-US', options);

  return (
    <View style={styles.recordEntryContainer}>
      <View style={{ marginBottom: 12 }}>
        <Text style={styles.prompt}>What Happened?</Text>
        <Text style={styles.entrytext}>{description}</Text>
      </View>
      <View>
        <Text style={styles.prompt}>When did it happen?</Text>
        <Text style={styles.entrytext}>{formattedDate}</Text>
      </View>
    </View>
  )
}


export default function NewRecordPage() {
  const db = SQLite.openDatabase('safespace.db');
  const [recordEntries, setRecordEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const sqlQuery = `SELECT
                      r.id AS record_id,
                      r.date AS record_date,
                      '[' || GROUP_CONCAT(
                          '{"detail_id": ' || rd.id || ', "event_date": "' || rd.date || '", "description": "' || rd.description || '"}'
                      ) || ']' AS records
                    FROM
                      records r
                    LEFT JOIN
                      record_details rd ON r.id = rd.record_id
                    GROUP BY
                      r.id;
                    `;

  useEffect(() => {
    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql(sqlQuery, undefined,
      (txObj, resultSet) => {
        resultSet.rows._array.forEach((day) => {
          day.records = JSON.parse(day.records);
        })
        const sortedRecords = resultSet.rows._array.sort((a, b) => new Date(b.record_date) - new Date(a.record_date));
        sortedRecords.forEach((day) => {
          day.records.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
        })
        setRecordEntries(sortedRecords);
        setLoading(false);
      },
      (txObj, error) => console.log(error)
      );
    });
  }, [])


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start'}}>
      <View style={styles.header}>
        <Link href="/document-abuse" asChild>
          <Pressable>
            <Image
              source={require("../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Previous Records</Text>
      </View>
      <List.Section style={styles.listGroupContainer}>
        <View style={styles.listGroup}>
          {!loading ? (
            recordEntries.map((day) => (
              <List.Accordion
                key={day.record_id}
                title={new Date(`${day.record_date}T07:00:00Z`).toLocaleString('en-US', options)}
                theme={{ colors: { background: "#FFFFFF" } }}
              >
                {day.records.map((entry) => (
                  <List.Item
                    key={entry.event_date}
                    title={<RecordEntry description={entry.description} date={entry.event_date} />}
                  />
                ))}
              </List.Accordion>
            ))
          ): (
            <List.Item
              title="No Previous Records"
            />
          )}
        </View>
      </List.Section>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#F0EDF1",
    paddingHorizontal: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: "10%",
  },
  backimage: {
    height: 30,
    width: 30,
  },
  title: {
    fontFamily: "JakartaSemiBold",
    flex: 1,
    fontSize: 25,
    textAlign: "center",
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
  recordEntryContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
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