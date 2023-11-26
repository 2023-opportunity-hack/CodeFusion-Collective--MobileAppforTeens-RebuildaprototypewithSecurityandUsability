import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DomesticViolenceText from '../../components/warning-signs/DomesticViolenceText';
import EconomicAbuseText from '../../components/warning-signs/EconomicAbuseText';
import EmotionalAbuseText from '../../components/warning-signs/EmotionalAbuseText';
import GaslightingText from '../../components/warning-signs/GaslightingText';
import PhysicalAbuseText from '../../components/warning-signs/PhysicalAbuseText';
import ReproductiveCoercionText from '../../components/warning-signs/ReproductiveCoercionText';
import SexualAbuseText from '../../components/warning-signs/SexualAbuseText';
import TechnologicalAssistedAbuseText from '../../components/warning-signs/TechnologicalAssistedAbuseText';



export default function WarningSigns () {

  const [showMoreDomesticViolence, setShowMoreDomesticViolence] = useState(false);
  const [showMoreEmotionalAbuse, setShowMoreEmotionalAbuse] = useState(false);
  const [showMoreGaslighting, setShowMoreGaslighting] = useState(false);
  const [showMoreReproductiveCoersion, setShowMoreReproductiveCoersion] = useState(false);
  const [showMorePhysicalAbuse, setShowMorePhysicalAbuse] = useState(false);
  const [showMoreSexualAbuse, setShowMoreSexualAbuse] = useState(false);
  const [showMoreEconomicAbuse, setShowMoreEconomicAbuse] = useState(false);
  const [showMoreTechnologicalAssistedAbuse, setShowMoreTechnologicalAssistedAbuse] = useState(false);

  return (
    <ScrollView>
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
        <Text style={styles.title}>Warning Signs</Text>
      </View>
        <Text style={styles.description}>It is not always obvious when someone you care about has been affected by sexual violence. Learning the warning signs for children, teens, and college-age adults can help you learn when to act.</Text>
        <TouchableOpacity onPress={() => setShowMoreDomesticViolence(!showMoreDomesticViolence)}>
          <View style={styles.dropDownButtonOne}>
            <Text>
              {showMoreDomesticViolence ? <DomesticViolenceText/> : 'What is domestic violence?'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
          </View>
        </TouchableOpacity>
        <Text>Types of abuse</Text>
        <TouchableOpacity onPress={() => setShowMoreEmotionalAbuse(!showMoreEmotionalAbuse)}>
          <View style={styles.dropDownButtonTop}>
            <Text>
              {showMoreEmotionalAbuse ? <EmotionalAbuseText/> : 'Emotional abuse'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreGaslighting(!showMoreGaslighting)}>
          <View style={styles.dropDownButtonMiddle}>
            <Text>
              {showMoreGaslighting ? <GaslightingText/> : 'Gaslighting'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreReproductiveCoersion(!showMoreReproductiveCoersion)}>
          <View style={styles.dropDownButtonMiddle}>
            <Text>
              {showMoreReproductiveCoersion ? <ReproductiveCoercionText/> : 'Reproductive coercion'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMorePhysicalAbuse(!showMorePhysicalAbuse)}>
          <View style={styles.dropDownButtonMiddle}>
            <Text>
              {showMorePhysicalAbuse ? <PhysicalAbuseText/> : 'Physical abuse'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreSexualAbuse(!showMoreSexualAbuse)}>
          <View style={styles.dropDownButtonMiddle}>
            <Text>
              {showMoreSexualAbuse ? <SexualAbuseText/> : 'Sexual abuse'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreEconomicAbuse  (!showMoreEconomicAbuse)}>
          <View style={{...styles.dropDownButtonMiddle}}>
            <Text>
              {showMoreEconomicAbuse ? <EconomicAbuseText/> : 'Economic abuse'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowMoreTechnologicalAssistedAbuse(!showMoreTechnologicalAssistedAbuse)}>
          <View style={styles.dropDownButtonBottom}>
            <Text>
              {showMoreTechnologicalAssistedAbuse ? <TechnologicalAssistedAbuseText/> : 'Technological-assisted abuse'}
            </Text>
            <Image source={require('../../assets/images/Back.png')} style={styles.image} resizeMode='contain'/>
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
  image: {
    width: 20,
    height: 20,
    transform: [{ rotate: '270deg' }],
    marginLeft: 'auto'
  },
  backButton: {
    textAlign: 'left',
    flexDirection: 'row',
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginTop: "20%",
    marginBottom: "15%",
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
  }
});
