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
	};
	this.databaseManager = new DatabaseManager();
	this.eventsRef = this.databaseManager.db.ref('/events');
	this.goToChatroomScreen = this.goToChatroomScreen.bind(this);
  }
  goToChatroomScreen(id) {
         this.props.navigation.navigate('Chatroom', {
		   eventId: id,
		 });
  }
  componentDidMount() {
    this.listenForItems(this.eventsRef);
  }
  componentWillUnmount() {
	  this.eventsRef.off();
  }
  listenForItems(eventsRef) {
	eventsRef.on('value', (snap) => {
		var evnts = [];
		snap.forEach((child) => {
		evnts.push({key: child.key, name: child.val().details.title});
		this.setState({
			events: evnts,
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
		  <TouchableOpacity style={styles.item} onPress={() => this.goToChatroomScreen(item.key)}> 
                 <Text style={styles.name}>{item.name}</Text> 
          </TouchableOpacity>
		  </View>)}
        keyExtractor={item => item.key}
      />
    )
  }
}

ChatScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
}); 