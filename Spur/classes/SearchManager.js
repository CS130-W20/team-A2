import Event from './Event';
import EventDetails from './EventDetails';
import { SEARCH_DETAILS_DEFAULTS } from './SearchDetails';
import DatabaseManager from './DatabaseManager';
import { CATEGORIES } from '../constants/categories';

class SearchManager {
  /**
   * Creates a Singleton SearchManager
   * Initializes a DatabaseManager instance
   * @constructor
   */
  constructor() {
    // Return the existing instance
    if (!!SearchManager.instance) {
      return SearchManager.instance;
    }

    // Initialize a new instance
    SearchManager.instance = this;

    this.databaseManager = new DatabaseManager();

    return this;
  }

  /**
   * Returns the great circle distance in km between loc1 and loc2 using the Haversine formula
   * https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/21623206#21623206
   * @param {Object} loc1 - Object with latitude, longitude representing latitude and longitude
   * @param {Object} loc2 - Object with latitude, longitude representing latitude and longitude
   * @returns {number} Kilometers between loc1 and loc2
   */
  distance(loc1, loc2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((loc2.latitude - loc1.latitude) * p)/2 + 
            c(loc1.latitude * p) * c(loc2.latitude * p) * 
            (1 - c((loc2.longitude - loc1.longitude) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  /**
   * Returns the events in eventList with at least partySize people available
   * @param {Array} eventList - A list of events to filter from
   * @param {number} partySize - The party size to filter by
   * @returns {Array} Filtered event list
   */
  filterPartySize(eventList, partySize) {
    var newList = [];
    for (var i = 0; i < eventList.length; i++) {
      // Use the length of attendees to determine available party size
      var currentAttendees = eventList[i].attendees.length;
      var slotsAvailable = parseInt(eventList[i].details.partySize) - currentAttendees;

      if (partySize <= slotsAvailable) {
        newList.push(eventList[i]);
      }
    }
    return newList;
  }

  /**
   * Returns the events in eventList that cost at most the provided cost
   * @param {Array} eventList - A list of events to filter from
   * @param {number} cost - The maximum cost of the event
   * @returns {Array} Filtered event list
   */
  filterCost(eventList, cost) {
    var newList = [];
    for (var i = 0; i < eventList.length; i++) {
      if (eventList[i].details.cost <= cost) {
        newList.push(eventList[i]);
      }
    }
    return newList;
  }

  /**
   * Returns the events in eventList that contain at least one of the provided categories
   * @param {Array} eventList - A list of events to filter from
   * @param {Array} categories - A list of valid categories
   * @returns {Array} Filtered event list
   */
  filterCategories(eventList, categories) {
    var newList = [];
    for (var i = 0; i < eventList.length; i++) {
      var contains = false;
      for (var j = 0; j < categories.length; j++) {
        if (eventList[i].details.categories.includes(categories[j])) {
          contains = true;
          break;
        }
      }
      if (contains) {
        newList.push(eventList[i]);
      }
    }
    return newList;
  }

  /**
   * Returns the events in eventList that are at most the provided distance away
   * @param {Array} eventList - A list of events to filter from 
   * @param {number} distance - The maximum valid distance to the event
   * @param {Object} currentLocation - Object containing latitude, longitude
   * @returns {Array} Filtered event list
   */
  filterDistance(eventList, distance, currentLocation) {
    var newList = [];
    for (var i = 0; i < eventList.length; i++) {
      if (this.distance(eventList[i].details.region, currentLocation) <= distance) {
        newList.push(eventList[i]);
      }
    }
    return newList;
  }

  /**
   * Filters all events from the database based on the searchDetails provided
   * If any of the searchDetails values matches the default value provided in 
   *     SEARCH_DETAILS_DEFAULTS, no filtering is done on that particular entry
   * @param {SearchDetails} searchDetails - Object containing filter criteria
   * @returns {Promise} Promise to return filtered event list
   */
  async filter(searchDetails) {
    var snapshot = await this.databaseManager.events().once('value');

    const allEvents = snapshot.val();

    var eventList = Object.keys(allEvents).map(key => ({
        ...allEvents[key],
        eventId: key
    }));

    if (searchDetails.partySize != SEARCH_DETAILS_DEFAULTS.partySize) {
      eventList = this.filterPartySize(eventList, parseInt(searchDetails.partySize, 10));
    }
    if (searchDetails.cost != SEARCH_DETAILS_DEFAULTS.cost) {
      eventList = this.filterCost(eventList, parseInt(searchDetails.cost));
    }
    if (searchDetails.categories != SEARCH_DETAILS_DEFAULTS.categories) {
      eventList = this.filterCategories(eventList, searchDetails.categories);
    }
    if (searchDetails.distance != SEARCH_DETAILS_DEFAULTS.distance) {
      eventList = this.filterDistance(eventList, searchDetails.distance, 
                                     {latitude: searchDetails.userLatitude, longitude: searchDetails.userLongitude});
    }

    return eventList;  
  }

  /**
   * Sorts the events in eventList based on the sorting order in searchDetails
   * @param {Array} eventList - List of events to sort
   * @param {SearchDetails} searchDetails - Object containing the sorting order
   * @returns {Array} Array of sorted events
   */
  sort(eventList, searchDetails) {
    return eventList;
  }

  /**
   * Filters all events from the database based on the searchDetails provided
   * Sorts the list of matching events based on the sorting order also provided in searchDetails
   * @param {SearchDetails} searchDetails - Object containing filter criteria and sorting order
   * @returns {Promise} Promise to return the sorted and filtered list of events
   */
  async filterAndSort(searchDetails) {
    var eventList = await this.filter(searchDetails);
    var sortedList = this.sort(eventList, searchDetails);
    return sortedList;
  }
}

export default SearchManager;
