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
	return (
		<Text></Text>
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
