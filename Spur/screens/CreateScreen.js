import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { Input, Button, Text } from 'react-native-elements';
import DatePick from '../components/DatePick';
import Geocoder from 'react-native-geocoding';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { CATEGORIES } from '../constants/categories';

import { 
	 StyleSheet,
	 TextInput,
	 TouchableOpacity,
	 View,
     ScrollView,
	 SafeAreaView,
	 Alert
	} from 'react-native';

export default class CreateScreen extends Component<Props> {
    constructor(props) {
		super(props);
		this.state = {
		name: '',
		cost: '',
		party: '',
		desc: '',
		startTime: '',
		endTime: '',
		category: '',
		date: '',
		region: {
		  latitude: 37.78825,
		  longitude: -122.4324,
		},
		};
	
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
		this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleCostChange = this.handleCostChange.bind(this);
		this.handlePartyChange = this.handlePartyChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
	};
	/** Updates name state variable when input is detected.
	* @param {string} Event Name
	*/
    handleNameChange = e => {
	this.setState({
	    name: e
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
	    category: e
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
	    party: e
	});
    };
	/** Updates description state variable when input is detected.
	* @param {string} Description
	*/
	handleDescChange = e => {
	this.setState({
	    desc: e
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
		else if (!partyPattern.test(this.state.party)) {
		  Alert.alert("Invalid Party Size");
		}
		else if (!costPattern.test(this.state.cost)) {
		  Alert.alert("Invalid Cost");
		}
		else if (this.state.name == '') {
		  Alert.alert("Invalid Event Name");
		}
		else if (this.state.category == '') {
		  Alert.alert("Invalid Category");
		}
		else if (this.state.desc == '') {
		  Alert.alert("Invalid Event Description");
		}
		else {
		  Alert.alert("Success");
		}
	};
	/** Renders the UI shown to the user.
	*/
    render() {
	return (
    <View style={styles.container}>
		
		
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
  inputContainer: {
	borderWidth: 1,
	borderColor: 'lightgrey',
    height: 50,
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
  btnBox: {
	    flex: 1, 
		flexDirection: 'row',
	    marginBottom: 36,
	},
	bottom: {
		flexDirection: 'column-reverse'
		
	},
	btn: {
		flex:1, 
		height: 50
	}
});
