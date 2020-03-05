import React, {Component} from 'react'
import DatabaseManager from '../classes/DatabaseManager';

import {
	 Text,
	 StyleSheet,
	 View,
	 Button,
	 FlatList,
	 TouchableOpacity,
	} from 'react-native';

export default class ChatScreen extends React.Component {
  /**
    Automatically called constructor that does initial setup.
  */
  constructor(props) {
	super(props);
    
	this.databaseManager = new DatabaseManager();
	this.eventsRef = this.databaseManager.db.ref('/events');
	this.userRef = this.databaseManager.db.ref('/users/' + this.databaseManager.getCurrentUser().uid);
	this.joinedEventsRef = this.databaseManager.db.ref('/users/' + this.databaseManager.getCurrentUser().uid + '/upcoming');
	
	this.state = {
		events: [],
		userID: this.databaseManager.getCurrentUser().uid,
		userName: '',
		joined: [],
	};
	this.updateName = this.updateName.bind(this);
	this.listenForJoinedEvents = this.listenForJoinedEvents.bind(this);
  }
  /** Called then component is mounted, attaches database listeners.
	*/
  componentDidMount() {
	this.updateName(this.userRef);
	this.listenForJoinedEvents(this.joinedEventsRef);
  }
  /** Called when component is unmounted, deattaches database listeners.
  */
  componentWillUnmount() {
	  this.eventsRef.off();
  }
  /** Update state variable userName with the user's name.
  */
  updateName(userRef) {
	userRef.once('value', (data) => {
	  this.setState({
		userName: data.val().name,
      });  
    });
  }
  /** Retrieves the list of events a user has joined and push it along with
  *   specific event details to the events state variable.
  */
  listenForJoinedEvents(joinedEventsRef) {
	joinedEventsRef.on('value', (snap) => {
		var jnd = [];
		snap.forEach((child) => {
		  jnd.push(child.val());
		  this.setState({
			joined: jnd,
		  });
		  
		  this.eventsRef.once('value', (snap) => {
		    var evnts = [];
		    snap.forEach((child) => {
		  
	        if (this.state.joined.includes(child.key)) {
		      evnts.push({id: child.key, name: child.val().details.title});
		      this.setState({
			    events: evnts,
		      });
		    }
	       });
         });
	});
  });
 }

  /** Render screen shown to user.
  */
  render() {
    return (
      <FlatList
        data={this.state.events}
        renderItem={({ item }) => (
		  <View>
		  <TouchableOpacity style={styles.item} onPress={() => {
		    this.props.navigation.navigate('Chatroom', {id: item.id, title: item.name, userID: this.state.userID, userName: this.state.userName,});  			
		  }}> 
                 <Text style={styles.name}>{item.name}</Text> 
          </TouchableOpacity>
		  </View>)}
        keyExtractor={item => item.id}
      />
    )
  }
}

ChatScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#B2BABB',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
}); 