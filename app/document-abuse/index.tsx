import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PageHeader } from "../../components/PageHeader";
import { ToastMessage } from "../../components/ToastMessage";

export default function DocumentAbusePage() {
  const db = SQLite.openDatabaseSync('safespace.db');
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  useEffect(() => {
    const createTables = async () => {
      try {
        db.execAsync('CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, date_title TEXT, date_value TEXT);');
        db.execAsync('CREATE TABLE IF NOT EXISTS record_details (id INTEGER PRIMARY KEY AUTOINCREMENT, record_id INTEGER, description TEXT, date TEXT, FOREIGN KEY (record_id) REFERENCES records(id))');
      } catch (error) {
        setShowErrorToast(true);
        console.error('Error creating tables:', error);
        setTimeout(() => {
          if (showErrorToast) {
            setShowErrorToast(false);
          }
        }, 3000);
      }
    };

    createTables();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showErrorToast ? <ToastMessage entryName="Record" type="error" /> : null}
      <PageHeader route="/homepage" title="Document Abuse" />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/1F4C3_color.png')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.description}>
        Select Add a New Record to document a new abuse incident or select View Records to see previous incidents
      </Text>
      <Link
        href="/document-abuse/add-new-record"
        asChild
        style={{width: '100%', alignItems: 'center', marginVertical: 40}}
      >
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { backgroundColor: '#420C5C', opacity: pressed ? 0.5 : 1 }]}>
              <Text style={[styles.buttonText, {color: '#fff'}]}>Add a New Record</Text>
            </View>
          )}
        </Pressable>
      </Link>
      <Link
        href="/document-abuse/previous-records"
        asChild
        style={{width: '100%', alignItems: 'center'}}
        >
        <Pressable>
          {({ pressed }) => (
            <View style={[styles.button, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.buttonText}>View Previous Records</Text>
            </View>
          )}
        </Pressable>
      </Link>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#F0EDF1",
    padding: "5%"
  },
  logoContainer: {
    width: 125,
    height: 125,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: '10%',
  },
  logoImage: {
    width: 80,
    height: 100,
  },
  description: {
    fontFamily: "JakartaSemiBold",
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 20,
    paddingTop: "10%"
  },
  button: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5
  },
  buttonText: {
    fontFamily: "JakartaSemiBold",
    marginVertical: 10,
    fontSize: 20,
  },
});