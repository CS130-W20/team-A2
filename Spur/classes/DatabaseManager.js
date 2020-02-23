import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import FirebaseConfig from '../constants/FirebaseConfig';

class DatabaseManager {
    /** 
     * Creates a Singleton DatabaseManager and initialize a Firebase instance
     * @constructor
     */
    constructor() {
        if (!!DatabaseManager.instance) {
            return DatabaseManager.instance;
        }
        DatabaseManager.instance = this;

        app.initializeApp(FirebaseConfig);
        this.auth = app.auth();
        this.db = app.database();

        console.log(FirebaseConfig);

        return this;
    }

    /**
     * Returns a database reference to an event
     * @param {string} eventId - ID of the event
     */
    getEvent(eventId) {
        return this.db.ref("events/" + eventId);
    }

    /**
     * Return a database snapshot of all events
     */
    events() {
        return this.db.ref('events');
    }

    /**
     * Adds the event into the database
     * @param {Event} event - Event to store into the database
     */
    addEvent(event) {
        var eventRef = this.events().push();
        eventRef.set(event);
    }
}

export default DatabaseManager;
