import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DomesticViolenceText from '../../components/warning-signs/DomesticViolenceText';
import EconomicAbuseText from '../../components/warning-signs/EconomicAbuseText';
import EmotionalAbuseText from '../../components/warning-signs/EmotionalAbuseText';
import GaslightingText from '../../components/warning-signs/GaslightingText';
import ReproductiveCoercionText from '../../components/warning-signs/ReproductiveCoercionText';
import PhysicalAbuseText from '../../components/warning-signs/PhysicalAbuseText';
import SexualAbuseText from '../../components/warning-signs/SexualAbuseText';
import TechnologicalAssistedAbuseText from '../../components/warning-signs/TechnologicalAssistedAbuseText';



export default function AnotherComponent () {

  const [showMoreDomesticViolence, setShowMoreDomesticViolence] = useState(false);
  const [showMoreEmotionalAbuse, setShowMoreEmotionalAbuse] = useState(false);
  const [showMoreGaslighting, setShowMoreGaslighting] = useState(false);
  const [showMoreReproductiveCoersion, setShowMoreReproductiveCoersion] = useState(false);
  const [showMorePhysicalAbuse, setShowMorePhysicalAbuse] = useState(false);
  const [showMoreSexualAbuse, setShowMoreSexualAbuse] = useState(false);
  const [showMoreEconomicAbuse, setShowMoreEconomicAbuse] = useState(false);
  const [showMoreTechnologicalAssistedAbuse, setShowMoreTechnologicalAssistedAbuse] = useState(false);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warning Signs</Text>
      <Text style={styles.description}>It is not always obvious when someone you care about has been affected by sexual violence. Learning the warning signs for children, teens, and college-age adults can help you learn when to act.</Text>
      <TouchableOpacity onPress={() => setShowMoreDomesticViolence(!showMoreDomesticViolence)}>
        <View style={styles.dropDownButtonOne}>
          <Text>
            {showMoreDomesticViolence ? <DomesticViolenceText/> : 'What is domestic violence?'}
          </Text>
          <Image source={require('../../assets/images/Back.png')}   style={styles.image} resizeMode='contain'/>
        </View>
      </TouchableOpacity>
      <Text>Types of abuse</Text>
      <TouchableOpacity onPress={() => setShowMoreEmotionalAbuse(!showMoreEmotionalAbuse)}>
        <Text style={styles.dropDownButtonTop}>
          {showMoreEmotionalAbuse ? <EmotionalAbuseText/> : 'Emotional abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreGaslighting(!showMoreGaslighting)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreGaslighting ? <GaslightingText/> : 'Gaslighting'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreReproductiveCoersion(!showMoreReproductiveCoersion)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreReproductiveCoersion ? <ReproductiveCoercionText/> : 'Reproductive coercion'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMorePhysicalAbuse(!showMorePhysicalAbuse)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMorePhysicalAbuse ? <PhysicalAbuseText/> : 'Physical abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreSexualAbuse(!showMoreSexualAbuse)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreSexualAbuse ? <SexualAbuseText/> : 'Sexual abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreEconomicAbuse(!showMoreEconomicAbuse)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreEconomicAbuse ? <EconomicAbuseText/> : 'Economic abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreTechnologicalAssistedAbuse(!showMoreTechnologicalAssistedAbuse)}>
        <Text style={styles.dropDownButtonBottom}>
          {showMoreTechnologicalAssistedAbuse ? <TechnologicalAssistedAbuseText/> : 'Technological-assisted abuse'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
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
    backgroundColor: 'white',
    marginTop: 10,
    borderWidth: 1,
    padding: '3%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dropDownButtonMiddle: {
    borderTopWidth: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: '3%',
  },
  dropDownButtonBottom: {
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
  },
});
