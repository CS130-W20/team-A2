const SEARCH_DETAILS_DEFAULTS = {
    startTime: -1,
    endTime: -1,
    distance: -1,
    cost: -1,
    partySize: -1,
    categories: -1
}

class SearchDetails {
    /**
     * Creates a SearchDetails object
     * @constructor
     * @param {number} distance - Maximum desired distance
     * @param {number} cost - Maximum desired cost
     * @param {number} partySize - Exact number of people for the event
     * @param {Array} categories - All desired categories
     * @param {number} userLatitude - User's current latitude
     * @param {number} userLongitude - User's current longitude
     */
    constructor(distance, cost, partySize, categories, userLatitude, userLongitude) {
        this.distance = distance;
        this.cost = cost;
        this.partySize = partySize;
        this.categories = categories;
        this.userLatitude = userLatitude;
        this.userLongitude = userLongitude;
    }
}

export default SearchDetails;
export { SEARCH_DETAILS_DEFAULTS };
