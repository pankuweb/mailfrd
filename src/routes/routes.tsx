import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/home';
import DashboardScreen from '../screens/dashboard/dashboard';
import FilterScreen from '../screens/messages/filter';
import MessageType from '../screens/messages/messagetype';
import SummaryScreen from '../screens/messages/summary';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'Roboto-Regular',
        },
        headerStyle: {
          backgroundColor: '#0000FF', // Set the header background color
        },
        headerBackTitleVisible: true,
        headerTintColor: 'white', // Set the header text color
      }}>
      <Stack.Screen
        key={'DashboardScreen'}
        options={{headerShown: true}}
        name={'DashboardScreen'}
        component={DashboardScreen}
      />
      <Stack.Screen
        key={'HomeScreen'}
        options={{headerShown: true}}
        name={'HomeScreen'}
        component={HomeScreen}
      />
      <Stack.Screen
        key={'FilterScreen'}
        options={{headerShown: true}}
        name={'FilterScreen'}
        component={FilterScreen}
      />
      <Stack.Screen
        key={'MessageType'}
        options={{headerShown: true}}
        name={'MessageType'}
        component={MessageType}
      />
      <Stack.Screen
        key={'SummaryScreen'}
        options={{headerShown: true}}
        name={'SummaryScreen'}
        component={SummaryScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
