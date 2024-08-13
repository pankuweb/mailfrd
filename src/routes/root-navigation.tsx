import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './routes';

export default function NavigationWrapper() {
  return <NavigationContainer>{AuthStack()}</NavigationContainer>;
}
