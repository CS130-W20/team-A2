import React, {Component} from 'react';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 View } from 'react-native';

export default class SpurText extends Component<Props>
{

    render() {
	// copy over style parameters passed down from a parent
	const styleDict = Object.assign({}, styles, this.props.styles);
	return (
		<Text style={styleDict}>{this.props.children}</Text>
  	);
    }
}

const styles = {
	fontSize: 28,
	fontWeight: 'bold',
	color: '#859a80',
};
