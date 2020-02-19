import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Image,
	 Platform,
	 StyleSheet,
	 Text,
	 TextInput,
	 TouchableOpacity,
	 View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default class CreateScreen extends Component<Props> {
    state = {
	name: ''
    };
    handleNameChange = e => {
	this.setState({
	    name: e.nativeEvent.text
	});
    };
    render() {
	return (
    <View style={styles.container}>
		<MapView
		  provider={PROVIDER_GOOGLE}
		  style={styles.map}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }} 
		>
        </MapView>
        <View style={styles.textContainer}>
		<Text style={styles.formText}>Event Name</Text>
		<View style={styles.inputContainer}>
		<TextInput style={styles.input} onChange={this.handleNameChange} defaultValue={'Name'} clearTextOnFocus={true}/>
		</View>
	    </View>
    </View>
  );
    }
}

CreateScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

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
    height: 50	
  },
  input: {
	height: 50,
    backgroundColor: 'lightgrey',
    paddingLeft: 15,
    paddingRight: 15	
  },
  formText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
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
	flex: 1,
    justifyContent: 'space-evenly',
	flexDirection: 'row',
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
