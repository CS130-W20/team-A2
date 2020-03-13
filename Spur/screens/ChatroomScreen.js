import React, {Component} from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import DatabaseManager from '../classes/DatabaseManager';
import {
	 StyleSheet,
	 View,
	} from 'react-native';

export default class ChatScreen extends React.Component {
  /** Automatically called constructor that does initial setup.
  */
  constructor(props) {
	super(props);
	this.state = {
		messages: [],
		id: this.props.route.params.id,
		title: this.props.route.params.title,
		userID: this.props.route.params.userID,
		userName: this.props.route.params.userName,
	};
    
	//this.databaseManager = new DatabaseManager();
	this.chatRef = props.chatRef;
	//this.onSend = this.onSend.bind(this);
  }
  /** Called then component is mounted, attaches database listeners.
  */
  componentDidMount() {
    this.listenForItems(this.chatRef);
  }
  /** Called when component is unmounted, deattaches database listeners.
  */
  componentWillUnmount() {
	  this.chatRef.off();
  }
  /** Retrieve new chat messages and push them to the messages state variable.
  *   @param {Object} Firebase Reference
  */
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
  /** Called when a user sends a message, push it to the database
  * @param {Array} List of messages
  */
  onSend(messages = []) {
    messages.forEach(message => {
		this.chatRef.push({message});
	}
	)
  }
  /** Modify how the chat bubbles are rendered
  */
  renderBubble(props) { 
    return ( 
    <Bubble {...props}
        user={{
          _id: this.state.userID,
          name: this.state.userName,
        }}
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
  /** Render the screen shown to the user.
  */
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.state.userID,
		      name: this.state.userName,
        }}
		renderUsernameOnMessage={true}
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
