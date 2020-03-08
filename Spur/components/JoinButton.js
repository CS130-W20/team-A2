import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatabaseManager from '../classes/DatabaseManager'; 
import { Alert } from 'react-native';
import {Button} from 'react-native-elements';

/**
 * Join Button - Displays an button which allows users to join or check into events
 */
export default class JoinButton extends Component<Props>
{
    constructor(props) {
		super(props); 
		//Setup firebase via a databaseManager
		this.databaseManager = new DatabaseManager();
		this.state = {
            event: this.props.event,
            isAttendee: this.props.isAttendee,
            isCheckedIn: this.props.isCheckedIn,
        }
        
    }
    
    /** React render function **/
    render() {
        
        this.databaseManager = new DatabaseManager();
        const eventId = this.props.eventId;
        const event = this.state.event;
        const uid = this.props.uid;
        const userName = this.props.userName;
        const upcoming = this.props.upcoming;

        // If not an attendee, display a join button
        if (!this.state.isAttendee) {
            return( <Button
                title = 'Join Event!'
                onPress={() => 
                    {
                        
                        if (event.attendees.indexOf(uid) < 0) {
                            event.attendees.push(uid);
                            event.attendeeNames.push(userName);

                            if (upcoming.indexOf(eventId) < 0) {
                                upcoming.push(eventId);
                            }
                            this.databaseManager.updateEvent(eventId, event);
                            this.databaseManager.updateUser(uid, {upcoming: upcoming});
                        }
                    
                        Alert.alert('Event Joined!');
                        
                        this.setState({isAttendee: true, isCheckedIn: false});
                    }
                }
            />);
        } else {
            //If an attendee not checked in, display check in button
            if (!this.state.isCheckedIn) {
                return( <Button
                    title = 'Check into Event!'
                    onPress={() => 
                        {
                            const checkedIn = event.checked_in ? event.checked_in : []

                            if (checkedIn.indexOf(uid) < 0) {
                                checkedIn.push(uid);
                                this.databaseManager.updateEvent(eventId, {checked_in: checkedIn});
                            }
                           
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
