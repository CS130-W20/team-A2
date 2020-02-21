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
        expect(instance.state.categories).toStrictEqual([]);
        expect(instance.state.eventList).toStrictEqual([]);

    });

    test("Successfully updates all state", () => {

        const browseScreen = renderer.create(<BrowseScreen />);
        const instance = browseScreen.getInstance();

        // Create an event that represents the user inputting information
        const party = {nativeEvent:{text:'5'}}
        const cost = {nativeEvent:{text:'10'}}
        const dist = {nativeEvent:{text:'20'}}
        const categories = [];

        // Mock all event handlers
        instance.handlePartySizeChange(party);
        instance.handleCostChange(cost);
        instance.handleDistanceChange(dist);
        instance.handleSelectedCategoriesChange(categories);

        // Check that all state has been updated
        expect(instance.state.partySize).toBe('5');
        expect(instance.state.cost).toBe('10');
        expect(instance.state.distance).toBe('20');
        expect(instance.state.categories).toStrictEqual([]);
        expect(instance.state.eventList).toStrictEqual([]);

    });
});

describe('Refine Search Tester', () => {
    test('Successfully Filter', () => {
        const browseScreen = renderer.create(<BrowseScreen />);
        const instance = browseScreen.getInstance();

        // Create an event that represents the user inputting search criteria
        const party = {nativeEvent:{text:'5'}}
        const cost = {nativeEvent:{text:'5'}}
        const dist = {nativeEvent:{text:'5000'}}
        const categories = [];

        // Mock all event handlers
        instance.handlePartySizeChange(party);
        instance.handleCostChange(cost);
        instance.handleDistanceChange(dist);
        instance.handleSelectedCategoriesChange(categories);

        // Mock the search refinement function
        instance.refineSearch();
        expect(instance.state.eventList).toEqual([{"attendees": "attendees5",
         "chat": "chat5",
         "checked_in": "checked_in5", 
         "details": {"categories": [], 
                    "cost": 5, 
                    "description": "description5", 
                    "endTime": "endTime5", 
                    "host": "host5", 
                    "location": 5000, 
                    "partySize": 5, 
                    "startTime": "startTime5", 
                    "title": "title5"}
        }]);
    });

    test('Return Empty List When No Events Match', () => {
        const browseScreen = renderer.create(<BrowseScreen />);
        const instance = browseScreen.getInstance();

        // Create an event that represents the user inputting search criteria
        const party = {nativeEvent:{text:'11'}}
        const cost = {nativeEvent:{text:'11'}}
        const dist = {nativeEvent:{text:'11'}}
        const categories = [];

        // Mock all event handlers
        instance.handlePartySizeChange(party);
        instance.handleCostChange(cost);
        instance.handleDistanceChange(dist);
        instance.handleSelectedCategoriesChange(categories);

        // Mock the search refinement function
        instance.refineSearch();
        expect(instance.state.eventList).toStrictEqual([]);
    });

    test('Filters with default values', () => {
        const browseScreen = renderer.create(<BrowseScreen />);
        const instance = browseScreen.getInstance();

        instance.refineSearch();
        expect(instance.state.eventList).toEqual([{"attendees": "attendees1", "chat": "chat1", "checked_in": "checked_in1", "details": {"categories": [], "cost": 1, "description": "description1", "endTime": "endTime1", "host": "host1", "location": 1000, "partySize": 1, "startTime": "startTime1", "title": "title1"}}, {"attendees": "attendees2", "chat": "chat2", "checked_in": "checked_in2", "details": {"categories": [], "cost": 2, "description": "description2", "endTime": "endTime2", "host": "host2", "location": 2000, "partySize": 2, "startTime": "startTime2", "title": "title2"}}, {"attendees": "attendees3", "chat": "chat3", "checked_in": "checked_in3", "details": {"categories": [], "cost": 3, "description": "description3", "endTime": "endTime3", "host": "host3", "location": 3000, "partySize": 3, "startTime": "startTime3", "title": "title3"}}, {"attendees": "attendees4", "chat": "chat4", "checked_in": "checked_in4", "details": {"categories": [], "cost": 4, "description": "description4", "endTime": "endTime4", "host": "host4", "location": 4000, "partySize": 4, "startTime": "startTime4", "title": "title4"}}, {"attendees": "attendees5", "chat": "chat5", "checked_in": "checked_in5", "details": {"categories": [], "cost": 5, "description": "description5", "endTime": "endTime5", "host": "host5", "location": 5000, "partySize": 5, "startTime": "startTime5", "title": "title5"}}, {"attendees": "attendees6", "chat": "chat6", "checked_in": "checked_in6", "details": {"categories": [], "cost": 6, "description": "description6", "endTime": "endTime6", "host": "host6", "location": 6000, "partySize": 6, "startTime": "startTime6", "title": "title6"}}, {"attendees": "attendees7", "chat": "chat7", "checked_in": "checked_in7", "details": {"categories": [], "cost": 7, "description": "description7", "endTime": "endTime7", "host": "host7", "location": 7000, "partySize": 7, "startTime": "startTime7", "title": "title7"}}, {"attendees": "attendees8", "chat": "chat8", "checked_in": "checked_in8", "details": {"categories": [], "cost": 8, "description": "description8", "endTime": "endTime8", "host": "host8", "location": 8000, "partySize": 8, "startTime": "startTime8", "title": "title8"}}, {"attendees": "attendees9", "chat": "chat9", "checked_in": "checked_in9", "details": {"categories": [], "cost": 9, "description": "description9", "endTime": "endTime9", "host": "host9", "location": 9000, "partySize": 9, "startTime": "startTime9", "title": "title9"}}, {"attendees": "attendees10", "chat": "chat10", "checked_in": "checked_in10", "details": {"categories": [], "cost": 10, "description": "description10", "endTime": "endTime10", "host": "host10", "location": 10000, "partySize": 10, "startTime": "startTime10", "title": "title10"}}]);
    })

});