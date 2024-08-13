import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';
import SmsListener from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-async-storage/async-storage';
const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const HomeScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [RecipientNumber, setRecipientNumber] = useState('');

  useEffect(() => {
    const getRecipientNumber = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('messageData');
        if (storedItems) {
          setRecipientNumber(JSON.parse(storedItems)?.[0]?.recipientValue);
        }
      } catch (error) {
        console.error('Failed to retrieve recipient number:', error);
      }
    };

    getRecipientNumber();
  }, []);

  const forwardSms = () => {
    const filter = {
      box: 'inbox',
      maxCount: 1, // Fetch the most recent message
    };

    SmsListener.list(
      JSON.stringify(filter),
      fail => {
        console.error('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        try {
          const arr = JSON.parse(smsList);
          console.log('Count: ', count);
          console.log('List: ', arr);

          setMessages(arr); // Store the messages in the state
          setShowMessages(true); // Trigger UI update to show messages

          if (arr.length > 0) {
            sendMessage(arr[0].body);
          }
        } catch (error) {
          console.error('Error parsing SMS list:', error);
        }
      },
    );
  };
  const sendMessage = (messageContent) => {
    SmsListener.autoSend(
      RecipientNumber, // Use the actual recipient number from state
      messageContent,
      fail => {
        console.error('Failed to send SMS: ' + fail);
      },
      success => {
        console.log('SMS sent successfully');
      },
    );
  };

  const startBackgroundJob = async () => {
    const veryIntensiveTask = async taskDataArguments => {
      const {delay} = taskDataArguments;
      while (BackgroundService.isRunning()) {
        console.log('Task is running...');
        forwardSms();
        await sleep(delay);
      }
    };

    const options = {
      taskName: 'ConsoleLogger',
      taskTitle: 'Background Task',
      taskDesc: 'Running a task every 5 seconds',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#ff00ff',
      linkingURI: 'yourSchemeHere://chat/jane',
      parameters: {
        delay: 5000, // 5 seconds
      },
    };

    try {
      if (BackgroundService.isRunning()) {
        console.log('Background service is already running');
        return;
      }
      await BackgroundService.start(veryIntensiveTask, options);
      console.log('Background service started');
    } catch (error) {
      console.error('Failed to start background service:', error);
    }
  };

  const stopBackgroundJob = async () => {
    try {
      if (!BackgroundService.isRunning()) {
        console.log('Background service is not running');
        return;
      }
      await BackgroundService.stop();
      console.log('Background service stopped');
    } catch (error) {
      console.error('Failed to stop background service:', error);
    }
  };

  async function requestSmsPermissions() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        // PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE,
      ]);
      console.log(granted, 'You can receive and send SMS');
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestSmsPermissions();
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('FilterScreen')}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <Button title="Start Background Job" onPress={startBackgroundJob} />
      <Button title="Stop Background Job" onPress={stopBackgroundJob} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#0000FF',
    borderRadius: 70,
    padding: 20,
    shadowColor: '#000',
    height: 70,
    width: 70,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
});

export default HomeScreen;
