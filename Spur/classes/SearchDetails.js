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
     */
    constructor(distance, cost, partySize, categories) {
        this.distance = distance;
        this.cost = cost;
        this.partySize = partySize;
        this.categories = categories;
    }
}

export default SearchDetails;
export { SEARCH_DETAILS_DEFAULTS };