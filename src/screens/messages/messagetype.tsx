import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import {RadioButton} from 'react-native-paper';

const MessageType = () => {
  // Initialize state with 'message' as the default value
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleNextPress = () => {
    // Navigate to MessageTypeScreen
    navigation.navigate('SummaryScreen');
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>What to Send</Text>

      <View style={styles.boxContainer}>
        <Text style={styles.label}>
          Allow message containing the following words:
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#28a745' : '#f4f3f4'}
          ios_backgroundColor="#28a745"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.keywordsContainer}>
        <Text style={styles.keywordsText}>Allowed words:</Text>
        <Text style={styles.keyword}>opt</Text>
        <Text style={styles.keyword}>pin</Text>
        <Text style={styles.keyword}>password</Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    marginRight: 10,
  },
  keywordsContainer: {
    marginBottom: 190,
  },
  keywordsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  keyword: {
    fontSize: 16,
    marginVertical: 5,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MessageType;
