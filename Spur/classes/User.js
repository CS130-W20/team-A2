/**
 * User Class: Stores user information
 */
export default class User {
    /**
     * User object holds user information
     * @constructor
     * @param {string} name - Name of the user
     * @param {string} description - User written description.
     * @param {Categories[]} interests - List of categories the user is interested in.
     * @param {Event[]} history - List of events the user has attended. 
     * @param {Event[]} upcoming - List of upcoming events the user has joined. 
     */
    constructor(name, description = "", interests = [], history = [], upcoming = []) {
        this.name = name; 
        this.description = description; 
        this.interests = interests;
        this.history = history;
        this.upcoming = upcoming; 
    }
}