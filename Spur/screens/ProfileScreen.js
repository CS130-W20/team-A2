import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View } from 'react-native';

export default class ProfileScreen extends Component<Props>
{
    render() {
		return (
			<View style={styles.title}>
				<Text>User Profile</Text>
			</View>
		);
    }
}


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	},
	contentContainer: {
	  paddingTop: 30,
	},
	title: {
	  fontSize: 19,
	  fontWeight: 'bold',
	},
  });
  