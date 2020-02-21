class EventDetails {
    /*
     * Creates an EventDetails object
     * @constructor
     * @param {string} title - The name of the event
     * @param {string} description - Brief description of the event
     * @param {Date} startTime - The start time of the event
     * @param {Date} endTime - The end time of the event
     * @param {User} host - The creator of the event
     * @param {string} location - Longitude and latitude of the event location
     * @param {number} cost - The estimated cost of the event
     * @param {number} partySize - The maximum number of people at the event
     * @param {Array} categories - Categories the event belongs to
     */
    constructor(title, description, startTime, endTime, host, location, cost, partySize, categories) {
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.host = host;
        this.location = location;
        this.cost = cost;
        this.partySize = partySize;
        this.categories = categories;
    }   
}

export default EventDetails;
