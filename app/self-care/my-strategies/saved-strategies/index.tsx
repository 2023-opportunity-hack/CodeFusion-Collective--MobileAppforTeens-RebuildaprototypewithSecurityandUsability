import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { List } from "react-native-paper";

const savedStrategies = [
  {title: "Go for a walk"},
  {title: "Call a friend"},
  {title: "Doodle, draw, or paint"},
  {title: "Play with or walk a pet"},
  {title: "Do a puzzle"},
]

const MySavedStrategies = () => {
  const db = SQLite.openDatabase('safespace.db');

  const [selected, setSelected] = useState<string[]>([]);
  const [newStrategy, setNewStrategy] = useState("");

  const handleSelect = (label: string) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((title) => title !== label));
    } else {
      setSelected([...selected, label]);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Link href="/self-care/my-strategies/" asChild>
          <Pressable>
            <Image
              source={require("../../../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>My Strategies</Text>
      </View>
      <Text style={styles.pagedescription}>My strategies for when I'm feeling stressed or anxious</Text>
      <List.Section style={styles.listItemsSection}>
        {savedStrategies.map((strategy, index) => (
          <List.Item
            key={index}
            title={strategy.title}
            titleStyle={{ fontSize: 15, fontFamily: "JakartaSemiBold" }}
            onPress={() => handleSelect(strategy.title)}
            left={() => <List.Icon icon={selected.includes(strategy.title) ? "checkbox-marked" : "checkbox-blank-outline"} style={{ paddingLeft: 15, }} color="#420C5C" />}
            />
        ))}
      </List.Section>
      <Text style={styles.addText}>Add another strategy not on the list</Text>
      <TextInput
        placeholder="Write your strategy here..."
        value={newStrategy}
        onChangeText={setNewStrategy}
        style={styles.textInput}
        />
      <Pressable style={styles.saveButtonWrapper}>
        {({ pressed }) => (
          <View style={[styles.saveButton, { opacity: pressed ? 0.5 : 1 }]}>
            <Text style={styles.saveButtonText}>Save</Text>
          </View>
        )}
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: "5%",
    backgroundColor: "#F0EDF1",
    flex: 1,
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
  saveButtonWrapper: {
    width: "100%",
    alignItems: "center",
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
  textInput: {
    borderWidth: 1,
    borderColor: '#420C5C',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 40
  },
  listItemsSection: {
    borderWidth: 1,
    borderColor: '#420C5C',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  addText: {
    fontFamily: "JakartaSemiBold",
    marginTop: 30,
    marginBottom: 10,
  },
  pagedescription: {
    fontFamily: "JakartaSemiBold",
  }
})

export default MySavedStrategies