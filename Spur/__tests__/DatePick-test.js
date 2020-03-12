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

        const datepick = renderer.create(<DatePick type='date' time={time} />);
        const instance = datepick.getInstance();



    });

    test('Time Displays correctly', () => {
    
        const time = {
            month: 3,
            day: 20,
            hours: 16,
            minutes: 30
        }

        const datepick = renderer.create(<DatePick type='time' time={time} />);
        const instance = datepick.getInstance();


    });

  });