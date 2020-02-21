import React, {Component} from 'react';
import {
	 StyleSheet,
	 Text,
	 View } from 'react-native';


/**
 * User Class: Stores user information
 */
export default class User {
    /**
     * Constructor for the User
     * @constructor
     * @param {string} name - Name of the user
     * @param {string} description - User written description. Initially empty.
     * @param {Categories[]} interests - List of categories the user is interested in. Initially empty.
     * @param {Event[]} history - List of events the user has attended. Initially empty. 
     * @param {Event[]} upcoming - List of upcoming events the user has joined. Initially empty.
     */
    constructor(name) {
        this.name = name; 
        this.description = ""; 
        this.interests = []; 
        this.history = [];
        this.upcoming = [];
    }
}