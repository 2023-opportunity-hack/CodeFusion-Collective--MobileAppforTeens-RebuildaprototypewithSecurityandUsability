import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { PageHeader } from "../../../components/PageHeader";
import { ToastMessage } from "../../../components/ToastMessage";

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
  const db = SQLite.openDatabaseSync('safespace.db');

  const [selected, setSelected] = useState<string[]>([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleSelect = (label: string) => {
    if (selected.includes(label)) {
      const filteredSelected = selected.filter((title) => title !== label);
      setSelected(filteredSelected);
    } else {
      setSelected([...selected, label]);
    }
  }

  const saveStrategies = () => {
    setLoading(true);
    db.transaction((tx) => {
      selected.forEach((label) => {
        tx.executeSql('SELECT id FROM strategies WHERE strategy = ?', [label], (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            setSelected([]);
            setShowList(false);
            setShowSuccessToast(true);
          } else {
            tx.executeSql('INSERT INTO strategies (strategy) VALUES (?)', [label], () => {
              setSelected([]);
              setShowList(false);
              setShowSuccessToast(true);
            }, (_, error) => {
              console.error('Error inserting strategy:', error);
              setShowErrorToast(true);
              return false;
            });
          }
        }, (_, error) => {
          console.error('Error selecting strategy:', error);
          setShowErrorToast(true);
          return false;
        })
      })
    });
    setLoading(false);

    setTimeout(() => {
      if (showErrorToast) {
        setShowErrorToast(false);
      }
      setShowSuccessToast(false);
    }, 3000);
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS strategies (id INTEGER PRIMARY KEY AUTOINCREMENT, strategy TEXT)');
    });
  }, [])

  return (
    <ScrollView contentContainerStyle={[styles.container, { position: "relative", }]}>
      {showSuccessToast ? <ToastMessage entryName="Strategy" type="success" /> : null}
      {showErrorToast ? <ToastMessage entryName="Strategy" type="error" /> : null}
      {loading
        ? <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#420C5C" />
          </View>
        : null
        }
      <PageHeader route="/self-care" title="My Strategies" />
      <Text style={styles.pagedescription}>Choose strategies that help you when you are feeling stressed or anxious</Text>
      <List.Section style={styles.listItemsSection}>
        <List.Accordion
          title="Please select all that help"
          style={styles.listItemsMainContainer}
          titleStyle={{ color: "black", fontFamily: "JakartaSemiBold" }}
          theme={{colors: {background: "#F0EDF1"}}}
          expanded={showList}
          onPress={() => setShowList(!showList)}
          >
          <View style={styles.listItemsSubContainer}>
            {labelTitles.map((label, index) => (
              <List.Item
                key={index}
                title={label.title}
                titleStyle={{ fontSize: 15, fontFamily: "JakartaSemiBold" }}
                onPress={() => handleSelect(label.title)}
                left={() => <List.Icon
                              icon={selected.includes(label.title) ? "checkbox-marked" : "checkbox-blank-outline"}
                              style={{ paddingLeft: 15, }}
                              color="#420C5C"
                                />}
                />
              ))}
          </View>
        </List.Accordion>
      </List.Section>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.saveButtonWrapper} onPress={saveStrategies} disabled={selected.length === 0}>
          {({ pressed }) => (
            <View style={[styles.saveButton, { opacity: pressed || selected.length === 0 ? 0.5 : 1 }]}>
              <Text style={styles.saveButtonText}>Save New Strategy</Text>
            </View>
          )}
        </Pressable>
        <Link href="/self-care/my-strategies/saved-strategies" asChild>
          <Pressable style={styles.viewButtonWrapper}>
            {({ pressed }) => (
              <View style={[styles.viewButton, { opacity: pressed ? 0.5 : 1 }]}>
                <Text style={styles.viewButtonText}>View My Strategies</Text>
              </View>
            )}
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    flexDirection: "column",
    padding: "5%",
    backgroundColor: "#F0EDF1"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  saveButtonWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20
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
    fontWeight: "bold",
  },
  viewButtonWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    transitionProperty: "opacity, visibility",
    transitionDuration: "0.75s",
    zIndex: 1,
  }
})

export default MyStrategies