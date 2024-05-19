import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { List } from 'react-native-paper';
import { PageHeader } from '../../components/PageHeader';
import { ToastMessage } from '../../components/ToastMessage';

type RecordEntryType = {
  record_date: string,
  record_id: number,
  date_value: string,
  records: {
    description: string,
    event_date: string,
    detail_id: number
  }[]
};

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
};


export default function NewRecordPage() {
  const db = SQLite.openDatabaseSync('safespace.db');
  const [recordEntries, setRecordEntries] = useState<RecordEntryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const sqlQuery = `SELECT
                      r.id AS record_id,
                      r.date_title AS record_date,
                      r.date_value AS date_value,
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

  const deleteAllRecords = async () => {
    try {
      await db.execAsync('DELETE FROM records; DELETE FROM record_details;');
    } catch (error) {
      console.error('Error deleting records:', error);
      setShowErrorToast(true);
    } finally {
      setShowSuccessToast(true);
      setRecordEntries([]);
      setShowModal(false);
      setTimeout(() => {
        if (showErrorToast) {
          setShowErrorToast(false);
        }
        setShowSuccessToast(false);
      }, 3000);
    }
  };

  useEffect(() => {
    setLoading(true);

    const getRecords = async () => {
      try {
        const fetchedRecords = await db.getAllAsync(sqlQuery) as RecordEntryType[];
        if (fetchedRecords.length > 0) {
          fetchedRecords.forEach((day) => {
            if (typeof day.records === 'string') {
              day.records = JSON.parse(day.records);
              day.records.forEach((record) => {
                record.description = record.description.replace(/\\n/g, '\n').replace(/\\r/g, '\r');
              })
            }
          })
          const sortedRecords = fetchedRecords.sort((a, b) => new Date(b.date_value).getTime() - new Date(a.date_value).getTime());
          sortedRecords.forEach((day) => {
            day.records.sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());
          });
          setRecordEntries(sortedRecords);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching records:', error);
        setShowErrorToast(true);
      } finally {
        setLoading(false);
      }
    };

    getRecords();
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: '#F0EDF1' }}>
      {showSuccessToast ? <ToastMessage entryName='Records' type='delete' /> : null}
      {showErrorToast ? <ToastMessage entryName='records' type="error" /> : null}
      <ScrollView contentContainerStyle={styles.container}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <Text style={{ fontFamily: 'JakartaSemiBold', fontSize: 16 }}>Are you sure you want to delete all records?</Text>
              <View style={styles.modalButtons}>
                <Pressable style={styles.modalButtonWrapper} onPress={deleteAllRecords}>
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
        <PageHeader route="/document-abuse" title="Previous Records" />
        <List.Section style={styles.listGroupContainer}>
          <View style={styles.listGroup}>
            {!loading && recordEntries.length > 0 ? (
              recordEntries.map((day) => (
                <List.Accordion
                  key={day.record_id}
                  title={day.record_date}
                  theme={{ colors: { background: "#FFFFFF" } }}
                  titleStyle={{ fontFamily: 'JakartaMed' }}
                >
                  {day.records.map((entry) => (
                    <List.Item
                      key={entry.detail_id} //FIX ERROR THAT HAPPENS WHEN USER USES THE SAME EVENT DATE FOR MULTIPLE ENTRIES
                      title={<RecordEntry description={entry.description} date={entry.event_date} />}
                    />
                  ))}
                </List.Accordion>
              ))
            ): (
              <List.Item title="No saved records" titleStyle={{ fontFamily: "JakartaMed" }} />
            )}
          </View>
        </List.Section>
        {recordEntries.length > 0 ?
          <Pressable onPress={() => setShowModal(true)} style={styles.buttonWrapper}>
            {({ pressed }) => (
              <View style={[styles.deleteButton, { opacity: pressed ? 0.5 : 1 }]}>
                <Text style={styles.buttonText}>Delete Records</Text>
              </View>
            )}
          </Pressable>
          : null}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#F0EDF1",
    padding: "5%",
  },
  listGroupContainer: {
    width: "100%",
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
    fontSize: 15,
    width: 320
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  deleteButton: {
    width: '100%',
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
})