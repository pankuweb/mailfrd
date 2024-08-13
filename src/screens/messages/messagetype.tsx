import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MessageType = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [keywords, setKeywords] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { recipientType, recipientValue } = route.params || {};

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleNextPress = () => {
    const keywordsArray = keywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
    const dataToSend = {
      recipientType,
      recipientValue,
      keywords: keywordsArray
    };

    navigation.navigate('SummaryScreen', { data: dataToSend });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What to Send</Text>

      <View style={styles.boxContainer}>
        <Text style={styles.label}>
          Allow message containing the following words:
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#28a745' : '#f4f3f4'}
          ios_backgroundColor="#28a745"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {isEnabled && (
        <TextInput
          style={styles.input}
          placeholder="Enter keywords separated by commas"
          value={keywords}
          onChangeText={setKeywords}
        />
      )}

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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
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
