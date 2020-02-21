// Tests for the Create Event Screen
import * as React from 'react';
import renderer from 'react-test-renderer';
import CreateScreen from '../screens/CreateScreen';


describe("State Change Tester", () =>  {
    test("Successfully updates name", () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();

        // Create an event that represents user inputting a name
        const name = {
            nativeEvent: {
                text: 'UML Appreciation Party'
            }
        };

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
        const name = {
            nativeEvent: {
                text: 'UML Appreciation Party'
            }
        };

        const cost = {
            nativeEvent: {
                text: '$5'
            }
        };

        const party = {
            nativeEvent: {
                text: '4'
            }
        };

        const desc = {
            nativeEvent: {
                text: 'Learn all about UML diagrams'
            }
        };

        const startTime = {
            nativeEvent: {
                text: '12pm'
            }
        };

        const endTime = {
            nativeEvent: {
                text: '2pm'
            }
        };

        const category = {
            nativeEvent: {
                text: 'Fun'
            }
        };

        // Mock all event handler
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

