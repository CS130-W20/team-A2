import React, {Component} from 'react';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 View } from 'react-native';
import SpurTextInput from '../components/SpurTextInput'
import SpurText from '../components/SpurText'
import SpurButton from '../components/SpurButton'

function inputField(props) {
	// for name, username, password fields
	return(
		<View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 10}}>	
		<SpurText>{props.text}: </SpurText>
		<SpurTextInput secureTextEntry={props.security} onChangeText={props.onChangeText} />
		</View>
	);
}

export default class UserLoginScreen extends Component<Props>
{
    constructor(props) {
	super(props);
	this.name= "";
        this.username= "";
       	this.password= "";
    }

    handleName(text) {this.name = text};
    handleUsername(text) {this.username = text};
    handlePassword(text) {this.password = text};

    render() {
	return (
		<View style={styles.container}>
		
		{/* Title */}
		<SpurText styles = {{textAlign: 'center',}}>Sign Up for SPUR!</SpurText>
	
		{/* Text Fields */}	
		<View style={{}}>
		{inputField({text:"Name", onChangeText: this.handleName})}
		{inputField({text:"Username", onChangeText: this.handleUsername})}
		{inputField({text:"Password", onChangeText: this.handlePassword, security:true})}
		</View>

		{/*Submit Button*/}
		<SpurButton title="Submit"/>
		</View>
  	);
    }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
};
