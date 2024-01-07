import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function MoodTracker () {

  const [showMoreStrategyOne, setShowMoreStrategyOne] = useState(false);
  const [showMoreStrategyTwo, setShowMoreStrategyTwo] = useState(false);
  const [showMoreStrategyThree, setShowMoreStrategyThree] = useState(false);
  const [showMoreStrategyFour, setShowMoreStrategyFour] = useState(false);
  const [showMoreStrategyFive, setShowMoreStrategyFive] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/self-care" asChild>
          <Pressable>
            <Image
              source={require("../../../assets/images/Back.png")}
              style={styles.backimage}
            />
          </Pressable>
        </Link>
        <Text style={styles.title}>Mood Tracker</Text>
      </View>
        <Text style={styles.description}>If you are not having a great day, it may help to use one of your self care strategies. If you need to, try one and see if it helps!</Text>
        <Text>Your Strategies</Text>
        <TouchableOpacity onPress={() => setShowMoreStrategyOne(!showMoreStrategyOne)}>
        <View style={styles.dropDownButtonTop}>
          <Text>
          {showMoreStrategyOne ? 'Go for a walk' : 'Go for a walk'}
          </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreStrategyTwo(!showMoreStrategyTwo)}>
        <View style={styles.dropDownButtonMiddle}>
          <Text>
          {showMoreStrategyTwo ? 'Call a friend' : 'Call a friend'}
          </Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreStrategyThree(!showMoreStrategyThree)}>
          <View style={styles.dropDownButtonMiddle}>
            <Text>
            {showMoreStrategyThree ? 'Doodle, draw, or paint': 'Doodle, draw, or paint'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreStrategyFour(!showMoreStrategyFour)}>
          <View style={styles.dropDownButtonMiddle}>
            <Text>
          {showMoreStrategyFour ? 'Play with or walk a pet' : 'Play with or walk a pet'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreStrategyFive(!showMoreStrategyFive)}>
          <View style={styles.dropDownButtonMiddle}>
            <Text>
            {showMoreStrategyFive ? 'Do a puzzle' : 'Do a puzzle'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDF1',
    flex: 1,
    padding: 30,
    paddingTop: 0
  },
  description: {
    marginBottom: 25,
  },
  dropDownButtonOne: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    borderWidth: 1,
    padding: '3%',
    borderRadius: 5,
    marginBottom: 30,
  },
  dropDownButtonTop: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    borderWidth: 1,
    padding: '3%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dropDownButtonMiddle: {
    flexDirection: 'row',
    borderTopWidth: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: '3%',
  },
  dropDownButtonBottom: {
    flexDirection: 'row',
    borderTopWidth: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: '3%',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  clearButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginHorizontal: '8%',
    borderRadius: 20,
    height: 50,
    color: '#420C5C',
    textAlign: 'center',
    paddingTop: '2.5%',
  },
  clearButtonText: {
    fontSize: 20,
    color: '#420C5C',
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