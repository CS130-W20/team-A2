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
 * View Event Screen - Displays an event's details and allows a user to join it. 
 * Has a reference to the database manager which is used to retrieve event information.
 */
export default class ProfileScreen extends Component<Props>
{
	constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.state = {
            eventId: '12345', //In the future need a way to have this event id passed in

			title: 'uml appreciation',
            description: 'to appreciate uml',
            startTime: '10:10',
            endTime: '12:12',
            host: 'Greg',
            location: 'My House',
            cost: '$19.19',
            partySize: '5',
            categories: [],
		}
		this.getEventDetails(); 
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
	 * GetEventDetails() - Sets the state of this component with the event details from databaseManager
	 */
	async getEventDetails() {
		//Get the event from the databasemanager
		var snapshot = await this.databaseManager.getEvent(this.eventId).once('value');
		const event = snapshot.val();
		this.setState({
			title: event.title,
            description: event.description,
            startTime: event.startTime,
            endTime: event.endTime,
            host: event.host,
            location: event.location,
            cost: event.cost,
            partySize: event.partySize,
            categories: event.categories,

            //should add a list of current attendees
		})
	}

    render() {
		return (
            <View>
                <Text>Howdy y'all</Text>
            </View>
            /*
			<ScrollView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Event: {this.state.title}</Text>
				</View>
                <View>
					<Text style={styles.content}>Hosted by: {this.state.host}</Text>
				</View>
				<View>
					<Text style={styles.contentHeader}>Description:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					<Text style={styles.content}> {this.state.description}</Text>
				</ScrollView>
				<View>
					<Text style={styles.content}>Start: {this.state.startTime}</Text>
				</View>
                <View>
					<Text style={styles.content}>End: {this.state.endTime}</Text>
				</View>

				<View>
					<Text style={styles.contentHeader}>Join:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
                    <Button
                        title = {'Join Event!'}
                        onPress={() => Alert.alert('Will add user to the event')}
                    >
                    </Button>
				</ScrollView>

			</ScrollView>*/
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
  
