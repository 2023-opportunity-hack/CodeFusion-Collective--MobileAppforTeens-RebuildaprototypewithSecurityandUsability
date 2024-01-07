import { Link } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";

export default function DocumentAbusePage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/homepage" asChild>
          <Pressable>
            <Image
              source={require("../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Document Abuse</Text>
      </View>
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
          <View style={[styles.button, {backgroundColor: '#420C5C'}]}>
            <Text style={[styles.buttonText, {color: '#fff', fontWeight: 'bold'}]}>Add a New Record</Text>
          </View>
        </Pressable>
      </Link>
      <Link href="/document-abuse/previous-records" asChild style={{width: '100%', alignItems: 'center'}}>
        <Pressable>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Previous Records</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
    fontSize: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
    paddingTop: "10%"
  },
  button: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginVertical: 10,
    fontSize: 20,
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
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
});