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

export default class UserLoginScreen extends Component<Props>
{

    render() {
	return (
		<View style={styles.container}>
		<Text>Sign Up for SPUR!</Text>
		</View>
  	);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});
