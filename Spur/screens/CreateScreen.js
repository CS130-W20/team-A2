import React, {Component, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card, Button } from 'react-native-elements';
import DatePick from '../components/DatePick';
import Geocoder from 'react-native-geocoding';

import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 View,
     ScrollView,
	 SafeAreaView,
	 Alert,
	 Picker,
	 Dimensions
	} from 'react-native';


import DatabaseManager from '../classes/DatabaseManager';

export default class CreateScreen extends Component<Props> {
    /** Automatically called constructor that does initial setup.
    */


    constructor(props) {
		super(props);

		this.state = {
			title: '',
			cost: '',
			partySize: '',
			description: '',
			startTime: '',
			endTime: '',
			categories: '',
			date: '',
			hostId: '',
			region: {
				lat: 34.0726629,
				lng: -118.4414646,
			},
		};
		this.databaseManager = new DatabaseManager();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
		this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleCostChange = this.handleCostChange.bind(this);
		this.handlePartyChange = this.handlePartyChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);

		//this.getUserId();

		Geocoder.init("AIzaSyAVKkB2Ad5_2IX_mw8pWRFWGHvl1LuHXf8");
	};
	/** Updates name state variable when input is detected.
	* @param {string} Event Name
	*/
    handleNameChange = e => {
	this.setState({
	    title: e
	});
	};
	
	/** Updates location and region state variables when input is detected.
	* @param {string} Location
	*/
	handleLocationChange = e => {

		const address = e.nativeEvent.text;

		if (address == '') {
			return;
		}

		Geocoder.from(address)
        .then(json => {
            var coord = json.results[0].geometry.location;
			
			if (coord == undefined || coord == null) {
				coord = this.state.region;
			}

			this.setState({
				location: address,
				region: coord
			});

        })
        .catch(error => console.warn(error));

		
	};

	/** Updates date state variable when input is detected.
	* @param {string} Date
	*/
	handleDateChange = selectedDate => {
	this.setState({
		date: {
			month: selectedDate.getMonth() + 1,
			day: selectedDate.getDate(),
			year: selectedDate.getFullYear()
		}
	});
    };
	/** Updates start time state variable when input is detected.
	* @param {string} Start Time
	*/
	handleStartTimeChange = selectedTime => {
	this.setState({
	    startTime: {
			hours: selectedTime.getHours(),
			minutes: selectedTime.getMinutes()
		}
	});
    };
	/** Updates end time state variable when input is detected.
	* @param {string} End Time
	*/
	handleEndTimeChange = e => {
	this.setState({
	    endTime: e
	});
    };
	/** Updates category state variable when input is detected.
	* @param {string} Category
	*/
	handleCategoryChange = e => {
	this.setState({
	    categories: e
	});
    };
	/** Updates cost state variable when input is detected.
	* @param {string} Cost
	*/
	handleCostChange = e => {
	this.setState({
	    cost: e
	});
    };
	/** Updates party state variable when input is detected.
	* @param {string} Party Size
	*/
	handlePartyChange = e => {
	this.setState({
	    partySize: e
	});
    };
	/** Updates description state variable when input is detected.
	* @param {string} Description
	*/
	handleDescChange = e => {
	this.setState({
	    description: e
	});
	};

	/** Updates region and location state variables when input is detected.
	* @param {MapEvent} Marker
	*/
	handleDragEnd = e => {
		
		const coord = e.nativeEvent.coordinate;

		if (coord == null) {
			return;
		}

		const c = {
			lat: coord.latitude,
			lng: coord.longitude
		}

		
		Geocoder.from(c)
		.then(json => {
			const address = json.results[0].formatted_address;
            this.setState({
				region: c,
				location: address
			});
        })
        .catch(error => console.warn(error));
	} 

	/** Validates event details
	* @param {event} React Native Event
	*/
	handleSubmit(event) {

		var datePattern = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/;
		var timePattern = /[0-9][0-9]:[0-9][0-9]/;
		var partyPattern = /[0-9]+/;
		var costPattern = /[0-9]+/;

		/*
		if (!timePattern.test(this.state.startTime) | !timePattern.test(this.state.endTime)) {
		  Alert.alert("Invalid Start or End Time");
		}
		else if (!datePattern.test(this.state.date)) {
		  Alert.alert("Invalid Date");
		}
		else if (!partyPattern.test(this.state.partySize)) {
		  Alert.alert("Invalid Party Size");
		}
		else if (!costPattern.test(this.state.cost)) {
		  Alert.alert("Invalid Cost");
		}
		else if (this.state.title == '') {
		  Alert.alert("Invalid Event Title");
		}
		else if (this.state.categories == '') {
		  Alert.alert("Invalid Categories");
		}
		else if (this.state.description == '') {
		  Alert.alert("Invalid Event Description");
		}
		else {
		  Alert.alert("Success");
		  this.databaseManager.addEvent({
			  attendees: [],
			  chat: '',
			  checked_in: [],
			  host: '',
			  details: this.state
		  });
		}*/
		
		const eventId = this.databaseManager.addEvent({
			  attendees: [this.state.hostId],
			  chat: '',
			  checked_in: [],
			  details: this.state
		});

		console.log('eventid')
		console.log(eventId)

		Alert.alert("Success");
		// Now it should navigate to the corresponding ViewEvent screen
		this.props.navigation.navigate("ViewEvent", { screen: "ViewEvent",
			params: {eventId: eventId}
		});
		
	};

	/**
	 * GetUserId() - Sets the hostId state of this component with the user id from databaseManager
	 */
	async getUserId() {
        //Get the user
		var uid = this.databaseManager.getCurrentUser().uid; 
		this.setState({
			hostId: uid
        })
	}
	

	/** Renders the UI shown to the user.
	*/
    render() {

		var loc = this.state.location || "Location";

		return (
    <View style={styles.container}>

		<ScrollView>
		<MapView
		  provider={PROVIDER_GOOGLE}
		  style={styles.map}
          initialRegion={{
			latitude: this.state.region.lat,
			longitude: this.state.region.lng,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		  }}
		  region={{
			latitude: this.state.region.lat,
			longitude: this.state.region.lng,
			latitudeDelta: 0.01,
			longitudeDelta: 0.01,
		  }}
		>
			
		<Marker 
			draggable coordinate={{
				latitude: this.state.region.lat,
				longitude: this.state.region.lng
			}}
			 onDragEnd={this.handleDragEnd}
		/>

        </MapView>
		</ScrollView>
		
		<ScrollView contentContainerStyle={{flexGrow: 1}}>

		<Input
			placeholder='Event Name'
			errorStyle={{ color: 'red' }}
			//errorMessage='ENTER A VALID ERROR HERE'
			onChangeText={this.handleNameChange}
		/>
				
		<Input
			placeholder={loc}
			onBlur={this.handleLocationChange}
		/>

		<Input
			placeholder='Description'
			errorStyle={{ color: 'red' }}
			//errorMessage='ENTER A VALID ERROR HERE'
			onChangeText={this.handleDescChange}
		/>

		
		<Input
			placeholder='Party Size'
			errorStyle={{ color: 'red' }}
			//errorMessage='ENTER A VALID ERROR HERE'
			onChangeText={this.handlePartyChange}
		/>

		<Input
			placeholder='Cost'
			errorStyle={{ color: 'red' }}
			//errorMessage='ENTER A VALID ERROR HERE'
			onChangeText={this.handleCostChange}
		/>

		

<DatePick
		text='Set Date'
		type='date'
		onChange={this.handleDateChange}/>

		<DatePick
		text='Set Time'
		type='time'
		onChange={this.handleStartTimeChange}/>

<Button title="Submit" onPress={this.handleSubmit}/>

		</ScrollView>

		

    </View>
  );
    }
}

CreateScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
	height: 400,
	width: Dimensions.get('window').width,
	marginLeft: 'auto',
	marginRight: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',	
  },
  inputContainer: {
	borderWidth: 1,
	borderColor: 'lightgrey',
    height: 50,
  },
  input: {
	height: 30,
    backgroundColor: 'lightgrey',
    paddingLeft: 15,
    paddingRight: 15,	
  },
  nameText: {
	height: 30,
	width: 100,
    backgroundColor: 'lightgrey',
    paddingLeft: 15,
    paddingRight: 15,	
  },
  formText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
	margin: 5,
  },
  contentContainer: {
    paddingTop: 30,
  },
  descriptionText: {
	height: 100,
	width: 300,
    backgroundColor: 'lightgrey',
    paddingLeft: 15,
    paddingRight: 15  
  },
  textContainer: {
	flexGrow: 1,
    justifyContent: 'center',
	flexDirection: 'row',
	padding: 5,
  },
});
