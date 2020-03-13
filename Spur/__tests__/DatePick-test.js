import * as React from 'react';
import renderer from 'react-test-renderer';
import DatePick from '../components/DatePick';

describe(`Date Pick Tester`, () => {
    test('Date Displays correctly', () => {
    
        const time = {
            month: 3,
            day: 20,
            hours: 16,
            minutes: 30
        }

        const date = renderer.create(<DatePick type='date' time={time} />).toJSON();
        expect(date).toMatchSnapshot();



    });

    test('Time Displays correctly', () => {
    
        const time = {
            month: 3,
            day: 20,
            hours: 16,
            minutes: 30
        }

        const timepick = renderer.create(<DatePick type='time' time={time} />).toJSON();
        expect(timepick).toMatchSnapshot();


    });

  });