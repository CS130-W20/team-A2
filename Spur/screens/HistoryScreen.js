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
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

/**
 * History Screen - Displays a user profile. 
 * Has a reference to the database manager which is used to retrieve user profile info.
 */
export default class ProfileScreen extends Component<Props>
{
    constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.state = {
			name: "", 
			history: [], 
			events: []
		}
		this.databaseManager.login("dummy_user_uml@gmail.com", "UML123")
		this.getHistoryInfo(); 
    }
    
    /**
	 * GetHistoryInfo() - Sets the state of this component with the name of the user and their event history
	 */
	async getHistoryInfo() {
		//Add a user 
		var uid = this.databaseManager.getCurrentUser().uid; 
		var userSnap = await this.databaseManager.getUser(uid).once('value');
		const user = userSnap.val();
		this.setState({
			name: user.name,
			history: user.history ? user.history : []
		})
		//Exit function if history is empty 
		if (!user.history) {
			console.log("history is empty/undefined");
			return;
		}
		//Create the events list otherwise 
		var snapshot = await this.databaseManager.events().once('value');
		const allEvents = snapshot.val();
		console.log(allEvents);
		const eventList = user.history.map(id => {
			console.log(id)
			if(allEvents[id]) {
				return allEvents[id]
			}
		});
		this.setState({
			events: eventList ? eventList : []
		})
		console.log("Printing Event List");
		console.log(eventList);
		
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{this.state.name}'s Profile</Text>
				</View>
				<View style={styles.contentHeader}>
					<Text style={styles.contentHeader}>History:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
				</ScrollView>
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