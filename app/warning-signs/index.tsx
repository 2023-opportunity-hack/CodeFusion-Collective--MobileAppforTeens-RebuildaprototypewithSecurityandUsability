import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import { PageHeader } from '../../components/PageHeader';
import { domesticViolenceText, warningSigns } from './warningSigns';



export default function WarningSigns () {

  return (
    <ScrollView style={styles.container}>
      <PageHeader title='Warning Signs' route='/homepage' />
      <Text style={styles.description}>
        It is not always obvious when someone you care about has been affected by sexual violence. Learning the warning signs for children, teens, and college-age adults can help you learn when to act.
      </Text>
      <List.Section style={{ borderRadius: 10, backgroundColor: "#F0EDF1", marginBottom: 40 }}>
        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "#420C5C", overflow: "hidden", backgroundColor: "white" }}>
          <List.Accordion
            title="What is domestic violence?"
            titleStyle={{ fontFamily: "JakartaSemiBold"}}
            style={{ backgroundColor: "white", overflow: "hidden", paddingVertical: 0 }}
            >
            <List.Item
              style={{ paddingTop: 0 }}
              title={
                <View>
                  <Text style={{ fontFamily: "JakartaLight", width: 320 }}>
                    <Text style={{ fontFamily: "JakartaBold" }}>
                      {domesticViolenceText.title}
                    </Text>{" "}
                    {domesticViolenceText.text}
                  </Text>
                </View>
              }
             />
          </List.Accordion>
        </View>
      </List.Section>
      <Text style={{ fontFamily: "JakartaSemiBold"}}>Types of abuse</Text>
      <List.Section style={{ borderRadius: 10, backgroundColor: "#F0EDF1", marginBottom: 50 }}>
        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: "#420C5C", overflow: "hidden", backgroundColor: "white"}}>
          {warningSigns.map((warningSign, index) => (
            <List.Accordion
              key={index}
              title={warningSign.title}
              style={{ backgroundColor: "white", overflow: "hidden", borderTopWidth: index === 0 ? 0 : 1, borderColor: "#A2A1A2", paddingVertical: 0}}
              titleStyle={{ fontFamily: "JakartaMed" }}
              >
              <List.Item
                style={{ paddingTop: 0 }}
                title={
                  <View>
                    <Text style={{ fontFamily: "JakartaLight", width: 320 }}>
                      <Text style={{ fontFamily: "JakartaBold" }}>
                        {warningSign.title}
                      </Text>{" "}
                      {warningSign.text}
                    </Text>
                  </View>
                }
                />
            </List.Accordion>
          ))}
        </View>
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF1',
    flex: 1,
    padding: "5%",
    height: "100%",
  },
  description: {
    fontFamily: "JakartaSemiBold",
    marginBottom: 25,
  },
});
