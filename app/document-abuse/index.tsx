import { StyleSheet, Image, Pressable } from "react-native";
import { View, Text } from "../../components/Themed";
import { Link } from "expo-router";

export default function DocumentAbusePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Abuse</Text>
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
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  logoContainer: {
    width: 125,
    height: 125,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logoImage: {
    width: 80,
    height: 100,
  },
  description: {
    fontSize: 20,
    paddingHorizontal: 20,
    marginVertical: 20,
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
  }
});