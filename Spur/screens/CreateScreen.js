import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 View,
     ScrollView,
	 SafeAreaView,
	 Button,
	 Alert
	} from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import {KeyboardAvoidingView} from 'react-native';
import DatabaseManager from '../classes/DatabaseManager';  

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
		region: {
		  latitude: 37.78825,
		  longitude: -122.4324,
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

		//My test 
		this.databaseManager = new DatabaseManager();
		this.databaseManager.login("maged@gmail.com", "UML123");
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
	handleDateChange = e => {
	this.setState({
	    date: e
	});
    };
	/** Updates start time state variable when input is detected.
	* @param {string} Start Time
	*/
	handleStartTimeChange = e => {
	this.setState({
	    startTime: e
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
		var datePattern = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/;
		var timePattern = /[0-9][0-9]:[0-9][0-9]/;
		var partyPattern = /[0-9]+/;
		var costPattern = /[0-9]+/;
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
		  this.databaseManager.db.ref('/events').push({
			  attendees: 0,
			  chat: 0,
			  checked_in: 0,
			  host: 0,
			  details: this.state,
			  
		  });
		}
		
	};
	/** Renders the UI shown to the user.
	*/
    render() {
	return (
    <View style={styles.container}>
		<MapView
		  provider={PROVIDER_GOOGLE}
		  style={styles.map}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }} 
		>
		<Marker draggable coordinate={this.state.region} onDragEnd={(e) => this.setState({region: e.nativeEvent.coordinate})}
		/>
        </MapView>
		
		<View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Event Name</Text>
		<TextInput style={styles.nameText} onChangeText={this.handleNameChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Event Date</Text>
		<TextInput style={styles.nameText} onChangeText={this.handleDateChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Start Time</Text>
		<TextInput style={styles.input} onChangeText={this.handleStartTimeChange} clearTextOnFocus={true}/>
		<Text style={styles.formText}>End Time</Text>
		<TextInput style={styles.input} onChangeText={this.handleEndTimeChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Cost</Text>
		<TextInput style={styles.input} onChangeText={this.handleCostChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Party Size</Text>
		<TextInput style={styles.input} onChangeText={this.handlePartyChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Category</Text>
		<TextInput style={styles.input} onChangeText={this.handleCategoryChange} clearTextOnFocus={true}/>
		</View>
		
		<Text style={styles.formText}>Description</Text>
		<View style={styles.textContainer}>
		<TextInput style={styles.descriptionText} onChangeText={this.handleDescChange} clearTextOnFocus={true}/>
		</View>
		
		<Button title="Submit" onPress={this.handleSubmit}/>
	    </ScrollView>
		</View>

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
