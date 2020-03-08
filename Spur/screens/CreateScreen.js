import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { Input, Button, Text } from 'react-native-elements';
import DatePick from '../components/DatePick';
import Geocoder from 'react-native-geocoding';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { CATEGORIES } from '../constants/categories';
import Toast from 'react-native-tiny-toast';

import { 
	 StyleSheet,
	 View,
     ScrollView,
	 Alert,
	 Dimensions
	} from 'react-native';

import DatabaseManager from '../classes/DatabaseManager';

/**
 * Create Event Screen - Allows user to specify details for a new event. 
 * Has a reference to the database manager which is used to retrieve user information.
 */
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
			categories: [],
			date: '',
			hostId: '',
			hostName: '',
			region: {
				lat: 34.0726629,
				lng: -118.4414646,
			},

			nameEmpty: false,
			descriptionEmpty: false,
			partySizeInvalid: false,
			costInvalid: false,
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

		this.wasFocused = false;

		this.getUserInfo();
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

		// Convert from an address to a latlng location
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

		//Convert from a coordinate to a plaintext name
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

	/**
   * Updates categories state variable when a different set of categories are selected
   * @param {Array} e - Selected categories 
   */
	handleSelectedCategoriesChange = e => {
		this.setState({
		categories: e
		});
	}

	/*
	* Checks that the title of the event is nonempty
	*/
	validateEventName = () => {
		if (this.state.title == '') {
			this.setState({
				nameEmpty: true
			});
		} else {
			this.setState({
				nameEmpty: false
			});
		}
	}

	/*
	* Checks that the description of the event is nonempty
	*/
	validateDescription = () => {
		if (this.state.description == '') {
			this.setState({
				descriptionEmpty: true
			});
		} else {
			this.setState({
				descriptionEmpty: false
			});
		}
	}

	/*
	* Checks that the party size of the event is a number
	*/
	validatePartySize = () => {
		var partyPattern = /[0-9]+/;
		
		if (!partyPattern.test(this.state.partySize)) {
			this.setState({
				partySizeInvalid: true
			});
		} else {
			this.setState({
				partySizeInvalid: false
			});
		}
	}

	/*
	* Checks that the cost of the event is a number
	*/
	validateCost = () => {
		
		var costPattern = /[0-9]+/;

		if (!costPattern.test(this.state.cost)) {
			this.setState({
				costInvalid: true
			});
		} else {
			this.setState({
				costInvalid: false
			});
		}
	}

	/** Validates event details
	* @param {event} React Native Event
	*/
	handleSubmit(event) {
				
		if (this.state.nameEmpty || this.state.descriptionEmpty || this.state.partySizeInvalid || this.state.costInvalid) {
			Alert.alert('Please update invalid information');
		} else {

			// Clear out the state related to validation so it's not passed int o Firebase
			this.state.nameEmpty = [];
			this.state.descriptionEmpty = [];
			this.state.partySizeInvalid = [];
			this.state.costInvalid = [];

			const eventId = this.databaseManager.addEvent({
				attendees: [this.state.hostId],
				attendeeNames: [this.state.hostName],
				chat: '',
				checked_in: [],
				details: this.state
			  });
			  
			Toast.show("Event Created");
			// Now it should navigate to the corresponding ViewEvent screen
			this.props.navigation.navigate("ViewEvent", { screen: "ViewEvent",
				params: {eventId: eventId}
			});
		}
		
		
		
	};

	/**
	 * GetUserInfo() - Sets the hostId and hostName state of this component with the user's information from databaseManager
	 */
	async getUserInfo() {
        //Get the user
		var uid = this.databaseManager.getCurrentUser().uid;
		var snapshot = await this.databaseManager.getUser(uid).once('value');
		const user = snapshot.val();

		this.setState({
			hostId: uid,
			hostName: user.name
        })
	}
	


	/** Renders the UI shown to the user.
	*/
    render() {

		var loc = this.state.location || "Location";
		const eventNameError = this.state.nameEmpty ? 'Please enter a nonempty name' : '';
		const descriptionError = this.state.descriptionEmpty ? 'Please enter a nonempty description' : '';
		const partySizeError = this.state.partySizeInvalid ? 'Please enter a valid party size' : '';
		const costError = this.state.costInvalid ? 'Please enter a valid cost' : '';

		return (
    <View style={styles.container}>

		<MapView
		  provider={PROVIDER_GOOGLE}
		  style={styles.map}
          initialRegion={{
			latitude: this.state.region.lat,
			longitude: this.state.region.lng,
			latitudeDelta: 0.005,
			longitudeDelta: 0.005,
		  }}
		  region={{
			latitude: this.state.region.lat,
			longitude: this.state.region.lng,
			latitudeDelta: 0.005,
			longitudeDelta: 0.005,
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
		
	<ScrollView contentContainerStyle={{flexGrow: 2}}>

		<Input
			placeholder='Event Name'
			errorStyle={{ color: 'red' }}
			onChangeText={this.handleNameChange}
			onBlur={this.validateEventName}
			errorMessage={eventNameError}
		/>
		
		<Input
			placeholder='Description'
			errorStyle={{ color: 'red' }}
			onChangeText={this.handleDescChange}
			onBlur={this.validateDescription}
			errorMessage={descriptionError}
		/>
				
		<Input
			placeholder={loc}
			onBlur={this.handleLocationChange}
		/>

		<Input
			placeholder='Categories'
			onFocus={() => {
				Keyboard.dismiss();
				if (this.wasFocused) {
					this.wasFocused = false;
				} else {
					this.SectionedMultiSelect._toggleSelector();
					this.wasFocused = true;
				}
				Keyboard.dismiss();
			}}
		/>

		<View style={styles.textContainer}>
              <SectionedMultiSelect
                items={CATEGORIES}
                uniqueKey="id"
				subKey="children"
				selectText="Categories"
				readOnlyHeadings={true}
				hideSelect={true}
                expandDropDowns={true}
                onSelectedItemsChange={this.handleSelectedCategoriesChange}
				selectedItems={this.state.categories}
				ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
              />
        </View>

		<DatePick
				time={this.state.date}
				type='date'
				onChange={this.handleDateChange}
		/>

		<DatePick
				time={this.state.startTime}
				type='time'
				onChange={this.handleStartTimeChange}
		/>

		
		<Input
			placeholder='Party Size'
			errorStyle={{ color: 'red' }}
			onChangeText={this.handlePartyChange}
			onBlur={this.validatePartySize}
			errorMessage={partySizeError}
		/>

		<Input
			placeholder='Cost'
			errorStyle={{ color: 'red' }}
			onChangeText={this.handleCostChange}
			onBlur={this.validateCost}
			errorMessage={costError}
		/>	
		
		<View style={styles.bottom}>
			<View style={styles.btnbox}>
				<View style={styles.btn}>
				<Button title="Submit" onPress={this.handleSubmit}/>
				</View>
			</View>
		</View>
		

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
	height: 350,
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
	flexGrow: 0,
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
