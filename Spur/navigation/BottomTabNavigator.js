import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

// Import Screens
import CreateScreen from '../screens/CreateScreen';
import LinksScreen from '../screens/LinksScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import ProfileScreen from '../screens/ProfileScreen'; 
import BrowseScreen from '../screens/BrowseScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Create';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  navigation.setOptions({ headerTitle: 'SPUR', 
			  headerStyle: {
				backgroundColor: '#96ca92',
			   },
			   headerTintColor: '#fff',
			   headerTitleStyle: {
			   	fontWeight: 'bold',
				fontSize: 40,
		  	   },
			   headerTitleAlign: 'center',
			});

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Create Event"
        component={CreateScreen}
        options={{
          title: 'Create',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={UserLoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          title: 'Browse',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/*function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}*/
