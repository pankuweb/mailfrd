import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginBottom: 2,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 0,
    marginTop: 4,
    color: 'grey',
  },
  iconActive: {
    alignSelf: 'center',
    marginBottom: 0,
    marginTop: 4,
    color: '#0000FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
});
