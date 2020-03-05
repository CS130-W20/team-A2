import React, {Component} from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import DatabaseManager from '../classes/DatabaseManager';

export default class ChatScreen extends React.Component {
  
  constructor(props) {
	super(props);
	this.state = {
		messages: [],
		id: 0,
	};

	console.log(this.props.route.params.id);
	this.databaseManager = new DatabaseManager();
	this.chatRef = this.databaseManager.db.ref('/chat' + this.props.route.params.id);
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

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    )
  }
}


ChatScreen.navigationOptions = {
  header: null,
};
