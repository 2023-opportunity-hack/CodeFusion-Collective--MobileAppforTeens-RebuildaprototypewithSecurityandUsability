import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { PageHeader } from "../../../../components/PageHeader";
import { ToastMessage } from '../../../../components/ToastMessage';


const sqlQuery = `SELECT
                    '[' || GROUP_CONCAT('"' || strategy || '"') || ']' AS strategies
                  FROM
                    strategies;
                  `;

const MySavedStrategies = () => {
  const db = SQLite.openDatabase('safespace.db');

  const [selected, setSelected] = useState<string[]>([]);
  const [newStrategy, setNewStrategy] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleDeselect = (label: string) => {
    setSelected(selected.filter((title) => title !== label));
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM strategies WHERE strategy = ?', [label]);
    })
  }

  const saveCustomStrategy = () => {
    setLoading(true);
    setSelected([...selected, newStrategy]);
    setNewStrategy("");
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO strategies (strategy) VALUES (?)', [newStrategy], () => {
        setShowSuccessToast(true);
      }, (_, error) => {
        console.error('Error saving custom strategy:', error);
        setShowErrorToast(true);
        return false;
      });
    })
    setLoading(false);

    setTimeout(() => {
      if (showErrorToast) {
        setShowErrorToast(false);
      }
      setShowSuccessToast(false);
    }, 3000);
  }

  useEffect(() => {
    setLoading(true);
    db.transaction((tx) => {
      tx.executeSql(sqlQuery, [], (_, resultSet) => {
        const parsedStrategies = JSON.parse(resultSet.rows._array[0].strategies);
        if (!parsedStrategies) {
          setSelected([]);
        } else {
          setSelected(parsedStrategies);
        }
      }, (_, error) => {
        console.error('Error fetching saved strategies:', error);
        setShowErrorToast(true);
        return false;
      })
    })
    setLoading(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {showSuccessToast ? <ToastMessage entryName="Strategy" type="success" /> : null}
      {showErrorToast ? <ToastMessage entryName="Strategy" type="error" /> : null}
      <PageHeader route="/self-care/my-strategies" title="Saved Strategies" />
      <Text style={styles.pagedescription}>My strategies for when I'm feeling stressed or anxious</Text>
      <List.Section style={styles.listItemsSection}>
        {!loading
          ? selected.length > 0
            ? selected.map((strategy, index) => (
              <List.Item
                key={index}
                title={strategy.slice(0, 1).toUpperCase() + strategy.slice(1)}
                titleStyle={{ fontSize: 15, fontFamily: "JakartaSemiBold" }}
                onPress={() => handleDeselect(strategy)}
                left={() => <List.Icon
                              icon={selected.includes(strategy) ? "checkbox-marked" : "checkbox-blank-outline"}
                              style={{ paddingLeft: 15, }}
                              color="#420C5C"
                              />}
                />
              )) : (
                <List.Item title="No strategies saved" titleStyle={{ fontFamily: "JakartaMed" }} />
              )
            : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#420C5C" />
              </View>
            )
          }
      </List.Section>
      <Text style={styles.addText}>Add another strategy not on the list</Text>
      <TextInput
        placeholder="Write your strategy here..."
        value={newStrategy}
        onChangeText={setNewStrategy}
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={() => Keyboard.dismiss()}
        style={styles.textInput}
        />
      <Pressable style={styles.saveButtonWrapper} disabled={!newStrategy} onPress={saveCustomStrategy}>
        {({ pressed }) => (
          <View style={[styles.saveButton, { opacity: pressed || !newStrategy ? 0.5 : 1 }]}>
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
    padding: "5%",
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
    marginTop: 20,
    marginBottom: 60
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
  textInput: {
    borderWidth: 1,
    fontFamily: "JakartaMed",
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default MySavedStrategies