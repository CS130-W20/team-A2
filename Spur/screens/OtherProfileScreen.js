import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View,
	 ScrollView,
	 Button} from 'react-native';
import {
	Card} from 'react-native-elements';
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
	
	/**
	 * Function that returns interests if selected, otherwise it'll give a string that shows that it is empty
	 */
	getInterests() {
		if (this.state.interest.length == 0) {
			//Return text saying interests is empty 
			console.log("Entered?")
			return (
				<Text style={{textAlign: 'center'}}>
					No interests yet!
				</Text>
			)
		} else {
			//Return multisectioned list for interests
			return(
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
			)
		}
	}

    render() {
		var profileTitle = this.state.name + '\'s Profile'
		var interests = this.getInterests(); 
        return (
			<ScrollView style={styles.container}>
				<Card title = {profileTitle}>
					<Text>{this.state.description}</Text>
				</Card>
				<Card title = "Interests">
					{interests}
				</Card>
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
