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
  
  constructor(props) {
	super(props);
    this.state = {
		events: [],
		userID: 'InOwn1L1YKMKSrmP80p5GweSoH83',
		userName: '',
		joined: [],
	};
	
	this.databaseManager = new DatabaseManager();
	this.eventsRef = this.databaseManager.db.ref('/events');
	this.joinedEventsRef = this.databaseManager.db.ref('/users/' + this.state.userID + '/upcoming');
	

    /*
	  state({userID: this.databaseManager.getCurrentUser()});
	*/
  }

  componentDidMount() {
	this.listenForJoinedEvents(this.joinedEventsRef);
	
  }
  componentWillUnmount() {
	  this.eventsRef.off();
  }

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


  render() {
    return (
      <FlatList
        data={this.state.events}
        renderItem={({ item }) => (
		  <View>
		  <TouchableOpacity style={styles.item} onPress={() => {
		    this.props.navigation.navigate('Chatroom', {id: item.id, title: item.name, userID: this.state.userID});  			
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