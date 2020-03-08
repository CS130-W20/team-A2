import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Dimensions} from 'react-native';
import {
	Card,
	ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import DatabaseManager from '../classes/DatabaseManager';  
import { CATEGORIES } from '../constants/categories'; 
import { ContributionGraph } from 'react-native-chart-kit';
import { PieChart } from 'react-native-svg-charts';

/**
 * History Screen - Displays a user profile. 
 * Has a reference to the database manager which is used to retrieve user profile info.
 */
export default class ProfileScreen extends Component<Props>
{
    constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.state = {
			name: "", 
			history: [], 
			events: [],
			data: [],
			dates: []
		}
		this.databaseManager.login("dummy_user_uml@gmail.com", "UML123")
		this.getHistoryInfo();
	}
	
    /**
	 * GetHistoryInfo() - Sets the state of this component with the name of the user and their event history
	 */
	async getHistoryInfo() {
		//Add a user 
		var uid = this.databaseManager.getCurrentUser().uid; 
		var userSnap = await this.databaseManager.getUser(uid).once('value');
		const user = userSnap.val();
		this.setState({
			name: user.name,
			history: user.history ? user.history : []
		})

		//Exit function if history is empty 
		if (!user.history) {
			console.log("history is empty/undefined");
			return;
		}

		//Create the events list otherwise 
		var snapshot = await this.databaseManager.events().once('value');
		const allEvents = snapshot.val();
		console.log(allEvents);
		const eventList = user.history.map(id => {
			console.log(id)
			if(allEvents[id]) {
				return allEvents[id]
			}
		});
		this.setState({
			events: eventList ? eventList : []
		})
		console.log("Printing Event List");
		console.log(eventList);

		//Make a hashmap of id to category name 
		var categories = CATEGORIES 
        var catMap = new Map() 
        categories.forEach(function(category) {
            catMap.set(category.id, category.name)
            category.children.forEach(function(child) {
                catMap.set(child.id, child.name)
            })
		});
		
		//Make a hashmap of id to count and store total count
		//Also make a hashmap of date to event count on that date
		var dateCount = new Map(); 
		var catCount = new Map();
		var totalCount = 0
		eventList.forEach(function(event){
			var date = event.details.date;
			var month = date.month < 10 ? '0' + date.month : date.month
			var day = date.day < 10 ? '0' + date.day : date.day
			var dateString = date.year + '-' + month + '-' + day 
			//Check if date exists in map 
			var num = dateCount.get(dateString) 
			if (num == undefined) {
				//If it doesn't exist, set it 
				dateCount.set(dateString, 1) 
			} else {
				//Increment by one 
				dateCount.set(dateString, num + 1)
			}
			event.details.categories.forEach(function(catId) {
				//Check if category exists in map
				var currVal = catCount.get(catId) 
				totalCount++
				if (currVal == undefined) {
					//If it doesn't, set it
					catCount.set(catId, 1)
				} else {
					//If it does, increment count by one
					catCount.set(catId, currVal + 1)
				}
			})
		})

		//Convert hashmap into data for pie chart 
		const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
		var data = []
		catCount.forEach(function(value, key) {
			var name = catMap.get(key)
			var color = randomColor()
			var percentage = Math.round(value/totalCount * 100) + '%'
			console.log(percentage)
			data.push({
				name: name,
				count: value,
				color: color,
				percent: percentage
			})
		})

		//Convert hashmap into data for activity chart
		var dates = []
		dateCount.forEach(function(value, key) {
			dates.push({
				date: key, 
				count: value
			})
		})
		if (dates.length < 2) {
			var date = eventList[0].details.date;
			var month = date.month < 10 ? '0' + date.month : date.month
			var day = date.day < 10 ? '0' + (date.day + 1): date.day + 1
			var dateString = date.year + '-' + month + '-' + day
			dates.push({
				date: dateString,
				count: 0 
			})	
		}

		//Finally set the data
		this.setState({
			data: data,
			dates: dates
		})

	}

	render() { 
		
		const screenWidth = Dimensions.get("window").width + 20; 

		const chartConfig = {
			backgroundGradientFrom: "#1E2923",
			backgroundGradientFromOpacity: 0,
			backgroundGradientTo: "#08130D",
			backgroundGradientToOpacity: 0.5,
			color: (opacity = 1) => `rgba(63, 70, 191, ${opacity})`,
			strokeWidth: 2, // optional, default 3
			barPercentage: 0.5
		};
		
		const pieData = this.state.data.map(function(dataObj, index) {
			var value = dataObj.count
			var color = dataObj.color
			return {
				value: value,
				svg: {
					fill: color,
					onPress: () => console.log('press', index),
				}, 
				key: `pie-${index}`,
			}
		})
		
		console.log("Pie data")
		console.log(pieData)
		var currDay = new Date().getDate()
		currDay = currDay.length < 10 ? currDay : '0' + currDay
		var currMon = new Date().getMonth() + 2
		currMon = currMon.legnth < 10 ? currMon : '0' + currMon
		var currYear = new Date().getFullYear();
		var endDate = currYear + '-' +  currMon + '-' + currDay
		console.log(endDate)
		console.log("Contribution data") 
		console.log(this.state.dates)
		const values= [{ date: '2019-01-02', count: 1 }, {date: '2019-01-03', count : 0}]
		return (
			<ScrollView style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{this.state.name}'s Profile</Text>
				</View>
				<View style={styles.contentHeader}>
					<Text style={styles.contentHeader}>History:</Text>
				</View>
				<ScrollView style={styles.descriptionBox}>
				</ScrollView>
				<Card title="Activity Calendar">
					<ScrollView horizontal={true}>
					<ContributionGraph
						values={this.state.dates}
						width = {screenWidth}
						endDate = {"2020-11-25"}
						numDays={100}
						height={220}
						chartConfig={chartConfig}
					/>
					</ScrollView>
				</Card>
				{<Card title="Category BreakDown">
					<PieChart
						data={pieData}
						style={{height: 150}}
					/>
				</Card>}
				<Card>
					{this.state.data.map((item, i) => (
						<ListItem
							key={i}
							title={item.name + ' - ' + item.percent}
							leftIcon={
								<Icon
									name='circle'
									size={15}
									color={item.color}
								/>
							}
						/>
					))}
				</Card>
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