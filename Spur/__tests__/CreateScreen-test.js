// Tests for the Create Event Screen
import * as React from 'react';
import renderer from 'react-test-renderer';
import CreateScreen from '../screens/CreateScreen';
import {Alert} from 'react-native';


describe("State Change Tester", () =>  {
    test("Successfully updates name", () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();

        // Create an event that represents user inputting a name
        const name = 'UML Appreciation Party';

        // Mock the event handler
        instance.handleNameChange(name);

        // Check that the name is updated
        expect(instance.state.name).toBe('UML Appreciation Party');

        // Check that no other state is changed
        expect(instance.state.cost).toBe('');
        expect(instance.state.party).toBe('');
        expect(instance.state.desc).toBe('');
        expect(instance.state.startTime).toBe('');
        expect(instance.state.endTime).toBe('');
        expect(instance.state.category).toBe('');

    });

    test("Successfully updates all state", () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const cost = '$5';
        const party = '4';
        const desc = 'Learn all about UML diagrams';
        const startTime = '12pm';
        const endTime = '2pm';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Check that all state has been updated
        expect(instance.state.name).toBe('UML Appreciation Party');
        expect(instance.state.cost).toBe('$5');
        expect(instance.state.party).toBe('4');
        expect(instance.state.desc).toBe('Learn all about UML diagrams');
        expect(instance.state.startTime).toBe('12pm');
        expect(instance.state.endTime).toBe('2pm');
        expect(instance.state.category).toBe('Fun');

    });
});

describe('Event Validation Tester', () => {

    test('Accepts Valid Event', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const date = '02/21/2020'
        const cost = '5';
        const party = '4';
        const desc = 'Learn all about UML diagrams';
        const startTime = '12:00';
        const endTime = '02:00';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Success');

    });

    test('Rejects Invalid Time', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const date = '02/21/2020'
        const cost = '5';
        const party = '4';
        const desc = 'Learn all about UML diagrams';
        const startTime = 'INVALID';
        const endTime = '02:00';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Invalid Start or End Time');

    });

    
    test('Rejects Invalid Date', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const date = 'INVALID'
        const cost = '5';
        const party = '4';
        const desc = 'Learn all about UML diagrams';
        const startTime = '12:00';
        const endTime = '02:00';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Invalid Date');

    });

    test('Rejects Invalid Party', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const date = '02/21/2020'
        const cost = '5';
        const party = 'INVALID';
        const desc = 'Learn all about UML diagrams';
        const startTime = '12:00';
        const endTime = '02:00';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Invalid Party Size');

    });

    test('Rejects Invalid Cost', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const date = '02/21/2020'
        const cost = 'INVALID';
        const party = '4';
        const desc = 'Learn all about UML diagrams';
        const startTime = '12:00';
        const endTime = '02:00';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Invalid Cost');

    });

    test('Rejects Invalid Name', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = '';
        const date = '02/21/2020'
        const cost = '5';
        const party = '4';
        const desc = 'Learn all about UML diagrams';
        const startTime = '12:00';
        const endTime = '02:00';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Invalid Event Name');

    });

    test('Rejects Invalid Category', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const date = '02/21/2020'
        const cost = '5';
        const party = '4';
        const desc = 'Learn all about UML diagrams';
        const startTime = '12:00';
        const endTime = '02:00';
        const category = '';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Invalid Category');

    });

    test('Rejects Invalid Event Decription', () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();


        Alert.alert = jest.fn();

        // Create an event that represents the user inputting information
        const name = 'UML Appreciation Party';
        const date = '02/21/2020'
        const cost = '5';
        const party = '4';
        const desc = '';
        const startTime = '12:00';
        const endTime = '02:00';
        const category = 'Fun';

        // Mock all event handlers
        instance.handleNameChange(name);
        instance.handleDateChange(date);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);
        instance.handleNameChange(name);
        instance.handleStartTimeChange(startTime);
        instance.handleEndTimeChange(endTime);
        instance.handleCategoryChange(category);

        // Mock the onSubmit function
        instance.handleSubmit({});

        expect(Alert.alert.mock.calls[0][0]).toBe('Invalid Event Description');

    });

});

