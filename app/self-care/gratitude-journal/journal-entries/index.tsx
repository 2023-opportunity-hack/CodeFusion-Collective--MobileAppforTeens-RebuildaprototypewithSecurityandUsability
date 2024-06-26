import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { PageHeader } from '../../../../components/PageHeader';
import { ToastMessage } from '../../../../components/ToastMessage';


type JournalEntryType = {
  date_id: number,
  date: string,
  date_value: string,
  entries: {
    entry_id: number,
    prompt: string,
    entry: string
  }[]
};

const sqlQuery = `SELECT
                    je.id AS date_id,
                    je.date_title AS date,
                    je.date_value AS date_value,
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
      <Text style={styles.prompt} >{prompt}</Text>
      <Text style={styles.entrytext}>{entry}</Text>
    </View>
  )
};

export default function JournalEntries() {
  const db = SQLite.openDatabaseSync('safespace.db');

  const [journalEntries, setJournalEntries] = useState<JournalEntryType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const deleteAllJournalEntries = async () => {
    try {
      await db.execAsync('DELETE FROM journal_entries; DELETE FROM journal_details;');
      setShowSuccessToast(true);
      setJournalEntries([]);
    } catch (error) {
      console.log('Error deleting journal entries: ', error);
      setShowErrorToast(true);
    } finally {
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

    const getEntries = async () => {
      try {
        const fetchedEntries = await db.getAllAsync(sqlQuery) as JournalEntryType[];
        if (fetchedEntries.length > 0) {
          fetchedEntries.forEach((day) => {
            if (typeof day.entries === 'string') {
              day.entries = JSON.parse(day.entries);
            }
          });

          const sortedEntries: JournalEntryType[] = fetchedEntries.sort((a, b) => new Date(b.date_value).getTime() - new Date(a.date_value).getTime());
          setJournalEntries(sortedEntries);
        }
      } catch (error) {
        setShowErrorToast(true);
        console.error('Error fetching journal entries:', error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          if (showErrorToast) {
            setShowErrorToast(false);
          }
          setShowSuccessToast(false);
        }, 3000);
      }
    };

    getEntries();
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: '#F0EDF1' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {showSuccessToast ? <ToastMessage entryName='Entries' type='delete' /> : null}
        {showErrorToast ? <ToastMessage entryName='journal entries' type="error" /> : null}
        <Modal
          animationType='fade'
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          >
          <View style={styles.modalContainer}>
            <View style={styles.modalContents}>
              <Text style={{ fontFamily: 'JakartaSemiBold', fontSize: 16 }}>Are you sure you want to delete all journal entries?</Text>
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
        <PageHeader route="/self-care/gratitude-journal" title="Journal Entries" />
        <List.Section style={styles.listGroupContainer}>
          <View style={styles.listGroup}>
            {!loading && journalEntries.length > 0 ? (
              journalEntries.map((day) => (
                <List.Accordion
                  key={day.date}
                  title={new Date(day.date_value).toLocaleDateString('en-US', options)}
                  theme={{ colors: { background: "#FFFFFF" } }}
                  titleStyle={{ fontFamily: 'JakartaMed' }}
                  >
                  {day.entries && day.entries.map((entry) => (
                    <List.Item
                      key={entry.entry}
                      title={<JournalEntry entry={entry.entry} prompt={entry.prompt} />}
                    />
                  ))}
              </List.Accordion>
              ))
            ) : (
              <List.Item title={"No saved journal entries"} titleStyle={{ fontFamily: "JakartaMed" }} />
            )}
          </View>
        </List.Section>
        {journalEntries.length > 0 ?
          <View style={styles.buttonWrapper}>
            <Pressable onPress={() => setShowModal(true)} style={({ pressed }) => ([{ opacity: pressed ? 0.5 : 1 }, styles.deleteButton])}>
              <Text style={styles.buttonText}>Delete Journal Entries</Text>
            </Pressable>
          </View>
          : null}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0EDF1',
    padding: "5%",
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
  journalEntryContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flexShrink: 1,
  },
  prompt: {
    fontFamily: "JakartaSemiBold",
    fontSize: 15,
    marginBottom: 5,
    width: 310
  },
  entrytext: {
    fontFamily: "JakartaLight",
    fontSize: 15,
    width: 310
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
    borderRadius: 100,
    width: '40%',
  },
  modalButton: {
    width: "100%",
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
    marginVertical: 30
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
  },
  buttonText: {
    fontFamily: 'JakartaSemiBold',
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
  },
})