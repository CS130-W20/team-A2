import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView,
	 Button} from 'react-native';
import {
	ButtonGroup} from 'react-native-elements';
import DatabaseManager from '../classes/DatabaseManager';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { CATEGORIES } from '../constants/categories';

export default class OtherProfileScreen extends Component<Props> 
{
    constructor(props) {
        super(props);
        //Setup firebase via a databaseManager
        this.databaseManager = new DatabaseManager();
        this.state = {
            name : "", 
            description : "", 
            interest : []
        }
        this.getOtherInfo(); 
    }

    /**
     * Function to get the information to build another user's profile 
     * Other user's id is obtained via route.params
     */
    async getOtherInfo() {
        var uid = this.props.route.params.userId; 
        var snapshot = await this.databaseManager.getUser(uid).once('value'); 
        const user = snapshot.val(); 
        this.setState({
            name : user.name,
            description : user.description ? user.description : "",
            interest : user.interest ? user.interest : []
        })
    }

    render() {
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
            </ScrollView>
        )
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