import { Pressable, StyleSheet } from "react-native"
import { View, Text } from "../../components/Themed";
import { Link } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";

export default function NewRecordPage() {
  const db = SQLite.openDatabase('safespace.db');
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    console.log('I AM IN USE EFFECT');
    // db.transaction((tx) => {
    //   tx.executeSql('SELECT date, description FROM abuse_documents', [null], 
    //   (txObj, resultSet) => {
    //     console.log('SUCCESS READING DATABASE');
    //     console.log(resultSet);
    //     // setDocuments(resultSet.rows._array);
    //   },
    //   // (txObj, error) => console.error(error)
    //   );
    // });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM abuse_documents', undefined, 
      (txObj, resultSet) => {
        console.log('SUCCESS READING DATABASE');
        console.log(resultSet.rows);
        setDocuments(resultSet.rows._array);
      },
      // (txObj, error) => console.log(error)
      );
    });
  }, [])

  const listDocuments = () => {
    return documents.map((document, index)=> {
      console.log(document);
      return (
        <View>
          <Text>{new Date(document.date).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</Text>
          <Text>{new Date(document.date).toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})}</Text>
          <Text>{document.description}</Text>
        </View>
      )
    })
  }

  return (
    <View>
      <Text>LIST OF PREVIOUS RECORDS</Text>
      {listDocuments()}
    </View>
  )
}