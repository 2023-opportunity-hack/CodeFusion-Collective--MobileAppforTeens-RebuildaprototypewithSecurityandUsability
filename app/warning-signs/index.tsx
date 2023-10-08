import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DomesticViolenceText from '../../components/warning-signs/DomesticViolenceText';


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
      <Text style={styles.description}>It is not always obvious when someone you care about has been affected by sexual violence. Learning the warning signs for children, teens, and college-ageadults can help you learn when to act.</Text>
      <TouchableOpacity onPress={() => setShowMoreDomesticViolence(!showMoreDomesticViolence)}>
        <Text style={styles.dropDownButtonOne}>
          {showMoreDomesticViolence ? <DomesticViolenceText/> : 'What is domestic violence?'}
        </Text>
      </TouchableOpacity>
      <Text>Types of abuse</Text>
      <TouchableOpacity onPress={() => setShowMoreEmotionalAbuse(!showMoreEmotionalAbuse)}>
        <Text style={styles.dropDownButtonTop}>
          {showMoreEmotionalAbuse ? 'Hide Details' : 'Emotional abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreGaslighting(!showMoreGaslighting)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreGaslighting ? 'Hide Details' : 'Gaslighting'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreReproductiveCoersion(!showMoreReproductiveCoersion)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreReproductiveCoersion ? 'Hide Details' : 'Reproductive coersion'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMorePhysicalAbuse(!showMorePhysicalAbuse)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMorePhysicalAbuse ? 'Hide Details' : 'Physical abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreSexualAbuse(!showMoreSexualAbuse)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreSexualAbuse ? 'Hide Details' : 'Sexual abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreEconomicAbuse(!showMoreEconomicAbuse)}>
        <Text style={styles.dropDownButtonMiddle}>
          {showMoreEconomicAbuse ? 'Hide Details' : 'Economic abuse'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowMoreTechnologicalAssistedAbuse(!showMoreTechnologicalAssistedAbuse)}>
        <Text style={styles.dropDownButtonBottom}>
          {showMoreTechnologicalAssistedAbuse ? 'Hide Details' : 'Technological-assisted abuse'}
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
    backgroundColor: 'white',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  dropDownButtonTop: {
    backgroundColor: 'white',
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dropDownButtonMiddle: {
    borderTopWidth: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
  },
  dropDownButtonBottom: {
    borderTopWidth: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
