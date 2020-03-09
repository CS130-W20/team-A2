import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Button,
	Dimensions } from 'react-native';
import {
	Card, 
	ListItem } from 'react-native-elements';
import DatabaseManager from '../classes/DatabaseManager';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { CATEGORIES } from '../constants/categories';
import { ContributionGraph } from 'react-native-chart-kit';
import { PieChart } from 'react-native-svg-charts';

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
		this.eventTitles = new Map() 
		this.historyTitles = new Map() 
		this.state = {
			name: "", 
			description: "",
			interests: [],
			history: [],
			upcoming: [],
			events: {},
			data: [], 
			dates: []
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
		var history = user.history ? user.history : [];
		var upcoming = user.upcoming ? user.upcoming : []; 
		var events = new Object(); 

		//Get all events and filter for upcoming  
		var snapshot = await this.databaseManager.events().once('value');
		const allEvents = snapshot.val();
		
		//Get events of upcoming  
		upcoming.forEach((id) => {
			if (allEvents[id]) {
				var tar = allEvents[id]
				events[id.toString()] = tar 
				//events.id = tar 
			}
		})

		//Get events of history
		history.forEach((id) => {
			if (allEvents[id]) {
				var tar = allEvents[id]
				events[id.toString()] = tar
				//events.id = tar 
			}
		})

	
		var eventList = history.map(id => {
			if(allEvents[id]) {
				return allEvents[id]
			}
		});

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
		if (dates.length > 1) {
			var date = eventList[0].details.date;
			var month = date.month < 10 ? '0' + date.month : date.month
			var day = date.day < 10 ? '0' + (date.day + 1): date.day + 1
			var dateString = date.year + '-' + month + '-' + day
			dates.push({
				date: dateString,
				count: 0 
			})	
		}

		//Finally set state 
		this.setState({
			name: user.name,
			description: user.description ? user.description : "No description yet!",
			interests: user.interests ? user.interests : [],
			history: user.history ? user.history : [],
			upcoming: user.upcoming ? user.upcoming : [],
			events: events,
			data: data,
			dates: dates
		})
	}

	/**
	 * Function that updates the state based on the selected/unselected items 
	 * @param {Array[Categories]} - Array of selected categories
	 */
	onSelect = selection => {
	}

	/**
	 * Function to view an event 
	 * @param {String} eventId - Id of the event that we wish to view 
	 */
	viewEvent(eventId) {
		this.props.navigation.navigate("ViewEvent", {eventId: eventId}); 
	}

	/**
	 * Function to create a list item for upcoming/past events 
	 * @param {String} eventId - EventId to get the event
	 * @param {Int} index - Key for the list item 
	 */
	createListItem(eventId, index) {
		var str = eventId.toString() 
		var event = this.state.events[str]
		var name = event.details.title
		var date = event.details.date
		var dateStr = "Date: " + date.year + '-' + date.month + '-' + date.day
		var time = event.details.startTime
		var timeStr = "Time: " + time.hours + ":" + time.minutes + " - " + (time.hours + 1) + ":" + (time.minutes)
		return (
			<ListItem
				key={index}
				title={name}
				titleStyle={{fontWeight: 'bold'}}
				subtitle= {
					<View>
						<Text style={{textAlign: 'left'}}>{dateStr}</Text>
						<Text style={{textAlign: 'left'}}>{timeStr}</Text>
					</View>
				}
				chevron
				bottomDivider
				onPress={() => this.props.navigation.navigate("ViewEvent", {screen: "ViewEvent", params: {eventId: eventId}})}
			/>
		)
	}


    render() {
		var profileTitle = this.state.name + '\'s Profile'
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


		//Date stuff 
		var currDay = new Date().getDate()
		currDay = currDay.length < 10 ? currDay : '0' + currDay
		var currMon = new Date().getMonth()
		currMon = currMon.legnth < 10 ? currMon : '0' + currMon
		var currYear = new Date().getFullYear();
		var endDate = currYear + '-' +  currMon + '-' + currDay
		let pie; 
		if (this.state.data.length == 0) {
			pie = <Text>
				No past events yet!
			</Text>
		} else {
			pie = <PieChart
				data={pieData}
				style={{height: 150}}
			/>
		}
		let pastEvents 
		if (this.state.history.length == 0) {
			pastEvents = <Text>
				No past events yet!
			</Text>
		} else {
			pastEvents = <ScrollView>
				{this.state.history.map((eventId, index) => (
					this.createListItem(eventId, index)
				))}
			</ScrollView>
		}
		console.log(this.state.dates)
		const testData = [
			{date: '2020-02-28', count: 5},
			{date: '2020-01-25', count: 3},
			{date: '2020-03-03', count: 3},
			{date: '2020-02-21', count: 3}
		]
		return (
			<View style={{flex: 1, flexDirection: 'column'}}>
				<ScrollView contentContainerStyle={{flexGrow: 0}}>
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
							{this.state.upcoming.map((eventId, index) => (
								this.createListItem(eventId, index)
							))}
						</ScrollView>
					</Card>
					<Card title="Activity Calendar">
						<ScrollView horizontal={true}>
							<ContributionGraph
								values={this.state.dates}
								width = {screenWidth}
								endDate = {new Date("2020-04-01")}
								numDays={100}
								height={220}
								chartConfig={chartConfig}
							/>
						</ScrollView>
					</Card>
					<Card title="Category Breakdown">
						{ pie }
					</Card>
					{this.state.data.length != 0 && <Card>
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
					</Card>}
					<Card title = "Past Events">
						{pastEvents}
					</Card>
					<ScrollView style={styles.contentContainer}>
					</ScrollView>
				</ScrollView>
				<View style={styles.bottom}>
						<View style={styles.btnBox}>
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