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
		<SpurTextInput onChangeText={props.onChangeText} />
		</View>
	);
}

export default class UserLoginScreen extends Component<Props>
{

	state = {
		name: '',
		username: '',
		password: ''
	};

    handleName(text) {this.state.name = text};
    handleUsername(text) {this.state.username = text};
    handlePassword(text) {this.state.password = text};

    render() {
	return (
		<View style={styles.container}>
		
		{/* Title */}
		<SpurText styles = {{textAlign: 'center',}}>Sign Up for SPUR!</SpurText>
		
		<View style={{}}>
		{inputField({text:"Name", onChangeText: this.handleName})}
		{inputField({text:"Username", onChangeText: this.handleUsername})}
		{inputField({text:"Password", onChangeText: this.handlePassword})}
		</View>

		</View>
  	);
    }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
};
