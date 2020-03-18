import React, { useContext } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { light as t } from '../constants/themes';
import Home from '../screens/home';
import News from '../screens/news';
import ContactsScreen from '../screens/contacts';
import InfoScreen from '../screens/info';

const Tab = createBottomTabNavigator();
const Navigator = () => (
  <NavigationNativeContainer>
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="ContactsScreen" component={ContactsScreen} />
      <Tab.Screen name="InfoScreen" component={InfoScreen} />
    </Tab.Navigator>
  </NavigationNativeContainer>
);

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    switch (route.name) {
      case 'Home':
        iconName = 'map-outline';
        break;
      case 'News':
        iconName = 'bullhorn-outline';
        break;
      case 'ContactsScreen':
        iconName = 'contacts';
        break;
      case 'InfoScreen':
        iconName = 'information';
        break;
      default:
        iconName = 'list';
        break;
    }

    return <Icon name={iconName} size={30} color={color} />;
  },
});

const tabBarOptions = {
  activeTintColor: t.colors.black,
  inactiveTintColor: t.colors.grey,
  showLabel: false,
  style: {
    backgroundColor: t.colors.primary,
  },
};

export default React.memo(Navigator);
