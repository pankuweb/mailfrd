/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import NavigationWrapper from './src/routes/root-navigation';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationWrapper />
      <Toast />
    </SafeAreaView>
  );
}

export default App;
