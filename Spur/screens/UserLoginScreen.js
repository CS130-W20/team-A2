import React, {Component} from 'react';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 Modal,
	 View } from 'react-native';
import SpurTextInput from '../components/SpurTextInput'
import SpurText from '../components/SpurText'
import SpurButton from '../components/SpurButton'


/** 
*	Creates a View with a text label and a text entry field
* 	@param {Object} props - React props for internal Components
*	@param {string} props.text - Text for label
*	@param {function} props.onChangeText - callback to handle text input change
*	@param {Boolean} props.security - flag for a password field
**/
function inputField(props) {
	// for name, username, password fields
	return(
		<View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 10}}>	
		<SpurText>{props.text}: </SpurText>
		<SpurTextInput secureTextEntry={props.security} onChangeText={props.onChangeText} />
		</View>
	);
}

/** Class for the User Login Screen **/
export default class UserLoginScreen extends Component<Props>
{

    /** 
     *	Displays a User SignUp / Log-In page for the app
     *	@constructor
     * 	@param {Object} React props, only used by super class
    **/
    constructor(props) {
	super(props);

	// entered user data
	this.name= "";
        this.username= "";
       	this.password= "";

	this.state = {
		login: false,
		success: false,
		failure: false,
	};
    }

    /** 
     *	Handler for changing the name input field
     * 	@param {string} text - new text input
    **/
    handleName(text) {this.name = text};

    /** 
     *	Handler for changing the username input field
     * 	@param {string} text - new text input
    **/
    handleUsername(text) {
	console.log(this);
	this.username = text
    };

    /** 
     *	Handler for changing the password input field
     * 	@param {string} text - new text input
    **/
    handlePassword(text) {this.password = text};

    /** 
     *	Handler for the submit button
    **/
    handleSubmit() {
	// mock user database 
	const makeUser = function(n, u, p){return {name: n, username:u, password:p}};
	const users = [makeUser("Pravin Visakan", "pvisakan", "hola_spur"), makeUser("Greg Lee", "glee", "gregiscool")];

	// functions to verify entered data
	const verifySignUp = function(user){
		const reducer2 = (accum, cur) => {return accum || (JSON.stringify(cur) == JSON.stringify(user))};
		const result = !users.reduce(reducer2, false);

		if(result)
		{
			users.push(user);
		}

		return result;
	}

	const verifyLogIn = function(user){

		const reducer2 = (accum, cur) => {return accum || (JSON.stringify(cur) == JSON.stringify(user))};
		const result = users.reduce(reducer2, false);

		return result;
	}

	// verify data based on login flag
	//console.log(this);
	const verify = (this.state.login)?verifyLogIn:verifySignUp;

	if(verify({name:this.name, username:this.username, password:this.password}))
	{
		this.setState({success:true});
	}
	else
	{
		this.setState({failure:true});
	}
    }

    /** 
     *	react render function
    **/
    render() {
	return (
		<View style={styles.container}>

		{/* Success/Failure Modals */}
		<Modal
			visible={this.state.success}
		>
			<SpurText>Success!</SpurText>
		</Modal>
		<Modal
			visible={this.state.failure}
		>
			<SpurText>Failure!</SpurText>
		</Modal>
		
		{/* Title */}
		<SpurText styles = {{textAlign: 'center',}}>Sign Up for SPUR!</SpurText>
	
		{/* Text Fields */}	
		<View style={{}}>
		{inputField({text:"Name", onChangeText: this.handleName})}
		{inputField({text:"Username", onChangeText: this.handleUsername})}
		{inputField({text:"Password", onChangeText: this.handlePassword, security:true})}
		</View>

		{/*Submit Button*/}
		<SpurButton onPress={this.handleSubmit} title="Submit"/>

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
