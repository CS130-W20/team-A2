import * as React from 'react';
import renderer from 'react-test-renderer';
import BrowseScreen from '../screens/BrowseScreen';

describe("State Change Tester", () =>  {
    test("Successfully updates party size", () => {

        const browseScreen = renderer.create(<BrowseScreen />);
        const instance = browseScreen.getInstance();

        // Create an event that represents user inputting a name
        const party = {nativeEvent:{text:'5'}}

        // Mock the event handler
        instance.handlePartySizeChange(party);

        // Check that the name is updated
        expect(instance.state.partySize).toBe('5');

        // Check that no other state is changed
        expect(instance.state.cost).toBe('');
        expect(instance.state.distance).toBe('');
        expect(instance.state.categories).toBe([]);
        expect(instance.state.eventList).toBe([]);

    });

    test("Successfully updates all state", () => {

        const createScreen = renderer.create(<CreateScreen />);
        const instance = createScreen.getInstance();

        // Create an event that represents the user inputting information
        const party = {nativeEvent:{text:'5'}}
        const cost = {nativeEvent:{text:'10'}}
        const dist = {nativeEvent:{text:'20'}}
        const categories = ['fun', 'sports']

        // Mock all event handlers
        instance.handlePartySizeChange(party);
        instance.handleCostChange(cost);
        instance.handleDistanceChange(dist);
        instance.handleSelectedCategoriesChange(categories);

        // Check that all state has been updated
        expect(instance.state.partySize).toBe('5');
        expect(instance.state.cost).toBe('10');
        expect(instance.state.distance).toBe('20');
        expect(instance.state.categories).toBe(['fun', 'sports']);
        expect(instance.state.eventList).toBe([]);

    });
});