import Event from './Event'
import EventDetails from './EventDetails'

class SearchManager {
  /*
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

  /*
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

  filter(searchDetails) {
    // Eventually replace this with a call to the DatabaseManager
    // For now, create 10 default events with party size 0-
    var eventList = [];
    for (var i = 1; i <= 10; i++) {
      var details = new EventDetails("title" + i, "description" + i, 
                                     "startTime" + i, "endTime" + i, 
                                     "host" + i, "location" + i,
                                     "cost" + i, i, "categories" + i);
      var event = new Event(details, "attendees" + i, "chat" + i, "checked_in" + i);
      eventList.push(event);
    }
    eventList = this.filterPartySize(eventList, searchDetails.partySize);
  }

  sort(searchDetails, eventList) {

  }
}

export default SearchManager;
