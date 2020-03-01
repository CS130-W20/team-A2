import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
                        
                        if (event.attendees.indexOf(uid) < 0) {
                            event.attendees.push(uid);
                            this.databaseManager.updateEvent(eventId, event);
                        }
                    
                        Alert.alert('Event Joined!');
                        
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
                                this.databaseManager.updateEvent(eventId, event);
                            }
                           
                            
                            //Alert.alert('Will check user into the event');
                            this.setState({isAttendee: true, isCheckedIn: true});
                        }
                    }
                />);
            } else {
                return( <Button
                    title = "You're checked in!"
                    icon={
                        <Icon
                          name="check"
                          size={15}
                          color="white"
                        />
                      }
                    color="green"
                />);
            }
        }
    }


}
