import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBarIcon from '../components/TabBarIcon';

// Import Screens
import CreateScreen from '../screens/CreateScreen';
import LinksScreen from '../screens/LinksScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ProfileScreen from '../screens/ProfileScreen'; 
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatroomScreen from '../screens/ChatroomScreen';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Browse';

export default function DrawerNavigator({ navigation, route }) {
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
    <Drawer.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Drawer.Screen
        name="Create Event"
        component={CreateScreen}
        options={{
          title: 'Create',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      {/*<Drawer.Screen
        name="Login"
        component={UserLoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />*/}
      <Drawer.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          title: 'Browse',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add" />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <Drawer.Screen
        name="Edit_Profile"
        component={EditProfileScreen}
        options={{
          title: 'EditProfile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
	  <Drawer.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
	  <Drawer.Screen
        name="Chatroom"
        component={ChatroomScreen}
        options={{
          drawerLabel: ()=>null,
        }}
      />
    </Drawer.Navigator>
  );
}
