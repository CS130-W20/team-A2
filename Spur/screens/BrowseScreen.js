import React, {Component} from 'react';
import { 
     ActivityIndicator,
     Button,
     Image,
     Keyboard,
     Picker,
     Platform,
     StyleSheet,
     Text,
     TextInput,
     TouchableOpacity,
     View } from 'react-native';
import { ButtonGroup, Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import * as WebBrowser from 'expo-web-browser';

import { CATEGORIES } from '../constants/categories';
import SearchDetails, { SEARCH_DETAILS_DEFAULTS, SORT_STRATEGIES } from '../classes/SearchDetails';
import SearchManager from '../classes/SearchManager';
import { MonoText } from '../components/StyledText';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';

export default class BrowseScreen extends Component<Props> {
  constructor(props) {
    super(props);

    this.searchManager = new SearchManager();

    Location.requestPermissionsAsync();

    this.state = {
      partySize: '',
      cost: '',
      distance: '',
      categories: [],
      sortType: SORT_STRATEGIES.byDistance,
      eventList: [],
      loading: false
    };
  }

  /**
   * Refines search after state is initialized and component is loaded
   */
  componentDidMount() {
    this.refineSearch();
  }

  /**
   * Updates partySize state variable when input change detected
   * @param {event} e - Event containing input change
   */
  handlePartySizeChange = e => {
    this.setState({
      partySize: e
    });
  }

  /**
   * Updates cost state variable when input change detected
   * @param {event} e - Event containing input change
   */
  handleCostChange = e => {
    this.setState({
      cost: e
    });
  }

  /**
   * Updates distance state variable when input change detected
   * @param {event} e - Event containing input change
   */
  handleDistanceChange = e => {
    this.setState({
      distance: e
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
   * Updates the sort state variable when changing the sort strategy
   * @param {number} e - Index of the sort strategy chosen
   */
  handleSortChange = e => {
    this.setState({
      sortType: e+1,
      eventList: []
    })
    this.refineSearch();
  }

  /**
   * Updates the event list with events that match the criteria stored in the component state
   */
  refineSearch = () => {
    this.setState({ loading: true });

    Location.getLastKnownPositionAsync().then(loc => {
      var distance = (this.state.distance.length == 0) ? SEARCH_DETAILS_DEFAULTS.distance : this.state.distance;
      var cost = (this.state.cost.length == 0) ? SEARCH_DETAILS_DEFAULTS.cost : this.state.cost;
      var partySize = (this.state.partySize.length == 0) ? SEARCH_DETAILS_DEFAULTS.partySize : this.state.partySize;
      var categories = (this.state.categories.length == 0) ? SEARCH_DETAILS_DEFAULTS.categories: this.state.categories;

      var details = new SearchDetails(distance, cost, partySize, categories, loc.coords.latitude, loc.coords.longitude, this.state.sortType);
      return details;
    }).then(details => this.searchManager.filterAndSort(details).then(list => {
      this.setState({
        eventList: list,
        loading: false
      })
    }));
  }

  /**
   * Renders the UI shown to the user
   */
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 0}}>
          <Input 
            onChangeText={this.handlePartySizeChange}
            label="Available Party Size"
          />

          <Input
            onChangeText={this.handleCostChange}
            label="Maximum Cost"
          />

          <Input
            onChangeText={this.handleDistanceChange}
            label="Maximum Distance (km)"
          />
        
          <Input
            label = "Categories"
            placeholder = "Select Categories"
            onFocus={() => {
              Keyboard.dismiss();
              if (this.wasFocused) {
                this.wasFocused = false;
              } else {
                this.SectionedMultiSelect._toggleSelector();
                this.wasFocused = true;
              }
              Keyboard.dismiss();
            }}
          />

          <View style={styles.textContainer}>
              <SectionedMultiSelect
                items={CATEGORIES}
                uniqueKey="id"
                subKey="children"
                selectText="Categories"
                readOnlyHeadings={true}
                hideSelect={true}
                expandDropDowns={true}
                onSelectedItemsChange={this.handleSelectedCategoriesChange}
                selectedItems={this.state.categories}
                ref={SectionedMultiSelect => this.SectionedMultiSelect = SectionedMultiSelect}
              />
          </View>

          <ButtonGroup
            onPress = {this.handleSortChange}
            buttons = {['Distance', 'Cost']}
            selectedIndex = {this.state.sortType - 1}
          />

          <Button
            title="Find Events"
            onPress={this.refineSearch}
          />
          {this.state.loading && <ActivityIndicator size="large" color="#00ff00" />}
          {this.state.eventList.map((event, i) => (
            <ListItem
              key={event.eventId}
              title={
                <Text style={{fontWeight: 'bold'}}>{event.details.title}</Text>
              }
              rightTitle={
                <View>
                  <Text style={{textAlign: 'center'}}>{event.details.date.year}-{event.details.date.month}-{event.details.date.day}</Text>
                  <Text style={{textAlign: 'center'}}>{String(event.details.startTime.hours).padStart(2, '0')}:{String(event.details.startTime.minutes).padStart(2, '0')} - {String(event.details.startTime.hours + 1).padStart(2, '0')}:{String(event.details.startTime.minutes).padStart(2, '0')}</Text>
                </View>
              }
              subtitle= {
                <View>
                  <Text>Participants: {event.attendees.length}/{event.details.partySize}</Text>
                  <Text>{event.details.location} ({Math.round(event.distance * 100)/100} km away)</Text>
                  <Text>Cost: ${event.details.cost}</Text>
                </View>
              }
              chevron
              bottomDivider
              onPress={() => this.props.navigation.navigate("ViewEvent",
                                                            {
                                                              screen: "ViewEvent",
                                                              params: {eventId: event.eventId}  
                                                            })}
            />
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
