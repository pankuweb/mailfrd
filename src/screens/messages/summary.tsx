import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, DeviceEventEmitter } from 'react-native';
import SmsListener from 'react-native-get-sms-android';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SummaryScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  const route = useRoute();
  const { recipientType, recipientValue, keywords } = route.params?.data || {};

  useEffect(() => {
    // Set up the listener for incoming SMS
    const subscription = DeviceEventEmitter.addListener('sms_received', (sms) => {
      console.log('SMS received:', sms);
      forwardSms();
      setShowMessages(true);
    });

    return () => {
      // Clean up the subscription when the component is unmounted
      subscription.remove();
    };
  }, []);

  function forwardSms() {
    const filter = {
      box: 'inbox',
      maxCount: 1, // Fetch the most recent message
    };

    SmsListener.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        const arr = JSON.parse(smsList);
        console.log('List: ', arr);

        setMessages(arr); // Store the messages in the state
        setShowMessages(true); // Trigger UI update to show messages

        // Automatically send the most recent message
        if (arr.length > 0) {
          sendMessage(arr[0].address, arr[0].body);
        }
      },
    );
  }

  const sendMessage = (recipientNumber, messageContent) => {
    SmsListener.autoSend(
      `+91${recipientValue}`, // Replace with the actual recipient number
      messageContent,
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      success => {
        console.log('SMS sent successfully');
      },
    );
  };

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
        messages: messages || [],
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
    await forwardSms();
    await saveDataToLocalStorage();
    // Optionally navigate to another screen
    // navigation.navigate('HomeScreen');
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageDate}>{new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.messageBody}>{item.body}</Text>
    </View>
  );

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
        onPress={handleDone} // Call handleDone when pressed
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
      {/* {showMessages && (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.messageList}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'space-between',
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  phoneNumberContainer: {
    marginBottom: 20,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
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
  messageList: {
    marginTop: 20,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageDate: {
    fontSize: 14,
    color: '#555',
  },
  messageBody: {
    fontSize: 16,
  },
});

export default SummaryScreen;
