import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
     ScrollView,
     Dimensions,
     Alert } from 'react-native';
     
import {Card, ListItem, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import DatabaseManager from '../classes/DatabaseManager';  
import JoinButton from '../components/JoinButton';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {CATEGORIES} from '../constants/categories';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

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
            uid: '',
            //eventId: '-M1J28gx3XSzSNrofYjh', //Change this
            eventId: props.route.params.eventId,
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

            isVisible: false,
            attendeeNames: [],
            numAttendees: 0,

		}
        this.getEventDetails();
	}

	/**
	 * getEventDetails() - Sets the state of this component with the event details from databaseManager
	 */
	async getEventDetails() {

        //Get the current user's id
		var uid = this.databaseManager.getCurrentUser().uid; 
        //var uid = '7fW18YZaJ0eESZ8Y1FhieKwwh0g2';


		//Get the event from the databasemanager
		var eventSnapshot = await this.databaseManager.getEvent(this.state.eventId).once('value');
        const event = eventSnapshot.val();
        
        //Get the name of the host from this host's id
        var id = event.details.hostId;
        var hostSnapshot = await this.databaseManager.getUser(id).once('value');
        const host = hostSnapshot.val();

        var attendeeNames = []
        var i;
        for (i = 0; i < event.attendeeNames.length; i++) {
            attendeeNames.push({
                name: event.attendeeNames[i],
                id: event.attendees[i]
            });
        }


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

            attendees: event.attendees ? event.attendees : [],
            attendeeNames: attendeeNames,
            numAttendees: event.attendees.length,
            chatId: event.chat, 
            checkedIn: event.checked_in ? event.checked_in : [],

            uid: uid,
            host: host.name,
            upcoming: host.upcoming ? host.upcoming : [],


        })




    }
    

    /**
	 * onPressHost() - Brings the user to the host's profile page
	 */
    onPressHost = () => this.props.navigation.navigate("OtherProfile", {userId: this.state.hostId});


    /**
	 * onPressAttendees() - Opens the list of attendees
	 */
    onPressAttendees = () => this.setState({isVisible: true});


    /**
	 * onPressChat() - Brings the user to the event's chat page
     */
    onPressChat = () => Alert.alert('Will link to chat page in future');


    render() {
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
                title: 'Location',
                rightTitle: this.state.location
            },
            {
                title: 'Starts at',
                rightTitle: (this.state.startTime.hours % 12) + ":" + this.state.startTime.minutes + (this.state.startTime.hours < 12 ? ' am' : ' pm')
            },
            {
                title: 'Party Size',
                rightTitle: this.state.partySize
            },
            {
                title: 'Cost',
                rightTitle: '$' + this.state.cost
            },
            {
                title: 'Attendees',
                chevron: true,
                onPress: this.onPressAttendees
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
                            latitudeDelta: 0.0005,
                            longitudeDelta: 0.0005,
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

                
                <SectionedMultiSelect styles={styles.select}
						items={CATEGORIES}
						uniqueKey="id"
						subKey="children"
						readOnlyHeadings={true}
						expandDropDowns={true}
						onSelectedItemsChange={()=>{}}
						selectedItems={this.state.categories}
						selectText="Categories"
                        alwaysShowSelectText={true}
                        hideSelect={true}
                        center
				/>

                <Overlay 
                    isVisible={this.state.isVisible}
                    height={this.state.numAttendees == 1 ? 70 : 55 * this.state.numAttendees}
                    onBackdropPress={() => 
                        this.setState({isVisible: false})
                    }
                >
                    <View>
                    {
                        this.state.attendeeNames.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.name}
                                onPress={() => 
                                    {
                                        this.setState({isVisible: false});
                                        this.props.navigation.navigate("OtherProfile", {userId: item.id});
                                    }
                                }
                                bottomDivider
                                chevron
                            />
                        ))
                    }
                    </View>
                </Overlay>

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
                    upcoming={this.state.upcoming}
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
    },
    select: {
        justifyContent: 'space-evenly'
    }
  });
  