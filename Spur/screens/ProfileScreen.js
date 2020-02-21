import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View } from 'react-native';

function getUser(props) {
	//Dummy function to get a user
	
}

/**
 * Profile Screen - Displays a user profile 
 */
export default class ProfileScreen extends Component<Props>
{
	itemId = this.props.
    render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text>{this.props.name}'s Profile</Text>
				</View>
				<View style={style.formText}>
					<Text>Description</Text>
				</View>
				<View style={style.formText}>
					<Text>Interests</Text>
				</View>
				<View style={style.formText}>
					<Text>History</Text>
				</View>
				<View style={style.formText}>
					<Text>Upcoming</Text>
				</View>
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
	formText: {
		color: 'black',
		fontSize: 20,
		textAlign: 'center'
	}
  });
  