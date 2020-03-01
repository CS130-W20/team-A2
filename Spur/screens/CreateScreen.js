import React, {Component, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card, Button } from 'react-native-elements';
import DatePick from '../components/DatePick';

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
	 Picker
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
		  latitude: 34.0726629,
		  longitude: -118.4414646,
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

		this.getUserId();
	};
	/** Updates name state variable when input is detected.
	* @param {string} Event Name
	*/
    handleNameChange = e => {
	this.setState({
	    title: e
	});
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



	/** Validates event details
	* @param {event} React Native Event
	*/
	handleSubmit(event) {
		console.log(this.state.region);
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

		
		Alert.alert("Success");

		
		this.databaseManager.addEvent({
			  attendees: [''],
			  chat: '',
			  checked_in: [''],
			  details: this.state
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

		return (
    <View style={styles.container}>

		<ScrollView>
		<MapView
		  provider={PROVIDER_GOOGLE}
		  style={styles.map}
          initialRegion={{
          latitude: 34.0726629,
          longitude: -118.4414646,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          }} 
		>
		<Marker draggable coordinate={this.state.region} onDragEnd={(e) => this.setState({region: e.nativeEvent.coordinate})}
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
			placeholder='Description'
			errorStyle={{ color: 'red' }}
			//errorMessage='ENTER A VALID ERROR HERE'
			onChangeText={this.handleDescChange}
		/>

		

		<Input
			placeholder='Cost'
			errorStyle={{ color: 'red' }}
			//errorMessage='ENTER A VALID ERROR HERE'
			onChangeText={this.handleCostChange}
		/>

		<Input
			placeholder='Party Size'
			errorStyle={{ color: 'red' }}
			//errorMessage='ENTER A VALID ERROR HERE'
			onChangeText={this.handlePartyChange}
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
    width: 400,
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
