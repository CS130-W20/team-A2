import * as React from 'react';
import renderer from 'react-test-renderer';
import ProfileScreen from '../screens/ProfileScreen';

describe(`Renders Correctly Tester`, () => {
    test('Renders Correctly', () => {

        const navigation = {
            navigate: jest.fn()
        }

        

        const profileScreen = renderer.create(<ProfileScreen navigation={navigation}/>);
        const instance = profileScreen.getInstance();


        instance.createListItem = jest.fn()
        instance.createListItem('d', 0);
        instance.viewEvent('e');
        instance.onSelect();

        

    });
  });