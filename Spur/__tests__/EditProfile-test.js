import * as React from 'react';
import renderer from 'react-test-renderer';
import EditProfileScreen from '../screens/EditProfileScreen';

describe(`Renders Correctly Tester`, () => {
    test('Renders Correctly', () => {

        const navigation = {
            navigate: jest.fn(),
            push: jest.fn()
        }

        const profileScreen = renderer.create(<EditProfileScreen navigation={navigation}/>);
        const instance = profileScreen.getInstance();

        instance.onConfirmChanges();
        instance.onCancelChanges();
        

    });
  });