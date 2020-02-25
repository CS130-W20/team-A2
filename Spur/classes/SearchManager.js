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
   * Returns the events in eventList with a party size of exactly partySize people
   * @param {Array} eventList - A list of events to filter from
   * @param {number} partySize - The party size to filter by
   * @returns {Array} Filtered event list
   */
  filterPartySize(eventList, partySize) {
    var newList = [];
    for (var i = 0; i < eventList.length; i++) {
      if (eventList[i].details.partySize == partySize) {
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
   * @returns {Array} Filtered event list
   */
  filterDistance(eventList, distance) {
    var newList = [];
    for (var i = 0; i < eventList.length; i++) {
      if (eventList[i].details.location <= distance) {
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

    const eventList = Object.keys(allEvents).map(key => ({
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
      eventList = this.filterDistance(eventList, searchDetails.distance);
    }

    return eventList;  
  }
}

export default SearchManager;
