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

/**
 * Profile Screen - Displays a user profile 
 * @param {User} user - User whose profile will be displayed
 */
export default class ProfileScreen extends Component<Props>
{
	constructor(props) {
		super(props); 

		//Make a dummy user for now, will change later 
		//Dummy event 1
		var ed1 = new EventDetails("UML Appreciation Party", 
		  "A day focused on the universal language",
		  "4:00 pm", "5:50 pm", "Maged", "34.0727° N, 118.4393° W", 0, 100,
		  ["UML", "Scrum", "Design"]
		);
		var env1 = new Event(ed1, ["Maged", "David", "Greg", "Pravin", "Tim", "Joseph", "Mihir"], 
		"Chat", ["Tim", "Mihir"]
		);
		
		//Dummy event 2
		var ed2 = new EventDetails("Pizza Party", 
		  "Delicious La Monica's", "10:00 pm", "11:00 pm", "Amit", 
		  "34.0609° N, 118.4468° W", 3.65, 10, ["Food", "Social"]
		);
		var env2 = new Event(ed2, ["Maged", "Mihir", "Vignesh"], "Chat",
		  ["Maged", "Mihir", "Vignesh"]
		);
		
		//Dummy User 1
		this.user = new User("Maged", "Professor for CS 130. Nasa JPL Senior software architect",
		 ["Architecture", "Design", "UML", "Scrum", "Ducks", "Street Fighter", "Pizza"],
		 [env1], [env2]
		);
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
				<ScrollView style={styles.descriptionBox}>
					{this.user.interests.map(category => (
						<Text style={styles.content}>
							{category}
						</Text>
					))}
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>History:</Text>
				</View>
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
  