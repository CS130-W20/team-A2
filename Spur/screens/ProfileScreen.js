import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView,
	 Button,
	 Alert } from 'react-native';
import User from '../classes/User';
import Event from '../classes/Event';
import EventDetails from '../classes/EventDetails';
import DatabaseManager from '../classes/DatabaseManager';  

/**
 * Profile Screen - Displays a user profile 
 * @param {User} user - User whose profile will be displayed. Obtained via Database Manager
 */
export default class ProfileScreen extends Component<Props>
{
	constructor(props) {
		super(props); 
		//Store dummy user
		this.databaseManager = new DatabaseManager(); 

		//Try logging in a dummy user 
		this.databaseManager.login("maged@gmail.com", "UML123");
		console.log(this.databaseManager.getCurrentUser());
		//Get user from db 
		this.user = this.databaseManager.getUser("Maged");
		console.log("testing");
		console.log(this.user);
	}

    render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{this.user.name}'s Profile</Text>
				</View>
				<View>
					<Text style={styles.contentHeader}>Description:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					<Text style={styles.content}> {this.user.description}</Text>
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>Interests:</Text>
				</View>
				<View>
					<Text style={styles.contentHeader}>History:</Text>
				</View>
			</ScrollView>
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
	titleContainer: {
	  backgroundColor: '#96CA92',
	  borderRadius: 10
	},
	title: {
	  fontSize: 20,
	  fontWeight: 'bold',
	  textAlign: 'center',
	  color: 'white'
	},
	contentHeader: {
		color: 'black',
		fontSize: 20,
		textAlign: 'left'
	},
	content: {
		color: 'black', 
		fontSize: 15,
		textAlign: 'left'
	},
	descriptionBox: {
		backgroundColor: '#E4EBE3', 
		borderRadius: 10,
		height: 100
	}
  });
  
  /*
  				<ScrollView style={styles.descriptionBox}>
					{this.user.interests.map(category => (
						<Text style={styles.content}>
							{category}
						</Text>
					))}
				</ScrollView>
  				<ScrollView style={styles.descriptionBox}>
					{this.user.history.map(event => (
						<Button
							title = {event.details.title}
							onPress={() => Alert.alert('Will direct to event page later!')}
						>
						</Button>
					))}
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>Upcoming:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					{this.user.upcoming.map(event => (
						<Button
							title = {event.details.title}
							onPress={() => Alert.alert('Will direct to event page later!')}
						>
						</Button>
					))}
				</ScrollView>
*/