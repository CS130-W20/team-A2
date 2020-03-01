import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
     ScrollView,
     Dimensions,
     Alert } from 'react-native';
     
import {Card, Badge, ListItem, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            uid: 'default',
            eventId: '-M1J28gx3XSzSNrofYjh', //In the future need a way to have this event id passed in
            //eventId: props.eventId
            event: '',

			title: '',
            description: '',
            startTime: '',
            endTime: '',
            host: '',
            hostId: '',
            location: '',
            region: '',
            cost: '',
            partySize: '',
            categories: [],

            attendees: [],
            chat: '',
            checkedIn: [],


		}
        this.getEventDetails();
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
	 * getEventDetails() - Sets the state of this component with the event details from databaseManager
	 */
	async getEventDetails() {
		//Get the event from the databasemanager
		var snapshot = await this.databaseManager.getEvent(this.state.eventId).once('value');
        const event = snapshot.val();

        //console.log(event);


		this.setState({
            event: event,
			title: event.details.title,
            description: event.details.description,
            startTime: event.details.startTime,
            endTime: event.details.endTime,
            hostId: event.details.hostId,
            location: event.details.location,
            region: event.details.region,
            cost: event.details.cost,
            partySize: event.details.partySize,
            categories: event.details.categories,

            attendees: event.attendees,
            chatId: event.chat, 
            checkedIn: event.checked_in,

        })




    }
    
    /**
	 * GetUserInfo() - Sets the state of this component with the user id information from databaseManager
	 */
	async getUserInfo() {
        //Get the current user's id
		//var uid = this.databaseManager.getCurrentUser().uid; 
        var uid = '1919';
        
        //Get the name of the host from this host's id
        var snapshot = await this.databaseManager.getUser(this.state.hostId).once('value');
        const host = snapshot.val();

        this.setState({
            uid: uid,
            host: host[this.state.hostId].name
        });
	}

    /**
	 * onPressHost() - Brings the user to the host's profile page
	 */
    onPressHost = () => Alert.alert('Will link to ' + this.state.host + '\'s profile in future');


    /**
	 * onPressChat() - Brings the user to the event's chat page
     */
    onPressChat = () => Alert.alert('Will link to chat page in future');


    render() {
        //console.log(this.state.uid);
        //console.log(this.host);
        const uid = this.state.uid;
        const attendees = this.state.attendees;
        const checkedIn = this.state.checkedIn;
        
        const isAttendee = (attendees.indexOf(uid) >= 0);
        const isCheckedIn = (checkedIn.indexOf(uid) >= 0);

        const list = [
            {
                title: 'Hosted By',
                rightTitle: this.state.host,
                chevron: true,
                onPress: this.onPressHost,
                rightIcon: 'male'
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
                rightTitle: (this.state.startTime.hours % 12) + ":" + this.state.startTime.minutes + (this.state.startTime.hours < 12 ? ' am' : ' pm')
            },
            {
                title: 'Cost',
                rightTitle: '$' + this.state.cost
            },
            {
                title: 'Chat',
                chevron: true,
                onPress: this.onPressChat,
                rightIcon: 'comments'
            },
        ]
        
        const lat = this.state.region.lat;
        const long = this.state.region.lng;
        var ready = true;
        if (lat == undefined || long == undefined) {
            ready = false;
        }

		return (
            ready &&
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
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                        }}
                    >
                        <Marker coordinate={
                            {
                                latitude: this.state.region.lat,
                                longitude: this.state.region.lng
                            }
                        } />
		            
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
                                chevron={item.chevron}
                                onPress={item.onPress}
                                rightIcon={
                                    <Icon
                                      name={item.rightIcon}
                                      size={15}
                                    />
                                  }
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
  
