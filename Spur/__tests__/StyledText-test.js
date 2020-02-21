import * as React from 'react';
import renderer from 'react-test-renderer';

import { MonoText } from '../components/StyledText';


describe(`Renders Correctly Tester`, () => {
  test('Renders Correctly', () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
  expect(tree).toMatchSnapshot();
  });
});
