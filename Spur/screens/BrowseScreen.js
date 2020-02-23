import React, {Component} from 'react';
import { 
     ActivityIndicator,
     Button,
     Image,
     Platform,
     StyleSheet,
     Text,
     TextInput,
     TouchableOpacity,
     View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as WebBrowser from 'expo-web-browser';

import { CATEGORIES } from '../constants/categories';
import SearchDetails, { SEARCH_DETAILS_DEFAULTS } from '../classes/SearchDetails';
import SearchManager from '../classes/SearchManager';
import { MonoText } from '../components/StyledText';

export default class BrowseScreen extends Component<Props> {
  constructor(props) {
    super(props);

    this.searchManager = new SearchManager();

    this.state = {
      partySize: '',
      cost: '',
      distance: '',
      categories: [],
      eventList: [],
      loading: false
    };
  }

  /**
   * Updates partySize state variable when input change detected
   * @param {event} e - Event containing input change
   */
  handlePartySizeChange = e => {
    this.setState({
      partySize: e.nativeEvent.text
    });
  }

  /**
   * Updates cost state variable when input change detected
   * @param {event} e - Event containing input change
   */
  handleCostChange = e => {
    this.setState({
      cost: e.nativeEvent.text
    });
  }

  /**
   * Updates distance state variable when input change detected
   * @param {event} e - Event containing input change
   */
  handleDistanceChange = e => {
    this.setState({
      distance: e.nativeEvent.text
    });
  }

  /**
   * Updates categories state variable when a different set of categories are selected
   * @param {Array} e - Selected categories 
   */
  handleSelectedCategoriesChange = e => {
    this.setState({
      categories: e
    });
  }

  /**
   * Updates the event list with events that match the criteria stored in the component state
   */
  refineSearch = () => {
    this.setState({ loading: true });

    // Construct a SearchDetails object and pass it to the searchmanager
    var distance = (this.state.distance.length == 0) ? SEARCH_DETAILS_DEFAULTS.distance : this.state.distance;
    var cost = (this.state.cost.length == 0) ? SEARCH_DETAILS_DEFAULTS.cost : this.state.cost;
    var partySize = (this.state.partySize.length == 0) ? SEARCH_DETAILS_DEFAULTS.partySize : this.state.partySize;
    var categories = (this.state.categories.length == 0) ? SEARCH_DETAILS_DEFAULTS.categories: this.state.categories;

    var details = new SearchDetails(distance, cost, partySize, categories);

    this.searchManager.filter(details).then(list => {
      this.setState({
        eventList: list,
        loading: false
      });
    })
  }

  /**
   * Renders the UI shown to the user
   */
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.formText}>Party Size</Text>
              <View style={styles.inputContainer} behavior="padding">
                <TextInput onChange={this.handlePartySizeChange} defaultValue={''} clearTextOnFocus={true}/>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.formText}>Maximum Cost</Text>
              <View style={styles.inputContainer} behavior="padding">
                <TextInput onChange={this.handleCostChange} defaultValue={''} clearTextOnFocus={true}/>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.formText}>Maximum Distance</Text>
              <View style={styles.inputContainer} behavior="padding">
                <TextInput onChange={this.handleDistanceChange} defaultValue={''} clearTextOnFocus={true}/>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.formText}>Categories</Text>
              <SectionedMultiSelect
                items={CATEGORIES}
                uniqueKey="id"
                subKey="children"
                readOnlyHeadings={true}
                expandDropDowns={true}
                onSelectedItemsChange={this.handleSelectedCategoriesChange}
                selectedItems={this.state.categories}
              />
            </View>
          </View>
          <Button
            title="Find Events"
            onPress={this.refineSearch}
          />
          {this.state.loading && <ActivityIndicator size="large" color="#00ff00" />}
          {this.state.eventList.map(event => (
            <View style={styles.container} key={event.eventId}>
              <Text>Event Name: {event.details.title}</Text>
              <Text>Event Time: {event.details.startTime} - {event.details.endTime}</Text>
              <Text>Distance: {event.details.location}</Text>
              <Text>Event Cost: ${event.details.cost}</Text>
              <Text></Text>
            </View>
            ))}
        </ScrollView>
      </View>
    );
  }
}

BrowseScreen.navigationOptions = {
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
  flexGrow: 1,
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
