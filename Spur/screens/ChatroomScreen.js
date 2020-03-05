import React, {Component} from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import DatabaseManager from '../classes/DatabaseManager';
import {
	 StyleSheet,
	 View,
	} from 'react-native';

export default class ChatScreen extends React.Component {
  
  constructor(props) {
	super(props);
	this.state = {
		messages: [],
		id: this.props.route.params.id,
		title: this.props.route.params.title,
		userID: this.props.route.params.userID,
	};
    
	this.databaseManager = new DatabaseManager();
	this.chatRef = this.databaseManager.db.ref('/chat/' + this.props.route.params.id);
	this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.listenForItems(this.chatRef);
  }
  componentWillUnmount() {
	  this.chatRef.off();
  }
  
  listenForItems(chatRef) {
	
	chatRef.on('value', (snap) => {
		var msgs = [];
		snap.forEach((child) => {
		msgs.push(child.val().message);
		this.setState({
			messages: msgs,
		});
	
	});
	
	  
  });
 }

  onSend(messages = []) {
    messages.forEach(message => {
		this.chatRef.push({message});
	}
	)
  }
  renderBubble(props) { 
    return ( 
	  <Bubble {...props} 
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
          },
          right: {
            backgroundColor: '#4287f5'
          }
        }} />
	);
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.state.userID,
        }}
		renderBubble={this.renderBubble}
		inverted={false}
      />
    )
  }
}


ChatScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 32,
  },
}); 
