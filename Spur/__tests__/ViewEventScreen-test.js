import * as React from 'react';
import renderer from 'react-test-renderer';
import ViewEventScreen from '../screens/ViewEventScreen';

describe(`Renders Correctly Tester`, () => {
    test('Renders Correctly', () => {

        const navigation = {
            navigate: jest.fn()
        }

        const profileScreen = renderer.create(<ViewEventScreen navigation={navigation}/>);
        const instance = profileScreen.getInstance();

        instance.onPressHost();
        instance.onPressAttendees();
        instance.onPressChat();
        

    });
  });