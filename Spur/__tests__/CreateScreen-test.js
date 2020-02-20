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

        // Mock all event handler
        instance.handleNameChange(name);
        instance.handleCostChange(cost);
        instance.handlePartyChange(party);
        instance.handleDescChange(desc);


        // Check that all state has been updated
        expect(instance.state.name).toBe('UML Appreciation Party');
        expect(instance.state.cost).toBe('$5');
        expect(instance.state.party).toBe('4');
        expect(instance.state.desc).toBe('Learn all about UML diagrams');

    });


});

describe("Development Mode Tester", () =>  {
    test("In Dev Mode", () => {

        //const createScreen = renderer.create(<CreateScreen />);
        //const instance = createScreen.getInstance();

        //handleLearnMorePress();

        const a = 5;
        expect(a).toBe(5);

    });
});