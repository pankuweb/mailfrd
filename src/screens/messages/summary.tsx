import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SummaryScreen = ({ navigation }) => {
  const route = useRoute();
  const { recipientType, recipientValue, keywords } = route.params?.data || {};

  const saveDataToLocalStorage = async () => {
    try {
      // Retrieve existing data from AsyncStorage
      const storedData = await AsyncStorage.getItem('messageData');
      let data = storedData ? JSON.parse(storedData) : [];

      // Add new data
      const newEntry = {
        recipientType,
        recipientValue,
        keywords: keywords || [],
      };

      // Add the new entry to the existing array
      data.push(newEntry);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('messageData', JSON.stringify(data));

      console.log('Data saved successfully');
    } catch (error) {
      console.log('Failed to save data: ', error);
    }
  };

  const handleDone = async () => {
    await saveDataToLocalStorage();
    // Reset the navigation stack and navigate to HomeScreen
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Recipient</Text>
        <Text style={styles.value}>{recipientType} - {recipientValue}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Keywords</Text>
        <Text style={styles.value}>{keywords ? keywords.join(', ') : 'None'}</Text>
      </View>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={handleDone}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SummaryScreen;
