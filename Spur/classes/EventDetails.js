class EventDetails {
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
