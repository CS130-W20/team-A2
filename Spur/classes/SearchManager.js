import Event from './Event';
import EventDetails from './EventDetails';
import { SEARCH_DETAILS_DEFAULTS } from './SearchDetails';
import { CATEGORIES } from '../constants/categories';

class SearchManager {
  /**
   * Singleton SearchManager
   */
  constructor() {
    // Return the existing instance
    if (!!SearchManager.instance) {
      return SearchManager.instance;
    }

    // Initialize a new instance since none exists
    SearchManager.instance = this;
    return this;
  }

  /**
   * Returns the events in eventList with a party size of exactly partySize people
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
   * Filters all events from the database based on the searchDetails provided
   * If any of the searchDetails values matches the default value provided in 
   *     SEARCH_DETAILS_DEFAULTS, no filtering is done on that particular entry
   */
  filter(searchDetails) {
    // Eventually replace this with a call to the DatabaseManager
    // For now, create 10 default events with party size 0-
    var eventList = [];
    for (var i = 1; i <= 10; i++) {
      var details = new EventDetails("title" + i, "description" + i, 
                                     "startTime" + i, "endTime" + i, 
                                     "host" + i, "location" + i,
                                     i, i, [i]);
      var event = new Event(details, "attendees" + i, "chat" + i, "checked_in" + i);
      eventList.push(event);
    }

    if (searchDetails.partySize != SEARCH_DETAILS_DEFAULTS.partySize) {
      eventList = this.filterPartySize(eventList, parseInt(searchDetails.partySize, 10));
    }
    if (searchDetails.cost != SEARCH_DETAILS_DEFAULTS.cost) {
      eventList = this.filterCost(eventList, parseInt(searchDetails.cost));
    }
    if (searchDetails.categories != SEARCH_DETAILS_DEFAULTS.categories) {
      eventList = this.filterCategories(eventList, searchDetails.categories);
    }
    return eventList;
  }

  sort(searchDetails, eventList) {

  }
}

export default SearchManager;
