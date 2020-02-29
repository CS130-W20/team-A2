import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView,
	 Button,
     Alert } from 'react-native';
     
import {Badge, ListItem} from 'react-native-elements';

import User from '../classes/User';
import Event from '../classes/Event';
import EventDetails from '../classes/EventDetails';
import DatabaseManager from '../classes/DatabaseManager';  
import JoinButton from '../components/JoinButton';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

/**
 * View Event Screen - Displays an event's details and allows a user to join it. 
 * Has a reference to the database manager which is used to retrieve event information.
 */
export default class ViewEventScreen extends Component<Props>
{
	constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.state = {
            uid: 'yung dave',
            eventId: '-M0oEUhzCeyRkWSepuHJ', //In the future need a way to have this event id passed in
            event: '',

			title: 'uml appreciation',
            description: 'to appreciate uml',
            startTime: '10:10',
            endTime: '12:12',
            host: 'Greg',
            location: 'My House',
            cost: '$19.19',
            partySize: '5',
            categories: [],

            attendees: [],
            chat: '',
            checkedIn: [],


		}
        this.getEventDetails();
        //this.getUserId(); 
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
	 * getEventDetails() - Sets the state of this component with the event details from databaseManager
	 */
	async getEventDetails() {
		//Get the event from the databasemanager
		var snapshot = await this.databaseManager.getEvent(this.state.eventId).once('value');
        const event = snapshot.val();

		this.setState({
            event: event,
			title: event.details.title,
            description: event.details.description,
            startTime: event.details.startTime,
            endTime: event.details.endTime,
            host: event.details.host,
            location: event.details.location,
            cost: event.details.cost,
            partySize: event.details.partySize,
            categories: event.details.categories,

            attendees: event.attendees,
            chatId: event.chat, 
            checkedIn: event.checked_in
        })
    }
    
    /**
	 * GetUserId() - Sets the state of this component with the user id from databaseManager
	 */
	async getUserId() {
        //Get the user
		var uid = this.databaseManager.getCurrentUser().uid; 
		this.setState({
			uid: uid
        })
	}


    render() {
        const uid = this.state.uid;
        const attendees = this.state.attendees;
        const checkedIn = this.state.checkedIn;
        
        const isAttendee = (attendees.indexOf(uid) >= 0);
        const isCheckedIn = (checkedIn.indexOf(uid) >= 0);

        const list = [
            {
                title: 'Hosted By'
            },
            {
                title: 'Description'
            },
            {
                title: 'Party Size'
            },
            {
                title: 'Cost'
            }
        ]
        

		return (
            
			<ScrollView style={styles.container}>
                <View style={styles.titleContainer}>
					<Text style={styles.title}>Event: {this.state.title}</Text>
				</View>
                <View>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                bottomDivider
                            />
                        ))
                    }
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
                    <Text style={styles.content}>Party Size: </Text>
                    <Badge value="5" status="error" />
                </View>

				<View>
					<Text style={styles.contentHeader}>Join:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
                    <JoinButton isAttendee={isAttendee} isCheckedIn={isCheckedIn} eventId= {this.state.eventId} event={this.state.event} uid={uid}/>
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
  
