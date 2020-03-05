import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import ChatroomScreen from '../screens/ChatroomScreen';

const Stack = createStackNavigator();

export default class ChatNavigator extends React.Component {
	render() {
		return (
            <Stack.Navigator initialRouteName={'Chat'}>
            <Stack.Screen name="Chat" component={ChatScreen} />
			<Stack.Screen name="Chatroom" component={ChatroomScreen} />
            </Stack.Navigator>
		);
	}
	
}