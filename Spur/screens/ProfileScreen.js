import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView,
	 Button,
	 Alert } from 'react-native';
import {
	Card} from 'react-native-elements';
import DatabaseManager from '../classes/DatabaseManager';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { CATEGORIES } from '../constants/categories';

/**
 * Profile Screen - Displays a user profile. 
 * Has a reference to the database manager which is used to retrieve user profile info.
 */
export default class ProfileScreen extends Component<Props>
{
	constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.databaseManager.login("dummy_user_uml@gmail.com", "UML123");
		this.state = {
			name: "", 
			description: "",
			interests: [],
			history: [],
			upcoming: [],
			hasChanged: false
		}
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
	 * GetUserInfo() - Sets the state of this component with the user informatio from databaseManager
	 */
	async getUserInfo() {
		//Add a user 
		var uid = this.databaseManager.getCurrentUser().uid; 
		var snapshot = await this.databaseManager.getUser(uid).once('value');
		const user = snapshot.val();
		this.setState({
			name: user.name,
			description: user.description ? user.description : "",
			interests: user.interests ? user.interests : [],
			history: user.history ? user.history : [],
			upcoming: user.upcoming ? user.upcoming : []
		})
	}

	/**
	 * Function that updates the state based on the selected/unselected items 
	 * @param {Array[Categories]} - Array of selected categories
	 */
	onSelect = selection => {
		console.log(selection);
	}

	/**
	 * Function to view an event 
	 * @param {String} eventId - Id of the event that we wish to view 
	 */
	viewEvent(eventId) {
		this.log(eventId);
		this.props.navigation.navigate("ViewEvent", {eventId: eventId}); 
		this.log("nice");
	}

    render() {
		var profileTitle = this.state.name + '\'s Profile'
		/*
		this.setState({
			hasChanged: this.props.params.hasChanged
		})*/
		this.getUserInfo()
		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<Card title = {profileTitle}>
					<Text>{this.state.description}</Text>
				</Card>
				<Card title = "Interests">
				<SectionedMultiSelect
						items={CATEGORIES}
						uniqueKey="id"
						subKey="children"
						readOnlyHeadings={true}
						expandDropDowns={true}
						onSelectedItemsChange={this.onSelect}
						selectedItems={this.state.interests}
						selectText="Interests"
						alwaysShowSelectText={true}
						hideSelect={true}
					/>
				</Card>
				<Card title = "Upcoming Events">
					<ScrollView>
						{this.state.upcoming.map(eventId => (
							<Button
								title = {"Event Page"}
								onPress={() => this.viewEvent(eventId)}
							>
							</Button>
						))}
					</ScrollView>
				</Card>
				<ScrollView style={styles.contentContainer}>
				</ScrollView>
				<View style={styles.bottom}>
					<View style={styles.btnBox}>
						<View style={styles.btn}>
							<Button
								title="View History"
								onPress={() => Alert.alert("Will navigate to history!")}
								/*onPress={() => this.props.navigation.navigate("History")}*/
							/>
						</View>
						<View style={styles.btn}>
							<Button
								title="Edit Profile"
								onPress={() => this.props.navigation.navigate("EditProfile")}
							/>
						</View>
					</View>
				</View>
			</View>
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
/*
				<View style={styles.bottom}>
					<View style={styles.btnBox}>
						<View style={styles.btn}>
							<Button
								title="Edit profile"
								onPress={() => this.props.navigation.navigate("EditProfile")}
							/>
						</View>
					</View>
				</View>
				*/
  /*
return (
			<ScrollView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{this.state.name}'s Profile</Text>
				</View>
				<View>
					<Text style={styles.contentHeader}>Description:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					<Text style={styles.content}> {this.state.description}</Text>
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>Interests:</Text>
				</View>
				<ScrollView style={styles.contentContainer}>
					<SectionedMultiSelect
						items={CATEGORIES}
						uniqueKey="id"
						subKey="children"
						readOnlyHeadings={true}
						expandDropDowns={true}
						onSelectedItemsChange={this.onSelect}
						selectedItems={this.state.interests}
						selectText="Categories"
						alwaysShowSelectText={true}
					/>
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>Upcoming:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					{this.state.upcoming.map(eventId => (
						<Button
							title = {"Event Page"}
							onPress={() => this.viewEvent(eventId)}
						>
						</Button>
					))}
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>History:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					{this.state.history.map(event => (
						<Button
							title = {event.details.title}
							onPress={() => Alert.alert('Will direct to event page later!')}
						>
						</Button>
					))}
				</ScrollView>
				<Button
					title="Edit profile"
					onPress={() => this.props.navigation.navigate("EditProfile")}
				/>
			</ScrollView>
		);

		*/