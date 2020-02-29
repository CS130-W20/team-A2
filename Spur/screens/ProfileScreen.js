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
 * Profile Screen - Displays a user profile. 
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
			description: "",
			interests: [],
			history: [],
			upcoming: []
		}
		this.getUserInfo(); 
	}

	/**
	 * Function to log information
	 * @param {*} - Item to be logged 
	 */
	log (message) {
		console.log("Start log"); 
		console.log(message); 
		console.log("End log"); 
	}

	/**
	 * GetUserInfo() - Sets the state of this component with the user information from databaseManager
	 */
	async getUserInfo() {
		//Add a user 
		var uid = this.databaseManager.getCurrentUser().uid; 
		var snapshot = await this.databaseManager.getUser(uid).once('value');
		const user = snapshot.val();
		this.setState({
			name: user.name,
			description: user.description,
			interests: user.interests,
			history: user.history,
			upcoming: user.upcoming
		})
	}

    render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{this.state.name}'s Profile</Text>
				</View>
				<View>
					<Text style={styles.contentHeader}>Description:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					<Text style={styles.content}> {this.state.description}</Text>
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>Interests:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					{this.state.interests.map(category => (
						<Text style={styles.content}>
							{category}
						</Text>
					))}
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>Upcoming:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					{this.state.upcoming.map(event => (
						<Button
							title = {event.details.title}
							onPress={() => Alert.alert('Will direct to event page later!')}
						>
						</Button>
					))}
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>History:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					{this.state.history.map(event => (
						<Button
							title = {event.details.title}
							onPress={() => Alert.alert('Will direct to event page later!')}
						>
						</Button>
					))}
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