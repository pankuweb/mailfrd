import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  async function requestSmsPermissions() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      ]);
      console.log(granted, 'You can receive and send SMS');

      // if (
      //   granted['android.permission.RECEIVE_SMS'] === 'granted' &&
      //   granted['android.permission.READ_SMS'] === 'granted' &&
      //   granted['android.permission.SEND_SMS'] === 'granted'
      // ) {
      //   console.log(granted,'You can receive and send SMS');
      // } else {
      //   console.log('SMS permission denied');
      // }
    } catch (err) {
      console.warn(err);
    }
  }
  useEffect(() => {
    requestSmsPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('FilterScreen')}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
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
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
