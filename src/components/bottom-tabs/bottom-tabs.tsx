import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utils';
import {tabs} from '../../constants';
import {styles} from './style';
import {TouchableOpacity, View} from 'react-native';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  tabBarIcon: string;
  isFocused: boolean;
}
const TabBarIcon: React.FC<TabBarIconProps> = ({tabBarIcon, isFocused}) => (
  <Ionicons
    name={tabBarIcon}
    size={23}
    color={isFocused ? '#0000FF' : Colors.primary.brand}
    style={[styles.icon, isFocused ? styles.iconActive : null]}
  />
);

function CustomTabBarButton({children, onPress, onLongPress, opacity}: any) {
  return (
    <TouchableOpacity
      style={[styles.tabBarButton, {opacity}]}
      onPress={onPress}
      onLongPress={onLongPress}>
      {children}
    </TouchableOpacity>
  );
}

function BottomTabs(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 3,
          fontFamily: 'Roboto-Regular',
        },
        tabBarStyle: {
          display: 'flex',
        },
        tabBarActiveTintColor: '#0000FF', // Set the active tab text color
        tabBarButton: ({onPress, onLongPress, children, style}) => (
          <CustomTabBarButton onPress={onPress} onLongPress={onLongPress}>
            <View style={[style]}>{children}</View>
          </CustomTabBarButton>
        ),
      })}>
      {tabs.map(tab => {
        return (
          <Tab.Screen
            key={tab.name}
            options={isFocused => ({
              headerShown: tab.headerShown,
              tabBarLabel: tab.tabBarLabel,
              headerStyle: {
                backgroundColor: isFocused ? '#0000FF' : 'white', // Change header background color dynamically
              },
              headerTitleStyle: {
                color: '#fff',
              },
              tabBarIcon: ({focused}) => (
                <TabBarIcon tabBarIcon={tab.tabBarIcon} isFocused={focused} />
              ),
            })}
            name={tab.name}
            component={tab.component}
            // component={token === 'undefined' ? AuthTabs : tab.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default BottomTabs;
