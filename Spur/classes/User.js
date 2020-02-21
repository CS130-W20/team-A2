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
     */
    constructor(name) {
        this.name = name; 
        this.description = ""; 
        this.interests = ""; 
        this.history = [];
        this.upcoming = [];
    }
}