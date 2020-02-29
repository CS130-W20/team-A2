import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
     ScrollView,
     Dimensions,
     Alert } from 'react-native';
     
import {Card, Badge, ListItem, Icon, Button} from 'react-native-elements';

import DatabaseManager from '../classes/DatabaseManager';  
import JoinButton from '../components/JoinButton';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

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
                title: 'Hosted By',
                rightTitle: this.state.host
            },
            {
                title: 'Party Size',
                badge: { 
                    value: this.state.partySize, 
                    status: 'success', 
                    textStyle: { color: 'white'},
                    fontSize: 100
                
                }

            },
            {
                title: 'Starts at',
                rightTitle: this.state.startTime
            },
            {
                title: 'Ends at',
                rightTitle: this.state.endTime
            },
            {
                title: 'Cost',
                rightTitle: '$' + this.state.cost
            }
        ]
        

		return (
            
			<ScrollView style={styles.container}>


                <Card
                title={this.state.title}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>
                    {this.state.description}
                </Text>
                </Card>

                <View style={styles.container}>
                    <MapView style={styles.map}
                    initialRegion={{
                        latitude: 34.0726629,
                        longitude: -118.4414646,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                    >
                        <Marker coordinate={{latitude: 34.0726629,
                        longitude: -118.4414646}} />
		            
                    </MapView>
                </View>

                <View>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                rightTitle={item.rightTitle}
                                badge={item.badge}
                                bottomDivider
                            />
                        ))
                    }
                </View>
                
				
                <Card containerStyle={{borderWidth: 0}}>
                
                    <JoinButton 
                    color="#f194ff"
                    isAttendee={isAttendee}
                    isCheckedIn={isCheckedIn}
                    eventId= {this.state.eventId} 
                    event={this.state.event} 
                    uid={uid}/>


                    
                </Card>
                


			</ScrollView>
		);
    }
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
    },
    map: {
        width: 380,
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto'
        //justifyContent: 'flex-end',
        //alignItems: 'center',	
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
  
