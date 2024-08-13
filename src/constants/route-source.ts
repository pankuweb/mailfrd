import DashboardScreen from '../screens/dashboard/dashboard';
import HomeScreen from '../screens/home/home';
export const routes = [
  {
    name: 'DashboardScreen',
    title: 'DashboardScreen',
    headerShown: false,
    component: DashboardScreen,
  },
  {
    name: 'HomeScreen',
    title: 'HomeScreen',
    headerShown: false,
    component: HomeScreen,
  },
];
