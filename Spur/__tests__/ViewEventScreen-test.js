import * as React from 'react';
import renderer from 'react-test-renderer';
import ViewEventScreen from '../screens/ViewEventScreen';
import { clearUpdateCacheExperimentalAsync } from 'expo/build/Updates/Updates';

describe(`Renders Correctly Tester`, () => {
    test('Navigation works correctly', () => {

        const navigation = {
            navigate: jest.fn()
        }

        const profileScreen = renderer.create(<ViewEventScreen navigation={navigation}/>);
        const instance = profileScreen.getInstance();

        instance.onPressHost();
        instance.onPressAttendees();
        instance.onPressChat();

        console.log(navigation.navigate.mock.calls)
        
        const oracle = 
        [
            [ 'OtherProfile', { userId: '' } ],
            [
              'Chatroom',
              { id: '-M1rGGXEmvqiZxyEUR3o', title: '', userID: '', userName: '' }
            ]
        ]

        expect(navigation.navigate.mock.calls).toEqual(oracle);

    });
  });