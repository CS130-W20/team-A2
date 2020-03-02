import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView} from 'react-native';
import {
	Input,
	Button} from 'react-native-elements';
import DatabaseManager from '../classes/DatabaseManager';  
import User from '../classes/User'; 

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
			userId: "", 
			description: "",
			interests: [],
			hasChanged: false,
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
			userId: uid, 
			description: user.description,
			interests: user.interests,
        })
	}
	
	/**
	 * Function that sets the edited fields to firebase
	 */
	onConfirmChanges() {
		console.log(this.state.userId); 
		newUser = new User("Maged", "Nasa JPL")
		testUser = this.databaseManager.getUser("InOwn1L1YKMKSrmP80p5GweSoH83")
		console.log(testUser)
		this.databaseManager.updateUser(this.state.userId, newUser)
	}
    
    render() {
        return (
			<ScrollView>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Edit Profile</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
					<Input
						value={this.state.description}
						placeholder="Let the world know a bit about yourself!"
						multiline
						onChangeText={text => 
							this.setState({
								description: text,
								hasChanged: true
							})}
					/>
				</ScrollView>
				<View>
					<Text style={styles.contentHeader}>Interests:</Text>
				</View>
				<Button
					title="Confirm changes"
					onPress={() => this.onConfirmChanges()}
				/>
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

  /*
  				<ScrollView style={styles.descriptionBox}>
					{this.state.interests.map(category => (
						<Text style={styles.content}>
							{category}
						</Text>
					))}
				</ScrollView>
				*/