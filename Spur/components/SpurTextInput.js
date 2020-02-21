import React, {Component} from 'react';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 View } from 'react-native';

/** A text input field class with nice styling **/
export default class SpurTextInput extends Component<Props>
{
    /** React render function **/
    render() {
	// copy over style parameters passed down from a parent
	const styleDict = Object.assign({}, styles, this.props.styles);
	return (
		<TextInput secureTextEntry={this.props.secureTextEntry} style={styleDict} onChangeText = {this.props.onChangeText}>{this.props.children}</TextInput>
  	);
    }
}

const styles = {
	backgroundColor: '#E4EBE3',
	borderRadius: 10,
	width: 200,
}
