class Event {
    /**
     * Creates an Event object
     * @constructor
     * @param {EventDetails} details - Logistic information about the event
     * @param {Array} attendees - Array of users signed up for the event
     * @param {Chat} chat - Chatroom for the users to communicate in
     * @param {Array} checked_in - Array of users checked in for the event
     */
    constructor(details, attendees, chat, checked_in) {
        this.details = details;
        this.attendees = attendees;
        this.chat = chat;
        this.checked_in = checked_in;
    }
}

export default Event;