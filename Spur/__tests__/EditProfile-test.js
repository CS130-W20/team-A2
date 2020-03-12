import * as React from 'react';
import renderer from 'react-test-renderer';
import EditProfileScreen from '../screens/EditProfileScreen';

describe(`Edit Profile Tester`, () => {
    test('Handles confirm and cancel changes', () => {

        const navigation = {
            push: jest.fn()
        }

        const profileScreen = renderer.create(<EditProfileScreen navigation={navigation}/>);
        const instance = profileScreen.getInstance();

        instance.onConfirmChanges();
        instance.onCancelChanges();

        const oracle = [ [ 'Profile' ], [ 'Profile' ] ];

        expect(navigation.push.mock.calls).toEqual(oracle);
        

    });
  });