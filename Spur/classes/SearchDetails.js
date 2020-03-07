const SORT_STRATEGIES = {
    byDistance: 1,
    byCost: 2
}

const SEARCH_DETAILS_DEFAULTS = {
    startTime: -1,
    endTime: -1,
    distance: -1,
    cost: -1,
    partySize: -1,
    categories: -1,
    sortType: SORT_STRATEGIES.byDistance
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
     * @param {number} sortType - The sort strategy, coded in SORT_STRATEGIES above
     */
    constructor(distance, cost, partySize, categories, userLatitude, userLongitude, sortType) {
        this.distance = distance;
        this.cost = cost;
        this.partySize = partySize;
        this.categories = categories;
        this.userLatitude = userLatitude;
        this.userLongitude = userLongitude;
        this.sortType = sortType;
    }
}

export default SearchDetails;
export { SEARCH_DETAILS_DEFAULTS, SORT_STRATEGIES };
