import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView} from 'react-native';
import {
	Input,
	Button,
	Card} from 'react-native-elements';
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
			description: user.description ? user.description : "", 
			interests: user.interests ? user.interests : []
		})
	}
	
	/**
	 * Function that sets the edited fields to firebase and navigates back to profile
	 */
	onConfirmChanges() {
		this.databaseManager.updateUser(this.state.userId, {
			description: this.state.description,
			interests: this.state.interests ? this.state.interests : []
		});
		this.props.navigation.push("Profile")
	}

	/**
	 * Function that discards the changes and navigates back to profile 
	 */
	onCancelChanges(){
		this.props.navigation.push("Profile")
	}
	/**
	 * Function that updates the state based on the selected/unselected items 
	 * @param {Array[Categories]} - Array of selected categories
	 */
	onSelect = selection => {
		this.setState({
			interests: selection
		});
	}
    
    render() {
		return (
		<View style={{flex: 1, flexDirection: 'column'}}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Edit Profile</Text>
				</View>
				<Card title ="Edit description">
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
				</Card>
				<Card title = "Change Interests">
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
				</Card>
				<ScrollView style={styles.contentContainer}>
				</ScrollView>
				<View style={styles.bottom}>
				  <View style={styles.btnBox}>
					<View style={styles.btn}>
						<Button
						title="Cancel changes"
						onPress={() => this.onCancelChanges()}
						/>
					</View>
					<View style={styles.btn}>
						<Button
						title="Confirm changes"
						onPress={() => this.onConfirmChanges()}
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