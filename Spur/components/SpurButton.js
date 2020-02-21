import React, {Component} from 'react';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 Button,
	 View } from 'react-native';

/** A button class with nice styling **/
export default class SpurButton extends Component<Props>
{
    /** React render function **/
    render() {
	return (
		<View style={{alignSelf: 'center'}}>
			<View style={styles}>
				<Button onPress={this.props.onPress} title={this.props.title} color="#96CA92" />
			</View>
		</View>
  	);
    }
}

const styles = {
	//backgroundColor: "#96CA92",
	flex: 0.2,
	flexDirection: 'row',
	alignItems: 'center',
};
