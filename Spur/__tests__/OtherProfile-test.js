import * as React from 'react';
import renderer from 'react-test-renderer';
import OtherProfileScreen from '../screens/OtherProfileScreen';

describe(`Other Profile Tester`, () => {
    test('Nonempty interests', () => {

        const interests = [0]

        const profileScreen = renderer.create(<OtherProfileScreen interests={interests}/>).toJSON();
        expect(profileScreen).toMatchSnapshot();


    });

    test('Empty interests', () => {

        const interests = []

        const profileScreen = renderer.create(<OtherProfileScreen interests={interests}/>);
        expect(profileScreen).toMatchSnapshot();


    });

  });