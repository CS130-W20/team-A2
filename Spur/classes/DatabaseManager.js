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

        return this;
    }

    // AUTHENTICATION METHODS
    // THESE ARE NOT TESTED YET
    /**
     * Creates a new Firebase user with the provided email and password
     * Handle errors by attaching a .catch(error => {}) callback to the returned Promise
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Promise to create a new user
     */
    registerUser(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Signs in the Firebase user identified by the email and password
     * Handle errors by attaching a callback to the returned Promise
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Promise to login the user
     */
    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    /**
     * Logs the current user out
     * @returns {Promise} Promise to log the user out
     */
    logout() {
        return this.auth.signOut();
    }

    /**
     * Returns the user that is currently logged in
     * @returns {FirebaseUser} The currently logged in user, or null if no user is logged in
     */
    getCurrentUser() {
        return this.auth.currentUser;
    }


    // DATABASE METHODS
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
     * @returns {String} The unique id associated with this newly created event
     */
    addEvent(event) {
        var eventRef = this.events().push();
        eventRef.set(event);

        return eventRef.key;
    }

    /**
     * Updates an event in the database
     * @param {string} eventId - Id of the event to be updated
     * @param {Event} event - Event to store into the database 
     */
    updateEvent(eventId, event) {
        this.db.ref('events/' + eventId).update(event);
    }

    /**
     * Returns a database reference to a user
     * @param {string} userId - Id of the user
     */
    getUser(userId) {
        return this.db.ref("users/" + userId);
    }

    /**
     * Return a database snapshot of all users
     */
    users() {
        return this.db.ref("users");
    }

    /**
     * Adds the user to the database
     * @param {String} userId - A string from Firebase authentication linked to the user 
     * @param {User} user - User to store into the database
     */
    addUser(userId, user) {
        this.db.ref("users/" + userId).set(user);
    }

    /**
     * Updates a user in the database
     * @param {string} userId - Id of the user to be updated
     * @param {User} user - User to store into the database 
     */
    updateUser(userId, user) {
        this.db.ref('users/' + userId).update(user);
    }
}


export default DatabaseManager;