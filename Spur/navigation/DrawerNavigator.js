import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBarIcon from '../components/TabBarIcon';
import { createStackNavigator } from '@react-navigation/stack'; 
import {Icon} from 'react-native-elements'; 
import {DrawerActions} from '@react-navigation/drawer'

// Import Screens
import CreateScreen from '../screens/CreateScreen';
import LinksScreen from '../screens/LinksScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import BrowseScreen from '../screens/BrowseScreen';
import ProfileScreen from '../screens/ProfileScreen'; 
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatNavigator from '../navigation/ChatNavigator';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import ViewEventScreen from '../screens/ViewEventScreen';
import ChatroomScreen from '../screens/ChatroomScreen';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Browse';
const StackProfile = createStackNavigator(); 
const StackEvent = createStackNavigator(); 
const StackCreate = createStackNavigator(); 
const StackBrowse = createStackNavigator(); 

/**
 * Stack Navigator for Profile 
 * {Profile, {View Event Stack}, Edit Profile} are within this stack
 */
function ProfileStack() {
  return ( 
    <StackProfile.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <StackProfile.Screen name = "Profile" component={ProfileScreen} />
      <StackProfile.Screen name = "ViewEvent" component={ViewEventStack} />
      <StackProfile.Screen name = "EditProfile" component={EditProfileScreen} />
    </StackProfile.Navigator>
  );
}

/**
 * Stack Navigator for View Event
 * {View Event, Other Profile} are within this stack
 */
function ViewEventStack() {
  return (
    <StackEvent.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <StackEvent.Screen name = "ViewEvent" component={ViewEventScreen} />
      <StackEvent.Screen name = "OtherProfile" component={OtherProfileScreen} />
      <StackEvent.Screen name = "Chatroom" component={ChatroomScreen} />
    </StackEvent.Navigator>
  );
}

/**
 * Stack Navigator for Create Event
 * {Create Event, {View Event Stack}} are within this stack 
 */
function CreateEventStack() {
  return (
    <StackCreate.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <StackCreate.Screen name = "CreateEvent" component={CreateScreen} />
      <StackCreate.Screen name = "ViewEvent" component={ViewEventStack} />
    </StackCreate.Navigator>
  );
}

/**
 * Stack Navigator for Browse Event
 * {Browse Event, {View Event Stack}} are within this stack 
 */
function BrowseEventStack() {
  return (
    <StackBrowse.Navigator
      screenOptions={{
        headerShown: false	
	
      }}
    >
      <StackBrowse.Screen name = "BrowseEvent" component={BrowseScreen} />
      <StackBrowse.Screen name = "ViewEvent" component={ViewEventStack} />
    </StackBrowse.Navigator>
  );
}

export default function DrawerNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //const Drawer.DrawerActions = DrawerActions;
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
			   headerLeft:() => {console.log(navigation); return (<Icon name="menu" color="#fff" size={40} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} title="Menu"/>)},
			}, [navigation, DrawerActions]);

  return (
    <Drawer.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Drawer.Screen
        name="Create Event"
        component={CreateEventStack}
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
        component={BrowseEventStack}
        options={{
          title: 'Browse',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add" />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add" />,
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
        name="ChatNavigator"
        component={ChatNavigator}
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />

    </Drawer.Navigator>
  );
}

/*

      <Drawer.Screen
        name="ViewEvent"
        component={ViewEventScreen}
        options={{
          title: 'View Event',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />

      */
