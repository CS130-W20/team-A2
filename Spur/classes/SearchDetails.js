class SearchDetails {
    constructor(startTime, endTime, location, cost, partySize, categories) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.cost = cost;
        this.partySize = partySize;
        this.categories = categories;
    }

    /*
     * Prints the information stored in this object to console for debugging purposes
     */
    print() {
        console.log("{\n" + 
                    "\tstart: " + this.startTime + "\n" + 
                    "\tend: " + this.endTime + "\n" + 
                    "\tlocation: " + this.location + "\n" + 
                    "\tcost: " + this.cost + "\n" + 
                    "\tpartySize: " + this.partySize + "\n" + 
                    "\tcategories: " + this.categories + "\n}");
    }
}

export default SearchDetails;
