import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView} from 'react-native';
import {
	Input} from 'react-native-elements';
import DatabaseManager from '../classes/DatabaseManager';  

/**
 * Edit Profile Screen - Allows users to edit his/her own profile 
 * Uses DatabaseManager to change user data stored in Firebase 
 */
export default class EditProfileScreen extends Component<Props> {

    constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.state = {
			name: "", 
			description: "",
			interests: []
        }
		this.getUserInfo(); 
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
			description: user.description,
			interests: user.interests,
        })
    }
    
    render() {
        return (
			<ScrollView>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Edit Profile</Text>
				</View>
				<ScrollView>
					
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