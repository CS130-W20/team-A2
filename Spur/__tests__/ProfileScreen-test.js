import * as React from 'react';
import renderer from 'react-test-renderer';
import ProfileScreen from '../screens/ProfileScreen';

describe(`Profile Screen Tester`, () => {
    test('Renders List Correctly', () => {

        const navigation = {
            navigate: jest.fn()
        }

        

        const profileScreen = renderer.create(<ProfileScreen navigation={navigation}/>);
        const instance = profileScreen.getInstance();


        instance.createListItem = jest.fn()
        instance.createListItem('d', 0);
        instance.viewEvent('e');
        instance.onSelect();

        const oracle = [ [ 'ViewEvent', { eventId: 'e' } ] ]

        expect(navigation.navigate.mock.calls).toEqual(oracle);

    });
  });