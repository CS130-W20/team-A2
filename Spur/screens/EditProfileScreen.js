import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView} from 'react-native';
import {
	Input,
	Button,
	ButtonGroup} from 'react-native-elements';
import DatabaseManager from '../classes/DatabaseManager';  
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { CATEGORIES } from '../constants/categories';

/**
 * Edit Profile Screen - Allows users to edit his/her own profile 
 * Uses DatabaseManager to change user data stored in Firebase 
 */
export default class EditProfileScreen extends Component<Props> {

    constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.databaseManager.login("dummy_user_uml@gmail.com", "UML123")
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
	 * Also used to cancel changes, as it will pull the data from Firebase and reset the state accordingly
	 */
	async getUserInfo() {
		//Add a user 
		var uid = this.databaseManager.getCurrentUser().uid; 
		var snapshot = await this.databaseManager.getUser(uid).once('value');
		const user = snapshot.val();
		this.setState({
			userId: uid, 
			description: user.description,
			interests: user.interests ? user.interests : []
		})
		console.log(user.interests)
		console.log(user.description)
	}
	
	/**
	 * Function that sets the edited fields to firebase
	 */
	onConfirmChanges() {
		this.databaseManager.updateUser(this.state.userId, {
			description: this.state.description,
			interests: this.state.interests ? this.state.interests : []
		});
	}

	/**
	 * Function that updates the state based on the selected/unselected items 
	 * @param {Array[Categories]} - Array of selected categories
	 */
	onSelect = selection => {
		console.log(selection);
		this.setState({
			interests: selection
		});
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
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Edit Interests</Text>
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
				<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 36}}>
					<View style={{flex:1}}>
						<Button
						title="Cancel changes"
						onPress={() => this.getUserInfo()}
						/>
					</View>
					<View style={{flex:1}}>
						<Button
						title="Confirm changes"
						onPress={() => this.onConfirmChanges()}
						/>
					</View>
				</View>
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