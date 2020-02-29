import React, {Component} from 'react';
import DatabaseManager from '../classes/DatabaseManager'; 
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
     Alert } from 'react-native';
import {Button} from 'react-native-elements';


export default class JoinButton extends Component<Props>
{
    constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.state = {
            event: this.props.event,
            isAttendee: this.props.isAttendee,
            isCheckedIn: this.props.isCheckedIn
		}
        
    }
    
    /** React render function **/
    render() {
        
        this.databaseManager = new DatabaseManager();
        const eventId = this.props.eventId;
        const event = this.state.event;
        const uid = this.props.uid;


        if (!this.state.isAttendee) {
            return( <Button
                title = 'Join Event!'
                onPress={() => 
                    {
                        console.log(event);
                        if (event.attendees.indexOf(uid) < 0) {
                            event.attendees.push(uid);
                        }
                        console.log('-------');
                        console.log(event);
                    
                        this.databaseManager.updateEvent(eventId, event);
                        Alert.alert('Joined Event lmao!');
                        
                        this.setState({isAttendee: true, isCheckedIn: false});
                    }
                }
            />);
        } else {

            if (!this.state.isCheckedIn) {
                return( <Button
                    title = 'Check into Event!'
                    onPress={() => 
                        {
                            if (event.checked_in.indexOf(uid) < 0) {
                                event.checked_in.push(uid);
                            }
                            console.log(event.checked_in);
                            //The need to update the database with the new checked in list
                            this.databaseManager.updateEvent(eventId, event);
                            
                            Alert.alert('Will check user into the event');
                            this.setState({isAttendee: true, isCheckedIn: true});
                        }
                    }
                />);
            } else {
                return(<Text>You're Checked In!</Text>)
            }
        }
    }


}
