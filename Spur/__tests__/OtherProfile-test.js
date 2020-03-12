import * as React from 'react';
import renderer from 'react-test-renderer';
import OtherProfileScreen from '../screens/OtherProfileScreen';

describe(`Renders Correctly Tester`, () => {
    test('Nonempty interests', () => {

        const interests = [0]

        const profileScreen = renderer.create(<OtherProfileScreen interests={interests}/>);
        const instance = profileScreen.getInstance();


    });

    test('Empty interests', () => {

        const interests = []

        const profileScreen = renderer.create(<OtherProfileScreen interests={interests}/>);
        const instance = profileScreen.getInstance();


    });

  });