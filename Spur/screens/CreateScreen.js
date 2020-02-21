import React, {Component} from 'react';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 View,
     ScrollView,
	 SafeAreaView,
	 Button
	} from 'react-native';

import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import {KeyboardAvoidingView} from 'react-native';

export default class CreateScreen extends Component<Props> {
    state = {
	name: '',
	cost: '',
	party: '',
	desc: '',
	startTime: '',
	endTime: '',
	category: ''
    };
    handleNameChange = e => {
	this.setState({
	    name: e.nativeEvent.text
	});
    };
	handleStartTimeChange = e => {
	this.setState({
	    startTime: e.nativeEvent.text
	});
    };
	handleEndTimeChange = e => {
	this.setState({
	    endTime: e.nativeEvent.text
	});
    };
	handleCategoryChange = e => {
	this.setState({
	    category: e.nativeEvent.text
	});
    };
	handleCostChange = e => {
	this.setState({
	    cost: e.nativeEvent.text
	});
    };
	handlePartyChange = e => {
	this.setState({
	    party: e.nativeEvent.text
	});
    };
	handleDescChange = e => {
	this.setState({
	    desc: e.nativeEvent.text
	});
    };
	
    render() {
	return (
    <View style={styles.container}>
		
		<View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Event Name</Text>
		<TextInput style={styles.nameText} onChange={this.handleNameChange} clearTextOnFocus={true}/>
		</View>
		
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Start Time</Text>
		<TextInput style={styles.input} onChange={this.handleStartTimeChange} clearTextOnFocus={true}/>
		<Text style={styles.formText}>End Time</Text>
		<TextInput style={styles.input} onChange={this.handleEndTimeChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Cost</Text>
		<TextInput style={styles.input} onChange={this.handleCostChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Party Size</Text>
		<TextInput style={styles.input} onChange={this.handlePartyChange} clearTextOnFocus={true}/>
		</View>
		
		<View style={styles.textContainer}>
		<Text style={styles.formText}>Category</Text>
		<TextInput style={styles.input} onChange={this.handleCategoryChange} defaultValue={'Fun'} clearTextOnFocus={true}/>
		</View>
		
		<Text style={styles.formText}>Description</Text>
		<View style={styles.textContainer}>
		<TextInput style={styles.descriptionText} onChange={this.handleDescChange} defaultValue={'Description'} clearTextOnFocus={true}/>
		</View>
		
		<Button title="Submit" />
	    </ScrollView>
		</View>

    </View>
  );
    }
}

CreateScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
	height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',	
  },
  inputContainer: {
	borderWidth: 1,
	borderColor: 'lightgrey',
    height: 50,
  },
  input: {
	height: 30,
    backgroundColor: 'lightgrey',
    paddingLeft: 15,
    paddingRight: 15,	
  },
  nameText: {
	height: 30,
	width: 100,
    backgroundColor: 'lightgrey',
    paddingLeft: 15,
    paddingRight: 15,	
  },
  formText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
	margin: 5,
  },
  contentContainer: {
    paddingTop: 30,
  },
  descriptionText: {
	height: 100,
	width: 300,
    backgroundColor: 'lightgrey',
    paddingLeft: 15,
    paddingRight: 15  
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  textContainer: {
	flexGrow: 1,
    justifyContent: 'center',
	flexDirection: 'row',
	padding: 5,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
